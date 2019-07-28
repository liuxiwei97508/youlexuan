app.service("brandService",function($http){
    		//分页
    		this.findPage=function(page,size){
    		  	return	$http.get('../brand/findPage.do?page=' + page + '&size=' + size);
    		};
    		//add/update
    		this.save=function(entity){
    			var method="";
    			if(entity.id==null){
    				method="add";
    			}else{
    				method="update";
    			}
    		 	return	$http.post("../brand/"+method+".do",entity);
    		};
    		
			//update-findOne
			this.findOne=function(id){
				return $http.get("../brand/findOne?id="+id);
			};
			
			//delete
			this.dele=function(selectIds){
				return $http.get("../brand/delete?ids="+selectIds);
			};
			
			//search
			this.search=function(page,size,searchEntity){
				return $http.post("../brand/findPage.do?page="+page+"&size="+size,searchEntity);
			};
			
			this.selectOptionList=function(){
				return $http.get('../brand/selectOptionList.do');
			}
    		
    	})