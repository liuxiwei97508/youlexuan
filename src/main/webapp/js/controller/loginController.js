app.controller("loginController",function($scope,loginService){
	
	$scope.showLoginName=function(){
		loginService.loginName().success(
				function(resp){
					$scope.loginName=resp.loginName;
					console.log($scope.loginName);
		})
	}
})