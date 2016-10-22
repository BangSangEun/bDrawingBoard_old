package bDrawingBoard.module.main.dao;

import bDrawingBoard.module.main.vo.FileInfoVO;
import bDrawingBoard.module.main.vo.MyFileInfoVO;

import java.util.ArrayList;
import java.util.HashMap;


public interface MyFileDAO {

    /**
     * 내 파일 목록 조회
     * @return
     */
    public ArrayList<MyFileInfoVO> getMyFileInfoList(HashMap map);

    /**
     * 내 파일 저장
     * @param myFileInfoVO
     * @return
     */
    public int setMyFileInfo(MyFileInfoVO myFileInfoVO);

    /**
     * 파일 저장
     * @param fileInfoVO
     * @return
     */
    public int setFileInfo(FileInfoVO fileInfoVO);

    /**
     * 내 파일 수정
     * @param myFileInfoVO
     * @return
     */
    public int updateMyFileInfo(MyFileInfoVO myFileInfoVO);
}
