package bDrawingBoard.module.main.service;

import bDrawingBoard.module.main.vo.FileInfoVO;
import bDrawingBoard.module.main.vo.MyFileInfoVO;

/**
 * Created by user on 2016-10-16.
 */
public interface MyFileService {

    /**
     * 내 파일 목록 조회
     * @param member_id
     * @param file_type : '' - 전체, 'folder' - 폴더
     * @return
     */
    public String getMyFileInfoList(String member_id, String file_type);

    /**
     * 내 파일 저장
     * @param myFileInfoVO
     * @return
     */
    public String setMyFileInfo(MyFileInfoVO myFileInfoVO, FileInfoVO fileInfoVO);

    /**
     * 내 파일 정보 수정
     * @param myFileInfoVO
     * @return
     */
    public String updateMyFileInfo(MyFileInfoVO myFileInfoVO);

    /**
     * 서버에 파일 저장
     * @param save_img
     * @return
     */
    public FileInfoVO setFileInfoVO(String file_dir, String save_img);
}
