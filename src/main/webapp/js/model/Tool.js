/**
 * 툴 도구 객체
 */
define([],
    function() {
        var Tool = function() {
            this.current = null;

            this.init = function(current, pen) {
                this.current = current;
                this.pen = pen;
            }

            this.getCurrent = function() {
                return this.current;
            }

            this.setCurrent = function(current) {
                this.current = current;
            }

            this.pen = function() {
                var size,
                    color,
                    brush,
                    oldPoint,
                    newPoint;

                this.init = function(size, color, brush, oldPoint, newPoint) {
                    this.size = size;
                    this.color = color;
                    this.brush = brush;
                    this.oldPoint = oldPoint;
                    this.newPoint = newPoint;
                }

                this.getSize = function() {
                    return this.size;
                }

                this.setSize = function(size) {
                    this.size = size;
                }

                this.getColor = function() {
                    return this.color;
                }

                this.setColor = function(color) {
                    this.color = color;
                }

                this.getBrush = function() {
                    return this.brush;
                }

                this.setBrush = function(brush) {
                    this.brush = brush;
                }

                this.getOldPoint = function() {
                    return this.oldPoint;
                }

                this.setOldPoint = function(event) {
                    this.oldPoint.x = event.offsetX - event.target.position().left;
                    this.oldPoint.y = event.offsetY - event.target.position().top;
                }

                this.getNewPoint = function() {
                    return this.point;
                }

                this.setNewPoint = function(event) {
                    this.newPoint.x = event.offsetX - event.target.position().left;
                    this.newPoint.y = event.offsetY - event.target.position().top;
                }
            }
        };

        return Tool;
});