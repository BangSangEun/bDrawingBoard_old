package bDrawingBoard.module.login.web;

import bDrawingBoard.module.login.service.LoginService;
import bDrawingBoard.module.login.vo.MemberVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Created by user on 2016-09-21.
 */
@Controller
public class LoginController {
    @Autowired
    LoginService loginService;

    @RequestMapping("/login.do")
    public String loginView() {
        return "main/login";
    }

    /**
     * 로그인 정보 확인
     * @param request
     * @param memberVO
     * @return
     */
    @RequestMapping("/login/memberInfoCheck.do")
    public @ResponseBody String getMemberInfoCheck(HttpServletRequest request, @ModelAttribute("memberVO") MemberVO memberVO) {
        String result = "success";

        int checkVal = loginService.getMemberInfoCheck(memberVO);
        if(checkVal < 1) {
            result = "fail";
        }

        return result;
    }

    /**
     * 로그인
     * @param request
     * @param memberVO
     * @param session
     * @return
     */
    @RequestMapping("/goLogin.do")
    public String loginHandler(HttpServletRequest request, @ModelAttribute("memberVO") MemberVO memberVO, HttpSession session) {
        memberVO = loginService.getMemberInfo(memberVO);

        if(memberVO != null) {
            session.setAttribute("memberVO", memberVO);
        }

        return "redirect:/main.do";
    }


    /**
     * 로그아웃
     * @return
     */
    @RequestMapping("/goLogout.do")
    public String logoutHandler(HttpSession session) {
        session.invalidate();

        return "redirect:/";
    }
}
