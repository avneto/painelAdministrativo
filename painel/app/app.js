const path_server = 'http://netooo.esy.es/server/';

var $app = angular.module('painel', ['ngRoute','ngCookies', 'textAngular']);

$app.directive('setFocus', ['$timeout',
    function ($timeout) {
        var checkDirectivePrerequisites = function (attrs) {
          if (!attrs.setFocus && attrs.setFocus != "") {
                throw "FocusOnCondition missing attribute to evaluate";
          }
        }

        return {            
            restrict: "A",
            link: function (scope, element, attrs, ctrls) {
                checkDirectivePrerequisites(attrs);

                scope.$watch(attrs.setFocus, function (currentValue, lastValue) {
                    if(currentValue == true) {
                        $timeout(function () {  
                            element[0].focus();
                            element[0].select();
                        });
                    }
                });
            }
        };
    }
]);