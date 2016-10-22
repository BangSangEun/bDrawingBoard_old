package bDrawingBoard.module.main.service.serviceImpl;

import bDrawingBoard.module.main.dao.MyFileDAO;
import bDrawingBoard.module.main.service.MyFileService;
import bDrawingBoard.module.main.vo.FileInfoVO;
import bDrawingBoard.module.main.vo.MyFileInfoVO;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sun.misc.BASE64Decoder;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

/**
 * Created by user on 2016-10-16.
 */
@Service
public class MyFileServiceImpl implements MyFileService {
    @Autowired
    MyFileDAO myFileDAO;

    @Override
    public String getMyFileInfoList(String member_id, String file_type) {
        JSONObject resultObj = new JSONObject();
        JSONArray tempArray = new JSONArray();

        try {
            HashMap<String, String> map = new HashMap<String, String>();
            map.put("member_id", member_id);
            map.put("file_type", file_type);

            ArrayList<MyFileInfoVO> myFileInfoList = myFileDAO.getMyFileInfoList(map);

            for(int i=0; i<myFileInfoList.size(); i++) {
                JSONObject tempObj = new JSONObject();
                tempObj.put("id", myFileInfoList.get(i).getId());
                tempObj.put("file_type", myFileInfoList.get(i).getFile_type());
                tempObj.put("file_depth", myFileInfoList.get(i).getFile_depth());
                tempObj.put("file_parent", myFileInfoList.get(i).getFile_parent());
                tempObj.put("file_id", myFileInfoList.get(i).getFile_id());
                tempObj.put("file_nicname", myFileInfoList.get(i).getFile_nicname());

                tempArray.put(tempObj);
            }

            resultObj.put("myFileInfoList", tempArray);
        }catch (Exception e) {
            e.printStackTrace();
        }

        return resultObj.toString();
    }

    @Override
    public String setMyFileInfo(MyFileInfoVO myFileInfoVO, FileInfoVO fileInfoVO) {
        String result = "success";
        int fileSave = myFileDAO.setFileInfo(fileInfoVO);         //파일 저장
        myFileInfoVO.setFile_id(fileInfoVO.getFile_id());
        int myfileSave = myFileDAO.setMyFileInfo(myFileInfoVO);  //내 파일 저장

        if(fileSave != 1 || myfileSave != 1) {
            result = "fail";
        }

        return result;
    }

    @Override
    public String updateMyFileInfo(MyFileInfoVO myFileInfoVO) {
        String result = "success";
        int myfileUpdate = myFileDAO.updateMyFileInfo(myFileInfoVO);

        if(myfileUpdate != 1) {
            result = "fail";
        }

        return result;
    }

    @Override
    public FileInfoVO setFileInfoVO(String file_dir, String save_img) {
        FileInfoVO fileInfoVO = new FileInfoVO();
        BufferedImage image = null;
        String file_name = "";

        try {
            long currentTime = System.currentTimeMillis();
            SimpleDateFormat simDf = new SimpleDateFormat("yyyyMMddHHmmss");
            int randomNumber = (int)(Math.random() * 10000);

            String[] imgStr = save_img.split(",");
            String imgTemp = imgStr[1];

            //이미지 스트림을 파일로 전환
            BASE64Decoder decoder = new BASE64Decoder();
            byte[] byteImg = decoder.decodeBuffer(imgTemp);
            ByteArrayInputStream bis = new ByteArrayInputStream(byteImg);
            image = ImageIO.read(bis);
            bis.close();

            file_name = String.valueOf(simDf.format(new Date(currentTime))+ "_" + randomNumber);
            File fileObj = new File(file_dir + file_name + ".png");
            ImageIO.write(image, "png", fileObj);
        }catch (Exception e) {
            e.printStackTrace();
        }

        fileInfoVO.setFile_name(file_name);
        fileInfoVO.setFile_path(file_dir + file_name);

        return fileInfoVO;
    }
}
