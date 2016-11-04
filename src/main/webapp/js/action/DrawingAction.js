/**
 *  그림판 관련 Action
 */

define(['jquery', 'GradientAction'],
    function($, GradientAction) {
        var drawingAction = function() {
            var self = this;

            this.tool;
            this.isMouseDown;
            this.paintOption;
            this.gradientAction;
            this.tempData; //임시 데이터

            /**
             * 초기화
             * @param tool
             */
            this.init = function(tool) {
                self.gradientAction = new GradientAction();
                self.tool = tool;
                self.paintOption = $('#paint-option').find('.selectpicker option:eq(0)').attr('data-tokens');
            };

            /**
             * 툴 선택
             * @param event
             */
            this.toolSelect = function(event) {
                self.tool.setCurrent(event.target.id.split('tool-')[1]);
                $("button[id^=tool-]").removeClass("active");
                $("#" + event.target.id).addClass("active");

                $('#default-penSize').hide();
                $('#brush-penSize').hide();
                $('#eraser-penSize').hide();
                $('#figure-penSize').hide();
                $('#brush-shape').hide();
                $('#figure-shape').hide();
                $('#paint-option').hide();
                $('#gradient-option').hide();
                $('#gradient-option-view').hide();

                self.prevCanvasReturn();
                self.tool.getContext().setLineDash([]);

                switch(self.tool.getCurrent()) {
                    case 'pencil' :
                        self.tool.getPen().setBrush('round');
                        self.tool.getPen().setSize($('#default-penSize').find('select').val());
                        $('#default-penSize').show();
                        break;
                    case 'brush' :
                        self.tool.getPen().setBrush($('#brush-shape').find('select').val());
                        self.tool.getPen().setSize($('#brush-penSize').find('select').val());
                        $('#brush-shape').show();
                        $('#brush-penSize').show();
                        break;
                    case 'eraser' :
                        self.tool.getPen().setBrush('square');
                        self.tool.getPen().setSize($('#eraser-penSize').find('select').val());
                        $('#eraser-penSize').show();
                        break;
                    case 'figure' :
                        self.tool.getPen().setSize($('#figure-penSize').find('select').val());
                        $('#figure-shape').show();
                        $('#figure-penSize').show();
                        break;
                    case 'paint' :
                        $('#paint-option').show();
                        if(self.paintOption == 'gradient') {
                            $('#gradient-option').show();
                        }
                        break;
                }
            };

            /**
             * 펜 사이즈 선택
             * @param event
             */
            this.penSizeSelect = function(event) {
                self.tool.getPen().setSize($(event.target).val());
            };

            /**
             * 색상 선택
             * @param event
             */
            this.colorSelect = function(event) {
                $(event.target).addClass('on');
                self.tool.getPen().setColor($(event.target).css('background-color'));
            };

            /**
             * 브러쉬 모양 선택
             * @param event
             */
            this.brushSelect = function(event) {
                self.tool.getPen().setBrush($(event.target).val());
            };

            /**
             * 도형 모양 선택
             * @param event
             */
            this.figureSelect = function(event) {
                self.tool.getPen().setFigure($(event.target).val());
            };

            /**
             * 새로그리기
             */
            this.cleaerCanvas = function () {
                self.tool.setData([]);
                self.tool.getContext().clearRect(0,0, $(self.tool.getCanvas()).width(), $(self.tool.getCanvas()).height());
                self.tool.getPen().setImageData(self.tool.getContext().getImageData(0,0,self.tool.getCanvas().width,self.tool.getCanvas().height));
            };

            /**
             * 지우기 이벤트
             * @param event
             */
            this.eraserEvent = function(event) {
                self.tool.getPen().setNewPoint(event);
                self.tool.getContext().clearRect(self.tool.getPen().getNewPoint().x, self.tool.getPen().getNewPoint().y, self.tool.getPen().getSize(), self.tool.getPen().getSize());
            };

            /**
             * 선 그리기 이벤트
             * @param event
             */
            this.drawLineEvent = function(event) {
                self.tool.getPen().setNewPoint(event);

                self.tool.getContext().lineWidth = self.tool.getPen().getSize(); //라인 굵기
                self.tool.getContext().strokeStyle = self.tool.getPen().getColor(); //라인 색상
                self.tool.getContext().lineCap = self.tool.getPen().getBrush(); //끝 부분 모양 (round, butt, square 가 있음)

                self.tool.getContext().beginPath();
                self.tool.getContext().moveTo(self.tool.getPen().getOldPoint().x, self.tool.getPen().getOldPoint().y);
                self.tool.getContext().lineTo(self.tool.getPen().getNewPoint().x, self.tool.getPen().getNewPoint().y);
                self.tool.getContext().stroke();

                self.tool.getPen().setOldPoint(null, self.tool.getPen().getNewPoint());
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
                    figureType = self.tool.getPen().getFigure();
                    self.tool.getPen().setNewPoint(event);
                    newX = self.tool.getPen().getNewPoint().x, newY = self.tool.getPen().getNewPoint().y;
                    oldX = self.tool.getPen().getOldPoint().x, oldY = self.tool.getPen().getOldPoint().y;
                    figureSize = newX - oldX < 0 ? (newX - oldX) * (-1) : (newX - oldX);
                    lineWidth = self.tool.getPen().getSize();
                    strokeStyle = self.tool.getPen().getColor();
                    fillStyle = '#ffffff';
                }else { //그 외 - 두번째 인자에 figureData 전달
                    figureType = arguments[1].figureType;
                    self.tool.getPen().setNewPoint(null, arguments[1].coordinate);
                    oldX = arguments[1].coordinate.x, oldY = arguments[1].coordinate.y;
                    figureSize = arguments[1].figureSize;
                    lineWidth = arguments[1].lineWidth;
                    strokeStyle = arguments[1].strokeStyle;
                    fillStyle = self.paintOption == 'single' ? self.tool.getPen().getColor() : arguments[1].fillStyle;
                }

                self.tool.getContext().clearRect(0, 0, self.tool.getCanvas().width, self.tool.getCanvas().height);
                self.tool.getContext().putImageData(self.tool.getPen().getImageData(), 0, 0);
                self.tool.getContext().beginPath();
                self.tool.getContext().setLineDash([]);
                self.tool.getContext().fillStyle = fillStyle; //채우기 색상
                self.tool.getContext().lineWidth = lineWidth; //라인 굵기
                self.tool.getContext().strokeStyle = strokeStyle; //라인 색상

                if(figureType == 'circle') {
                    self.tool.getContext().arc(oldX, oldY, figureSize, 0, 2*Math.PI); //원 중심 좌표, 반지름 크기
                    self.tool.getContext().fill();
                }else if(figureType == 'triangle') {
                    self.tool.getContext().moveTo(oldX, oldY - figureSize);
                    self.tool.getContext().lineTo(oldX - figureSize, oldY + figureSize);
                    self.tool.getContext().lineTo(oldX + figureSize, oldY + figureSize);
                    self.tool.getContext().fill();
                }else if(figureType == 'square') {
                    self.tool.getContext().strokeRect(oldX - figureSize/2, oldY - figureSize/2, figureSize, figureSize);
                    self.tool.getContext().fillRect(oldX - figureSize/2, oldY - figureSize/2, figureSize, figureSize);
                }

                self.tool.getContext().closePath();
                self.tool.getContext().stroke();

                //도형 개체
                var figureData = {
                    figureType : figureType,    //도형 타입
                    coordinate : {x: oldX, y: oldY},    //도형 좌표
                    figureSize: figureSize, //도형 크기
                    strokeStyle : self.tool.getContext().strokeStyle,    //라인 색상
                    lineWidth : self.tool.getContext().lineWidth,    //라인 굵기
                    fillStyle : self.tool.getContext().fillStyle == undefined ? null : self.tool.getContext().fillStyle,   //채우기 색상
                    imageData: self.tool.getPen().getImageData()
                };
                //개체 임시 저장
                self.tempData = figureData;

                return figureData;
            };

            /**
             * 채우기 옵션 선택
             * @param event
             */
            this.paintOptionSelect = function(event) {
                var option = $('#paint-option').find('.dropdown-menu').find('li.selected > a').attr('data-tokens');
                self.paintOption = option;
                if(self.paintOption == 'single') {
                    $('#gradient-option').hide();
                }else if(self.paintOption == 'gradient') {
                    $('#gradient-option').show();
                    $('#gradient-option').find('button').on('click', function() {
                        $('#gradient-option-view').show();
                    });
                }
            };

            /**
             * 채우기 이벤트 - (도형)
             * @param event
             */
            this.paintEvent = function(event) {
                //개체 선택
                self.selectObjEvent(event);
                var obj = self.tempData;

                //개체선택 해제
                self.prevCanvasReturn();

                if(obj.selectObj != undefined) {
                    if(self.paintOption == 'gradient') {
                        var gradientData = self.gradientAction.getGradientData(obj.selectObj.coordinate, obj.selectObj.figureSize);
                        self.gradientAction.setGradientFillStyle(self.tool.getContext(), gradientData, obj.selectObj);
                        obj.selectObj.fillStyle = self.tool.getContext().fillStyle;
                    }

                    var figureData = self.drawFigureEvent(null, obj.selectObj);
                    self.tool.getData()[obj.index] = figureData;
                    self.tool.getPen().setImageData(self.tool.getContext().getImageData(0,0,self.tool.getCanvas().width,self.tool.getCanvas().height));
                }
            };

            /**
             * 개체 선택 - (도형)
             * @param event
             */
            this.selectObjEvent = function(event) {
                self.tool.getPen().setNewPoint(event);
                var x = self.tool.getPen().getNewPoint().x, y = self.tool.getPen().getNewPoint().y;
                var leftTopX, leftTopY, leftBottomX, leftBottomY, rightTopX, rightTopY, rightBottomX, rightBottomY;
                var figureX, figureY;
                var inObj = false;

                var dataArr = self.tool.getData().slice();
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
                        self.tool.getContext().clearRect(0, 0, self.tool.getCanvas().width, self.tool.getCanvas().height);
                        self.tool.getContext().putImageData(self.tool.getPen().getImageData(), 0, 0);

                        self.tool.getContext().beginPath();
                        self.tool.getContext().setLineDash([4, 3]); //dash 수정필요
                        self.tool.getContext().moveTo(leftTopX, leftTopY);
                        self.tool.getContext().lineTo(leftBottomX, leftBottomY);
                        self.tool.getContext().lineTo(rightBottomX, rightBottomY);
                        self.tool.getContext().lineTo(rightTopX, rightTopY);
                        self.tool.getContext().closePath();
                        self.tool.getContext().lineWidth = '1'; //라인 굵기
                        self.tool.getContext().strokeStyle = '#333333'; //라인 색상
                        self.tool.getContext().stroke();

                        //개체 임시 저장
                        self.tempData = {
                            selectObj : data,
                            index : dataArr.length - 1 - index
                        };

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
                if(self.tool.getPen().getImageData() != undefined) {
                    self.tool.getContext().clearRect(0, 0, self.tool.getCanvas().width, self.tool.getCanvas().height);
                    self.tool.getContext().putImageData(self.tool.getPen().getImageData(), 0, 0);
                }
            };

            /**
             * 캔바스 이벤트
             * @param event
             */
            this.canvasEvent = function(event) {
                if (event.type == 'mousedown') {
                    if (event.button == 0) { // 마우스 왼쪽 버튼
                        self.isMouseDown = true;
                        switch(self.tool.getCurrent()) {
                            case 'pencil' :
                            case 'brush' :
                            case 'eraser' :
                                self.tool.getPen().setOldPoint(event);
                                break;
                            case 'figure' :
                                self.tool.getPen().setOldPoint(event);
                                self.tool.getPen().setImageData(self.tool.getContext().getImageData(0,0,self.tool.getCanvas().width,self.tool.getCanvas().height));
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
                    self.isMouseDown = false;
                    if(self.tool.getCurrent() == 'figure') {
                        //도형 개체 저장
                        self.tool.getData().push(self.tempData);
                    }
                    if(self.tool.getCurrent() != 'selectObj' && self.tool.getCurrent() != 'paint') {
                        self.tool.getPen().setImageData(self.tool.getContext().getImageData(0,0,self.tool.getCanvas().width,self.tool.getCanvas().height));
                    }
                    console.log(self.tool.getData());
                } else if (event.type == 'mouseover') {
                    self.isMouseDown = false;
                } else if (event.type == 'mousemove') {
                    if(self.isMouseDown) {
                        switch(self.tool.getCurrent()) {
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