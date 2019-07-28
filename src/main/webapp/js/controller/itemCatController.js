//item_cat控制层 
app.controller('itemCatController' ,function($scope, $controller, itemCatService,typeTemplateService){	
	
	// 继承
	$controller("baseController", {
		$scope : $scope
	});
	
	// 保存
	$scope.save = function() {
		$scope.entity.parentId=$scope.parentId;
		itemCatService.save($scope.entity).success(function(response) {
			if (response.success) {
				// 重新加载
				$scope.findByParentId($scope.parentId);
			} else {
				alert(response.message);
			}
		});
	}
	
	//查询实体 
	$scope.findOne = function(id){				
		itemCatService.findOne(id).success(
			function(response){
				$scope.entity= response;					
			}
		);				
	}
	
	//批量删除 
	$scope.dele = function(){			
		//获取选中的复选框			
		itemCatService.dele($scope.selectIds).success(
			function(response){
				if(response.success){
					alert(response.message);
					findByParentId($scope.parentId);
					$scope.selectIds=[];
				}						
			}		
		);				
	}
	
	// 定义搜索对象 
	$scope.searchEntity = {};
	// 搜索
	$scope.search = function(page,size){			
		itemCatService.search(page,size,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;
			}			
		);
	}
	
	
	$scope.setGrand=function(value){
		$scope.grand=value;
	}
	
	$scope.grand=1;
	//findByParentId根据父ID查询
	$scope.findByParentId = function(parentId){	
		$scope.parentId=parentId;
		//console.log(grand);
		itemCatService.findByParentId(parentId).success(
			function(response){
				$scope.list=response;	
			}			
		);
	}
	
	$scope.getByBread=function(entity){
		if($scope.grand==1){
			$scope.entity_1=null;
			$scope.entity_2=null;
		}else if($scope.grand==2){
			$scope.entity_1=entity;
			$scope.entity_2=null;
		}else{
			$scope.entity_2=entity;
		}
		 $scope.findByParentId(entity.id);
	}
	
	
	//读取品牌列表
	$scope.getTypeListId=function(){
		typeTemplateService.getTypeListId().success(
			function(response){
				$scope.typeId={data:response};	
			}
		);		
	}
   
});	
