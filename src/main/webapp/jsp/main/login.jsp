<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">

    <link rel="stylesheet" type="text/css" href="/css/common.css"/>
    <script data-main="js/main.js" src="js/lib/require.js"></script>

    <title>Welcome Page</title>
</head>
<body style="background-color: #DCDCDC">
<section id="content-panel">
    <div id="index-center-box">
        <p>Welcome</p>
        <p>Drawing Board!</p>

        <div id="login-box">
            <form id="loginForm" action="${pageContext.request.contextPath}/goLogin.do" method="POST">
                <table>
                    <colgroup>
                        <col width="35%"/>
                        <col width="65%"/>
                    </colgroup>
                    <tbody>
                    <tr>
                        <th class="id">ID</th>
                        <td><input type="text" name="member_id"/></td>
                    </tr>
                    <tr>
                        <th>Password</th>
                        <td><input type="password" name="member_pw"/></td>
                    </tr>
                    </tbody>
                </table>
            </form>
            <div id="login-box-btn">
                <button class="login-btn btn-login">로그인</button>
                <button class="login-btn btn-join">회원가입</button>
                <p><label><input type="checkbox" id="saveId" name="saveId"/>아이디 저장</label></p>
            </div>
        </div>
    </div>
</section>
</body>
</html>
