/**
 * requirejs 설정
 */


require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-3.1.1.min',
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


require(['jquery', 'Initializer', 'LoginHandler'],
    function($, Initializer, LoginHandler) {
        $(document).ready(function() {
            if(location.pathname == '/') {
                if(localStorage.saveid != undefined) {
                    $('#saveId').attr('checked', true);
                    $('input[name=member_id]').val(localStorage.saveid);
                }

                var loginHandler = new LoginHandler();
                loginHandler.setInit();
            }else {
                //초기화
                var initializer = new Initializer();
                initializer.setInit();
                initializer.eventBinder();
            }



            var a = [];
            var b = [1, 2, 3, 4, 5];
            var c = [1.2, true, 'hancom'];
            var d = [a, b, c];
            var e = [{x: 1, y: 2}, {x: 2.4, y: 5.4}];
            var f = [1, 2,  , 3];
            var f2 = [1, 2,  , 3, ];

            var g = new Array();
            var h = new Array(10);
            var i = new Array(1, 2, 3, 'bang');

            //var temp = ["han", "com"];


        });
});


