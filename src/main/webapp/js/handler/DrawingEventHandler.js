/**
 * 그림판 관련 이벤트 핸들러
 */


define(['jquery', '../action/DrawingAction'],
    function($, DrawingAction) {
        var DrawingEventHandler = function() {
            /**
             * Drawing 핸들러
             * @param tool
             * @param event
             */
            this.setHandler = function(tool, event) {
                var drawingAction = new DrawingAction(tool);

                if(event.target.id == 'drawing-canvas') {
                    //캔바스 그리기 이벤트
                    drawingAction.canvasEvent(event);
                }else {
                    if(event.type == 'mousedown') {
                        if(event.target.id.indexOf('tool') > -1) {
                            //툴 선택
                            drawingAction.toolSelect(event);
                        }else if(event.target.id.indexOf('brush') > -1) {
                            //브러쉬 선택
                            drawingAction.brushSelect(event);
                        }else if(event.target.id.indexOf('penSize') > -1) {
                            //펜 사이즈 선택
                            drawingAction.penSizeSelect(event);
                        }else if($(event.target.parentNode.parentNode).attr('class') == 'color-pallet') {
                            //색상 선택
                            drawingAction.colorSelect(event);
                        }else if(event.target.id.indexOf('drawClear') > -1) {
                            drawingAction.cleaerCanvas();
                        }
                    }
                }
            }
        };

        return DrawingEventHandler;
});


