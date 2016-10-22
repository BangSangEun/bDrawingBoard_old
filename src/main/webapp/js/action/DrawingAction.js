/**
 *  그림판 관련 Action
 */

define(['jquery', '../model/Tool'],
    function($, Tool) {
        var drawingAction = function(initObj) {
            this.initObj = initObj;

            /**
             * 툴 선택
             * @param event
             */
            this.toolSelect = function(event) {
                this.initObj.tool.current = event.target.id.split('tool-')[1];

                if(this.initObj.tool.current == 'brush') {
                    $('#add-brush-tool').show();
                    $('#brush-penSize').show();
                    $('#default-penSize').hide();
                    this.initObj.initTool(false);
                }else {
                    $('.additional-tool').find('div').hide();
                    $('#default-penSize').show();
                    $('#brush-penSize').hide();
                    this.initObj.initTool(false);

                    if(this.initObj.tool.current == 'eraser') {
                        this.eraserSelect();
                    }
                }
            }

            /**
             * 펜 사이즈 선택
             * @param event
             */
            this.penSizeSelect = function(event) {
                $(event.target).addClass('on');
                this.initObj.tool.pen.size = event.target.id.split('penSize-')[1];
            }

            /**
             * 색상 선택
             * @param event
             */
            this.colorSelect = function(event) {
                $(event.target).addClass('on');
                this.initObj.tool.pen.color = $(event.target).css('background-color');
            }

            /**
             * 브러쉬 선택
             * @param event
             */
            this.brushSelect = function(event) {
                this.initObj.tool.pen.brush = event.target.id.split('brush-')[1];
            }

            /**
             * 새로그리기
             */
            this.cleaerCanvas = function () {
                this.initObj.context.clearRect(0,0, $(this.initObj.canvas).width(), $(this.initObj.canvas).height());
            }

            /**
             * 지우개 선택
             * @param event
             */
            this.eraserSelect = function(event) {
                this.initObj.tool.pen.color = '#fff';
                this.initObj.tool.pen.brush = 'square';
            }

            /**
             * 선 그리기 이벤트
             * @param event
             */
            this.drawLineEvent = function(event) {
                this.initObj.tool.newPoint = new Point(event);
                this.initObj.context.lineWidth = this.initObj.tool.pen.size; //라인 굵기
                this.initObj.context.strokeStyle = this.initObj.tool.pen.color; //라인 색상
                this.initObj.context.lineCap = this.initObj.tool.pen.brush; //끝 부분 모양 (round, butt, square 가 있음)
                this.initObj.context.beginPath();
                this.initObj.context.moveTo(this.initObj.tool.oldPoint.x, this.initObj.tool.oldPoint.y);
                this.initObj.context.lineTo(this.initObj.tool.newPoint.x, this.initObj.tool.newPoint.y);
                this.initObj.context.stroke();
                this.initObj.tool.oldPoint = this.initObj.tool.newPoint;
            }

            /**
             * 캔바스 이벤트
             * @param event
             */
            this.canvasEvent = function(event) {
                if (event.type == 'mousedown') {
                    if (event.button == 0) { // 마우스 왼쪽 버튼
                        this.initObj.isMouseDown = true;
                        switch(this.initObj.tool.current) {
                            case 'pencil' :
                            case 'brush' :
                            case 'eraser' :
                                this.initObj.tool.oldPoint = new Point(event);
                                break;
                        }
                    }
                } else if (event.type == 'mouseup') {
                    this.initObj.isMouseDown = false;
                } else if (event.type == 'mouseover') {
                    this.initObj.isMouseDown = false;
                } else if (event.type == 'keydown') {

                } else if (event.type == 'mousemove') {
                    if(this.initObj.isMouseDown) {
                        switch(this.initObj.tool.current) {
                            case 'pencil' :
                            case 'brush' :
                            case 'eraser' :
                                this.drawLineEvent(event);
                                break;
                        }
                    }
                }

            }
        };

        /**
         * Point 객체
         * @param event
         * @constructor
         */
        var Point = function(event) {
            this.x = event.offsetX - $(event.target).position().left;
            this.y = event.offsetY - $(event.target).position().top;
        }

        return drawingAction;
});