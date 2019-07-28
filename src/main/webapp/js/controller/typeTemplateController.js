//type_template控制层 
app.controller('typeTemplateController' ,function($scope, $controller, typeTemplateService,brandService,specificationService){	
	
	// 继承
	$controller("baseController", {
		$scope : $scope
	});
	
	//$scope.brandList={data:[{id:1,text:'联想'},{id:2,text:'华为'},{id:3,text:'小米'}]};//品牌列表
	$scope.brandList={data:[]};//品牌列表
	//读取品牌列表
	$scope.findBrandList=function(){
		brandService.selectOptionList().success(
			function(response){
				$scope.brandList={data:response};	
			}
		);		
	}
	
	$scope.specList={data:[]};//规格列表
	//读取品牌列表
	$scope.findspecList=function(){
		specificationService.selectOptionList().success(
			function(response){
				$scope.specList={data:response};	
			}
		);		
	}
	
	
	// 保存
	$scope.save = function() {
		typeTemplateService.save($scope.entity).success(function(response) {
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
		typeTemplateService.findOne(id).success(
			function(response){
				$scope.entity= response;
				
				$scope.entity.specIds=JSON.parse($scope.entity.specIds);
				$scope.entity.brandIds=JSON.parse($scope.entity.brandIds);
				$scope.entity.customAttributeItems=JSON.parse($scope.entity.customAttributeItems);
				
			}
		);				
	}
	
	//批量删除 
	$scope.dele = function(){			
		//获取选中的复选框			
		typeTemplateService.dele($scope.selectIds).success(
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
		typeTemplateService.search(page,size,$scope.searchEntity).success(
			function(response){
				console.log(response);
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;
			}			
		);
	}
	//添加一个空specificationOption值
	$scope.addTableRow=function(){
		$scope.entity.customAttributeItems.push({});
	}
	//删除一个specificationOption值
	$scope.deleteTableRow=function(idx){
		$scope.entity.customAttributeItems.splice(idx,1);
	}
    
});	
