var tarifasApp = angular.module('tarifasApp', ['ngAnimate']);

tarifasApp.controller('tarifasListaController', function($scope, $http, $interval) {
    $scope.datosSTD = {
        "IVA" : 1.21,
        "DECIMALPOINT" : ',',
        "SEPARADORMILES" : '.',
        "NUMERODECIMALES" : 2,
        "VERSION" : "v00.07",
        "FICHERO" : "precios.json",
        "minutosSTD": 300,
        "llamadasSTD": 20,
        "SMSSTD": 5,
        "internetSTD": 1000,
        "TAB": [1,0,0,0]
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
    $scope.tarifaGuardada = {};
    $scope.tarifaGuardada.reduccion = 0;
    $scope.tarifaGuardada.coste_internet = 0;
    $scope.tarifaGuardada.pagina = 1;
    $scope.datos.tab=[1,0,0,0];
    
    $scope.ordenar="dias_sin_internet*5+total_con_IVA";
    
    $scope.indice=0;
    
    
    $scope.textoIVA = function (){
        if ($scope.datosSTD.IVA == 1.0) {return "";}
        else return "(Impuestos incluidos)";
    };
    
    
    
    $scope.mensaje = "";
    $scope.atrass = function (){
        if ($scope.mensaje.charAt($scope.mensaje.length-1)==".")
            {$scope.mensaje = $scope.mensaje.slice(0,$scope.mensaje.length-1)}
        else
            {$scope.mensaje = "";};
    };
    
    $interval($scope.atrass,250);
    
    
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
        
        $scope.mensaje = "** Datos Actualizados..........";
		//barremos todos los elementos y los recalculamos.
         //alert($scope.datos.fecha);

        //actualizamos Mensaje de precios
        $scope.actualizarTarifas2();

        //Cada vez que actualizamos hay que guardar los datos
        localStorage.setItem($scope.datosSTD.FICHERO, JSON.stringify($scope.datos));
        
        
	    //funcion de ordenar
	    // ya no usamos esto    
	   //$scope.datos.tabla.sort(function(a,b){return parseFloat(a[2])-parseFloat(b[2])});
		
	};
    
    $scope.actualizarTarifas2 = function (){
        
    
        $scope.datos.cabeceraMes = "Precio Completo + "+$scope.numEditNumStd(($scope.datosSTD.IVA-1)*100)+"% de Impuestos"

		 for (var i = 0; i < $scope.datos.tabla.length; ++i)
	    	{
             $scope.actualizarFila(i);    

		     
	    };
		
	};
    
    $scope.actualizarFila = function (i) {
        	    	 //recogemos los datos y los actualizamos
			 gasto_minutos   = parseFloat($scope.datos.minutos);
             if (isNaN(gasto_minutos) ||gasto_minutos=="") {gasto_minutos=0}
             gasto_llamadas  = parseFloat($scope.datos.llamadas); 
			 if (isNaN(gasto_llamadas) || gasto_llamadas=="") {gasto_llamadas=0}
             gasto_sms       = parseFloat($scope.datos.sms);
             if (isNaN(gasto_sms)||gasto_sms=="") {gasto_sms=0}
			 gasto_internet  = parseFloat($scope.datos.internet);
             if (isNaN(gasto_internet)||gasto_internet=="") {gasto_internet=0}
                
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
             llamadas_pagar = Math.round(llamadas_pagar);
                
		     // Incluimos el coste de los minutos no incluidos. 
		     var precio_llamadas =  minutos_pagar * coste_minutos / 100;
		     precio_llamadas += llamadas_pagar*coste_llamadas/100.0;
		     tarifa += precio_llamadas;
		     
		     //calculamos SMS
		     var sms_pagar = 0.0;
		     if (gasto_sms>incluidos_sms) {
		    	 sms_pagar = gasto_sms-incluidos_sms;
		     };
		     var precio_sms = sms_pagar*coste_sms/100.0;
		     tarifa +=  precio_sms;
		     var internet_pagar = 0.0;
		     if (gasto_internet>incluidos_internet) {
		    	 internet_pagar = gasto_internet-incluidos_internet;
		     };
             var sobrecoste_internet = internet_pagar*coste_internet/100.0;
		     tarifa += sobrecoste_internet;
             if (sobrecoste_internet == 0)
                {internet_pagar = 0};
             
		     
		     //
		     //=max(P3-L3;0)*F3/100+
		     // if(M3<>"NO";max(P3-L3;0)*Q3/if(P3<>0;P3;1);Q3)*G3/100+
		     // max(R3-N3;0)*H3/100+
		     // max(S3-O3;0)*I3/100
             var base_sin_IVA= tarifa_minima + tarifa_std;
		     
             var total_gasto= Math.round(tarifa*100.0)/100;
		     
		      //CALCULOS ESPECIALES..... NO HACEMOS NADA
		     var calculos_especiales = 0;
		     
		     
		     //calculamos el Total + mínimos.
		     var total_minimos = 0;
		     if (total_gasto>tarifa_minima){
		    	 total_minimos = total_gasto;
		     } else {
		    	 total_minimos = tarifa_minima;
		     };
		     total_sin_IVA = Math.round((total_minimos+tarifa_std+calculos_especiales)*100.0)/100;
		     //=max(U3;K3)+J3+T3
		     //calculamos el precio con IVA
		     var total_con_IVA  = Math.round(total_sin_IVA*$scope.datosSTD.IVA*100.0)/100.0;

		     var dias_sin_internet =  0;
             if (gasto_internet > incluidos_internet && sobrecoste_internet == 0 )
                {dias_sin_internet=Math.round((gasto_internet-incluidos_internet)/gasto_internet*30)};
		     //textos especiales
		     textos_especiales = "";
		     //texto Tarifa Superada
		     /*if (coste_internet == 0 && (gasto_internet > incluidos_internet && incluidos_internet != 0)){
		    	 textos_especiales +=  "Superada Tarifa Internet: "+$scope.numEditImpStd(dias_sin_internet)
		    	                      +" días del mes a baja velocidad"; 
		     } 
		     if (coste_internet != 0 && (gasto_internet > incluidos_internet)){
		    	 textos_especiales += "Incluido Sobrecoste por Datos de "+$scope.numEditImpStd(sobrecoste_internet*$scope.datosSTD.IVA)+" Euros"; 
		     }*/ 
		     if (sn_4G == "SI" ){
		    	 textos_especiales += "4G"; 
		     } 
		     
		     //if (textos_especiales == "") {textos_especiales = "bbbb";}    
             texto_condiciones="";
             if (incluidos_minutos>90000)
             {
                 texto_condiciones+="Infinita";
             } else 
             {
                 if (incluidos_minutos>0)
                {
                    texto_condiciones+=incluidos_minutos +" min. ";
                };
                if (coste_minutos==0)
                {
                 texto_condiciones+="Tarifa Cero";
                };
             };
             if (incluidos_internet>0)
             {
                 if (texto_condiciones.length>0) {texto_condiciones+=" - ";};
                 texto_condiciones+= $scope.numEdit(incluidos_internet/1000,2);
                 texto_condiciones+= "GB";
                 
             };
             
             
             if ($scope.datos.observaciones== "bbbb") {$scope.datos.observaciones== ""} 
        
             var tarifa_base = base_sin_IVA * $scope.datosSTD.IVA; 


			 //Movemos los calculos
			 $scope.datos.tabla[i].total_con_IVA  = total_con_IVA;
			 $scope.datos.tabla[i].textos_especiales  = textos_especiales;
			 $scope.datos.tabla[i].formulas_especiales = "Sin datos actualmente, pendiente";
			 $scope.datos.tabla[i].base_sin_IVA = base_sin_IVA;
			 $scope.datos.tabla[i].total_sin_IVA = total_sin_IVA;
             $scope.datos.tabla[i].sobrecoste_internet = sobrecoste_internet;
             $scope.datos.tabla[i].tarifa_base = tarifa_base;
             $scope.datos.tabla[i].dias_sin_internet = dias_sin_internet;

			 //Movemos los calculos extras
			 $scope.datos.tabla[i].minutos_pagar = minutos_pagar;	
			 $scope.datos.tabla[i].llamadas_pagar = llamadas_pagar;	
			 $scope.datos.tabla[i].internet_pagar = internet_pagar;
			 $scope.datos.tabla[i].sms_pagar = sms_pagar;

			 $scope.datos.tabla[i].precio_llamadas = precio_llamadas;
			 $scope.datos.tabla[i].precio_sms      = precio_sms;
             $scope.datos.tabla[i].texto_condiciones = texto_condiciones;
			 
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
	this.getTabla = function() {return $scope.datos.tabla;};
	this.getMinutos = function() {return $scope.datos.minutos;};
	this.getLlamadas = function() {return $scope.datos.llamadas;};
	this.getSMS = function() {return $scope.datos.sms;};
	this.getInternet = function() {return $scope.datos.internet;};
    
    this.setTabla = function(tabla_ent,versionX) {
		//realizamos una carga de los datos, se usa en la creación del primer objeto
		//marcamos para poder verificar la version de uso y la fecha, para evitar que el fichero JSON cargado
		// no coincida con las funciones
		this.setMinutos($scope.datosSTD.minutosSTD);
		this.setLlamadas($scope.datosSTD.llamadasSTD);
		this.setSMS($scope.datosSTD.SMSSTD);
		this.setInternet($scope.datosSTD.internetSTD);
        $scope.datos.fechaAct = new Date();
		$scope.datos.tabla = tabla_ent;
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
		$scope.actualizarTarifas2();
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
    
    
    $scope.getTab = function(pos) {
          return $scope.datos.tab[pos];
        };

    $scope.isSet = function(pos,checkTab) {
          return $scope.datos.tab[pos] === checkTab;
        };

    $scope.setTab = function(activeTab) {
          $scope.datos.tab = activeTab;
          if ($scope.datos.tab[3]==1) {$scope.guardarJSON()};
        };

    $scope.setTabFila = function(pos,active) {
          $scope.datos.tab[pos] = active;
          if (pos==3&&active==1) {$scope.guardarJSON()};
        };

    $scope.guardarTarifa = function (tarifa) {
        $scope.tarifaGuardada = tarifa;
        $scope.setTabFila(3,2);
    };
    
    $scope.guardarJSON = function() {
        var temp =0;
        if ($scope.datos.tab[3]==1||$scope.datos.tab[3]==0) {
            localStorage.setItem($scope.datosSTD.FICHERO, JSON.stringify($scope.datos));
        };
    };
    
    

    $scope.reduccion = function() {
        if ($scope.tarifaGuardada.reduccion == 0||$scope.tarifaGuardada.dias_sin_internet == 0)
        {
            return "";
        } else
        {
            return ("a "+$scope.tarifaGuardada.reduccion+" Kb/s")
        };
    };
    
    $scope.textoReduccion = function() {
        var redd = $scope.tarifaGuardada.reduccion;
        var coste = $scope.tarifaGuardada.coste_internet;
        var dias = $scope.tarifaGuardada.dias_sin_internet;
        var salida = ""
        if (coste == 0 ) 
        { 
            if (isNaN(redd) ||redd == 0) 
            {
                salida = "Tiene reduccion de Internet.";
            } else 
            {
                salida = "Tiene reduccion de Internet a "+redd+" Kb/s.";
            };
            if (dias > 0)
            {
                salida += " Vas a estar " +$scope.numEdit(dias,0) +" días con el Internet reducido." 
            };
        } else
        {
            salida = "Tiene coste al superar los MB Incluidos, lo tienes incluido en el precio.";
        };
        return salida;
                 
    };
    
    
    

    this.init();
    
    
  //$scope.datos = precios;
});



tarifasApp.controller('cajaEntradaController',function(){
    

});


tarifasApp.directive("cajaEntrada",
                     function(){
    return{
        restrict:"E",
        templateUrl: "src/views/caja-entrada.html"
    };
});

tarifasApp.directive("cajaEntradaAvanzada",
                     function(){
    return{
        restrict:"E",
        templateUrl: "src/views/caja-entrada-avanzada.html"
    };
});

tarifasApp.controller('cajaEntradaSimpleController',function($scope){
    this.optLlamadas = [
             { label: 'Ninguna, no llamo nunca'       , value: 0 },
             { label: 'Muy Pocas, una a la semana'    , value: 4 },
             { label: 'Algunas, cuatro a la semana'   , value: 20 },
             { label: 'Algunas, una o dos al día'     , value: 50 },
             { label: 'Bastantes, unas 5 al día'      , value: 150 },
             { label: 'Muchas, estoy siempre llamando', value: 600 }
        ];
        this.optMinutosMedia = [
            { label: 'Son muy cortas, generalmente', value: 3},
            { label: 'A veces cortas y a veces largas', value: 15},
            { label: 'Suelen durar bastante', value: 30},
            { label: 'Mis llamadas duran muuucho', value: 45}
        ];

        this.optInternet = [
            { label: 'Poco Internet, Whatsapp', value: 300},
            { label: 'Uso Internet bastante', value: 1000},
            { label: 'Mucho, descargo algun vídeo o podcast', value: 2000},
            { label: 'Muchísimo, descargo muchos vídeos o podcasts', value: 10000}
        ];

        this.optSMS = [
            { label: 'Ninguno, no envío SMS', value: 0},
            { label: 'Poco, tengo algún amigo sin Whatsapp', value: 5},
            { label: 'Algunos, Uso el SMS habitualmente', value: 30},
            { label: 'Muchos, mando muchos SMS', value: 175}
        ];
    
    this.inicializar = function(){    
        this.llamadas = this.optLlamadas[0];
        this.minutosMedia = this.optMinutosMedia[0];
        this.internet = this.optInternet[0];
        this.sms = this.optSMS[0];    
    }
    
    this.calcularLlamadas = function (){
        $scope.datos.llamadas = this.llamadas.value;
        $scope.datos.minutos = this.minutosMedia.value * this.llamadas.value;
        $scope.actualizarTarifas();
    };
    
    this.calcularMinutosMedia = function (){
        $scope.datos.minutos = this.minutosMedia.value * this.llamadas.value;
        $scope.actualizarTarifas();
    };
    
    this.calcularInternet = function (){
        $scope.datos.internet = this.internet.value;
        $scope.actualizarTarifas();
    };
    
    this.calcularSMS = function (){
        $scope.datos.sms = this.sms.value;
        $scope.actualizarTarifas();
    };
    
    this.inicializar();

    
});



tarifasApp.directive("cajaEntradaSimple",
                     function(){
    return{
        restrict:"E",
        templateUrl: "src/views/caja-entrada-simple.html"
    };
});

tarifasApp.directive("cajaImpuestos",
                     function(){
    return{
        restrict:"E",
        templateUrl: "src/views/caja-impuestos.html"
    };
});

tarifasApp.directive("datosLista",
                     function(){
    return{
        restrict:"E",
        templateUrl: "src/views/datos-lista.html"
    };
});


tarifasApp.controller('datosDetalleController',function($scope){
    this.isSetP = function(checkTab) {
          return $scope.tarifaGuardada.pagina === checkTab;
        };

    this.avanzarPagina = function() {
         $scope.tarifaGuardada.pagina += 1;
            if ($scope.tarifaGuardada.pagina >3) 
            {$scope.tarifaGuardada.pagina = 1;};
    };

    
});


tarifasApp.directive("datosDetalle",
                     function(){
    return{
        restrict:"E",
        templateUrl: "src/views/datos-detalle.html"
    };
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






tarifasApp.filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});