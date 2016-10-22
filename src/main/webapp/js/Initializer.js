/**
 * 초기화
 */

define(['jquery', 'model/Tool', 'handler/DrawingEventHandler', 'handler/FileEventHandler'],
    function($, Tool, DrawingEventHandler, FileEventHandler) {
        var Init = function() {
            /**
             * 캔바스 관련 변수
             */
            this.canvas = null,
            this.context = null,
            this.oldPoint = null,
            this.newPoint = null,
            this.isMouseDown = false,
            this.tool = new Tool();

            /**
             * 최초 초기화
             */
            this.setInit = function() {
                this.initCanvas();
                this.initTool(true);
                this.initColorPicker();
            }

            /**
             * 이벤트 바인딩
             */
            this.eventBinder = function() {
                var initObj = this,
                    //======================================= file
                    save_btn = $(".navi-menu").find("[id^=menu-]"),
                    myfile_td = $('.file-list').find('td'),
                    save_view_btn = $('#file-saveView').find('.save-btn'),
                    file_exit_btn = $('.file-list').find('.div-exit').find('i'),
                    //======================================= drawing
                    drawing_tool = $(".drawing-tool").find('li'),
                    drawing_canvas = $("#drawing-canvas"), /* canvas board */
                    pallet_tool = $("div[class^=pallet-]").find('li'),
                    drawclear = $("#menu-drawClear"); /* clear */

                var fileEventObj = [save_btn, myfile_td, save_view_btn, file_exit_btn];
                var drawEventObj = [drawing_tool, drawing_canvas, pallet_tool, drawclear];

                for(var i=0; i<fileEventObj.length; i++) {
                    fileEventObj[i].on('mousedown keydown mouseover mouseup mousemove', function(event) {
                        FileEventHandler(initObj, event);
                    });
                }

                for(var i=0; i<drawEventObj.length; i++) {
                    drawEventObj[i].on('mousedown keydown mouseover mouseup mousemove', function(event) {
                        DrawingEventHandler(initObj, event);
                    });
                }
            }

            /**
             * 캔버스 초기화
             * @param canvas
             */
            this.initCanvas = function() {
                this.canvas = document.getElementById("drawing-canvas");
                this.context = this.canvas.getContext("2d");
                this.canvas.width = $('.drawing-board').css('width').split('px')[0] - 2;
                this.canvas.height = $('.drawing-board').css('height').split('px')[0] - 2;
            };

            /**
             * 툴 도구 초기화
             * @param startFlag
             */
            this.initTool = function(startFlag) {
                if(startFlag) {
                    this.tool.current = $('.drawing-tool').find('ul > li').attr('id').split('tool-')[1]; //"pencil"
                    this.tool.pen.color = $('.color-pallet').find('ul > li:eq(0)').css('background-color'); //'#000000';
                }
                this.tool.pen.size = $('.penSize-pallet:visible').find('ul > li:first-child').attr('id').split('penSize-')[1]; //1; //pencil, brush 사용 변수
                this.tool.pen.brush = 'round';
            };


            /**
             * 색상표 초기화
             * @param colorPallet
             */
            this.initColorPicker = function() {
                    var colorPicker = "<ul>";
                    for(var i=0; i<this.colorArr.length; i++) {
                        colorPicker += "<li style='background-color:" + this.colorArr[i] + "'></li>";
                    }
                    colorPicker += "</ul>";

                $('.color-pallet').append(colorPicker);
            };

            /**
             * 색상표
             * @type {string[]}
             */
            this.colorArr = [
                '#000000', //'rgb(0, 0, 0)'
                '#CCCCCC',
                '#FFFFFF',
                '#ff0000',
                '#FF7F00',
                '#FFFF00',
                '#009900',
                '#082567',
                '#8000FF',
                '#FF7493',
                '#abeda6',
                '#b4dec1',
                '#CD426B'
            ];
        };

        return Init;
});
