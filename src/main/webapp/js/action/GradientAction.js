/**
 * 그라데이션 기능 Action
 */

define(['jquery', 'Util'],
    function($, Util) {
        var GradientAction = function() {
            var self = this;
            var isMouseDown;
            var breakpoint;

            /**
             * 초기화
             */
            this.init = function() {
                var util = new Util();
                util.createColorPicker($('.gradient-color-pallet').find('.popover-content'));
                self.initBreakPoint();
            };

            /**
             * 중지점 개체 초기화
             * @param objData
             */
            this.initBreakPoint = function() {
                var position = [0, 100];
                var pointColor = [];
                $('.breakpoint').each(function(index) {
                    self.moveBreakPointEvent(null, this, position[index]);  //위치 초기화
                    self.selectColor(this, $('.gradient-color-pallet').find('.popover-content').find('li:eq('+index+')'));  //색 초기화
                    pointColor[index] = $('.gradient-color-pallet').find('.popover-content').find('li:eq('+index+')').css('background-color');
                });
                breakpoint = $('.breakpoint')[0];
                self.selectBreakPointEvent(breakpoint);

                //중지점 bar 초기화
                var canvas = document.getElementById("gradient-breakpoint-bar");
                var context = canvas.getContext("2d");
                var gradientData = {
                    point: [
                        {x: 0, y: 0, color: pointColor[0], position: 0},
                        {x: 100, y: 20, color: pointColor[pointColor.length - 1], position: 1}
                    ]
                };

                console.log(gradientData);

                self.setGradientFillStyle(context, gradientData, true);
                context.fillRect(20,20,150,100);
            };


            /**
             * 그라데이션 옵션 뷰 이벤트
             * @param event
             */
            this.setHandler = function (event) {
                if(event.type == 'mousedown') {
                    if(event.button == 0) { // 마우스 왼쪽 버튼
                        if ($(event.target).parent('button.close').length > 0) {
                            if($(event.target).parents('.gradient-color-pallet').length > 0) {
                                //색상표 팝업 닫기
                                $('.gradient-color-pallet').hide();
                                $('#gradient-color').removeClass('active');
                            }else {
                                //그라데이션 팝업 닫기
                                $('#gradient-option-view').hide();
                            }
                        }else if($(event.target).parent('.breakpoint').length > 0) {
                            //중지점 선택 이벤트
                            isMouseDown = true;
                            self.selectBreakPointEvent($(event.target).parent('.breakpoint'));
                        }else if(event.target.id == 'gradient-color'
                            || $(event.target).parent('#gradient-color').length > 0) {
                            //색 선택창
                            if ($('#gradient-color').hasClass('active')) {
                                $('#gradient-color').removeClass('active');
                                $('.gradient-color-pallet').hide();
                            } else {
                                $('#gradient-color').addClass('active');
                                $('.gradient-color-pallet').show();
                            }
                        }else if($(event.target).parents('.gradient-color-pallet').length > 0
                            && $(event.target).parent('ul').length > 0) {
                            //색 선택 이벤트
                            self.selectColor(breakpoint, $(event.target));
                        }
                    }
                }else if(event.type == 'mouseup') {
                    isMouseDown = false;
                }else if(event.type == 'mousemove') {
                    if(isMouseDown) {
                        if(event.target.className == 'breakpoint-area') {
                            //중지점 이동 이벤트
                            self.moveBreakPointEvent(event, breakpoint);
                        }
                    }
                }else if(event.type == 'change') {
                    if(event.target.id == 'gradient-degree') {
                        //각도 값 변경 후 처리
                        console.log(self.getDegree());
                    }else if ($(event.target).parents('#gradient-type').length > 0) {
                        //종류 변경시 이벤트 - ('선형' 선택 시에만 각도 변경 가능)
                        var type = self.getType();
                        $('#gradient-direction').find('div[id$=direction]').hide();
                        if(type == 'line') {
                            //$('#gradient-degree').removeAttr('disabled');
                            $('#line-direction').show();
                        }else if(type == 'radial') {
                            //$('#gradient-degree').attr('disabled', 'disabled');
                            $('#radial-direction').show();
                        }
                    }else if($(event.target).parents('#gradient-direction').length > 0) {
                        //방향 변경시 이벤트
                        console.log("방향 변경 : " + self.getDirection());
                    }
                }/*else if(event.type == 'keydown') {
                    if(event.target.id == 'gradient-degree') {
                        console.log(event.keyCode);
                        console.log(48 <= event.keyCode && event.keyCode <= 57);
                        if(48 <= event.keyCode && event.keyCode <= 57) {
                            //각도 값 변경시 체크
                            self.validationDegreeEvent(event);
                        }else {
                            return false;
                        }
                    }
                }*/
            };

            /**
             * 그라데이션 스타일 세팅
             * @param context
             * @param gradientData
             * @param isBreakPointBar : 그라데이션 옵션 뷰의 중지점 바 여부
             */
            this.setGradientFillStyle = function(context, gradientData, isBreakPointBar) {
                var point = gradientData.point;
                var startBreakPoint = point[0], endBreakPoint = point[point.length - 1];
                var gradient;

                if(isBreakPointBar || self.getType() == 'line') { //선형
                    gradient = context.createLinearGradient(startBreakPoint.x, startBreakPoint.y, endBreakPoint.x, endBreakPoint.y);
                    $(point).each(function() {
                        gradient.addColorStop(this.position * 0.01, this.color); //addColorStop의 첫번째 값은 중지점 백분율 값
                    });
                }else if(self.getType() == 'radial') { //방사형

                }
                context.fillStyle = gradient;
            };

            /**
             * 각도 값 반환
             * @returns {*|jQuery}
             */
            this.getDegree = function() {
                return $('#gradient-degree').val();
            };
            
            /**
             * 그라데이션 종류 값 반환
             * @returns {*|jQuery}
             */
            this.getType = function() {
                return $('#gradient-type').find('.dropdown-menu').find('li.selected > a').attr('data-tokens');
            };

            /**
             * 그라데이션 방향 값 반환
             * @returns {*|jQuery}
             */
            this.getDirection = function() {
                return $('#' + self.getType() + '-direction').find('.dropdown-menu').find('li.selected > a').attr('data-tokens');
            };

            /**
             * 그라데이션 방향에 따른 point 객체 반환
             * @param type : 그라데이션 종류
             * @param directStr : 그라데이션 방향
             * @param objPoint : 적용 객체 point (중심점)
             * @param objSize : 적용 객체 size
             */
            this.getDirectionPoint = function(type, directStr, objPoint, objSize) {
                var direction, point, tempArr = [];

                if(type == 'line') {
                    direction = directStr.split('-');
                    $(direction).each(function(index, item) {
                        tempArr[index] = self.getPoint(this, objPoint, objSize);
                    });
                }else if(type == 'radial') {
                    tempArr[0] = self.getPoint(directStr, objPoint, objSize);
                }
                point = tempArr;

                return point;
            };

            /**
             * 방향 값에 따른 포인트 반환
             * @param directStr
             * @param objPoint
             * @param objSize
             * @returns {*}
             */
            this.getPoint = function(directStr, objPoint, objSize) { //일단 원 기준 - 수정필요
                var tempPoint = {x,y};
                var pointArr = directStr.split('_');
                var point = objPoint;
                var x = point.x, y = point.y;

                if(pointArr[0] == 'left') {
                    tempPoint.x = x - objSize;
                }else if(pointArr[0] == 'right') {
                    tempPoint.x = x + objSize;
                }

                if(pointArr[1] == 'up') {
                    tempPoint.y = y - objSize;
                }else if(pointArr[1] == 'down') {
                    tempPoint.y = y + objSize;
                }

                return tempPoint;
            };

            /**
             * 그라데이션 데이터 정보 반환
             * @param objPoint
             * @param objSize
             * @returns {{point: Array, degree: (*|jQuery)}|*}
             */
            this.getGradientData = function(objPoint, objSize) {
                var gradientData, point = [];
                var breakPoint = $('.breakpoint'); //모든 breakpoint 개체

                var pointArr = self.getDirectionPoint(self.getType(), self.getDirection(), objPoint, objSize);

                $(pointArr).each(function(index, item) {
                    point[index] = {x: this.x, y: this.y, color: $(breakPoint[index]).attr('gradient-color'), position: $(breakPoint[index]).attr('gradient-position')};
                });

                gradientData = {
                    point: point,
                    degree: self.getDegree()
                };

                return gradientData;
            };

            /**
             * 각도 값 체크 이벤트
             * @param event
             */
            this.validationDegreeEvent = function(event) {
                var degree = $(event.target).val();
                if(degree > 359.9 || degree < 0) {
                    alert("각도 값은 0~359.9까지의 값 입니다.");
                    if(degree > 359.9) {
                        $(event.target).val(359.9);
                    }else {
                        $(event.target).val(0);
                    }
                }
            };

            /**
             * 중지점 선택 이벤트
             * @param breakpointObj : 중지점 개체
             */
            this.selectBreakPointEvent = function(breakpointObj) {
                breakpoint = breakpointObj;
                $('#gradient-position').val($(breakpoint).attr('gradient-position')); //위치 값
                $('#gradient-color').find('p').css('background-color', $(breakpoint).attr('gradient-color')); //색 값

                $('.breakpoint').find('i').removeClass('on');
                $('.breakpoint').find('i').addClass('off');

                //해당 breakpoint 개체 선택
                $(breakpoint).find('i').removeClass('off');
                $(breakpoint).find('i').addClass('on');
            };

            /**
             * 중지점 이동 이벤트
             * @param event
             */
            this.moveBreakPointEvent = function(event, breakpoint, position) {
                var position;

                if(event != null) {
                    var moveX = event.offsetX;

                    if(moveX <= 0) {
                        position = 0;
                    }else if(100 <= moveX) {
                        position = 100;
                    }else if(0 <= moveX && moveX <= 100) {
                        position = moveX;
                    }
                }else {
                    position = position;
                }

                $(breakpoint).css('left', position);
                $(breakpoint).attr('gradient-position', position); //위치
                $('#gradient-position').val(position);
            };

            /**
             * 색 선택 이벤트
             * @param obj : li
             */
            this.selectColor = function(breakpoint, obj) {
                var color = $(obj).css('background-color');
                $(breakpoint).attr('gradient-color', color);
                $('#gradient-color').find('p').css('background-color', color);
            };

        };

        return GradientAction;
    });
