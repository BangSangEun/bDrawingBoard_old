/**
 *  그림판 관련 Action
 */

define(['jquery', '../model/Tool'],
    function($, Tool) {
        var drawingAction = function(tool) {
            var self = this;

            /**
             * 툴 선택
             * @param event
             */
            this.toolSelect = function(event) {
                tool.setCurrent(event.target.id.split('tool-')[1]);
                $("button[id^=tool-]").removeClass("active");
                $("#" + event.target.id).addClass("active");

                $('#default-penSize').hide();
                $('#brush-penSize').hide();
                $('#eraser-penSize').hide();
                $('#brush-shape').hide();
                $('#figure-shape').hide();

                if(tool.getCurrent() == 'pencil') {
                    tool.getPen().setBrush('round');
                    tool.getPen().setSize($('#default-penSize').find('select').val());
                    $('#default-penSize').show();
                }else if(tool.getCurrent() == 'brush') {
                    tool.getPen().setBrush($('#brush-shape').find('select').val());
                    tool.getPen().setSize($('#brush-penSize').find('select').val());
                    $('#brush-shape').show();
                    $('#brush-penSize').show();
                }else if(tool.getCurrent() == 'figure') {
                    $('#figure-shape').show();
                }else if(tool.getCurrent() == 'eraser') {
                    tool.getPen().setBrush('square');
                    tool.getPen().setSize($('#eraser-penSize').find('select').val());
                    $('#eraser-penSize').show();
                }
            };

            /**
             * 펜 사이즈 선택
             * @param event
             */
            this.penSizeSelect = function(event) {
                tool.getPen().setSize($(event.target).val());
            };

            /**
             * 색상 선택
             * @param event
             */
            this.colorSelect = function(event) {
                $(event.target).addClass('on');
                tool.getPen().setColor($(event.target).css('background-color'));
            };

            /**
             * 브러쉬 모양 선택
             * @param event
             */
            this.brushSelect = function(event) {
                tool.getPen().setBrush($(event.target).val());
            };

            /**
             * 도형 모양 선택
             * @param event
             */
            this.figureSelect = function(event) {
                tool.getPen().setFigure($(event.target).val());
            };
            
            /**
             * 새로그리기
             */
            this.cleaerCanvas = function () {
                tool.getContext().clearRect(0,0, $(tool.getCanvas()).width(), $(tool.getCanvas()).height());
            };

            /**
             * 지우개 선택
             * @param event
             */
            this.eraserEvent = function() {
                tool.getPen().setNewPoint(event);
                tool.getContext().clearRect(tool.getPen().getNewPoint().x, tool.getPen().getNewPoint().y, tool.getPen().getSize(), tool.getPen().getSize());
            };

            /**
             * 선 그리기 이벤트
             * @param event
             */
            this.drawLineEvent = function(event) {
                tool.getPen().setNewPoint(event);

                tool.getContext().lineWidth = tool.getPen().getSize(); //라인 굵기
                tool.getContext().strokeStyle = tool.getPen().getColor(); //라인 색상
                tool.getContext().lineCap = tool.getPen().getBrush(); //끝 부분 모양 (round, butt, square 가 있음)

                tool.getContext().beginPath();
                tool.getContext().moveTo(tool.getPen().getOldPoint().x, tool.getPen().getOldPoint().y);
                tool.getContext().lineTo(tool.getPen().getNewPoint().x, tool.getPen().getNewPoint().y);
                tool.getContext().stroke();

                tool.getPen().setOldPoint(null, tool.getPen().getNewPoint());
            };

            /**
             * 도형 그리기 이벤트
             * @param event
             */
            this.drawFigureEvent = function(event) {
                var shape = tool.getPen().getFigure(); //도형 모양
                tool.getPen().setNewPoint(event);
                var newX = tool.getPen().getNewPoint().x, newY = tool.getPen().getNewPoint().y,
                    oldX = tool.getPen().getOldPoint().x, oldY = tool.getPen().getOldPoint().y;
                var figureSize = newX - oldX < 0 ? (newX - oldX) * (-1) : (newX - oldX);

                tool.getContext().clearRect(0, 0, tool.getCanvas().width, tool.getCanvas().height);
                tool.getContext().putImageData(tool.getPen().getEtc(), 0, 0);
                tool.getContext().beginPath();

                if(shape == 'circle') {
                    tool.getContext().arc(oldX, oldY, figureSize, 0, 2*Math.PI); //원 중심 좌표, 반지름 크기
                }else if(shape == 'triangle') {
                    tool.getContext().moveTo(oldX, oldY - figureSize/2);
                    tool.getContext().lineTo(oldX - figureSize/2, oldY + figureSize/2);
                    tool.getContext().lineTo(oldX + figureSize/2, oldY + figureSize/2);
                }else if(shape == 'square') {
                    tool.getContext().strokeRect(oldX - figureSize/2, oldY - figureSize/2, figureSize, figureSize);
                }

                tool.getContext().closePath();
                tool.getContext().lineWidth = tool.getPen().getSize(); //라인 굵기
                tool.getContext().strokeStyle = tool.getPen().getColor(); //라인 색상
                tool.getContext().stroke();
            };


            this.paintEvent = function(event) {

            };

            /**
             * 캔바스 이벤트
             * @param event
             */
            this.canvasEvent = function(event) {
                if (event.type == 'mousedown') {
                    if (event.button == 0) { // 마우스 왼쪽 버튼
                        tool.setMouseDown(true);
                        switch(tool.getCurrent()) {
                            case 'pencil' :
                            case 'brush' :
                            case 'eraser' :
                                tool.getPen().setOldPoint(event);
                                break;
                            case 'figure' :
                                console.log("도형 첫 클릭");
                                tool.getPen().setOldPoint(event);
                                tool.getPen().setEtc(tool.getContext().getImageData(0,0,tool.getCanvas().width,tool.getCanvas().height));
                                break;
                        }
                    }
                } else if (event.type == 'mouseup') {
                    console.log("클릭 해제");
                    tool.setMouseDown(false);
                    //tool.getPen().setEtc(null);
                } else if (event.type == 'mouseover') {
                    console.log("마우스 오버");
                    tool.setMouseDown(false);
                } else if (event.type == 'keydown') {

                } else if (event.type == 'mousemove') {
                    if(tool.getMouseDown()) {
                        switch(tool.getCurrent()) {
                            case 'pencil' :
                            case 'brush' :
                                self.drawLineEvent(event);
                                break;
                            case 'figure' :
                                self.drawFigureEvent(event);
                                break;
                            case 'eraser' :
                                self.eraserEvent(event);
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
        };

        return drawingAction;
});