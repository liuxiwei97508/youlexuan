//goods控制层 
app.controller('goodsController', function($scope, $controller,$location ,goodsService,
		uploadService, itemCatService) {

	// 继承
	$controller("baseController", {
		$scope : $scope
	});

	
	$scope.itemCatList=[];//商品分类列表
	//加载商品分类列表
	$scope.findItemCatList=function(){		
		itemCatService.findAll().success(
				function(response){	
					console.log("123");
					for(var i=0;i<response.length;i++){
						$scope.itemCatList[response[i].id]=response[i].name;
					}
				});
	}

	// 批量删除
	$scope.delet = function() {
		// 获取选中的复选框
		goodsService.delet($scope.selectIds).success(function(response) {
			if (response.success) {
				$scope.reloadList();
				$scope.selectIds = [];
			}
		});
	}
	$scope.updateStatus=function(status){
		if($scope.selectIds.length>0){
			goodsService.updateStatus($scope.selectIds,status).success(function(resp){
				alert(resp.success);
				$scope.reloadList();//刷新列表
				$scope.selectIds=[];//清空ID集合
			})
		}else{
			alert("请选择商品");
		}
	}

	// 定义搜索对象
	$scope.searchEntity = {};
	// 搜索
	$scope.search = function(page, size) {
		goodsService.search(page, size, $scope.searchEntity).success(
				function(response) {
					$scope.list = response.rows;
					$scope.paginationConf.totalItems = response.total;
				});
	}

	/**
	 * 上传图片
	 */
	$scope.uploadFile = function() {
		uploadService.uploadFile().success(function(response) {
			if (response.success) {// 如果上传成功，取出url
				$scope.image_entity.url = response.message;// 设置文件地址
			} else {
				alert(response.message);
			}
		}).error(function() {
			alert("上传发生错误");
		});
	};

	$scope.entity = {
		goods : {},
		goodsDesc : {
		itemImages : [],
		specificationItems:[]
		},
		itemsList:{}	
	};
	// 定义页面实体结构

	$scope.add_image_entity = function() {
		$scope.entity.goodsDesc.itemImages.push($scope.image_entity);
	}

	$scope.remove_image_entity = function(index) {
		$scope.entity.goodsDesc.itemImages.splice(index, 1);
	}

	$scope.selectItemCat1List = function() {
		itemCatService.findByParentId(0).success(function(resp) {
			$scope.itemCat1List = resp;
		})
	}
	
	
	
	$scope.status=['未审核','已审核','审核未通过','关闭'];//商品状态
	
	
	
	
	
	
	
	
});
