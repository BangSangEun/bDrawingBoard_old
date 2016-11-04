/**
 * 초기화 클래스
 */

define(['jquery', 'Tool', 'Util', 'DrawingEventHandler', 'FileEventHandler'],
    function($, Tool, Util, DrawingEventHandler, FileEventHandler) {
        var Initializer = function() {
            var self = this;

            this.tool;

            /**
             * 초기화 함수
             */
            this.init = function() {
                self.tool = new Tool();
                self.initCanvas();
                self.initTool();

                var util = new Util();
                util.createColorPicker($('.color-pallet'));
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
                    drawclear = $("#menu-drawClear"), /* clear */
                    gradient_option = $('#gradient-option'); /* 그라데이션 옵션 메뉴 */

                var fileEventObj = [file_menu, myfile_save_btn, myfile_list_exit];
                var drawEventObj = [drawing_tool, drawing_canvas, pallet_tool_color, pallet_tool, drawclear, gradient_option];

                var fileEventHandler = new FileEventHandler();
                fileEventHandler.init(self.tool);
                for(var i=0; i<fileEventObj.length; i++) {
                    fileEventObj[i].on('mousedown keydown mouseover mouseup mousemove', function(event) {
                        fileEventHandler.setHandler(event);
                    });
                }

                var drawingEventHandler = new DrawingEventHandler();
                drawingEventHandler.init(self.tool);
                for(var i=0; i<drawEventObj.length; i++) {
                    drawEventObj[i].on('mousedown keydown mouseover mouseup mousemove change', function(event) {
                        drawingEventHandler.setHandler(event);
                    });
                }
            };

            /**
             * 캔버스 초기화
             */
            this.initCanvas = function() {
                (self.tool.getCanvas()).width = $('.drawing-board').css('width').split('px')[0] - 2;
                (self.tool.getCanvas()).height = $('.drawing-board').css('height').split('px')[0] - 2;
            };

            /**
             * 툴 도구 초기화
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
             * @param obj
             */
            this.initColorPicker = function(obj) {
                var colorArr = self.tool.getColorArr();
                var colorPicker = "<ul>";
                for(var i=0; i<colorArr.length; i++) {
                    colorPicker += "<li style='background-color:" + colorArr[i] + "'></li>";
                }
                colorPicker += "</ul>";

                obj.append(colorPicker);
            }
        };

        return Initializer;
});
