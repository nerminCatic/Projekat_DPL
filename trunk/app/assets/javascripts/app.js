'use strict';
var estamparija = angular.module('estamparija',[
  'templates',
  'ngRoute',
  'controllers',
  'services',
  'auth',
  'translations',
  'feedback_directives',
  'navbar_directives',
  'localization_directives',
  'category_directives',
  'angularFileUpload',
  'alerts_directives',
 'nvd3'
]);

estamparija.config([ '$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: "login.html",
        //controller: 'LoginController'
      }).
      when('/register', {
        templateUrl: "register.html",
        controller: 'RegistrationController'
      }).
      when('/home', {
        templateUrl: "home.html",
      //  controller: 'HomeController'
      }).
      when('/home_admin', {
        templateUrl: "home_admin.html",
        controller: 'HomeAdminController'
      }).
      when('/feedback_admin', {
        templateUrl: "feedback_admin.html",
        controller: 'FeedbackCtrl'
      }).
      when('/category_admin', {
        templateUrl: "category_admin.html",
        //controller: 'FeedbackAdminController'
      }).
      when('/user_management', {
        templateUrl: "user_management.html",
        //controller: 'UserManagementController'
      }).
      when('/password-reset', {
        templateUrl: "password-reset.html",
        controller: 'ResetController'
      }).
      when('/inputs-password-reset', { 
        templateUrl: "inputs-password-reset.html",
        controller: 'InsertPwdForResetController'
      }).
      when('/changepass',{
         templateUrl: "changepass.html",
         controller: 'ChangePassController'
      }).
      when('/changepass_admin',{
         templateUrl: "changepass_admin.html",
         controller: 'ChangePassController'
      }).
      when('/register_user_by_manager',{
         templateUrl: "register_user_by_manager.html",
        // controller: 'RegistrationUserByManagerController'
      }).
      when('/edit_user_by_manager',{
         templateUrl: "edit_user_by_manager.html",
         controller: 'EditUserByManagerController'
      }).
      when('/sestra',{
         templateUrl: "sestra.html",
         controller: 'SearchReservationsControler'
      }).
      when('/edit_reservation',{
         templateUrl: "edit_reservation.html",
         controller: 'EditReservationController'
      }).
      when('/questions',{
        templateUrl: "questions.html",
        //controller: 'ChangePassController'
      }).
      when('/add_question',{
        templateUrl: "add_question.html",
        //controller: 'ChangePassController'
      }).
      when('/questions/:id',{
        templateUrl: "show_question.html",
        //controller: 'ChangePassController'
      }).
      when('/questions/:id/resources', {
        templateUrl: "resources.html",
        controller: "ResourcesCtrl"
      }).
      when('/questions/:id/new_resource', {
        templateUrl: 'new_resource.html',
        controller: 'NewResourceCtrl'
      }).
      when('/new_category',{
          templateUrl: "new_category.html",
         // controller: 'ChangePassController'
        }).
      when('/update_category/:id',{
          templateUrl: "update_category.html",
        }).
      when('/role_admin',{
          templateUrl: "role_admin.html",
          
        }).
      when('/add_new_role',{
          templateUrl: "add_new_role.html",
          
        }).
      when('/edit_role/:id',{
          templateUrl: "edit_role.html",
          
        }).
       when('/charts',{
          templateUrl: "charts.html",
          
        }).
       when('/doctor',{
          templateUrl: "doctor.html",
          controller: 'DoctorController'
        }).
       when('/nerse',{
          templateUrl: "sestra.html",
          controller: 'NerseController'
        }).
       when('/tasks',{
          templateUrl: "tasks.html",
        }).
       when('/add_task',{
          templateUrl: "add_task.html",
        }).
       when('/tasks/:id',{
        templateUrl: "show_task.html",
        //controller: 'ChangePassController'
      }).
      otherwise({
        templateUrl: "welcome.html",
      });
  }
]);
//Komentar