package bDrawingBoard.module.main.dao.daoImpl;

import bDrawingBoard.module.main.dao.MyFileDAO;
import bDrawingBoard.module.main.vo.FileInfoVO;
import bDrawingBoard.module.main.vo.MyFileInfoVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * Created by user on 2016-10-16.
 */
@Repository
public class MyFileDAOImpl implements MyFileDAO {
    @Autowired
    SqlSessionTemplate sqlSession;

    @Override
    public ArrayList<MyFileInfoVO> getMyFileInfoList(HashMap map) {
        return sqlSession.getMapper(MyFileDAO.class).getMyFileInfoList(map);
    }

    @Override
    public int setMyFileInfo(MyFileInfoVO myFileInfoVO) {
        return sqlSession.getMapper(MyFileDAO.class).setMyFileInfo(myFileInfoVO);
    }

    @Override
    public int setFileInfo(FileInfoVO fileInfoVO) {
        return sqlSession.getMapper(MyFileDAO.class).setFileInfo(fileInfoVO);
    }

    @Override
    public int updateMyFileInfo(MyFileInfoVO myFileInfoVO) {
        return sqlSession.getMapper(MyFileDAO.class).updateMyFileInfo(myFileInfoVO);
    }
}
