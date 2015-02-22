var conversorApp = angular.module('conversorApp', ['tarifasApp']);

conversorApp.controller("conversorController", function($scope, $http, $controller) {
    
   
    var tarifas = $controller('tarifasListaController',{$scope: $scope, $http: $http});

    var numeroVer =  parseInt($scope.datos.version.slice($scope.datos.version.length-1,$scope.datos.version.length))+1
    $scope.versionNew = $scope.datos.version.slice(0,$scope.datos.version.length-1) + numeroVer; 
    this.excel = "0At8AA5ZEAiw9dFV4MVZaUll2dkJmQjc2WGdSLWhpNFE";
    $scope.feed = {};
    
    $scope.listaTabla = function (){
        var entries = $scope.feed.entry || [];
        var tablaEnt = []; 
        var fila =  [];
        var cabeceraOld = "";
        var mensajes = "Prueba";
    
	   /* funcion para extraer toda la tabla*/
        for (var i = 0; i < entries.length; i++) {
            var entry = entries[i];
            var posicion = entry.title.$t;
            var valor = entry.content.$t;
            var contarElemento = 0;
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
        tarifas.setCabecera(tablaEnt[0]);
        tablaEnt.shift();
	    tarifas.setTabla(tablaEnt,$scope.versionNew);
        
        
	   alert("FINALIZADO...");
    };
    
    
    
    this.recoger = function(){
        var url = 'https://spreadsheets.google.com/feeds/cells/' + this.excel + '/od2/public/basic?alt=json-in-script&callback=JSON_CALLBACK';
        alert(url);
        $http.jsonp(url)
            .success(function(data) {
                $scope.feed = data.feed;
                $scope.listaTabla();
                //$scope.determinarFecha();
                //localStorage.setItem($scope.datosSTD.FICHERO, JSON.stringify($scope.datos));
                })
            .error(function(){alert("Error");});
        
    };
      
    this.guardar = function (){
        var jsonBlob = new Blob([JSON.stringify($scope.datos)], {type: "text/plain"});
        var nombreArchivo = "precios."+$scope.datos.version+'.json';
        alert(nombreArchivo+" "+ jsonBlob);

    var reader = new FileReader();
    reader.onload = function (event) {
        var save = document.createElement('a');
        save.href = event.target.result;
        save.target = '_blank';
        save.download = nombreArchivo;
        var clicEvent = new MouseEvent('click', {
            'view': window,
                'bubbles': true,
                'cancelable': true
        });
        save.dispatchEvent(clicEvent);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
        };
    reader.readAsDataURL(jsonBlob);
        /*var url = "./data/prueba.txt";
        var datos = "datos";
        $http.put(url,datos)
            .succes(function (){alert("DONE")})
            .error(function (){alert("ERROR")});*/
    };
    
});