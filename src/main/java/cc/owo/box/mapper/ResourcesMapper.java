package cc.owo.box.mapper;

import cc.owo.box.entity.Resources;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.type.JdbcType;

import java.util.List;

public interface ResourcesMapper {
    @Delete({
        "delete from resources",
        "where id = #{id,jdbcType=INTEGER}"
    })
    int deleteByPrimaryKey(Integer id);

    @Insert({
        "insert into resources (id, filename, ",
        "item_name,length, user_id, ",
        "add_time, update_time)",
        "values (#{id,jdbcType=INTEGER}, #{filename,jdbcType=VARCHAR}, ",
        "#{itemName,jdbcType=VARCHAR},#{length,jdbcType=INTEGER}, #{userId,jdbcType=INTEGER}, ",
        "#{addTime,jdbcType=TIMESTAMP}, #{updateTime,jdbcType=TIMESTAMP})"
    })
    int insert(Resources record);

    @Select({
        "select",
        "id, filename, item_name,length, user_id, add_time, update_time",
        "from resources",
        "where id = #{id,jdbcType=INTEGER}"
    })
    @Results({
        @Result(column="id", property="id", jdbcType=JdbcType.INTEGER, id=true),
        @Result(column="filename", property="filename", jdbcType=JdbcType.VARCHAR),
        @Result(column="item_name", property="itemName", jdbcType=JdbcType.VARCHAR),
        @Result(column="length", property="length", jdbcType=JdbcType.INTEGER),
        @Result(column="user_id", property="userId", jdbcType=JdbcType.INTEGER),
        @Result(column="add_time", property="addTime", jdbcType=JdbcType.TIMESTAMP),
        @Result(column="update_time", property="updateTime", jdbcType=JdbcType.TIMESTAMP)
    })
    Resources selectByPrimaryKey(Integer id);

    @Select({
        "select",
        "id, filename, item_name, length,user_id, add_time, update_time",
        "from resources"
    })
    @Results({
        @Result(column="id", property="id", jdbcType=JdbcType.INTEGER, id=true),
        @Result(column="filename", property="filename", jdbcType=JdbcType.VARCHAR),
        @Result(column="item_name", property="itemName", jdbcType=JdbcType.VARCHAR),
        @Result(column="length", property="length", jdbcType=JdbcType.INTEGER),
        @Result(column="user_id", property="userId", jdbcType=JdbcType.INTEGER),
        @Result(column="add_time", property="addTime", jdbcType=JdbcType.TIMESTAMP),
        @Result(column="update_time", property="updateTime", jdbcType=JdbcType.TIMESTAMP)
    })
    List<Resources> selectAll();

    @Update({
        "update resources",
        "set filename = #{filename,jdbcType=VARCHAR},",
          "item_name = #{itemName,jdbcType=VARCHAR},",
          "length = #{length,jdbcType=INTEGER},",
          "user_id = #{userId,jdbcType=INTEGER},",
          "add_time = #{addTime,jdbcType=TIMESTAMP},",
          "update_time = #{updateTime,jdbcType=TIMESTAMP}",
        "where id = #{id,jdbcType=INTEGER}"
    })
    int updateByPrimaryKey(Resources record);
}