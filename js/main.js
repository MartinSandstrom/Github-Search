
//	1p/repo, 5p/star, 10p/repo follower, 20p/user follower, 3p/skickad o godkänd pull request, 5p/mottagen pull request


(function(){

    var app = angular.module("myAngularApp", []);

    var myController = function($scope, $http){
        
        var onError = function(reason){
            alert("Could not find the user");  
        };

        var onRepos = function(response) {
            $scope.repos = response.data;
        };

        var onComplete = function(response){
            $scope.user = response.data;
            $http.get($scope.user.repos_url)
            .then(onRepos, onError);
        };

        $scope.sortList = function(option){
            $scope.repoSortOrder = option;
        };

        $scope.search = function(username){
            $http.get("https://api.github.com/users/" + username)
            .then(onComplete, onError);
        };

        $scope.getMyGames = function(id){
            var steamKey = "FF34AE7B4EA9D4373C434AA939E7D0D1";
            var url = '//api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=' + steamKey + '&steamid=' + id + '&format=json';
            $http.jsonp(url + '&callback=JSON_CALLBACK').success(function(result){
                $scope.gameInfo = result.response;
            });
        };
        
        $scope.go = function(){
          ready = true;  
        };

        $scope.ready = false;
        $scope.id = "76561197960434622";
        $scope.username = "Seriema";
        $scope.message = 'Search for information about a github account';  
        $scope.repoSortOrder = "-stargazers_count";


    };

    app.controller("myController", myController);
}());
