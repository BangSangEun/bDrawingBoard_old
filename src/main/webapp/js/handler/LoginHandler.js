/**
 * 로그인 관련 핸들러
 */

define(['jquery'],
    function($) {
        var LoginHandler = function() {

            /**
             * 초기화 이벤트 바인딩
             */
            this.setInit = function () {
                $('.login-btn').bind('click', function (event) {
                    if (event.target.className.indexOf('btn-login') > -1) {
                        goLogin();
                    } else {
                        goJoin();
                    }
                });
            };

            /**
             * 로그인
             */
            var goLogin = function () {
                var vali_obj = ['member_id', 'member_pw'];
                for (var i = 0; i < vali_obj.length; i++) {
                    var obj = $("input[name=" + vali_obj[i] + "]");
                    if (obj.val() == undefined || obj.val() == null || obj.val() == "") {
                        alert("'" + $(obj).parent().prev('th').text() + "'를 입력하세요.");
                        return;
                    }
                }

                $.ajax({
                    type: 'POST',
                    url: '/login/memberInfoCheck.do',
                    data: $('#loginForm').serialize(),
                    dataType: 'text',
                    success: function (result) {
                        if (result == 'success') {
                            $('#loginForm').submit();
                            if($('#saveId').is(":checked")) {
                                localStorage.saveid = $("input[name=member_id]").val();
                            }
                        } else {
                            alert("ID와 Password를 다시 확인해 주세요.");
                        }
                    },
                    error: function () {
                        alert("로그인 오류 입니다.\n해당 오류가 지속되면 관리자에게 문의하세요.");
                    }
                });
            };

            /**
             * 회원가입 페이지 이동
             */
            var goJoin = function () {
                //회원가입 페이지 이동
            };
        };

        return LoginHandler;
});
