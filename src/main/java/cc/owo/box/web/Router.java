package cc.owo.box.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Router {


    @GetMapping("/resources-list")
    public String resource() {
        return  "resources-list";
    }
}
