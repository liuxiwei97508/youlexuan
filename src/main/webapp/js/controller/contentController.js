//content控制层 
app.controller('contentController' ,function($scope, $controller, contentService,
		contentCategoryService,uploadService){	
	
	// 继承
	$controller("baseController", {
		$scope : $scope
	});
	
	// 保存
	$scope.save = function() {
		contentService.save($scope.entity).success(function(response) {
			if (response.success) {
				// 重新加载
				$scope.reloadList();
			} else {
				alert(response.message);
			}
		});
	}
	
	//查询实体 
	$scope.findOne = function(id){				
		contentService.findOne(id).success(
			function(response){
				$scope.entity= response;					
			}
		);				
	}
	
	//批量删除 
	$scope.dele = function(){			
		//获取选中的复选框			
		contentService.dele($scope.selectIds).success(
			function(response){
				if(response.success){
					$scope.reloadList();
					$scope.selectIds=[];
				}						
			}		
		);				
	}
	
	// 定义搜索对象 
	$scope.searchEntity = {};
	// 搜索
	$scope.search = function(page,size){			
		contentService.search(page,size,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;
			}			
		);
	}
	
	$scope.contentCategoryName=[];
	$scope.findContentCategoryList=function(){
		contentCategoryService.findAll().success(function(resp){
			$scope.contentCategoryList = resp;
			for(var i = 0;i<resp.length;i++){
				$scope.contentCategoryName[resp[i].id]=resp[i].name;
			}
		})
	}
	
	
	// 广告状态
	$scope.contentStatus = ['禁用', '启用'];
	
	/**
	 * 上传图片
	 */
	$scope.uploadFile = function() {
		uploadService.uploadFile().success(function(response) {
			if (response.success) {// 如果上传成功，取出url
				$scope.entity.pic = response.message;// 设置文件地址
			} else {
				alert(response.message);
			}
		}).error(function() {
			alert("上传发生错误");
		});
	};
    
});	
