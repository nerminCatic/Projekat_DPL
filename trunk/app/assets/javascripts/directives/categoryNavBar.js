
var category_directives = angular.module('category_directives', []);
category_directives.directive('categoryNavbar', function() {
return { 
restrict : 'A',
template : '<table class="table table-striped" ng-controller="SearchCategoriesControler">'
+ '  <thead>'
+'   <tr>'
+'  <th>Naziv</th>'
            +'<th>Opis</th>'
       +'   </tr>'
+'    </thead>'
+'    <tbody>'
   +'   <tr ng-repeat="category in categories | filter:query | orderBy:orderProp">'
   +'     <td> <a class="tablea" ng-controller="HomeAdminController" ng-click="openTask()" href> {{category.name}} </a> </td>'
     +'   <td> {{category.description}}</td>'
     +'   <td>'
       +'   <div class="actions" style="margin-left:10px;float:right;"> '
           +' <button class="btn btn-primary btn-usr-mng"  ng-click="deleteCategory(category.id, $index)" ng-disabled="myForm.$invalid">Obriši</button>'
       +'   </div>  &nbsp &nbsp'
        +'  <div class="actions" style="float:right;">'
        +'    <button class="btn btn-primary btn-usr-mng" ng-controller="UpdateCategoryController" ng-click="updateCategoryRead(category.id)" "  ng-disabled="myForm.$invalid">Izmijeni</button>'
       +'   </div>'
       +' </td>'
     +' </tr>'
+'</table>' 
};
});