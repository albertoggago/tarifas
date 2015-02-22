describe('conversorControl', function() {

    beforeEach(module('conversorApp'));
    
  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('conversorController', {
      $scope: scope
    });
  }));
    

	 
});  
