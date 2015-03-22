describe('tarifasAppControl', function() {

    beforeEach(module('tarifasApp'));
    
  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  //angular.mock.module('ngAnimate', []);
  beforeEach(inject(function($controller, $rootScope ) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('tarifasListaController', {
      $scope: scope
    });
  }));
    
    it("Pruebas numEdit: Varaibles", function() {
	   expect(scope.numEdit(0,0)).toBe("0"); 
        
       expect(scope.numEdit(0,2)).toBe("0,00");         
        
       expect(scope.numEdit(12.34,0)).toBe("12");        
        
       expect(scope.numEdit(12.34,2)).toBe("12,34");                
        
       expect(scope.numEdit(12.34,2)).toBe("12,34");                

       expect(scope.numEdit(123456789.123456,0)).toBe("123.456.789");                
        
       expect(scope.numEdit(123456789.123456,2)).toBe("123.456.789,12");                
        
       expect(scope.numEdit(-123456789.123456,0)).toBe("-123.456.789");                        
        
       expect(scope.numEdit(-123456789.128456,2)).toBe("-123.456.789,13");                        
    });

     // var x1 = ["x1","Orange",24.9502,"60 minutos de IP","- Con 4G",15,16,17,18,19,20,21,"SI",1000,2000,0,0,0,0,0,20.62,33,"SI"];
	  //var y1 = ["y1","Orange",24.9502,"60 minutos de IP","- Con 4G",15,16,17,18,19,20,21,"NO",1000,2000,0,0,0,0,0,20.62,33,"NO"];
	  //var z1 = ["z1","Orange",24.9502,"60 minutos de IP","- Con 4G",25,26,17,18,19,20,21,"NO",1000,2000,0,0,0,0,0,20.62,33,"NO"];
	  //var x9 =  ["Yoigo Infinita 39","Yoigo+Movistar",0,"bbbb","4G",0,0,10,0,32.23,0,99999,"SI",0,4000,1000,150,75,5000,0,0,0,"SI"];
    
    
    var x1 = {"compania": "Orange","nombre":"x1", "red":"Orange", "total_con_IVA":24.9502, "observaciones":" 60 minutos de IP", "textos_especiales":"4G", "coste_minutos":15, "coste_llamadas":16, "coste_sms":17, "coste_internet":18, "tarifa_std":19, "tarifa_minima":20, "incluidos_minutos":21,"coste_incluido_sn":"SI",  "incluidos_sms":1000, "incluidos_internet":2000, "gasto_minutos":0, "gasto_llamadas":0, "gasto_sms":0, "gasto_internet":0, "base_sin_IVA":20.62, "total_sin_IVA":63.33,"formulas_especiales":"Sin datos actualmente, pendiente","sn_4G":"SI"};
    
    var y1 = {"compania": "Vodafone","nombre":"y1", "red":"Orange", "total_con_IVA":24.9502, "observaciones":" 60 minutos de IP", "textos_especiales":"4G", "coste_minutos":15, "coste_llamadas":16, "coste_sms":17, "coste_internet":18, "tarifa_std":19, "tarifa_minima":20, "incluidos_minutos":21,"coste_incluido_sn":"NO",  "incluidos_sms":1000, "incluidos_internet":2000, "gasto_minutos":0, "gasto_llamadas":0, "gasto_sms":0, "gasto_internet":0, "base_sin_IVA":20.62, "total_sin_IVA":63.33,"formulas_especiales":"Sin datos actualmente, pendiente","sn_4G":"NO"};
    
	var z1 = {"compania": "Movistar","nombre":"Cero", "red":"Orange", "total_con_IVA":24.9502, "observaciones":" 60 minutos de IP", "textos_especiales":"4G", "coste_minutos":0, "coste_llamadas":26, "coste_sms":17, "coste_internet":0, "tarifa_std":19, "tarifa_minima":20, "incluidos_minutos":21,"coste_incluido_sn":"SI",  "incluidos_sms":1000, "incluidos_internet":2000, "gasto_minutos":0, "gasto_llamadas":0, "gasto_sms":0, "gasto_internet":0, "base_sin_IVA":20.62, "total_sin_IVA":63.33,"formulas_especiales":"Sin datos actualmente, pendiente","sn_4G":"NO"};
    
    var x9 = {"compania": "Yoigo","nombre":"Infinita 39", "red":"Yoigo+Movistar", "total_con_IVA":24.9502, "observaciones":"bbbb", "textos_especiales":"4G", "coste_minutos":0, "coste_llamadas":0, "coste_sms":10, "coste_internet":0, "tarifa_std":23.97 , "tarifa_minima":0, "incluidos_minutos":99999,"coste_incluido_sn":"SI",  "incluidos_sms":0, "incluidos_internet":20000, "gasto_minutos":1000, "gasto_llamadas":150, "gasto_sms":75, "gasto_internet":5000, "base_sin_IVA":0, "total_sin_IVA":0,"formulas_especiales":"Sin datos actualmente, pendiente","sn_4G":"SI"};
	  
    
        var tab1 = [x1,y1];

    
    it("Revision de Precios0_66666_7777_6666", function() { 
        ctrl.setTabla(tab1,scope);
     	ctrl.actualizar(9999,8888,7777,6666); 
	    expect(ctrl.getMinutos()).toBe(9999);
  		expect(ctrl.getLlamadas()).toBe(8888);
  		expect(ctrl.getSMS()).toBe(7777);
  		expect(ctrl.getInternet()).toBe(6666);
        
        expect(scope.datos.tabla[0].coste_incluido_sn).toBe("SI");
        expect(scope.datos.tabla[0].observaciones).toBe(" 60 minutos de IP");
        
  		expect(scope.datos.tabla[0].gasto_minutos).toBe(9999);
		expect(scope.datos.tabla[0].gasto_llamadas).toBe(8888);
		expect(scope.datos.tabla[0].gasto_sms).toBe(7777);
		expect(scope.datos.tabla[0].gasto_internet).toBe(6666);
		expect(scope.datos.tabla[0].textos_especiales).toBe("4G");
		expect(scope.datos.tabla[0].formulas_especiales).toBe("Sin datos actualmente, pendiente");
        expect(scope.datos.tabla[0].minutos_pagar).toBe(9978);
        expect(scope.datos.tabla[0].llamadas_pagar).toBe(8869);
		expect(scope.datos.tabla[0].internet_pagar).toBe(4666);
		expect(scope.datos.tabla[0].sms_pagar).toBe(6777);
        expect(scope.datos.tabla[0].precio_llamadas).toBe(2915.74);
		expect(scope.datos.tabla[0].precio_sms).toBe(1152.09);
        expect(scope.datos.tabla[0].sobrecoste_internet).toBe(839.88);
        expect(scope.datos.tabla[0].base_sin_IVA).toBe(39);
        expect(scope.datos.tabla[0].tarifa_base).toBe(47.19);
        expect(scope.datos.tabla[0].texto_condiciones).toBe("21 min.  - 2,00GB");
     	expect(scope.datos.tabla[0].total_sin_IVA).toBe(4926.71);
        expect(scope.datos.tabla[0].total_con_IVA).toBe(5961.32);
        expect(scope.datos.tabla[0].dias_sin_internet).toBe(0);
  		
        
        expect(scope.datos.tabla[1].coste_incluido_sn).toBe("NO");
        expect(scope.datos.tabla[1].observaciones).toBe(" 60 minutos de IP");
        
        expect(scope.datos.tabla[1].gasto_minutos).toBe(9999);
		expect(scope.datos.tabla[1].gasto_llamadas).toBe(8888);
		expect(scope.datos.tabla[1].gasto_sms).toBe(7777);
		expect(scope.datos.tabla[1].gasto_internet).toBe(6666);
		expect(scope.datos.tabla[1].textos_especiales).toBe("");
		expect(scope.datos.tabla[1].formulas_especiales).toBe("Sin datos actualmente, pendiente");
        expect(scope.datos.tabla[1].minutos_pagar).toBe(9978);
        expect(scope.datos.tabla[1].llamadas_pagar).toBe(8888);
		expect(scope.datos.tabla[1].internet_pagar).toBe(4666);
		expect(scope.datos.tabla[1].sms_pagar).toBe(6777);
        expect(scope.datos.tabla[1].precio_llamadas).toBe(2918.7799999999997);
		expect(scope.datos.tabla[1].precio_sms).toBe(1152.09);
        expect(scope.datos.tabla[1].sobrecoste_internet).toBe(839.88);
        expect(scope.datos.tabla[1].base_sin_IVA).toBe(39);
        expect(scope.datos.tabla[1].tarifa_base).toBe(47.19);
        expect(scope.datos.tabla[1].texto_condiciones).toBe("21 min.  - 2,00GB");
     	expect(scope.datos.tabla[1].total_sin_IVA).toBe(4929.75);
        expect(scope.datos.tabla[1].total_con_IVA).toBe(5965);
        expect(scope.datos.tabla[1].dias_sin_internet).toBe(0);
        1 	 });

    it("Revision de Precios0_0_0_0", function() {
        ctrl.setTabla([JSON.parse(JSON.stringify(x1)),JSON.parse(JSON.stringify(y1))],scope.datosSTD.VERSION);
  	    ctrl.actualizar(0,0,0,0);

  		expect(scope.datos.tabla[0].gasto_minutos).toBe(0);
		expect(scope.datos.tabla[0].gasto_llamadas).toBe(0);
		expect(scope.datos.tabla[0].gasto_sms).toBe(0);
		expect(scope.datos.tabla[0].gasto_internet).toBe(0);
		expect(scope.datos.tabla[0].textos_especiales).toBe("4G");
		expect(scope.datos.tabla[0].formulas_especiales).toBe("Sin datos actualmente, pendiente");
        expect(scope.datos.tabla[0].minutos_pagar).toBe(0);
        expect(scope.datos.tabla[0].llamadas_pagar).toBe(0);
		expect(scope.datos.tabla[0].internet_pagar).toBe(0);
		expect(scope.datos.tabla[0].sms_pagar).toBe(0);
        expect(scope.datos.tabla[0].precio_llamadas).toBe(0);
		expect(scope.datos.tabla[0].precio_sms).toBe(0);
        expect(scope.datos.tabla[0].sobrecoste_internet).toBe(0);
        expect(scope.datos.tabla[0].base_sin_IVA).toBe(39);
        expect(scope.datos.tabla[0].tarifa_base).toBe(47.19);
        expect(scope.datos.tabla[0].texto_condiciones).toBe("21 min.  - 2,00GB");
     	expect(scope.datos.tabla[0].total_sin_IVA).toBe(39);
        expect(scope.datos.tabla[0].total_con_IVA).toBe(47.19);
        expect(scope.datos.tabla[0].dias_sin_internet).toBe(0);

        expect(scope.datos.tabla[1].gasto_minutos).toBe(0);
		expect(scope.datos.tabla[1].gasto_llamadas).toBe(0);
		expect(scope.datos.tabla[1].gasto_sms).toBe(0);
		expect(scope.datos.tabla[1].gasto_internet).toBe(0);
		expect(scope.datos.tabla[1].textos_especiales).toBe("");
		expect(scope.datos.tabla[1].formulas_especiales).toBe("Sin datos actualmente, pendiente");
        expect(scope.datos.tabla[1].minutos_pagar).toBe(0);
        expect(scope.datos.tabla[1].llamadas_pagar).toBe(0);
		expect(scope.datos.tabla[1].internet_pagar).toBe(0);
		expect(scope.datos.tabla[1].sms_pagar).toBe(0);
        expect(scope.datos.tabla[1].precio_llamadas).toBe(0);
		expect(scope.datos.tabla[1].precio_sms).toBe(0);
        expect(scope.datos.tabla[1].sobrecoste_internet).toBe(0);
        expect(scope.datos.tabla[1].base_sin_IVA).toBe(39);
        expect(scope.datos.tabla[1].tarifa_base).toBe(47.19);
        expect(scope.datos.tabla[1].texto_condiciones).toBe("21 min.  - 2,00GB");
     	expect(scope.datos.tabla[1].total_sin_IVA).toBe(39);
        expect(scope.datos.tabla[1].total_con_IVA).toBe(47.19);
        expect(scope.datos.tabla[1].dias_sin_internet).toBe(0);
        
    });


  
 	 it("Revision de Precios9999_0_0_0", function() {
     	 ctrl.setTabla([JSON.parse(JSON.stringify(x1)),JSON.parse(JSON.stringify(y1))],scope.datosSTD.VERSION);
    	 ctrl.actualizar(9999,0,0,0);

  		expect(scope.datos.tabla[0].gasto_minutos).toBe(9999);
		expect(scope.datos.tabla[0].gasto_llamadas).toBe(0);
		expect(scope.datos.tabla[0].gasto_sms).toBe(0);
		expect(scope.datos.tabla[0].gasto_internet).toBe(0);
		expect(scope.datos.tabla[0].textos_especiales).toBe("4G");
		expect(scope.datos.tabla[0].formulas_especiales).toBe("Sin datos actualmente, pendiente");
        expect(scope.datos.tabla[0].minutos_pagar).toBe(9978);
        expect(scope.datos.tabla[0].llamadas_pagar).toBe(0);
		expect(scope.datos.tabla[0].internet_pagar).toBe(0);
		expect(scope.datos.tabla[0].sms_pagar).toBe(0);
        expect(scope.datos.tabla[0].precio_llamadas).toBe(1496.70);
		expect(scope.datos.tabla[0].precio_sms).toBe(0);
        expect(scope.datos.tabla[0].sobrecoste_internet).toBe(0);
        expect(scope.datos.tabla[0].base_sin_IVA).toBe(39);
        expect(scope.datos.tabla[0].tarifa_base).toBe(47.19);
        expect(scope.datos.tabla[0].texto_condiciones).toBe("21 min.  - 2,00GB");
     	expect(scope.datos.tabla[0].total_sin_IVA).toBe(1515.70);
        expect(scope.datos.tabla[0].total_con_IVA).toBe(1834);
        expect(scope.datos.tabla[0].dias_sin_internet).toBe(0);

        expect(scope.datos.tabla[1].gasto_minutos).toBe(9999);
		expect(scope.datos.tabla[1].gasto_llamadas).toBe(0);
		expect(scope.datos.tabla[1].gasto_sms).toBe(0);
		expect(scope.datos.tabla[1].gasto_internet).toBe(0);
		expect(scope.datos.tabla[1].textos_especiales).toBe("");
		expect(scope.datos.tabla[1].formulas_especiales).toBe("Sin datos actualmente, pendiente");
        expect(scope.datos.tabla[1].minutos_pagar).toBe(9978);
        expect(scope.datos.tabla[1].llamadas_pagar).toBe(0);
		expect(scope.datos.tabla[1].internet_pagar).toBe(0);
		expect(scope.datos.tabla[1].sms_pagar).toBe(0);
        expect(scope.datos.tabla[1].precio_llamadas).toBe(1496.70);
		expect(scope.datos.tabla[1].precio_sms).toBe(0);
        expect(scope.datos.tabla[1].sobrecoste_internet).toBe(0);
        expect(scope.datos.tabla[1].base_sin_IVA).toBe(39);
        expect(scope.datos.tabla[1].tarifa_base).toBe(47.19);
        expect(scope.datos.tabla[1].texto_condiciones).toBe("21 min.  - 2,00GB");
     	expect(scope.datos.tabla[1].total_sin_IVA).toBe(1515.70);
        expect(scope.datos.tabla[1].total_con_IVA).toBe(1834);
        expect(scope.datos.tabla[1].dias_sin_internet).toBe(0);
 	 });	
 	 
	 it("Revision de Precios9999_8888_0_0", function() {
         ctrl.setTabla([JSON.parse(JSON.stringify(x1)),JSON.parse(JSON.stringify(y1))],scope.datosSTD.VERSION);
 	     ctrl.actualizar(9999,8888,0,0);
	 	 expect(scope.datos.tabla[0].total_sin_IVA).toBe(2934.74);
	 	 expect(scope.datos.tabla[1].total_sin_IVA).toBe(2937.78);
  		 expect(scope.datos.tabla[0].total_con_IVA).toBe(3551.04);
  		 expect(scope.datos.tabla[1].total_con_IVA).toBe(3554.71);
  		 expect(scope.datos.tabla[0].textos_especiales).toBe("4G");
  		 expect(scope.datos.tabla[1].textos_especiales).toBe("");
	 });

	 it("Revision de Precios9999_8888_7777_0", function() {
     	 ctrl.setTabla([JSON.parse(JSON.stringify(x1)),JSON.parse(JSON.stringify(y1))],scope.datosSTD.VERSION);
    	 ctrl.actualizar(9999,8888,7777,0);
	 	 expect(scope.datos.tabla[0].total_sin_IVA).toBe(4086.83);
	 	 expect(scope.datos.tabla[1].total_sin_IVA).toBe(4089.87);
  		 expect(scope.datos.tabla[0].total_con_IVA).toBe(4945.06);
  		 expect(scope.datos.tabla[1].total_con_IVA).toBe(4948.74);
  		 expect(scope.datos.tabla[0].textos_especiales).toBe("4G");
  		 expect(scope.datos.tabla[1].textos_especiales).toBe("");
	 });



	 it("Revision de Precios9999_8888_7777_6666", function() {
    	 ctrl.setTabla([JSON.parse(JSON.stringify(x1)),JSON.parse(JSON.stringify(y1))],scope.datosSTD.VERSION);
  	     ctrl.actualizar(9999,8888,7777,6666);
	 	 expect(scope.datos.tabla[0].total_sin_IVA).toBe(4926.71);
	 	 expect(scope.datos.tabla[1].total_sin_IVA).toBe(4929.75);
  		 expect(scope.datos.tabla[0].total_con_IVA).toBe(5961.32);
  		 expect(scope.datos.tabla[1].total_con_IVA).toBe(5965.00);
  		 expect(scope.datos.tabla[0].textos_especiales).toBe("4G");
  		 expect(scope.datos.tabla[1].textos_especiales).toBe("");
	 });

	 it("Revision de Precios0010_0011_0012_0013", function() {
         ctrl.setTabla([JSON.parse(JSON.stringify(x1)),JSON.parse(JSON.stringify(y1))],scope.datosSTD.VERSION);
 	     ctrl.actualizar(10,11,12,13);
	 	 expect(scope.datos.tabla[0].total_sin_IVA).toBe(39); 
	 	 expect(scope.datos.tabla[1].total_sin_IVA).toBe(39);
  		 expect(scope.datos.tabla[0].total_con_IVA).toBe(47.19);
  		 expect(scope.datos.tabla[1].total_con_IVA).toBe(47.19);
  		 expect(scope.datos.tabla[0].textos_especiales).toBe("4G");
  		 expect(scope.datos.tabla[1].textos_especiales).toBe("");
	 });
	 
//queda pendiente una prueva de ordenacion
it("Sobrecoste Internet", function() {
         ctrl.setTabla([JSON.parse(JSON.stringify(z1))],scope.datosSTD.VERSION);
        ctrl.actualizar(200,300,0,4250);
		
        expect(scope.datos.tabla[0].gasto_minutos).toBe(200);
		expect(scope.datos.tabla[0].gasto_llamadas).toBe(300);
		expect(scope.datos.tabla[0].gasto_sms).toBe(0);
		expect(scope.datos.tabla[0].gasto_internet).toBe(4250);
		expect(scope.datos.tabla[0].textos_especiales).toBe("");
		expect(scope.datos.tabla[0].formulas_especiales).toBe("Sin datos actualmente, pendiente");
        expect(scope.datos.tabla[0].minutos_pagar).toBe(179);
        expect(scope.datos.tabla[0].llamadas_pagar).toBe(269);
		expect(scope.datos.tabla[0].internet_pagar).toBe(0);
		expect(scope.datos.tabla[0].sms_pagar).toBe(0);
        expect(scope.datos.tabla[0].precio_llamadas).toBe(69.94);
		expect(scope.datos.tabla[0].precio_sms).toBe(0);
        expect(scope.datos.tabla[0].sobrecoste_internet).toBe(0);
        expect(scope.datos.tabla[0].base_sin_IVA).toBe(39);
        expect(scope.datos.tabla[0].tarifa_base).toBe(47.19);
        expect(scope.datos.tabla[0].texto_condiciones).toBe("21 min. Tarifa Cero - 2,00GB");
     	expect(scope.datos.tabla[0].total_sin_IVA).toBe(88.94);
        expect(scope.datos.tabla[0].total_con_IVA).toBe(107.62);
        expect(scope.datos.tabla[0].dias_sin_internet).toBe(16);
	 });

    
    
	 it("Yoigo Infinita 20GB", function() {
         ctrl.setTabla([JSON.parse(JSON.stringify(x9))],scope.datosSTD.VERSION);
        ctrl.actualizar(7000,4500,100,15000);
		
        expect(scope.datos.tabla[0].gasto_minutos).toBe(7000);
		expect(scope.datos.tabla[0].gasto_llamadas).toBe(4500);
		expect(scope.datos.tabla[0].gasto_sms).toBe(100);
		expect(scope.datos.tabla[0].gasto_internet).toBe(15000);
		expect(scope.datos.tabla[0].textos_especiales).toBe("4G");
		expect(scope.datos.tabla[0].formulas_especiales).toBe("Sin datos actualmente, pendiente");
        expect(scope.datos.tabla[0].minutos_pagar).toBe(0);
        expect(scope.datos.tabla[0].llamadas_pagar).toBe(0);
		expect(scope.datos.tabla[0].internet_pagar).toBe(0);
		expect(scope.datos.tabla[0].sms_pagar).toBe(100);
        expect(scope.datos.tabla[0].precio_llamadas).toBe(0);
		expect(scope.datos.tabla[0].precio_sms).toBe(10);
        expect(scope.datos.tabla[0].sobrecoste_internet).toBe(0);
        expect(scope.datos.tabla[0].base_sin_IVA).toBe(23.97);
        expect(scope.datos.tabla[0].tarifa_base).toBe(29.0037);
        expect(scope.datos.tabla[0].texto_condiciones).toBe("Infinita - 20,00GB");
     	expect(scope.datos.tabla[0].total_sin_IVA).toBe(33.97);
        expect(scope.datos.tabla[0].total_con_IVA).toBe(41.1);
        expect(scope.datos.tabla[0].dias_sin_internet).toBe(0);
	 });

 	 it("Verficar Version", function() {
         ctrl.setTabla([JSON.parse(JSON.stringify(z1)),JSON.parse(JSON.stringify(y1))],scope.datosSTD.VERSION);
         expect(ctrl.verificarVF(scope.datosSTD.VERSION)).toBe(true);
	 	 expect(ctrl.verificarVF("VERSION")).toBe(false);
	 });

 	 it("Verficar Fecha1", function() {
         ctrl.setTabla([JSON.parse(JSON.stringify(z1)),JSON.parse(JSON.stringify(y1))],scope.datosSTD.VERSION);
         scope.datos.fecha.year = "2000";
         expect(ctrl.verificarVF(scope.datosSTD.VERSION)).toBe(false);
	 	 expect(ctrl.verificarVF("VERSION")).toBe(false);
		 });

 	 it("Verficar Fecha1", function() {
         ctrl.setTabla([JSON.parse(JSON.stringify(z1)),JSON.parse(JSON.stringify(y1))],scope.datosSTD.VERSION);
         scope.datos.fecha.month += 1;
         expect(ctrl.verificarVF(scope.datosSTD.VERSION)).toBe(false);
	 	 expect(ctrl.verificarVF("VERSION")).toBe(false);
		 });

 	 it("Verficar Fecha1", function() {
         ctrl.setTabla([JSON.parse(JSON.stringify(z1)),JSON.parse(JSON.stringify(y1))],scope.datosSTD.VERSION);
         scope.datos.fecha.day -= 1;
	 	 expect(ctrl.verificarVF(scope.datosSTD.VERSION)).toBe(false);
	 	 expect(ctrl.verificarVF("VERSION")).toBe(false);
		 });

     it("Prueba Frame Entrada de Datos,0,0,0,5GB", function(){
         ctrl.setTabla([JSON.parse(JSON.stringify(x1)),
                        JSON.parse(JSON.stringify(y1)),
                        JSON.parse(JSON.stringify(z1)),
                        JSON.parse(JSON.stringify(x9))],scope.datosSTD.VERSION);
         scope.datos.minutos = 0;
         scope.datos.llamadas = 0;
         scope.datos.SMS = 0;
         scope.datos.internet = 5000;
         scope.datosSTD.IVA = 1.07;
         scope.actualizarTarifas();
         expect(scope.datos.tabla[0].total_con_IVA).toBe(598.13);
  		 expect(scope.datos.tabla[1].total_con_IVA).toBe(598.13);
         expect(scope.datos.tabla[2].total_con_IVA).toBe(41.73);
        });

    it("Prueba Frame Entrada de Datos,blancos...y 5GB", function(){
         ctrl.setTabla([JSON.parse(JSON.stringify(x1)),
                        JSON.parse(JSON.stringify(y1)),
                        JSON.parse(JSON.stringify(z1)),
                        JSON.parse(JSON.stringify(x9))],scope.datosSTD.VERSION);
         
         scope.datos.minutos = "";
         scope.datos.llamadas = "";
         scope.datos.SMS = "";
         scope.datos.internet = 5000;
         scope.datosSTD.IVA = 1.07;
         scope.actualizarTarifas();
         expect(scope.datos.tabla[0].total_con_IVA).toBe(598.13);
  		 expect(scope.datos.tabla[1].total_con_IVA).toBe(598.13);
         expect(scope.datos.tabla[2].total_con_IVA).toBe(41.73);
        });
	 
});  
