/**
 * requirejs 설정
 */


require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-3.1.1.min',
        bootstrap: 'lib/bootstrap',
        Initializer: 'Initializer',
        LoginHandler: 'handler/LoginHandler',
        FileEventHandler: 'handler/FileEventHandler',
        DrawingEventHandler: 'handler/DrawingEventHandler',
        FileAction: 'action/FileAction',
        DrawingAction: 'action/DrawingAction',
        Member: 'model/Member',
        Tool: 'model/Tool'
    }
});


require(['jquery', 'Initializer', 'LoginHandler', 'bootstrap'],
    function($, Initializer, LoginHandler) {
        $(document).ready(function() {
            var loginHandler = new LoginHandler();
            loginHandler.setHandler();

            if(location.pathname == '/') {
                if(localStorage.saveid != undefined) {
                    $('#saveId').attr('checked', true);
                    $('input[name=member_id]').val(localStorage.saveid);
                }
            }else {
                //초기화
                var initializer = new Initializer();
                initializer.init();
                initializer.eventBinder();

                //로그인 정보 - $.ajax 에서 json 으로 받는 형식과 같음
                $.getJSON('/login/getMemberInfo.do', function (result) {
                    $('#top-memberInfo').text(decodeURIComponent(result['memberName']));
                });
            }
        });
});


