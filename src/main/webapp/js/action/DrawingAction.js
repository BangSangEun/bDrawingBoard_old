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
                    self.eraserSelect();

                }
            }

            /**
             * 펜 사이즈 선택
             * @param event
             */
            this.penSizeSelect = function(event) {
                tool.getPen().setSize($(event.target).val());
            }

            /**
             * 색상 선택
             * @param event
             */
            this.colorSelect = function(event) {
                $(event.target).addClass('on');
                tool.getPen().setColor($(event.target).css('background-color'));
            }

            /**
             * 브러쉬 모양 선택
             * @param event
             */
            this.brushSelect = function(event) {
                tool.getPen().setBrush($(event.target).val());
            }

            /**
             * 도형 모양 선택
             * @param event
             */
            this.figureSelect = function(event) {
                //var figureShape = $(event.target).val();
                console.log($(event.target).val());
                tool.getPen().setFigure($(event.target).val());
            }
            
            /**
             * 새로그리기
             */
            this.cleaerCanvas = function () {
                tool.getContext().clearRect(0,0, $(tool.getCanvas()).width(), $(tool.getCanvas()).height());
            }

            /**
             * 지우개 선택
             * @param event
             */
            this.eraserSelect = function() {
                tool.getPen().setColor('#fff');
                tool.getPen().setBrush('square');
            }

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
            }

            /**
             * 도형 그리기 이벤트
             * @param event
             */
            this.drawFigureEvent = function(event) {
                var shape = tool.getPen().getFigure();
                tool.getPen().setNewPoint(event);
                var newX = tool.getPen().getNewPoint().x, oldX = tool.getPen().getOldPoint().x;
                var figureSize = newX - oldX < 0 ? (newX - oldX) * (-1) : (newX - oldX);
                var prevFigure;

                prevFigure = tool.getPen().getEtc();
                if(shape == 'circle') {
                    if(prevFigure != undefined && prevFigure != null) {
                        tool.getContext().globalCompositeOperation = 'destination-out';
                        tool.getContext().moveTo(prevFigure[0], prevFigure[1]);
                        tool.getContext().beginPath();
                        tool.getContext().arc(prevFigure[0], prevFigure[1], prevFigure[2]+2, 0, 2*Math.PI); //원 중심 좌표, 반지름 크기
                        tool.getContext().closePath();
                        tool.getContext().lineWidth = tool.getPen().getSize(); //라인 굵기
                        tool.getContext().strokeStyle = tool.getPen().getColor(); //라인 색상
                        tool.getContext().stroke();
                    }

                    tool.getContext().globalCompositeOperation = 'source-over';
                    tool.getContext().moveTo(tool.getPen().getOldPoint().x, tool.getPen().getOldPoint().y);
                    tool.getContext().beginPath();
                    tool.getContext().arc(tool.getPen().getOldPoint().x, tool.getPen().getOldPoint().y, figureSize, 0, 2*Math.PI); //원 중심 좌표, 반지름 크기
                    tool.getContext().closePath();
                    tool.getContext().lineWidth = tool.getPen().getSize(); //라인 굵기
                    tool.getContext().strokeStyle = tool.getPen().getColor(); //라인 색상
                    tool.getContext().stroke();

                    prevFigure = [tool.getPen().getOldPoint().x, tool.getPen().getOldPoint().y, figureSize];
                    tool.getPen().setEtc(prevFigure);
                }else if(shape == 'squre') {

                }

                //tool.getContext().fill();


                /*
                // 빨간색 채움형태 사각형
                ctx.fillStyle = 'rgb(255, 0, 0)';
                ctx.fillRect(10, 10, 80, 80);
                // 사각형 범위 지우기
                ctx.clearRect(20, 20, 60, 60);
                // 사각형 테두리
                ctx.strokeRect(30, 30, 40, 40);
                */
            }

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
                                break;
                        }
                    }
                } else if (event.type == 'mouseup') {
                    console.log("클릭 해제");
                    tool.setMouseDown(false);
                    tool.getPen().setEtc(null);
                } else if (event.type == 'mouseover') {
                    console.log("마우스 오버");
                    tool.setMouseDown(false);
                } else if (event.type == 'keydown') {

                } else if (event.type == 'mousemove') {
                    if(tool.getMouseDown()) {
                        switch(tool.getCurrent()) {
                            case 'pencil' :
                            case 'brush' :
                            case 'eraser' :
                                self.drawLineEvent(event);
                                break;
                            case 'figure' :
                                self.drawFigureEvent(event);
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