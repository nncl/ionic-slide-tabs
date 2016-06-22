angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $interval, $cordovaMedia) {

  // settings
  var src = "http://cut.org.br/system/uploads/audio/8077b9bca414a787488047fc4a6f3552/file/jc-954-250914-audio.mp3";
  // var media = new Media(src);
  var media = $cordovaMedia.newMedia(src);
  $scope.audioVal = 0;
  $scope.audioMax = 0;
  $scope.isPlaying = false;
  var interval;

  // methods
  $scope.media = function(){
    if (!$scope.isPlaying) {
      media.play();
      var dur = media.getDuration(media);
      console.log('dur', JSON.stringify(dur));
      setPosition();
    } else {
      $interval.cancel(interval);
      getPosition();
      media.pause();
    }

    $scope.isPlaying = !$scope.isPlaying;
  };

  $scope.stop = function(){
    if ($scope.isPlaying) {
      $scope.isPlaying = !$scope.isPlaying;
    };
    $interval.cancel(interval);
    $scope.audioVal = 0;
    media.stop();
  };

  var getPosition = function() {

    media.getCurrentPosition(
      function (position) {
        if (position > -1) {
          $scope.audioVal = position;
        }
      },
      function (e) {
        console.log("Error getting pos: " + e);
      }
    );

  };

  var setPosition = function(){
    // interval = $interval(function(){
    //   getPosition();
    // }, 1000);
  };

  $scope.$on('$ionicView.beforeLeave', function(){
    $interval.cancel(interval);
    media.stop();
  });

  $scope.seek = function(data){
    var ms = data * 1000;
    console.log('data', ms);
    media.seekTo(ms);
  };
})

.controller('BrowseCtrl', function($scope) {
  // settings
  $scope.users = [];

  for (var i = 0; i < 10; i++) {
    var obj = {
      'name' : 'Pretty Hate Machine',
      'description' : 'Nine Inch Nails',
      'image' : 'https://randomuser.me/api/portraits/women/'+i+'.jpg'
    };
    $scope.users.push(obj);
  };

  // methods
  $scope.loadMore = function(){
    for (var i = 0; i < 10; i++) {
      var obj = {
        'name' : 'New one ' + i,
        'description' : 'Nine Inch Nails',
        'image' : 'https://randomuser.me/api/portraits/women/'+i+'.jpg'
      };
      $scope.users.push(obj);
    };
  };

  $scope.doRefresh = function(){
    $scope.users = [];
    for (var i = 0; i < 10; i++) {
      var obj = {
        'name' : 'Refreshed one ' + i,
        'description' : 'Nine Inch Nails',
        'image' : 'https://randomuser.me/api/portraits/women/'+i+'.jpg'
      };
      $scope.users.push(obj);
    };

    console.log('refreshed');
    $scope.$broadcast('scroll.refreshComplete');
  };

  $scope.load = function(index){
    console.log('load', index);
  };
})

;
