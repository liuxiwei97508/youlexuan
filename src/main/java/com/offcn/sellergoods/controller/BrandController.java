package com.offcn.sellergoods.controller;



import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.dubbo.config.annotation.Reference;
import com.offcn.entity.PageResult;
import com.offcn.entity.Result;
import com.offcn.pojo.TbBrand;
import com.offcn.sellergoods.service.BrandService;

@RestController
@RequestMapping("brand")
public class BrandController {
	@Reference
	private BrandService bs;
	
	@RequestMapping("getAll")
	public List<TbBrand> getAll(){
		return bs.findAll();
	}
	
	@RequestMapping("findPage")
	public PageResult findPage(@RequestBody TbBrand brand, int page,int size){
		return bs.findPage(brand, page, size);
	}
	@RequestMapping("add")
	public Result add(@RequestBody TbBrand brand){
		try {
			bs.add(brand);
			return new Result(true,"成功");
		} catch (Exception e) {
			e.printStackTrace();
			return new Result(false,"失败");
		}
	}
	//update-findOne
	@RequestMapping("findOne")
	public TbBrand findOne(long id) {
		return bs.findOne(id);
	}
	//update
	@RequestMapping("update")
	public Result update(@RequestBody TbBrand brand){
		try {
			bs.update(brand);
			return new Result(true,"成功");
		} catch (Exception e) {
			e.printStackTrace();
			return new Result(false,"失败");
		}
	}
	//delete
	@RequestMapping("delete")
	public Result delete(Long[] ids) {
		try {
			bs.delete(ids);
			return new Result(true,"成功");
		} catch (Exception e) {
			e.printStackTrace();
			return new Result(true,"失败");
		}
		
	}
	
	@RequestMapping("/selectOptionList")
	public List<Map> selectOptionList(){
		return bs.selectOptionList();
	}
	
}
