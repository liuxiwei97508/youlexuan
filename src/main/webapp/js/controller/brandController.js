app.controller("brandController",function($scope,$controller, brandService){
    	$controller("baseController",{
    		$scope:$scope
    		});
    		
    		//分页
    		$scope.findPage=function(page,size){
    			brandService.findPage(page,size).success(
    					function(response){
    						$scope.list = response.rows;	
    						$scope.paginationConf.totalItems = response.total;//更新总记录数
    					});
    		};
    		//add/update
    		$scope.save=function(){
    			brandService.save($scope.entity).success(
    					function(resp){
		    				if(resp.success){
		    					$scope.reloadList();
		    				}else{
		    					alert(resp.message);
		    				}
    			})
    		};
			//update-findOne
			$scope.findOne=function(id){
				brandService.findOne(id).success(
						function(resp){
							$scope.entity=resp;							
				})
			};
			
			$scope.search=function(page,size){
				brandService.search(page,size,$scope.searchEntity).success(
						function(resp){
							$scope.list=resp.rows;
							$scope.paginationConf.totalItems=resp.total;
				})
			};
			
			
			//delete
			$scope.dele=function(){
				brandService.dele($scope.selectIds).success(
						function(resp){
							if(resp.success){
								$scope.reloadList();
		    					$scope.selectIds=[];
		    				}else{
		    					alert(resp.message);
		    				}
				})
			};
			
	
    	})