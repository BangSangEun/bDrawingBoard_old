<%--
  Created by IntelliJ IDEA.
  User: user
  Date: 2016-09-10
  Time: 오후 11:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script>
    function fn_goLogout() {
        location.href = "/goLogout.do";
    }
</script>

<div class="navi-top">
    <ul class="navi-top-left"></ul>
    <ul class="navi-top-right">
        <c:if test="${memberVO != null}">
            <li>${memberVO.member_name}님 안녕하세요.</li>
            <li><a href="javascript:fn_goLogout();"><span class="li-menu">로그아웃</span></a></li>
        </c:if>
    </ul>
</div>
<div class="logo">
    <a href="/main.do">Drawing Board</a>
</div>
<div class="navi-menu">
    <ul class="navi-menu-left">
        <li id="menu-saveLocal">
            <i class="tool-ico savelocal-ico"></i> 다운로드
        </li>
        <li id="menu-saveFile">
            <i class="tool-ico savefile-ico"></i> 저장
        </li>
        <li id="menu-drawClear">
            <i class="tool-ico drawclear-ico"></i> 새로그리기
        </li>
    </ul>
    <ul class="navi-menu-right">
        <li id="menu-myFileList">
            <i class="tool-ico myfolder-ico"></i> 내 파일목록
        </li>
    </ul>
</div>

<%-- 내 파일 목록 뷰 --%>
<div class="file-list" id="myfile-list" style="display: none;">
    <div class="div-exit">
        <span>내 파일 목록</span>
        <i class="tool-ico exit-ico"></i>
    </div>
    <table>
        <colgroup>
            <col width="65%"/>
            <col width="35%"/>
        </colgroup>
        <tbody>
        </tbody>
    </table>
</div>

<%-- 내 폴더 목록 뷰 --%>
<div class="file-list" id="file-saveView" style="display:none;">
    <div class="div-exit">
        <span>내 파일 저장</span>
        <i class="tool-ico exit-ico"></i>
    </div>
    <div class="filesave-top">
        <table>
            <tbody>
            </tbody>
        </table>
    </div>
    <div class="filesave-bottom">
        <p>
            파일명 : <input type="text" id="filesave-nicname" placeholder="파일명을 입력하세요."/>
            <button class="save-btn">저장</button>
        </p>
    </div>
</div>