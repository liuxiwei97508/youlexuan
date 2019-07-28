app.controller("baseController",function($scope){
	//分页控件配置 
    		$scope.paginationConf = {
    				 currentPage: 1,
    				 totalItems: 10,
    				 itemsPerPage: 5,
    				 perPageOptions: [5, 10, 20, 30],
    				 onChange: function(){
    					//切换页码，重新加载  
    			   		$scope.reloadList();
    				 }
    		};
    		//刷新
    		$scope.reloadList=function(){
    			$scope.search($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
    		};
    		
    		//要删除的Id集合
			$scope.selectIds=[];
			$scope.updateSelectId=function($event,id){
				if($event.target.checked){
					$scope.selectIds.push(id);
					console.log($scope.selectIds);
				}else{
					var a =	$scope.selectIds.indexOf(id);	
					$scope.selectIds.splice(a,1);
					console.log($scope.selectIds);
				}
			};
			
			//search
			$scope.searchEntity={};
			
			//selectAll
			$scope.selectAll=function($event){
				$scope.selectIds=[];
				var status =$event.target.checked;
				$(".eachbox").each(function(idx,obj){
					obj.checked=status;
					var id =parseInt($(obj).parent().next().text())
					if(status){						
						$scope.selectIds.push(id);
					}else{
						$scope.selectIds.splice(idx,1)
					}
				})
				
				console.log($scope.selectIds);
			};
			
			// 提取json字符串数据中某个属性，返回 逗号分隔 的拼接字符串
			$scope.jsonToStr = function(jsonString, key) {
				var json = JSON.parse(jsonString);
				// 要返回的值
				var value = "";
				for (var i = 0; i < json.length; i++) {
					if (i > 0) {
						value += ","
					}
					value += json[i][key];
				}
				return value;
			} 
})