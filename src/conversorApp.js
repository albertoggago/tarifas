var conversorApp = angular.module('conversorApp', ['tarifasApp']);

conversorApp.controller("conversorController", function($scope, $http, $controller) {
    
   
    var tarifas = $controller('tarifasListaController',{$scope: $scope, $http: $http});

    this.versionNew = $scope.datos.version; 
    $scope.feed = {};
   
    $scope.listaTabla = function (){
        var entries = $scope.feed.entry || [];
        var tablaEnt = []; 
        var fila =  [];
        var cabeceraOld = "";
        var mensajes = "Prueba";
    
	   /* funcion para extraer toda la tabla*/
        alert(entries.length);
        for (var i = 0; i < entries.length; i++) {
            var entry = entries[i];
            var posicion = entry.title.$t;
            var valor = entry.content.$t;
            valor = valor.replace(",",".").toString();

            if (valor == "bbbb") {valor = ""};
	        var x = posicion.substring(1,posicion.length);	 
            if (x == cabeceraOld || fila.length==0)
		      { fila.push(valor);
		    }
	        else {
                tablaEnt.push(fila);
		        fila = [];
		        fila.push(valor);
            };
            cabeceraOld = x;
        };
    
        $scope.determinarFecha();
        $scope.datos.version = this.versionNew;
        tarifas.setCabecera(tablaEnt[0]);
        tablaEnt.shift();
	    tarifas.setTabla(tablaEnt);
        
        
	   
    };
    
    
    
    this.recoger = function(){
        $http.jsonp('https://spreadsheets.google.com/feeds/cells/0At8AA5ZEAiw9dFV4MVZaUll2dkJmQjc2WGdSLWhpNFE/od2/public/basic?alt=json-in-script&callback=JSON_CALLBACK')
            .success(function(data) {
                $scope.feed = data.feed;
                $scope.listaTabla();
                //$scope.determinarFecha();
                //localStorage.setItem($scope.datosSTD.FICHERO, JSON.stringify($scope.datos));
                })
            .error(function(){alert("Error");});
        
    };
      
    
    
});