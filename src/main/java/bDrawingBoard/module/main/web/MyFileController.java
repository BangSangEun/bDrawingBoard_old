package bDrawingBoard.module.main.web;

import bDrawingBoard.module.login.vo.MemberVO;
import bDrawingBoard.module.main.service.MyFileService;
import bDrawingBoard.module.main.vo.FileInfoVO;
import bDrawingBoard.module.main.vo.MyFileInfoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Created by user on 2016-10-16.
 */
@Controller
public class MyFileController {

    @Autowired
    MyFileService myFileService;

    /**
     * 내 파일 목록 조회
     * @param request
     * @param session
     * @return
     */
    @RequestMapping("/getMyFileInfoList.do")
    public @ResponseBody String getMyFileInfoList(HttpServletRequest request, HttpSession session) {
        MemberVO memberVO =  (MemberVO)session.getAttribute("memberVO");
        String file_type = request.getParameter("file_type");

        String result = myFileService.getMyFileInfoList(memberVO.getMember_id(), file_type);

        return result;
    }

    /**
     * 내 파일 저장
     * @param request
     * @param session
     * @param myFileInfo
     * @return
     */
    @RequestMapping("/setMyFileInfo.do")
    public @ResponseBody String setMyFileInfo(HttpServletRequest request, HttpSession session) {
        MyFileInfoVO myFileInfoVO = new MyFileInfoVO();
        MemberVO memberVO = (MemberVO)session.getAttribute("memberVO");

        myFileInfoVO.setMember_id(memberVO.getMember_id());
        myFileInfoVO.setFile_type(request.getParameter("file_type"));
        myFileInfoVO.setFile_nicname(request.getParameter("file_nicname"));
        String file_parent = request.getParameter("file_parent");
        if(file_parent != null) {
            myFileInfoVO.setFile_parent(Integer.parseInt(file_parent));
        }

        String save_img = request.getParameter("save_img"); //img dataURL
        String file_dir = "C:\\dev_\\drawingFile\\";
        FileInfoVO fileInfoVO = myFileService.setFileInfoVO(file_dir, save_img);

        String result = myFileService.setMyFileInfo(myFileInfoVO, fileInfoVO);

        return result;
    }

    /**
     * 내 파일 정보 수정
     * @param request
     * @param session
     * @param myFileInfo
     * @return
     */
    @RequestMapping("/updateMyFileInfo.do")
    public @ResponseBody String updateMyFileInfo(HttpServletRequest request, HttpSession session,
                                              @ModelAttribute("myFileInfoVO") MyFileInfoVO myFileInfoVO) {
        String result = myFileService.updateMyFileInfo(myFileInfoVO);

        return result;
    }
}
