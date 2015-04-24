var basketNg = angular.module('basketNg', [


]);

basketNg.config(function(
	$stateProvider, 
	$urlRouterProvider
) {

	$urlRouterProvider.otherwise('save');

	$stateProvider      
	  .state('save', {
	    url: '/save',
	    controller: 'SaveCtrl',
	    templateUrl: 'views/saveBaskets.html'
	  })

})

basketNg.controller('toggleCtrl', ['$scope', function($scope) {
	console.log("In the controller");

  $scope.tab = 1;

  $scope.setTab = function(tabNumber) {
    $scope.tab = tabNumber;
  };

  $scope.isSet = function(tabNumber) {
    return tabNumber === $scope.tab;
  };

  $scope.shareLink = function() {
  	console.log("You are about to share");
  };

  $scope.saveLink = function() {
  	console.log("You are about to save");
  }
}]);

basketNg.factory('sharedLinks',  ['http', function($http){
  var sharedLinks = {}

  sharedLinks.get = function() {
    var request = $http({
                    method: 'get',
                    url: '/localhost:3000/users_inbox_links'});
    console.log("Request!");
    console.log(request);
    return request;
  }
  return sharedLinks
}]);

// basketNG.controller('linksController', ['$scope', 'sharedLinks', function($scope, sharedLinks) {
//   // console.log(sharedLinks.request);
//   $scope.fetchLinks = function(){
//     console.log("Woo I've been clicked!");
//     sharedLinks.get().then(function(response){
//       $scope.links = response
//     });
//   };
// }]);