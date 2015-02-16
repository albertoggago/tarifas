function tarifasListaController($scope, $http) {
    $scope.datosSTD = {
        "IVA" : 1.21,
        "DECIMALPOINT" : ',',
        "SEPARADORMILES" : '.',
        "NUMERODECIMALES" : 2,
        "VERSION" : "v00.03",
        "FICHERO" : "precios.json"
        };
    $scope.datos = [];
    $scope.valores =
        ['txt', 'txt', 'dec', 'txt', 'txt',
         'dec', 'dec', 'dec', 'dec', 'dec',
         'dec', 'num', 'txt', 'num', 'num',
         'num', 'num', 'num', 'num', 'txt',
         'dec', 'dec', 'txt' ];
    
    
}