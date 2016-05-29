var navbar_directives = angular.module('navbar_directives', []);
navbar_directives.directive('navbar', function() {
return { 
  restrict : 'A',
  template : '<nav class="navbar navbar-custom navbar-fixed-top ribbon nblue" role="navigation">'
  + '<div class="localization-bs-en" localization-bs-en></div>'
  +   '<div class="container" ng-controller="HomeController">'
  +      '<div class="navbar-header page-scroll">'
  +         '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-main-collapse">'
  +            '<i class="fa fa-bars"></i>'
  +      '</button>'
  +      '<a class="navbar-brand" href="">'
  +         '<h1 class="naslov1">eSTAMPARIJA</h1>'
  +      '</a>'
  +        '</div>'
  +        '<div class="collapse navbar-collapse navbar-right navbar-main-collapse navbar-font">'
  +         '<ul class="nav navbar-nav navbar-font">'
  +          '<li class="active"><a href ng-click="openHome()""><span>{{ "HOME" | translate }}</span></a></li>'
  +         '<li><a href><span>{{ "ABOUT" | translate }}</span></a></li>'
  +        '<li><a href ng-click="openChangePass()"><span>{{ "CHANGE_PASS" | translate }}</span></a></li>'
  +       '<li><a href ng-click="logout()"><span>{{ "LOGOUT" | translate }}</span></a></li>'
  +          '</ul>'
  +        '</div>'
  +     '</div>'
  + '</nav>'
  };
});