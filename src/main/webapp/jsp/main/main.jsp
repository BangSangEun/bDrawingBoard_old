<!-- jsp forword 나 include 사용시 아래 지시문으로 encoding 값을 UTF-8로 지정해주어야 함(설정 속성이 먹히지 않음) -->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">

    <link rel="stylesheet" type="text/css" href="/css/common.css"/>
    <script data-main="js/main.js" src="js/lib/require.js"></script>

    <script type="text/javascript"></script>

    <title>Drawing Board</title>
</head>
<body>
<header id="top-panel">
    <jsp:include page="/top.do"/>
</header>
<secssion id="content-panel">
    <!-- 그림 도구 -->
    <div class="drawing-tool">
        <ul>
            <li id="tool-pencil">
                <i class="tool-ico pencil-ico"></i> 연필
            </li>
            <li id="tool-brush">
                <i class="tool-ico brush-ico"></i> 브러시
            </li>
            <li id="tool-figure">
                <i class="tool-ico figure-ico"></i> 도형
            </li>
            <li id="tool-paint">
                <i class="tool-ico paint-ico"></i> 채우기
            </li>
            <li id="tool-eraser">
                <i class="tool-ico eraser-ico"></i> 지우개
            </li>
            <li id="tool-text">
                <i class="tool-ico text-ico"></i> 텍스트
            </li>
            <li id="tool-selectarea">
                <i class="tool-ico selectarea-ico"></i> 영역선택
            </li>
        </ul>
    </div>
    <div class="drawing-board">
        <canvas id="drawing-canvas" download="drawing-img"></canvas>
    </div>
</secssion>
<footer id="footer-panel">
    <jsp:include page="/footer.do"/>
</footer>
</body>
</html>