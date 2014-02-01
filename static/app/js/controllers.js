'use strict';

/* Controllers */

angular.module('skycoin.controllers', [])

.controller('mainCtrl', ['$scope','$http', '$modal', '$log',
  function($scope,$http,$modal,$log) {
  	$scope.addresses = [];

  	$scope.loadWallet = function(wallet){
	  var data = {WalletName:wallet};
	  console.log('wallet is loading:' + wallet);
      $http.post('/api/loadWallet', JSON.stringify(data)).success(function(response){
        console.dir(response);
        $scope.loadedWallet = response;
        $scope.addresses = response.Addresses;
      });
	 }

	 console.log('local storage wallet is ' + localStorage.loadedWallet)
	 $scope.loadWallet(localStorage.loadedWallet);

	 $scope.saveWallet = function(){
	  var data = {Addresses:$scope.addresses};
      $http.post('/api/saveWallet', JSON.stringify(data)).success(function(response){
        console.dir(response);
        $scope.loadedWalletName = response;
        localStorage.loadedWallet = response.replace(/"/g, "");
      });
	 }

	 $scope.newAddress = function(){
	  	$http.get('/api/newAddress').success(function(response) {
	      console.dir(response);
	      $scope.addresses.push(response.replace(/"/g, ""));
	      $scope.saveWallet();
	    });
	 }

	 $scope.mainBackUp = function(){

	 }




	 $scope.openQR = function (address) {

      var modalInstance = $modal.open({
        templateUrl: 'qrModalContent.html',
        controller: "qrInstanceCtrl",
        resolve: {
          address: function () {
            return address;
          }
        }
      });

      modalInstance.result.then(function () {
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

}])


.controller('qrInstanceCtrl', ['$http', '$scope', '$modalInstance', 'address',
  function($http, $scope, $modalInstance, address) {

  $scope.address = address;
  $scope.qro = {};
  $scope.qro.fm = address;


  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);