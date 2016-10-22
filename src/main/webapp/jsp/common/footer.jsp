<%--
  Created by IntelliJ IDEA.
  User: user
  Date: 2016-09-10
  Time: 오후 11:00
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="navi-footer">
    <div class="pallet-left">
        <div class="pallet-left additional-tool">
            <div id="add-brush-tool" style="display:none;">
                <ul>
                    <li id="brush-round">원</li>
                    <li id="brush-square">네모</li>
                    <li id="brush-butt">마커</li>
                </ul>
            </div>
        </div>
        <div class="pallet-right">
            <div class="penSize-pallet" id="default-penSize">
                <ul>
                    <li id="penSize-1">1</li>
                    <li id="penSize-2">2</li>
                    <li id="penSize-3">3</li>
                    <li id="penSize-4">4</li>
                </ul>
            </div>
            <div class="penSize-pallet" id="brush-penSize" style="display:none;">
                <ul>
                    <li id="penSize-3">3</li>
                    <li id="penSize-5">5</li>
                    <li id="penSize-10">10</li>
                    <li id="penSize-20">20</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="pallet-right">
        <div class="color-pallet">
        </div>
    </div>

    <div class="footer-bottom">
        @Copyright Bang Sang-eun all right reserved.
    </div>
</div>