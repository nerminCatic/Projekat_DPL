var localization_directives = angular.module('localization_directives', []);

// Multiply directive for localization 
localization_directives.directive('localizationBsEn', function() {
return {
restrict : 'A',
template : '<div ng-controller="LanguageController">'
            +'<button class="btn btn-info translate1" ng-click="changeLanguage(\'bs\')"><img src="/assets/flag1.png" height="20" width="30"></button>'
            +'<button class="btn btn-info translate2" ng-click="changeLanguage(\'en\')"><img src="/assets/flag2.png" height="20" width="30"></button>'
          +'</div>'  
};
});