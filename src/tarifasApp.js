var tarifasApp = angular.module('tarifasApp', [])

tarifasApp.controller("tarifasListaController", function($scope, $http, $interval) {
    $scope.datosSTD = {
        "IVA" : 1.21,
        "DECIMALPOINT" : ',',
        "SEPARADORMILES" : '.',
        "NUMERODECIMALES" : 2,
        "VERSION" : "v00.04",
        "FICHERO" : "precios.json",
        "minutosSTD": 200,
        "llamadasSTD": 50,
        "SMSSTD": 5,
        "internetSTD": 1000
        };
    
    $scope.valores =
        ['txt', 'txt', 'dec', 'txt', 'txt',
         'dec', 'dec', 'dec', 'dec', 'dec',
         'dec', 'num', 'txt', 'num', 'num',
         'num', 'num', 'num', 'num', 'txt',
         'dec', 'dec', 'txt' ];
    
    $scope.datos = {};
    $scope.datos.tabla = [];
    $scope.datos.fecha = {};
    $scope.datos.fecha.day = 0;
    $scope.datos.fecha.month = 0;
    $scope.datos.fecha.year = 0;
    $scope.datos.version = 0;
    $scope.datos.cabecera=['a','b','c,','d','e'];
    
    
    $scope.mensaje = "** Cargando Datos **";
    $scope.conta = 10;
    $scope.atrass = function (){
        $scope.mensaje = "";
    };
    
    $interval($scope.atrass,2000);
    
    
    $scope.numEdit = function (numero, decimales) { 
	    var separador_decimal = $scope.datosSTD.DECIMALPOINT;
        var separador_miles = $scope.datosSTD.SEPARADORMILES;
        numero=parseFloat(numero);
	    if(isNaN(numero)){
	        return "";
	    }

	    if(!angular.isUndefined(decimales)){
	        // Redondeamos
	        numero=numero.toFixed(decimales);
	    }

	    // Convertimos el punto en separador_decimal
	    numero=numero.toString().replace(".", separador_decimal!==undefined ? separador_decimal : ",");

	    if(separador_miles){
	        // Añadimos los separadores de miles
	        var miles=new RegExp("(-?[0-9]+)([0-9]{3})");
	        while(miles.test(numero)) {
	            numero=numero.replace(miles, "$1" + separador_miles + "$2");
	        }
	    }
	    return numero;
	}
    
    $scope.numEditImpStd = function(numero) {
	   return this.numEdit(numero,$scope.datosSTD.NUMERODECIMALES);
	};

    $scope.numEditNumStd = function(numero) {
	return this.numEdit(numero,0);
	};

    
    this.verificarVF = function(ver){
		//este proceso devuelve si la version del llamante coincide con la version guardada en el json.
		//y es del dia si es de dias posteriores hay que cargar el JSON de la version correspondiente
        var salida = false;
        var date = new Date();
        if (typeof($scope.datos.version)!="undefined") 
            {if ((ver == $scope.datos.version) &&
                 ($scope.datos.fecha.year  == date.getFullYear() && 
		    $scope.datos.fecha.month == (date.getMonth()+1) &&
		    $scope.datos.fecha.day   == date.getDate()))
            {salida = true};
            };
        return salida;
	};

    $scope.actualizarTarifas = function (){
        $scope.mensaje = "** Datos Actualizados **";
		//barremos todos los elementos y los recalculamos.
         //alert($scope.datos.fecha);

        //actualizamos Mensaje de precios
        
        $scope.datos.cabecera[2] = "Al Mes + "+$scope.numEditNumStd(($scope.datosSTD.IVA-1)*100)+"% de Impuestos"

		 for (var i = 0; i < $scope.datos.tabla.length; ++i)
	    	{
	    	 //recogemos los datos y los actualizamos
			 gasto_minutos   = parseFloat($scope.datos.minutos);
			 gasto_llamadas  = parseFloat($scope.datos.llamadas); 
			 gasto_sms       = parseFloat($scope.datos.sms);
			 gasto_internet  = parseFloat($scope.datos.internet);

			 var coste_minutos   = parseFloat($scope.datos.tabla[i].coste_minutos);
			 var coste_llamadas  = parseFloat($scope.datos.tabla[i].coste_llamadas);
			 var coste_sms       = parseFloat($scope.datos.tabla[i].coste_sms);
			 var coste_internet  = parseFloat($scope.datos.tabla[i].coste_internet);
			 var tarifa_std      = parseFloat($scope.datos.tabla[i].tarifa_std);

			 var tarifa_minima   = parseFloat($scope.datos.tabla[i].tarifa_minima);

			 var incluidos_minutos  = parseFloat($scope.datos.tabla[i].incluidos_minutos);
			 var incluidos_sms      = parseFloat($scope.datos.tabla[i].incluidos_sms);
			 var incluidos_internet = parseFloat($scope.datos.tabla[i].incluidos_internet);

			 var coste_incluido_sn = $scope.datos.tabla[i].coste_incluido_sn;
			 var sn_4G = ""
			 var sn_4G = $scope.datos.tabla[i].sn_4G;


	    	 //actualizamos el Gasto
			 $scope.datos.tabla[i].gasto_minutos= gasto_minutos;
			 $scope.datos.tabla[i].gasto_llamadas= gasto_llamadas; 
			 $scope.datos.tabla[i].gasto_sms= gasto_sms;
			 $scope.datos.tabla[i].gasto_internet= gasto_internet; 


		     //cáclulo, lo primero miramos si hemos consumido mas llamadas que las incluidas.
		     var tarifa= 0;
		     var minutos_pagar = 0;
		     if (gasto_minutos>incluidos_minutos) {
		    	 minutos_pagar = gasto_minutos-incluidos_minutos
		     };
         	 // Incluimos el coste de los minutos no incluidos. 
		     tarifa += minutos_pagar * coste_minutos / 100
		     //calculos Coste de LLamada Incluido o no.
             var llamadas_pagar = 0;
		     if (coste_incluido_sn == "NO") {
		    	 llamadas_pagar = gasto_llamadas;
		     } else {
		    	 if (gasto_minutos>incluidos_minutos) {
		    		 llamadas_pagar = (gasto_minutos-incluidos_minutos)* gasto_llamadas
		    		 if (gasto_minutos!=0){
		    			 llamadas_pagar = llamadas_pagar / gasto_minutos;
		    		 	}
		    	 	 }
		     };
                
		     tarifa += llamadas_pagar*coste_llamadas/100.0;
		     
		     //calculamos SMS
		     var sms_pagar = 0.0;
		     if (gasto_sms>incluidos_sms) {
		    	 sms_pagar = gasto_sms-incluidos_sms
		     };
		     tarifa += sms_pagar*coste_sms/100.0; 
		     var internet_pagar = 0.0;
		     if (gasto_internet>incluidos_internet) {
		    	 internet_pagar = gasto_internet-incluidos_internet;
		     };
             var sobrecoste_internet = internet_pagar*coste_internet/100.0;
		     tarifa += sobrecoste_internet;		                          
             sobrecoste_internet *= $scope.datosSTD.IVA;
		     
		     //
		     //=max(P3-L3;0)*F3/100+
		     // if(M3<>"NO";max(P3-L3;0)*Q3/if(P3<>0;P3;1);Q3)*G3/100+
		     // max(R3-N3;0)*H3/100+
		     // max(S3-O3;0)*I3/100
		     var total_base= Math.round(tarifa*100.0)/100;
		     
		      //CALCULOS ESPECIALES..... NO HACEMOS NADA
		     var calculos_especiales = 0;
		     
		     
		     //calculamos el Total + mínimos.
		     var total_minimos = 0;
		     if (total_base>tarifa_minima){
		    	 total_minimos = total_base;
		     } else {
		    	 total_minimos = tarifa_minima;
		     };
		     total_sin_IVA = Math.round((total_minimos+tarifa_std+calculos_especiales)*100.0)/100;
		     //=max(U3;K3)+J3+T3
		     //calculamos el precio con IVA
		     var total_con_IVA  = Math.round(total_sin_IVA*$scope.datosSTD.IVA*100.0)/100.0;

		     
		     //textos especiales
		     textos_especiales = "";
		     //texto Tarifa Superada
		     if (coste_internet == 0 && (gasto_internet > incluidos_internet && incluidos_internet != 0)){
		    	 textos_especiales +=  "Superada Tarifa Internet: "+$scope.numEditImpStd((gasto_internet-incluidos_internet)/gasto_internet*30)
		    	                      +" días del mes a baja velocidad"; 
		     } 
		     if (coste_internet != 0 && (gasto_internet > incluidos_internet)){
		    	 textos_especiales += "Incluido Sobrecoste por Datos de "+$scope.numEditImpStd(sobrecoste_internet)+" Euros"; 
		     } 
		     if (sn_4G == "SI" ){
		    	 textos_especiales += " - Con 4G"; 
		     } 
		     
		     //if (textos_especiales == "") {textos_especiales = "bbbb";}    
             
             if ($scope.datos.observaciones== "bbbb") {$scope.datos.observaciones== ""} 


			 //Movemos los calculos
			 $scope.datos.tabla[i].total_con_IVA  = total_con_IVA;
			 $scope.datos.tabla[i].textos_especiales  = textos_especiales;
			 $scope.datos.tabla[i].formulas_especiales = "Sin datos actualmente, pendiente";
			 $scope.datos.tabla[i].total_base = total_base;
			 $scope.datos.tabla[i].total_sin_IVA = total_sin_IVA;
             $scope.datos.tabla[i].sobrecoste_internet = sobrecoste_internet;
             
		     
	    };
	    //funcion de ordenar
	    // ya no usamos esto    
	   //$scope.datos.tabla.sort(function(a,b){return parseFloat(a[2])-parseFloat(b[2])});
		
	};    
    
    $scope.determinarFecha = function (){
		var date = new Date();
        $scope.datos.fecha = {};
		$scope.datos.fecha.year  = date.getFullYear();
		$scope.datos.fecha.month = date.getMonth()+1;
		$scope.datos.fecha.day   = date.getDate();
	};
    
    this.setMinutos = function(min) {$scope.datos.minutos = min};
	this.setLlamadas = function(llam) {$scope.datos.llamadas = llam};
	this.setSMS = function(sms) {$scope.datos.sms = sms};
	this.setInternet = function(int) {$scope.datos.internet = int};
	this.setCabecera = function(tab) {$scope.datos.cabecera = tab};
    this.getTabla = function() {return $scope.datos.tabla;};
	this.getMinutos = function() {return $scope.datos.minutos;};
	this.getLlamadas = function() {return $scope.datos.llamadas;};
	this.getSMS = function() {return $scope.datos.sms;};
	this.getInternet = function() {return $scope.datos.internet;};
    
    this.setTabla = function(tab,versionX) {
		//realizamos una carga de los datos, se usa en la creación del primer objeto
		//marcamos para poder verificar la version de uso y la fecha, para evitar que el fichero JSON cargado
		// no coincida con las funciones
		this.setMinutos($scope.datosSTD.minutosSTD);
		this.setLlamadas($scope.datosSTD.llamadasSTD);
		this.setSMS($scope.datosSTD.SMSSTD);
		this.setInternet($scope.datosSTD.internetSTD);
        $scope.datos.fechaACT = new Date();
		$scope.datos.tabla = tab;
		//recalculamos siempre que se realiza una carga para ajustarlo todo
		$scope.actualizarTarifas();
		$scope.datos.version     = versionX;
		$scope.determinarFecha();
	};

    
/*    $scope.getPrecios   = function() {
		var lista = [];
		for (var i=0; i < $scope.datos.tabla.length; i++) {
			lista.push(parseFloat($scope.datos.tabla[i][2]));
		};
		return lista
	};

	this.getPrecio   = function(i) {
		if (i>=0 && i < $scope.datos.tabla.length) {
			return parseFloat($scope.datos.tabla[i][2]);
		}
		else{
			return ""
		};
	};*/

	this.actualizar = function (eMin, eLlam, eSms, eMB){
		$scope.datos.minutos = eMin;
		$scope.datos.llamadas = eLlam;
		$scope.datos.sms = eSms;
		$scope.datos.internet = eMB;
		$scope.actualizarTarifas();
		};


    this.init = function(){
        var cargarFichero = true;
        var datosTmp   = localStorage.getItem($scope.datosSTD.FICHERO);
        if (datosTmp != null){
            //cargamos el JSON siempre que la fecha y la version coincidan
		  $scope.datos = JSON.parse(datosTmp);
		  if (this.verificarVF($scope.datosSTD.VERSION)) {cargarFichero = false;}
		  }; 
        if (cargarFichero) {
            $http.get('data/precios.'+$scope.datosSTD.VERSION+'.json').success(function(data) {
                $scope.datos = data;
                $scope.determinarFecha();
                localStorage.setItem($scope.datosSTD.FICHERO, JSON.stringify($scope.datos));
            });
        };
        
        $scope.actualizarTarifas();
    };    

    this.init();
    
    
  //$scope.datos = precios;
});

  

tarifasApp.directive('validNumber', function() {
  return {
    require: '?ngModel',
    link: function(scope, element, attrs, ngModelCtrl) {
      if(!ngModelCtrl) {
        return; 
      }

      ngModelCtrl.$parsers.push(function(val) {
        if (angular.isUndefined(val)) {
            var val = '';
        }
        var clean = val.replace( /[^0-9]+/g, '');
        if (val !== clean) {
          ngModelCtrl.$setViewValue(clean);
          ngModelCtrl.$render();
        }
        return clean;
      });

      element.bind('keypress', function(event) {
        if(event.keyCode === 32) {
          event.preventDefault();
        }
      });
    }
  };
});