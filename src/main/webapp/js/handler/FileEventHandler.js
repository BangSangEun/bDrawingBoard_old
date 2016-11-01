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

                if($(event.target).parents('div#myfile-list').length > 0) {
                    //내 파일 목록 뷰 이벤트
                    if(event.type == 'mousedown') {
                        if(event.target.className.indexOf('file-btn-close') > -1) {
                            fileAction.myFileListView(false);
                        }
                    }
                }else if($(event.target).parents('div#myfile-save').length > 0) {
                    //내 파일 저장 이벤트
                    if(event.type == 'mousedown') {
                        if(event.target.id == 'myfile-save-btn') {
                            fileAction.myFileSave(event);
                        }
                    }
                }else {
                    if (event.type == 'mousedown') {
                        if(event.target.id == 'menu-saveLocal') {
                            //로컬 파일 저장
                            fileAction.saveLocalFile();
                        }else if(event.target.id == 'menu-saveFile') {
                            //내 파일 저장 뷰
                            fileAction.myFileSaveView(true);
                        }else if(event.target.id == 'menu-myFileList') {
                            //내 파일 목록 뷰
                            fileAction.myFileListView(true);
                        }
                    }
                }
            }
        };

        return FileEventHandler;
});