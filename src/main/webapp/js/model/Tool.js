/**
 * 툴 도구 객체
 */
define([],
    function() {
        var Tool = function() {
            /**
             * 캔바스 관련 변수
             */
            var self = this,
                _mouseDown = false,
                _current = null,
                _pen = new Pen(),
                _data = [];

            this.getCanvas = function() {
                return document.getElementById("drawing-canvas");
            };

            this.getContext = function() {
                return self.getCanvas().getContext("2d");
            };

            this.getMouseDown = function() {
                return _mouseDown;
            };

            this.setMouseDown = function(mouseDown) {
                _mouseDown = mouseDown;
            };

            this.getCurrent = function() {
                return _current;
            };

            this.setCurrent = function(current) {
                _current = current;
            };

            this.getColorArr = function() {
                var colorArr = [ //색상표
                    '#000000',
                    '#CCCCCC',
                    '#FFFFFF',
                    '#ff0000',
                    '#FF7F00',
                    '#FFFF00',
                    '#009900',
                    '#082567',
                    '#8000FF',
                    '#FF7493',
                    '#abeda6',
                    '#b4dec1',
                    '#CD426B'
                ];
                return colorArr;
            };

            this.getPen = function() {
                return _pen;
            };

            this.setPen = function(pen) {
                _pen = pen;
            };

            this.getData = function () {
                return _data;
            };

            this.setData = function(data) {
                _data = data;
            };
        };

        var Pen = function() {
            var _size,
                _color,
                _brush,
                _figure,
                _oldPoint = {x: null, y: null},
                _newPoint = {x: null, y: null},
                _imageData,
                _etc;

            this.getSize = function() {
                return _size;
            };

            this.setSize = function(size) {
                _size = size;
            };

            this.getColor = function() {
                return _color;
            };

            this.setColor = function(color) {
                _color = color;
            };

            this.getBrush = function() {
                return _brush;
            };

            this.setBrush = function(brush) {
                _brush = brush;
            };

            this.getFigure = function() {
                return _figure;
            };

            this.setFigure = function(figure) {
                _figure = figure;
            };

            this.getOldPoint = function() {
                return _oldPoint;
            };

            this.setOldPoint = function(event) {
                if(event == null) {
                    _oldPoint.x = arguments[1].x;
                    _oldPoint.y = arguments[1].y;
                }else {
                    _oldPoint.x = event.offsetX - $(event.target).position().left;
                    _oldPoint.y = event.offsetY - $(event.target).position().top;
                }
            };

            this.getNewPoint = function() {
                return _newPoint;
            };

            this.setNewPoint = function(event) {
                if(event == null) {
                    _newPoint.x = arguments[1].x;
                    _newPoint.y = arguments[1].y;
                }else {
                    _newPoint.x = event.offsetX - $(event.target).position().left;
                    _newPoint.y = event.offsetY - $(event.target).position().top;
                }
            };

            this.getImageData = function() {
                return _imageData;
            };

            this.setImageData = function (imageData) {
                _imageData = imageData;
            };

            this.getEtc = function() {
                return _etc;
            };

            this.setEtc = function(etc) {
                _etc = etc;
            };
        };

        return Tool;
});