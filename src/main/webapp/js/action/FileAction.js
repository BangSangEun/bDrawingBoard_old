/**
 * 파일 관련 Action
 */

define(['jquery'],
    function($) {
        var FileAction = function(tool) {
            var self = this;

            /**
             * 로컬 파일 다운로드
             */
            this.saveLocalFile = function() {
                location.href = (tool.getCanvas()).toDataURL('image/png').replace("image/png", "image/octet-stream");
            }

            /**
             * 내 파일 저장 뷰
             */
            this.saveMyFile = function() {
                $('#file-saveView').show();
            }

            /**
             * 내 파일 저장 이벤트
             * @param event
             */
            this.saveMyFileEvent = function(event) {
                if(event.type == 'mousedown') {
                    if(event.target.className.indexOf('exit-ico') > -1) {
                        $('#file-saveView').hide();
                    }else if(event.target.className == 'save-btn') {
                        var file_name = $('#filesave-name').val();
                        var save_img = tool.getCanvas().toDataURL('image/png', 1.0);

                        $.ajax({
                            type: 'POST',
                            url: '/setMyFileInfo.do',
                            data: {"file_name": file_name, "save_img": save_img},
                            dataType: 'text',
                            success: function(result) {
                                if(result == 'success') {
                                    alert("파일 저장 완료");
                                    $('#file-saveView').hide();
                                    $('#filesave-name').val("");
                                }else {
                                    alert("파일 저장 실패");
                                }
                            },
                            error: function() {
                                alert("파일 저장 오류입니다.\n해당 오류가 지속되면 관리자에게 문의하세요.");
                            }
                        });
                    }
                }
            }

            /**
             * 내 파일 목록 뷰
             */
            this.readMyFile = function() {
                $('#myfile-list').show();

                //내 파일목록 불러오기
                $.ajax({
                    type: 'POST',
                    url: '/getMyFileInfoList.do',
                    data: {"file_type": ""},
                    dataType: 'json',
                    success: function(result) {
                        var appendHtml = "";
                        appendHtml += "<tr class=\"list-root\">";
                        appendHtml += "<td colspan=\"2\" id=\"td-folder-root\">";
                        appendHtml += "<p class=\"list-name\"><i class=\"tool-ico folder-plus-ico\"></i><i class=\"tool-ico myfolder-black-ico\"></i> /</p>";
                        appendHtml += "</td>";
                        appendHtml += "</tr>";

                        var htmlObj = function(appendHtml, listObj) {
                            for(var i=0; i<listObj.length; i++) {
                                appendHtml += "<tr class=\"list-file\">";
                                appendHtml += "<td class=\"depth-0\" id=\"td-file-" + listObj[i].file_id + "\">";
                                appendHtml += "<p class=\"list-name\">";
                                appendHtml += "<i class=\"tool-ico myfile-ico\"></i>" + decodeURIComponent(listObj[i].file_name) + "</p></td>";
                                appendHtml += "<td class=\"list-btn\">";
                                appendHtml += "<a href=\"javascript:fn_MyfileEventHandler('saveLocal', '" + listObj[i].file_id + "');\"><i class=\"tool-ico savelocal-black-ico\"></i></a>"; // <!-- 다운로드 -->
                                appendHtml += "<a href=\"javascript:fn_MyfileEventHandler('editName', '" + listObj[i].file_id + "');\"><i class=\"tool-ico editname-ico\"></i></a>"; // <!-- 이름변경 -->
                                appendHtml += "<a href=\"javascript:fn_MyfileEventHandler('deleteFile', '" + listObj[i].file_id + "');\"><i class=\"tool-ico drawclear-black-ico\"></i></a>"; // <!-- 삭제 -->
                                appendHtml += "</td></tr>";
                            }
                            return appendHtml;
                        }

                        appendHtml = htmlObj(appendHtml, result.myFileInfoList);
                        $('#myfile-list').find('tbody').append(appendHtml);

                        $(document).on('mousedown keydown mouseover mouseup mousemove', '.list-file > td',  function(event) {
                            self.readMyFileEvent(event);
                        });
                    },
                    error: function() {
                        alert("파일 목록 조회 오류입니다.\n해당 오류가 지속되면 관리자에게 문의하세요.");
                    }
                });
            }

            /**
             * 내 파일 목록 뷰 이벤트
             * @param event
             */
            this.readMyFileEvent = function(event) {
                if(event.type == 'mousedown') {
                    if(event.target.className.indexOf('exit-ico') > -1) {
                        $('#myfile-list').hide();
                        ($('#myfile-list').find('tbody')).html("");
                    }else if(event.target.className == 'list-name') {
                        $('#myfile-list').find('td.on').removeClass('on');
                        $(event.target.parentNode).addClass('on');
                    }else if(event.target.className == 'save-btn') {

                    }
                }
            }

        };

        return FileAction;
});


/*
 //로컬 다운로드
 location.href = initObj.canvas.toDataURL('image/png').replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Canvas.png');

 $('#save-canvas-img').attr("href", initObj.canvas.toDataURL('image/png'));
 $('#save-canvas-img').attr("download", "test");
 setTimeout(function() {
 $('#save-canvas-img').trigger("mousedown");
 }, 1000);
 */