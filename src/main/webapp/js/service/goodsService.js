//goods服务层
app.service('goodsService', function($http){
	// 保存、修改
	this.save = function(entity) {
		var methodName = 'add'; 	// 方法名称
		entity.goodsDesc.introduction = editor.html();
		if (entity.goods.id != null) { 	// 如果有ID
			methodName = 'update'; 	// 则执行修改方法
		}
		return $http.post('../goods/' + methodName + '.do', entity);
	}

	// 查询单个实体
	this.findOne = function(id) {
		return $http.get('../goods/findOne.do?id=' + id);
	}
	

	// 批量删除
	this.delet = function(ids) {
		// 获取选中的复选框
		return $http.get('../goods/delet.do?ids=' + ids);
	}

	// 查询
	this.search = function(page, size, searchEntity) {
		// post提交，page、size属性和之前相同，将searchEntity提交至后台@RequestBody对应的属性
		return $http.post('../goods/search.do?page=' + page + '&size=' + size,
				searchEntity);
	}
	this.updateStatus=function(ids,status){
		return $http.get('../goods/updateStatus.do?ids='+ids+'&status='+status);
	}

});