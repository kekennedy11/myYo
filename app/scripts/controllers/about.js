'use strict';

/**
 * @ngdoc function
 * @name myYoProjectApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the myYoProjectApp
 */
angular.module('myYoProjectApp')
  .controller('AboutCtrl', function ($scope, localStorageService) {
    var connectsInStore = localStorageService.get('connects');
    var usersInStore = localStorageService.get('users');
    var humanUsersInStore = localStorageService.get('humanUsers');


    $scope.connects = connectsInStore || [];
    $scope.users = usersInStore || [];
    $scope.humanUsers = humanUsersInStore || [];

    //var user = usersInStore[0];

    $scope.$watch('connects', function() {
        localStorageService.set('connects', $scope.connects);
    }, true);

    $scope.$watch('users', function() {
        localStorageService.set('users', $scope.users);
     //    usersInStore = localStorageService.get('users');
    }, true);

    $scope.addUser = function() {
    	$scope.users.push($scope.user);
    	$scope.user = '';
    };

  	var connectBtn = document.getElementById('connect-health-data-btn');
	//user = usersInStore[0];
	//console.log(user);
	var isNewUser = function() {
		return true;
	};
	connectBtn.addEventListener('click', function() {
		var opts;
		if (isNewUser) {
			opts = {
			    // grab this from the app settings page
			    clientId: 'dc49e300aa045f31ec8ee84ed1797cacda1d6d51',
			    // can be email or any other internal id of the user in your system
			    clientUserId: encodeURIComponent('Jack'),
			    finish: function(err, sessionTokenObject) {
			      // When user finishes health data connection to your app, `finish` function will be called.
			      // `sessionTokenObject` object will have several fields in it.
			      // You need to pass this `sessionTokenObject` object to your server
			      // add `CLIENT_SECRET` to it and send `POST` request to the `https://user.humanapi.co/v1/connect/tokens` endpoint.
			      // In return you will get `accessToken` for that user that can be used to query Human API.
			      var CLIENT_SECRET = '0739031ce50764dae0f92adf12fbfa4355c3a112';
			      sessionTokenObject.clientSecret = CLIENT_SECRET;
			      delete sessionTokenObject.userId;
			      console.log('About to post');
			      console.log(sessionTokenObject);
			      $.post(
			      		'http://user.humanapi.co/v1/connect/tokens', 
			      		sessionTokenObject, 
			      		function(){
			      			console.log('response');
			      	// 		console.log(res);
			      	// 		$scope.connect = res;
			    			// $scope.connects.push($scope.connect);
			    			// $scope.connect = '';
			      		}, 
			      		'application/json'
			      );
			    },
			    close: function() {
			    }
			};
		}
		else {
			opts = {
				  publicToken: 'PUBLIC_TOKEN_FOR_THE_USER', // you should have this from the succesful authentication flow
				  clientUserId: encodeURIComponent('ID_FOR_THE_USER_IN_YOUR_APP'), // can be email or any other unique identifier
				  close: function() {
				  },
				  error: function(err) {
				  } 
			};
		}
		HumanConnect.open(opts);
	});
});
