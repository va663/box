package cc.owo.box.util;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseBean {

    private String code;
    private String msg;
    private Object result;
}
