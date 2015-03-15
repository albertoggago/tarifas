var conversorApp = angular.module('conversorApp', ['tarifasApp']);

conversorApp.controller('conversorController', function($scope, $http, $interval, $controller) {
    
   
    var tarifas = $controller('tarifasListaController',{$scope: $scope, $http: $http, $interval: $interval});

    
    
    //var numeroVer =  parseInt($scope.datos.version.slice($scope.datos.version.length-1,$scope.datos.version.length))+1
    //$scope.versionNew = $scope.datos.version.slice(0,$scope.datos.versionlength-1) + numeroVer; 
    $scope.versionNew = $scope.datos.version;
    //this.excel = "0At8AA5ZEAiw9dFV4MVZaUll2dkJmQjc2WGdSLWhpNFE";
    this.excel = "0At8AA5ZEAiw9dHh2Y3FuTHpCdndCZ3BOSW9SR3RwQ3c";
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
            valor = valor.replace(",",".").toString();

            //if (valor == "bbbb") {valor = ""};
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
        //tarifas.setCabecera(tablaEnt[0]);
        delete $scope.datos.cabecera;
        $scope.datos.minutos = $scope.datosSTD.minutosSTD;
        $scope.datos.llamadas = $scope.datosSTD.llamadasSTD;
        $scope.datos.internet = $scope.datosSTD.internetSTD;
        $scope.datos.sms = $scope.datosSTD.SMSSTD;
        tablaEnt.shift();
    //nueva forma de guardar la tabla
        tablaNew=[];
        for (var i = 0; i < tablaEnt.length; i++){
            tablaNew[i] = {};
            tablaNew[i].compania            =  tablaEnt[i][0];
            tablaNew[i].nombre              =  tablaEnt[i][1];
            tablaNew[i].red                 =  tablaEnt[i][2];
            tablaNew[i].textos_especiales   =  tablaEnt[i][5];
            tablaNew[i].coste_incluido_sn   =  tablaEnt[i][13];
            tablaNew[i].formulas_especiales =  tablaEnt[i][20];
            tablaNew[i].sn_4G               =  tablaEnt[i][23];
            tablaNew[i].observaciones       =  tablaEnt[i][4];
            tablaNew[i].observacionesLargo  =  "Próximamente, en esta parte irá toda la letra pequeña que vaya localizando. Y además incluiré el link para que podáis acceder la información completa de la compañia";
            tablaNew[i].link                = "http://albertoggago.es";
            tablaNew[i].reduccion           = 0;
            tablaNew[i].fechaAct            =  new Date();
            
            if (tablaNew[i].observaciones =="bbbb"){tablaNew[i].observaciones =""};
            
            tablaNew[i].total_con_IVA       =  parseFloat(tablaEnt[i][3]);
            tablaNew[i].coste_minutos       =  parseFloat(tablaEnt[i][6]);
            tablaNew[i].coste_llamadas      =  parseFloat(tablaEnt[i][7]);
            tablaNew[i].coste_sms           =  parseFloat(tablaEnt[i][8]);
            tablaNew[i].coste_internet      =  parseFloat(tablaEnt[i][9]);
            tablaNew[i].tarifa_std          =  parseFloat(tablaEnt[i][10]);
            tablaNew[i].tarifa_minima       =  parseFloat(tablaEnt[i][11]);
            tablaNew[i].incluidos_minutos   =  parseFloat(tablaEnt[i][12]);
            tablaNew[i].incluidos_sms       =  parseFloat(tablaEnt[i][14]);
            tablaNew[i].incluidos_internet  =  parseFloat(tablaEnt[i][15]);
            tablaNew[i].gasto_minutos       =  parseFloat(tablaEnt[i][16]);
            tablaNew[i].gasto_llamadas      =  parseFloat(tablaEnt[i][17]);
            tablaNew[i].gasto_sms           =  parseFloat(tablaEnt[i][18]);
            tablaNew[i].gasto_internet      =  parseFloat(tablaEnt[i][19]);
            tablaNew[i].total_base          =  parseFloat(tablaEnt[i][21]);
            tablaNew[i].total_sin_IVA       =  parseFloat(tablaEnt[i][22]);
            tablaNew[i].sobrecoste_internet =  0;
            };
            
            
            
	    //tarifas.setTabla(tablaEnt,$scope.versionNew);
        tarifas.setTabla(tablaNew,$scope.versionNew);
        
        
        
	   alert("FINALIZADO...");
       localStorage.setItem($scope.datosSTD.FICHERO, JSON.stringify($scope.datos));
    };
    
    this.subirSubVer = function (){
        var numeroVer =  $scope.versionNew.slice($scope.versionNew.length-2,$scope.versionNew.length);
        $scope.versionNew = $scope.versionNew.slice(0,$scope.versionNew.length-2);
        var numeroVer2 = parseInt(numeroVer)+1;
        if (numeroVer2 > 99) {$scope.versionNew = $scope.versionNew.concat("99");}
        else if (numeroVer2 < 10) {$scope.versionNew = $scope.versionNew.concat("0").concat(String(numeroVer2));}
        else {$scope.versionNew = $scope.versionNew.concat(String(numeroVer2));};
        };

    this.subirVer = function (){
        var numeroVer =  $scope.versionNew.slice($scope.versionNew.length-5,$scope.versionNew.length-3);
        $scope.versionNew = $scope.versionNew.slice(0,$scope.versionNew.length-5);
        var numeroVer2 = parseInt(numeroVer)+1;
        if (numeroVer2 > 99) {$scope.versionNew = $scope.versionNew.concat("99.00");}
        else if (numeroVer2 < 10) {$scope.versionNew = $scope.versionNew.concat("0").concat(String(numeroVer2)).concat(".00");}
        else {$scope.versionNew = $scope.versionNew.concat(String(numeroVer2)).concat(".00");};
        };

    
    this.bajarSubVer = function (){
        var numeroVer =  $scope.versionNew.slice($scope.versionNew.length-2,$scope.versionNew.length);
        $scope.versionNew = $scope.versionNew.slice(0,$scope.versionNew.length-2);
        var numeroVer2 = parseInt(numeroVer)-1;
        if (numeroVer2 < 0) {$scope.versionNew = $scope.versionNew.concat("00");}
        else if (numeroVer2 < 10) {$scope.versionNew = $scope.versionNew.concat("0").concat(String(numeroVer2));}
        else {$scope.versionNew = $scope.versionNew.concat(String(numeroVer2));};
        };

    this.bajarVer = function (){
        var numeroVer =  $scope.versionNew.slice($scope.versionNew.length-5,$scope.versionNew.length-3);
        $scope.versionNew = $scope.versionNew.slice(0,$scope.versionNew.length-5);
        var numeroVer2 = parseInt(numeroVer)-1;
        if (numeroVer2 < 0) {$scope.versionNew = $scope.versionNew.concat("00.00");}
        else if (numeroVer2 < 10) {$scope.versionNew = $scope.versionNew.concat("0").concat(String(numeroVer2)).concat(".00");}
        else {$scope.versionNew = $scope.versionNew.concat(String(numeroVer2)).concat(".00");};
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

conversorApp.directive("datosListaExtendida",
                     function(){
    return{
        restrict:"E",
        templateUrl: "src/views/datos-lista-extendida.html"
    };
});

conversorApp.directive("cajaEntradaConversor",
                     function(){
    return{
        restrict:"E",
        templateUrl: "src/views/caja-entrada-conversor.html"
    };
});


