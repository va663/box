package cc.owo.box.web;

import cc.owo.box.constant.Response;
import cc.owo.box.entity.Resources;
import cc.owo.box.mapper.ResourcesMapper;
import cc.owo.box.util.ResponseBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
public class ResourcesController {

    @Autowired
    private ResourcesMapper resourcesMapper;

    @PostMapping("/resources")
    public String addResource(Resources resources) {
        if(resources == null) {
            return "resources-list";
        }
        resources.setAddTime(new Date());
        resources.setUpdateTime(new Date());
        resources.setUserId(1);
        resourcesMapper.insert(resources);

        return  "resources-list";
    }


    @GetMapping("/resources")
    public Object getResource() {
        List<Resources> resources = resourcesMapper.selectAll();

        return new ResponseBean(Response.CODE_SUCCESS,Response.MSG_SUCCESS,resources);
    }


}
