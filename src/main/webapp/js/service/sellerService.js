//seller服务层
app.service('sellerService', function($http){
	// 保存、修改
	this.save = function(entity) {
		var methodName = 'add'; 	// 方法名称
		if (entity.id != null) { 	// 如果有ID
			methodName = 'update'; 	// 则执行修改方法
		}
		return $http.post('../seller/' + methodName + '.do', entity);
	}

	// 查询单个实体
	this.findOne = function(id) {
		console.log("serfindOne")
		return $http.post('../seller/findOne.do?sellerId=' + id);
	}

	// 批量删除
	this.dele = function(ids) {
		// 获取选中的复选框
		return $http.get('../seller/delete.do?ids=' + ids);
	}

	// 查询
	this.search = function(page, size, searchEntity) {
		// post提交，page、size属性和之前相同，将searchEntity提交至后台@RequestBody对应的属性
		return $http.post('../seller/search.do?page=' + page + '&size=' + size,
				searchEntity);
	}
	
	// updateStatus审核
	this.udpdateStatus = function(sellerId,status) {
		// 获取选中的复选框
		return $http.post('../seller/udpdateStatus.do?status=' + status+"&sellerId="+sellerId);
	}
	
	

});