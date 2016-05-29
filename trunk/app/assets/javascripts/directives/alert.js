var alerts_directives = angular.module('alerts_directives', []);
alerts_directives.directive('alertDirective', function() {
  return {
    restrict : 'A',
    template : 'alerts.html'
  };
});