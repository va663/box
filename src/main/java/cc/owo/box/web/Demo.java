package cc.owo.box.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Demo {

    @GetMapping("test")
    public String test() {
        return "owo-box测试接口";
    }
}
