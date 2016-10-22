package bDrawingBoard.module.main.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * file         :  mainController
 * description  :
 * date         :  2016-09-08
 * author       :  owner
 */
@Controller
public class MainController {

    @RequestMapping("/main.do")
    public String mainView(Model model) {
        return "main/main";
    }

    @RequestMapping("/top.do")
    public String topView(Model model) {
        return "common/top";
    }

    @RequestMapping("/footer.do")
    public String footerView() {
        return "common/footer";
    }
}
