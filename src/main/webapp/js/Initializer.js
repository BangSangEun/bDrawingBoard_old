/**
 * 초기화 클래스
 */

define(['jquery', 'model/Tool', 'handler/DrawingEventHandler', 'handler/FileEventHandler'],
    function($, Tool, DrawingEventHandler, FileEventHandler) {
        var Initializer = function() {
            var self = this;

            this.tool = new Tool();

            /**
             * 초기화 함수
             */
            this.init = function() {
                self.initCanvas();
                self.initColorPicker();
                self.initTool();
            };

            /**
             * 이벤트 바인딩
             */
            this.eventBinder = function() {
                    //======================================= file
                var file_menu = $(".navi-menu").find("[id^=menu-]"),
                    myfile_save_btn = $('#myfile-save-btn'),
                    myfile_list_exit = $('.file-view .modal-footer').find('.file-btn-close'),
                    //======================================= drawing
                    drawing_tool = $(".drawing-tool").find('li').find('button'),
                    drawing_canvas = $("#drawing-canvas"), /* canvas board */
                    pallet_tool_color = $(".color-pallet").find('li'),
                    pallet_tool = $("div[class^=pallet-]").find('select'),
                    drawclear = $("#menu-drawClear"); /* clear */

                var fileEventObj = [file_menu, myfile_save_btn, myfile_list_exit];
                var drawEventObj = [drawing_tool, drawing_canvas, pallet_tool_color, pallet_tool, drawclear];

                var fileEventHandler = new FileEventHandler();
                for(var i=0; i<fileEventObj.length; i++) {
                    fileEventObj[i].on('mousedown keydown mouseover mouseup mousemove', function(event) {
                        fileEventHandler.setHandler(self.tool, event);
                    });
                }

                var drawingEventHandler = new DrawingEventHandler();
                for(var i=0; i<drawEventObj.length; i++) {
                    drawEventObj[i].on('mousedown keydown mouseover mouseup mousemove change', function(event) {
                        drawingEventHandler.setHandler(self.tool, event);
                    });
                }
            };

            /**
             * 캔버스 초기화
             * @param canvas
             */
            this.initCanvas = function() {
                (self.tool.getCanvas()).width = $('.drawing-board').css('width').split('px')[0] - 2;
                (self.tool.getCanvas()).height = $('.drawing-board').css('height').split('px')[0] - 2;
            };

            /**
             * 툴 도구 초기화
             * @param startFlag
             */
            this.initTool = function() {
                self.tool.setCurrent($('.drawing-tool').find('li > button').attr('id').split('tool-')[1]); //"pencil";
                self.tool.getPen().setColor($('.color-pallet').find('ul > li:eq(0)').css('background-color'));  //'#000000';
                $('.drawing-tool').find('ul > li:eq(0) > button').addClass("active");

                self.tool.getPen().setSize($('.penSize-pallet:visible').find('select option:eq(0)').val());
                self.tool.getPen().setBrush($('#brush-shape').find('select option:eq(0)').val());
                self.tool.getPen().setFigure($('#figure-shape').find('select option:eq(0)').val());
            };

            /**
             * 색상표 초기화
             * @param colorPallet
             */
            this.initColorPicker = function() {
                var colorArr = self.tool.getColorArr();
                var colorPicker = "<ul>";
                for(var i=0; i<colorArr.length; i++) {
                    colorPicker += "<li style='background-color:" + colorArr[i] + "'></li>";
                }
                colorPicker += "</ul>";

                $('.color-pallet').append(colorPicker);
            }
        };

        return Initializer;
});
