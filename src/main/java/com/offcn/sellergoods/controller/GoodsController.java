package com.offcn.sellergoods.controller;
import java.util.List;

import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.Session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.fastjson.JSON;
import com.offcn.pojo.TbGoods;
import com.offcn.pojo.TbItem;
import com.offcn.sellergoods.service.GoodsService;

import com.offcn.entity.PageResult;
import com.offcn.entity.Result;
import com.offcn.group.Goods;
//import com.offcn.page.service.ItemPageService;
/**
 * goodscontroller
 * @author senqi
 *
 */
@RestController
@RequestMapping("/goods")
public class GoodsController {

	@Reference
	private GoodsService goodsService;
	
//	@Reference(timeout=4000)
//	private ItemPageService itemPageService;
	
//	@Reference
//	private ItemSearchService itemSearchService;
	//用于发送solr导入的消息
	@Autowired
	@Qualifier("queueSolrImportDestination")
	private Destination queueSolrImportDestination;
	
	@Autowired
	@Qualifier("topicPageGenDestination")
	private Destination topicPageGenDestination;
	
	@Autowired
	private JmsTemplate jmsTemplate;
	
	
	/**
	 * 生成静态页（测试）
	 * @param goodsId
	 */
	@RequestMapping("/genHtml")
	public void genHtml(Long goodsId){
		//itemPageService.genItemHtml(goodsId);
	}
	
	/**
	 * 返回全部列表
	 * @return
	 */
	@RequestMapping("/findAll")
	public List<TbGoods> findAll(){			
		return goodsService.findAll();
	}
	
	
	/**
	 * 返回全部列表
	 * @return
	 */
	@RequestMapping("/findPage")
	public PageResult findPage(int page,int rows){			
		return goodsService.findPage(page, rows);
	}
	
	/**
	 * 增加
	 * @param goods
	 * @return
	 */
	@RequestMapping("/add")
	public Result add(@RequestBody Goods goods){
		try {
			goodsService.add(goods);
			return new Result(true, "增加成功");
		} catch (Exception e) {
			e.printStackTrace();
			return new Result(false, "增加失败");
		}
	}
	
	/**
	 * 修改
	 * @param goods
	 * @return
	 */
	@RequestMapping("/update")
	public Result update(@RequestBody Goods goods){
		try {
			goodsService.update(goods);
			return new Result(true, "修改成功");
		} catch (Exception e) {
			e.printStackTrace();
			return new Result(false, "修改失败");
		}
	}	
	
	/**
	 * 获取实体
	 * @param id
	 * @return
	 */
	@RequestMapping("/findOne")
	public Goods findOne(Long id){
		return goodsService.findOne(id);		
	}
	
	/**
	 * 批量删除
	 * @param ids
	 * @return
	 */
	@RequestMapping("/delet")
	public Result delete(Long [] ids){
		try {
			goodsService.delet(ids);
			return new Result(true, "删除成功"); 
		} catch (Exception e) {
			e.printStackTrace();
			return new Result(false, "删除失败");
		}
	}
	
	/**
	 * 查询+分页
	 * @param brand
	 * @param page
	 * @param rows
	 * @return
	 */
	@RequestMapping("/search")
	public PageResult search(@RequestBody TbGoods goods, int page, int size){
		return goodsService.findPage(goods, page, size);		
	}
	@RequestMapping("/updateStatus")
	public Result updateStatus(Long[] ids,String status){
		
		try {
			goodsService.updateStatus(ids,status);
			//审核通过
			if(status.equals("1")){
				List<TbItem> itemList =
						goodsService.findItemListByGoodsIdandStatus(ids, status);
				//调用搜索接口实现数据批量导入
				if(itemList.size()>0){
					// itemSearchService.importList(itemList);
					
					jmsTemplate.send(queueSolrImportDestination,  new MessageCreator() {
						@Override
						public Message createMessage(Session session) throws JMSException {
							String listStr = JSON.toJSONString(itemList);
							return session.createTextMessage(listStr);
						}
					});
					
					//静态页生成
					for(Long goodsId:ids){
						System.out.println("静态页开始生成---------------");
						jmsTemplate.send(topicPageGenDestination, new MessageCreator() {
							@Override
							public Message createMessage(Session session) throws JMSException {
								return session.createTextMessage(goodsId + "");
							}
						});
					}
				}
			}
			return new Result(true, "修改成功");
		} catch (Exception e) {
			e.printStackTrace();
			return new Result(false, "修改失败");
		}
	}	
}
