/**
 * 파일 관련 이벤트 핸들러
 */

define(['jquery', '../action/FileAction'],
    function($, FileAction) {
        var FileEventHandler = function() {

            /**
             * File 핸들러
             * @param initializer
             * @param event
             */
            this.setHandler = function(tool, event) {
                var fileAction = new FileAction(tool);

                if(event.target.className == 'list-name' || event.target.className == 'save-btn' || event.target.className.indexOf('exit-ico') > -1) {
                    if($(event.target).closest('div').attr('id') == 'myfile-list' || event.target.parentNode.parentNode.id == 'myfile-list') {
                        //내 파일 목록 뷰 이벤트
                        fileAction.readMyFileEvent(event);
                    }else {
                        //내 파일 저장 뷰 이벤트
                        fileAction.saveMyFileEvent(event);
                    }
                }else {
                    if (event.type == 'mousedown') {
                        if(event.target.id == 'menu-saveLocal') {
                            //로컬 파일 저장
                            fileAction.saveLocalFile();
                        }else if(event.target.id == 'menu-saveFile') {
                            //내 파일 저장 뷰
                            fileAction.saveMyFile();
                        }else if(event.target.id == 'menu-myFileList') {
                            //내 파일 목록 뷰
                            fileAction.readMyFile();
                        }
                    }
                }
            }
        };

        return FileEventHandler;
});