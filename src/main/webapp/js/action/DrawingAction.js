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

                if(tool.getCurrent() == 'brush') {
                    $('#add-brush-tool').show();
                    $('#brush-penSize').show();
                    $('#default-penSize').hide();

                    tool.getPen().setSize($('.penSize-pallet:visible').find('ul > li:first-child').attr('id').split('penSize-')[1]); //1; //pencil, brush 사용 변수
                    tool.getPen().setBrush('round');
                    //var initializer = new Initializer();
                    //Initializer.initTool.call(null, false);
                    //initializer.initTool(false);
                }else {
                    $('.additional-tool').find('div').hide();
                    $('#default-penSize').show();
                    $('#brush-penSize').hide();

                    tool.getPen().setSize($('.penSize-pallet:visible').find('ul > li:first-child').attr('id').split('penSize-')[1]); //1; //pencil, brush 사용 변수
                    tool.getPen().setBrush('round');
                    //initializer.initTool(false);

                    if(tool.getCurrent() == 'eraser') {
                        self.eraserSelect();
                    }
                }
            }

            /**
             * 펜 사이즈 선택
             * @param event
             */
            this.penSizeSelect = function(event) {
                $(event.target).addClass('on');
                tool.getPen().setSize(event.target.id.split('penSize-')[1]);
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
             * 브러쉬 선택
             * @param event
             */
            this.brushSelect = function(event) {
                tool.getPen().setBrush(event.target.id.split('brush-')[1]);
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
                                console.log("첫 클릭");
                                tool.getPen().setOldPoint(event);
                                break;
                        }
                    }
                } else if (event.type == 'mouseup') {
                    console.log("클릭 해제");
                    tool.setMouseDown(false);
                } else if (event.type == 'mouseover') {
                    console.log("마우스 오버");
                    tool.setMouseDown(false);
                } else if (event.type == 'keydown') {
                    console.log("키 다운");
                } else if (event.type == 'mousemove') {
                    if(tool.getMouseDown()) {
                        switch(tool.getCurrent()) {
                            case 'pencil' :
                            case 'brush' :
                            case 'eraser' :
                                self.drawLineEvent(event);
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