var auth = angular.module('auth', ['ngResource']);

// Auth = Login service
auth.factory('AuthService', function($http, $q, $rootScope, AuthToken,$location) {
  return {
    login: function(email, password) {
      var d = $q.defer();
      $http.post('/api/auth', {
        email: email,
        password: password
      }).success(function(resp) {
        AuthToken.set(resp.auth_token, resp.user_name, resp.user_surname, resp.user_role, resp.user_id);
        d.resolve(resp.user);
        // For manager - special functionality
        if(AuthToken.getRole() == "menadzer")
        {
          $location.path('/home_admin'); 
        }
        else if (AuthToken.getRole() == "Uposlenikd")
        {
          $location.path('/doctor'); 
        }
        else if (AuthToken.getRole() == "Uposlenikm")
        {
          $location.path('/nerse'); 
        }
        else
        {
          $location.path('/home'); 
        }
      }).error(function(resp) {
        console.log($rootScope);
       // $scope.errorMsg ="Netačni podaci!";
        d.reject(resp.error);
        alert("Pogrešni login podaci!"); 
        $location.path('/login');
      });
      return d.promise;
    }
  };
});

auth.service('AuthToken', function() {
  this.set = function(token, name, surname, role, userId) { 
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    localStorage.setItem("surname", surname);
    localStorage.setItem("role", role);
    localStorage.setItem("userId", userId);
  };
  this.get = function() { return localStorage.getItem("token"); };
  this.getRole = function() { return localStorage.getItem("role"); };
  this.getUser = function() { return localStorage.getItem("name")+" "+localStorage.getItem("surname"); };
  this.getUserId = function() { return localStorage.getItem("userId"); };
  this.unset =  function() { 
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
   localStorage.removeItem("userId");
 localStorage.removeItem("surname");  }
});

auth.factory("AuthInterceptor", function($q, $injector, $location) {
  return {
    // This will be called on every outgoing http request
    request: function(config) {
      var AuthToken = $injector.get("AuthToken");
      var token = AuthToken.get();
      config.headers = config.headers || {};
      if (token) {
        config.headers.Authorization = "Bearer " + token;
      }
      return config || $q.when(config);
    },
    responseError: function(response) {
      var matchesAuthenticatePath = response.config && response.config.url.match(new RegExp('/api/auth'));
      if (!matchesAuthenticatePath) {
        $location.path('/login');
      }
      $location.path('/login');
      return $q.reject(response);
    }
  };
});

auth.config(function($httpProvider) {
  return $httpProvider.interceptors.push("AuthInterceptor");
});