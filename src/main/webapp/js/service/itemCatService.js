//item_cat服务层
app.service('itemCatService', function($http){
	// 保存、修改
	this.save = function(entity) {
		var methodName = 'add'; 	// 方法名称
		if (entity.id != null) { 	// 如果有ID
			methodName = 'update'; 	// 则执行修改方法
		}
		return $http.post('../itemCat/' + methodName + '.do', entity);
	}

	// 查询单个实体
	this.findOne = function(id) {
		return $http.get('../itemCat/findOne.do?id=' + id);
	}

	// 批量删除
	this.dele = function(ids) {
		// 获取选中的复选框
		return $http.get('../itemCat/delete.do?ids=' + ids);
	}

	// 查询
	this.search = function(page, size, searchEntity) {
		// post提交，page、size属性和之前相同，将searchEntity提交至后台@RequestBody对应的属性
		return $http.post('../itemCat/search.do?page=' + page + '&size=' + size,
				searchEntity);
	}
	
	//findByParentId根据父ID查询
	this.findByParentId = function(parentId) {
		return $http.post('../itemCat/findByParentId.do?parentId=' +parentId);
	}
	
	// 查询全部
	this.findAll = function() {
		return $http.get('../itemCat/findAll.do');
	}
	
	
	
	
	
	

});