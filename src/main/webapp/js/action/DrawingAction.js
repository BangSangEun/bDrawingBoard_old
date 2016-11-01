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
                $('#figure-penSize').hide();
                $('#brush-shape').hide();
                $('#figure-shape').hide();

                self.prevCanvasReturn();
                tool.getContext().setLineDash([]);

                switch(tool.getCurrent()) {
                    case 'pencil' :
                        tool.getPen().setBrush('round');
                        tool.getPen().setSize($('#default-penSize').find('select').val());
                        $('#default-penSize').show();
                        break;
                    case 'brush' :
                        tool.getPen().setBrush($('#brush-shape').find('select').val());
                        tool.getPen().setSize($('#brush-penSize').find('select').val());
                        $('#brush-shape').show();
                        $('#brush-penSize').show();
                        break;
                    case 'eraser' :
                        tool.getPen().setBrush('square');
                        tool.getPen().setSize($('#eraser-penSize').find('select').val());
                        $('#eraser-penSize').show();
                        break;
                    case 'figure' :
                        tool.getPen().setSize($('#figure-penSize').find('select').val());
                        $('#figure-shape').show();
                        $('#figure-penSize').show();
                        break;
                    case 'paint' :
                        //그라데이션 메뉴 보이기
                        break;
                    case 'selectObj' :
                        break;
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
                tool.setData([]);
                tool.getContext().clearRect(0,0, $(tool.getCanvas()).width(), $(tool.getCanvas()).height());
                tool.getPen().setImageData(tool.getContext().getImageData(0,0,tool.getCanvas().width,tool.getCanvas().height));
            };

            /**
             * 지우기 이벤트
             * @param event
             */
            this.eraserEvent = function(event) {
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
                var figureType; //도형 모양
                var newX, newY, oldX, oldY;
                var figureSize;
                var fillStyle, lineWidth, strokeStyle;

                if(event != null) { //일반 도형 그리기
                    figureType = tool.getPen().getFigure();
                    tool.getPen().setNewPoint(event);
                    newX = tool.getPen().getNewPoint().x, newY = tool.getPen().getNewPoint().y;
                    oldX = tool.getPen().getOldPoint().x, oldY = tool.getPen().getOldPoint().y;
                    figureSize = newX - oldX < 0 ? (newX - oldX) * (-1) : (newX - oldX);
                    lineWidth = tool.getPen().getSize();
                    strokeStyle = tool.getPen().getColor();
                    fillStyle = '#ffffff';
                }else { //그 외 - 두번째 인자에 figureData 전달
                    figureType = arguments[1].figureType;
                    tool.getPen().setNewPoint(null, arguments[1].coordinate);
                    oldX = arguments[1].coordinate.x, oldY = arguments[1].coordinate.y;
                    figureSize = arguments[1].figureSize;
                    lineWidth = arguments[1].lineWidth;
                    strokeStyle = arguments[1].strokeStyle;
                    fillStyle = tool.getPen().getColor();
                }

                //tool.getContext().clearRect(0, 0, tool.getCanvas().width, tool.getCanvas().height);
                //tool.getContext().putImageData(tool.getPen().getImageData(), 0, 0);
                tool.getContext().beginPath();
                tool.getContext().setLineDash([]);
                tool.getContext().fillStyle = fillStyle; //채우기 색상
                tool.getContext().lineWidth = lineWidth; //라인 굵기
                tool.getContext().strokeStyle = strokeStyle; //라인 색상

                if(figureType == 'circle') {
                    tool.getContext().arc(oldX, oldY, figureSize, 0, 2*Math.PI); //원 중심 좌표, 반지름 크기
                    tool.getContext().fill();
                }else if(figureType == 'triangle') {
                    tool.getContext().moveTo(oldX, oldY - figureSize);
                    tool.getContext().lineTo(oldX - figureSize, oldY + figureSize);
                    tool.getContext().lineTo(oldX + figureSize, oldY + figureSize);
                    tool.getContext().fill();
                }else if(figureType == 'square') {
                    tool.getContext().strokeRect(oldX - figureSize/2, oldY - figureSize/2, figureSize, figureSize);
                    tool.getContext().fillRect(oldX - figureSize/2, oldY - figureSize/2, figureSize, figureSize);
                }

                tool.getContext().closePath();
                tool.getContext().stroke();

                //도형 개체
                var figureData = {
                    figureType : figureType,    //도형 타입
                    coordinate : {x: oldX, y: oldY},    //도형 좌표
                    figureSize: figureSize, //도형 크기
                    strokeStyle : tool.getContext().strokeStyle,    //라인 색상
                    lineWidth : tool.getContext().lineWidth,    //라인 굵기
                    fillStyle : tool.getContext().fillStyle == undefined ? null : tool.getContext().fillStyle,   //채우기 색상
                    imageData: tool.getPen().getImageData()
                };
                //개체 일시 저장
                tool.getPen().setEtc(figureData);

                return figureData;
            };

            /**
             * 채우기 이벤트 - (도형)
             * @param event
             */
            this.paintEvent = function(event) {
                //개체 선택
                self.selectObjEvent(event);
                var selectObj = tool.getPen().getEtc().selectObj, index = tool.getPen().getEtc().index;

                //개체선택 해제
                self.prevCanvasReturn();

                if(selectObj != undefined) {
                    var figureData = self.drawFigureEvent(null, selectObj);
                    tool.getData()[index] = figureData;
                    tool.getPen().setImageData(tool.getContext().getImageData(0,0,tool.getCanvas().width,tool.getCanvas().height));
                }
            };

            /**
             * 개체 선택 - (도형)
             * @param event
             */
            this.selectObjEvent = function(event) {
                tool.getPen().setNewPoint(event);
                var x = tool.getPen().getNewPoint().x, y = tool.getPen().getNewPoint().y;
                var leftTopX, leftTopY, leftBottomX, leftBottomY, rightTopX, rightTopY, rightBottomX, rightBottomY;
                var figureX, figureY;
                var inObj = false;

                var dataArr = tool.getData().slice();
                //거꾸로 순회해서 if 문에서 먼저 인식된 도형 찾으면 종료
                $(dataArr.reverse()).each(function(index, data) {
                    figureX = data.coordinate.x, figureY = data.coordinate.y;

                    var figureSize = data.figureType == 'square'? data.figureSize/2 + (data.lineWidth/2 + 1) : data.figureSize + (data.lineWidth/2 + 1);

                    leftTopX = figureX - figureSize, leftTopY = figureY - figureSize,
                    leftBottomX = figureX - figureSize, leftBottomY = figureY + figureSize,
                    rightTopX = figureX + figureSize, rightTopY = figureY - figureSize,
                    rightBottomX = figureX + figureSize, rightBottomY = figureY + figureSize;

                    //사각 프레임 영역으로 도형 인식
                    if(leftTopX <= x && x <= rightTopX
                        && leftTopY <= y && y <= leftBottomY) {
                        inObj = true;
                        tool.getContext().clearRect(0, 0, tool.getCanvas().width, tool.getCanvas().height);
                        tool.getContext().putImageData(tool.getPen().getImageData(), 0, 0);

                        tool.getContext().beginPath();
                        tool.getContext().setLineDash([4, 3]); //dash 수정필요
                        tool.getContext().moveTo(leftTopX, leftTopY);
                        tool.getContext().lineTo(leftBottomX, leftBottomY);
                        tool.getContext().lineTo(rightBottomX, rightBottomY);
                        tool.getContext().lineTo(rightTopX, rightTopY);
                        tool.getContext().closePath();
                        tool.getContext().lineWidth = '1'; //라인 굵기
                        tool.getContext().strokeStyle = '#333333'; //라인 색상
                        tool.getContext().stroke();

                        //개체 일시 저장
                        tool.getPen().setEtc({
                            selectObj : data,
                            index : dataArr.length - 1 - index
                        });

                        return false;
                    }
                });

                if(!inObj) {
                    //개체선택 해제
                    self.prevCanvasReturn();
                }
            };

            /**
             * 이벤트 적용전 상태의 캔바스 이미지로 돌아가기
             */
            this.prevCanvasReturn = function() {
                if(tool.getPen().getImageData() != undefined) {
                    tool.getContext().clearRect(0, 0, tool.getCanvas().width, tool.getCanvas().height);
                    tool.getContext().putImageData(tool.getPen().getImageData(), 0, 0);
                }
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
                                tool.getPen().setImageData(tool.getContext().getImageData(0,0,tool.getCanvas().width,tool.getCanvas().height));
                                break;
                            case 'paint' :
                                self.paintEvent(event);
                                break;
                            case 'selectObj' :
                                self.selectObjEvent(event);
                                break;
                        }
                    }
                } else if (event.type == 'mouseup') {
                    console.log("클릭 해제");
                    tool.setMouseDown(false);
                    if(tool.getCurrent() == 'figure') {
                        //도형 개체 저장
                        tool.getData().push(tool.getPen().getEtc());
                    }
                    if(tool.getCurrent() != 'selectObj' && tool.getCurrent() != 'paint') {
                        tool.getPen().setImageData(tool.getContext().getImageData(0,0,tool.getCanvas().width,tool.getCanvas().height));
                    }
                    console.log(tool.getData());
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

        return drawingAction;
});