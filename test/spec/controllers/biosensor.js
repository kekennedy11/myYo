'use strict';

describe('Controller: BiosensorCtrl', function () {

  // load the controller's module
  beforeEach(module('myYoProjectApp'));

  var BiosensorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BiosensorCtrl = $controller('BiosensorCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
