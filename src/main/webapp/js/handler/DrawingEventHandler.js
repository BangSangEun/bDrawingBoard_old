/**
 * 그림판 관련 이벤트 핸들러
 */


define(['jquery', '../action/DrawingAction'],
    function($, DrawingAction) {
        var DrawingEventHandler = function(initObj, event) {
            var drawingAction = new DrawingAction(initObj);

            if(event.target.id == 'drawing-canvas') {
                //캔바스 그리기 이벤트
                drawingAction.canvasEvent(event);
            }else {
                if(event.type == 'mousedown') {
                    if(event.target.id.indexOf('tool') > -1) {
                        //툴 선택
                        drawingAction.toolSelect(event);
                    }else if(event.target.id.indexOf('penSize') > -1) {
                        //펜 사이즈 선택
                        drawingAction.penSizeSelect(event);
                    }else if(event.target.id.indexOf('brush') > -1) {
                        //브러쉬 선택
                        drawingAction.brushSelect(event);
                    }else if($(event.target.parentNode.parentNode).attr('class').indexOf('color-pallet') > -1) {
                        //색상 선택
                        drawingAction.colorSelect(event);
                    }else if(event.target.id.indexOf('drawClear') > -1) {
                        drawingAction.cleaerCanvas();
                    }
                }
            }

        };

        return DrawingEventHandler;
});
