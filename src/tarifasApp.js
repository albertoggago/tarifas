var tarifasApp = angular.module('tarifasApp', [])

tarifasApp.controller("tarifasListaController", function($scope, $http) {
    $scope.datosSTD = {
        "IVA" : 1.21,
        "DECIMALPOINT" : ',',
        "SEPARADORMILES" : '.',
        "NUMERODECIMALES" : 2,
        "VERSION" : "v00.03",
        "FICHERO" : "precios.json"
        };
    
    $scope.valores =
        ['txt', 'txt', 'dec', 'txt', 'txt',
         'dec', 'dec', 'dec', 'dec', 'dec',
         'dec', 'num', 'txt', 'num', 'num',
         'num', 'num', 'num', 'num', 'txt',
         'dec', 'dec', 'txt' ];
    $scope.datos = [];
    
    $scope.numEdit = function (numero, decimales) { // v2007-08-06
	    var separador_decimal = $scope.datosSTD.DECIMALPOINT;
        var separador_miles = $scope.datosSTD.SEPARADORMILES;
        numero=parseFloat(numero);
	    if(isNaN(numero)){
	        return "";
	    }

	    if(decimales!==undefined){
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
		if (ver != $scope.datos.version) {return false};
		var date = new Date();
		if ($scope.datos.fecha.year  == date.getFullYear() && 
		    $scope.datos.fecha.month == (date.getMonth()+1) &&
		    $scope.datos.fecha.day   == date.getDate()) {return true};
        return false;
	};

    $scope.recalculo = function (){
		//barremos todos los elementos y los recalculamos.
         //alert($scope.datos.fecha);
		 for (var i = 0; i < $scope.datos.tabla.length; ++i)
	    	{
	    	 //recogemos los datos
			 var gasto_minutos   = parseFloat($scope.datos.minutos);
			 var gasto_llamadas  = parseFloat($scope.datos.llamadas); 
			 var gasto_sms       = parseFloat($scope.datos.sms);
			 var gasto_internet  = parseFloat($scope.datos.internet);

			 var coste_minutos   = parseFloat($scope.datos.tabla[i][5]);
			 var coste_llamadas  = parseFloat($scope.datos.tabla[i][6]);
			 var coste_sms       = parseFloat($scope.datos.tabla[i][7]);
			 var coste_internet  = parseFloat($scope.datos.tabla[i][8]);
			 var tarifa_std      = parseFloat($scope.datos.tabla[i][9]);

			 var tarifa_minima   = parseFloat($scope.datos.tabla[i][10]);

			 var incluidos_minutos  = parseFloat($scope.datos.tabla[i][11]);
			 var incluidos_sms      = parseFloat($scope.datos.tabla[i][13]);
			 var incluidos_internet = parseFloat($scope.datos.tabla[i][14]);

			 var coste_incluido_sn = $scope.datos.tabla[i][12].toString();
			 var sn_4G = ""
			 var sn_4G = $scope.datos.tabla[i][22];
			 /*if (typeof($scope.datos.tabla[i][22]) != "undefined")
			          {sn_4G    = $scope.datos.tabla[i][22].toString();}
			      else{sn_4G = "NO";
			      	$scope.datos.tabla[i][22] = sn_4G
			      };*/


	    	 //actualizamos el Gasto
			 $scope.datos.tabla[i][15]= gasto_minutos;
			 $scope.datos.tabla[i][16]= gasto_llamadas; 
			 $scope.datos.tabla[i][17]= gasto_sms;
			 $scope.datos.tabla[i][18]= gasto_internet; 




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
		     //calculamos Internet
		     var sms_pagar = 0.0;
		     if (gasto_sms>incluidos_sms) {
		    	 sms_pagar = gasto_sms-incluidos_sms
		     };
		     tarifa += sms_pagar*coste_sms/100.0; 
		     var internet_pagar = 0.0;
		     if (gasto_internet>incluidos_internet) {
		    	 internet_pagar = gasto_internet-incluidos_internet
		     };
		     tarifa += internet_pagar*coste_internet/100.0;		    	 
		     
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
		    	 textos_especiales += "Incluido Sobrecoste por Datos de "+$scope.numEditImpStd(internet_pagar*coste_internet/100.0*$scope.datosSTD.IVA)+" Euros"; 
		     } 
		     if (sn_4G == "SI" ){
		    	 textos_especiales += " - Con 4G"; 
		     } 
		     
		     if (textos_especiales == "") {textos_especiales = "bbbb";}
		     
		     //=concatenate(
		     //if(and(I3=0;O3<S3);concatenate("Superada Tarifa Internet: ";fixed((S3-O3)/S3*30;2);" días del mes a baja velocidad");
		     //if(O3<S3;concatenate("Incluido Sobrecoste por Datos de ";Fixed((S3-O3)*I3*1,21/100;2);" Euros");""));
		     //if(W3="SI";" - Con 4G";"bbbb"))

			 //Movemos los calculos
			 $scope.datos.tabla[i][2]  = total_con_IVA;
			 $scope.datos.tabla[i][4]  = textos_especiales;
			 $scope.datos.tabla[i][19] = "pendiente";
			 $scope.datos.tabla[i][20] = total_base;
			 $scope.datos.tabla[i][21] = total_sin_IVA;
		     
	    };
	    //funcion de ordenar
	    // ya no usamos esto    
	    //  $scope.datos.tabla.sort(function(a,b){return parseFloat(a[2])-parseFloat(b[2])});
		
	};    
    
    $scope.determinarFecha = function (){
		var date = new Date();
		this.datos.fecha.year  = date.getFullYear();
		this.datos.fecha.month = date.getMonth()+1;
		this.datos.fecha.day   = date.getDate();
		
	};

    var cargarFichero = true;
    var datosTmp   = localStorage.getItem($scope.datosSTD.FICHERO);
    if (datosTmp != null){
		//cargamos el JSON siempre que la fecha y la version coincidan
		$scope.datos = JSON.parse(datosTmp);
		$scope.recalculo();
		if (this.verificarVF($scope.datosSTD.VERSION)) {cargarFichero = false};
		}; 
    if (cargarFichero) {
        $http.get('../data/precios.'+$scope.datosSTD.VERSION+'.json').success(function(data) {
        $scope.datos = data;
        $scope.recalculo();
        $scope.determinarFecha();
        localStorage.setItem($scope.datosSTD.FICHERO, JSON.stringify($scope.datos));
        });
    };
    
  //$scope.datos = precios;
});

