describe('tarifasAppControl', function() {

    beforeEach(module('tarifasApp'));
    
  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope) {
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
	  //var x9 =  ["Yoigo Infinita 39","Yoigo+Movistar",0,"bbbb"," - Con 4G",0,0,10,0,32.23,0,99999,"SI",0,4000,1000,150,75,5000,0,0,0,"SI"];
    
    
    var x1 = {"nombre":"x1", "red":"Orange", "total_con_IVA":24.9502, "observaciones":" 60 minutos de IP", "textos_especiales":" - Con 4G", "coste_minutos":15, "coste_llamadas":16, "coste_sms":17, "coste_internet":18, "tarifa_std":19, "tarifa_minima":20, "incluidos_minutos":21,"coste_incluido_sn":"SI",  "incluidos_sms":1000, "incluidos_internet":2000, "gasto_minutos":0, "gasto_llamadas":0, "gasto_sms":0, "gasto_internet":0, "total_base":20.62, "total_sin_IVA":63.33,"formulas_especiales":"Sin datos actualmente, pendiente","sn_4G":"SI"};
    var y1 = {"nombre":"y1", "red":"Orange", "total_con_IVA":24.9502, "observaciones":" 60 minutos de IP", "textos_especiales":" - Con 4G", "coste_minutos":15, "coste_llamadas":16, "coste_sms":17, "coste_internet":18, "tarifa_std":19, "tarifa_minima":20, "incluidos_minutos":21,"coste_incluido_sn":"NO",  "incluidos_sms":1000, "incluidos_internet":2000, "gasto_minutos":0, "gasto_llamadas":0, "gasto_sms":0, "gasto_internet":0, "total_base":20.62, "total_sin_IVA":63.33,"formulas_especiales":"Sin datos actualmente, pendiente","sn_4G":"NO"};
	var z1 = {"nombre":"y1", "red":"Orange", "total_con_IVA":24.9502, "observaciones":" 60 minutos de IP", "textos_especiales":" - Con 4G", "coste_minutos":25, "coste_llamadas":26, "coste_sms":17, "coste_internet":18, "tarifa_std":19, "tarifa_minima":20, "incluidos_minutos":21,"coste_incluido_sn":"NO",  "incluidos_sms":1000, "incluidos_internet":2000, "gasto_minutos":0, "gasto_llamadas":0, "gasto_sms":0, "gasto_internet":0, "total_base":20.62, "total_sin_IVA":63.33,"formulas_especiales":"Sin datos actualmente, pendiente","sn_4G":"NO"};
    var x9 = {"nombre":"Yoigo Infinita 39", "red":"Yoigo+Movistar", "total_con_IVA":24.9502, "observaciones":"bbbb", "textos_especiales":" - Con 4G", "coste_minutos":0, "coste_llamadas":0, "coste_sms":10, "coste_internet":0, "tarifa_std":32.23, "tarifa_minima":0, "incluidos_minutos":99999,"coste_incluido_sn":"SI",  "incluidos_sms":0, "incluidos_internet":4000, "gasto_minutos":1000, "gasto_llamadas":150, "gasto_sms":75, "gasto_internet":5000, "total_base":0, "total_sin_IVA":0,"formulas_especiales":"Sin datos actualmente, pendiente","sn_4G":"NO"};
	  
    
        var tab1 = [x1,y1];

    
    it("Revision de Precios0_66666_7777_6666", function() { 
         ctrl.setTabla(tab1,scope);
     	 ctrl.actualizar(9999,8888,7777,6666); 
	     expect(ctrl.getMinutos()).toBe(9999);
  		 expect(ctrl.getLlamadas()).toBe(8888);
  		 expect(ctrl.getSMS()).toBe(7777);
  		 expect(ctrl.getInternet()).toBe(6666);
  		 expect(scope.datos.tabla[0].coste_incluido_sn).toBe("SI");
  		 expect(scope.datos.tabla[1].coste_incluido_sn).toBe("NO");
  		 expect(scope.datos.tabla[0].gasto_minutos).toBe(9999);
  		 expect(scope.datos.tabla[1].gasto_minutos).toBe(9999);
  		 expect(scope.datos.tabla[0].gasto_llamadas).toBe(8888);
  		 expect(scope.datos.tabla[1].gasto_llamadas).toBe(8888);
  		 expect(scope.datos.tabla[0].gasto_sms).toBe(7777);
  		 expect(scope.datos.tabla[1].gasto_sms).toBe(7777);
  		 expect(scope.datos.tabla[0].gasto_internet).toBe(6666);
  		 expect(scope.datos.tabla[1].gasto_internet).toBe(6666);
 	 });

    it("Revision de Precios0_0_0_0", function() {
        ctrl.setTabla([JSON.parse(JSON.stringify(x1)),JSON.parse(JSON.stringify(y1))],scope.datosSTD.VERSION);
  	    ctrl.actualizar(0,0,0,0);
        expect(scope.datos.tabla[0].total_base).toBe(0);
  		expect(scope.datos.tabla[1].total_base).toBe(0);
  		expect(scope.datos.tabla[0].total_sin_IVA).toBe(39);
  		expect(scope.datos.tabla[1].total_sin_IVA).toBe(39);
  		expect(scope.datos.tabla[0].total_con_IVA).toBe(47.19);
  		expect(scope.datos.tabla[1].total_con_IVA).toBe(47.19);
  		expect(scope.datos.tabla[0].textos_especiales).toBe(" - Con 4G");
  		expect(scope.datos.tabla[1].textos_especiales).toBe("");
 	 });


  
 	 it("Revision de Precios9999_0_0_0", function() {
     	 ctrl.setTabla([JSON.parse(JSON.stringify(x1)),JSON.parse(JSON.stringify(y1))],scope.datosSTD.VERSION);
    	 ctrl.actualizar(9999,0,0,0);
		 expect(scope.datos.tabla[0].total_base).toBe(1496.70);
	 	 expect(scope.datos.tabla[1].total_base).toBe(1496.70);
		 expect(scope.datos.tabla[0].total_sin_IVA).toBe(1515.70);
	 	 expect(scope.datos.tabla[1].total_sin_IVA).toBe(1515.70);
  		 expect(scope.datos.tabla[0].total_con_IVA).toBe(1834);
  		 expect(scope.datos.tabla[1].total_con_IVA).toBe(1834);
  		 expect(scope.datos.tabla[0].textos_especiales).toBe(" - Con 4G");
  		 expect(scope.datos.tabla[1].textos_especiales).toBe("");
 	 });	
 	 
	 it("Revision de Precios9999_8888_0_0", function() {
         ctrl.setTabla([JSON.parse(JSON.stringify(x1)),JSON.parse(JSON.stringify(y1))],scope.datosSTD.VERSION);
 	     ctrl.actualizar(9999,8888,0,0);
	     expect(scope.datos.tabla[0].total_base).toBe(2915.79);
	 	 expect(scope.datos.tabla[1].total_base).toBe(2918.78);
	 	 expect(scope.datos.tabla[0].total_sin_IVA).toBe(2934.79);
	 	 expect(scope.datos.tabla[1].total_sin_IVA).toBe(2937.78);
  		 expect(scope.datos.tabla[0].total_con_IVA).toBe(3551.10);
  		 expect(scope.datos.tabla[1].total_con_IVA).toBe(3554.71);
  		 expect(scope.datos.tabla[0].textos_especiales).toBe(" - Con 4G");
  		 expect(scope.datos.tabla[1].textos_especiales).toBe("");
	 });

	 it("Revision de Precios9999_8888_7777_0", function() {
     	 ctrl.setTabla([JSON.parse(JSON.stringify(x1)),JSON.parse(JSON.stringify(y1))],scope.datosSTD.VERSION);
    	 ctrl.actualizar(9999,8888,7777,0);
    	 expect(scope.datos.tabla[0].total_base).toBe(4067.88);
	 	 expect(scope.datos.tabla[1].total_base).toBe(4070.87);
	 	 expect(scope.datos.tabla[0].total_sin_IVA).toBe(4086.88);
	 	 expect(scope.datos.tabla[1].total_sin_IVA).toBe(4089.87);
  		 expect(scope.datos.tabla[0].total_con_IVA).toBe(4945.12);
  		 expect(scope.datos.tabla[1].total_con_IVA).toBe(4948.74);
  		 expect(scope.datos.tabla[0].textos_especiales).toBe(" - Con 4G");
  		 expect(scope.datos.tabla[1].textos_especiales).toBe("");
	 });



	 it("Revision de Precios9999_8888_7777_6666", function() {
    	 ctrl.setTabla([JSON.parse(JSON.stringify(x1)),JSON.parse(JSON.stringify(y1))],scope.datosSTD.VERSION);
  	     ctrl.actualizar(9999,8888,7777,6666);
         expect(scope.datos.tabla[0].total_base).toBe(4907.76);
	 	 expect(scope.datos.tabla[1].total_base).toBe(4910.75);
	 	 expect(scope.datos.tabla[0].total_sin_IVA).toBe(4926.76);
	 	 expect(scope.datos.tabla[1].total_sin_IVA).toBe(4929.75);
  		 expect(scope.datos.tabla[0].total_con_IVA).toBe(5961.38);
  		 expect(scope.datos.tabla[1].total_con_IVA).toBe(5965.00);
  		 expect(scope.datos.tabla[0].textos_especiales).toBe("Incluido Sobrecoste por Datos de 1.016,25 Euros - Con 4G");
  		 expect(scope.datos.tabla[1].textos_especiales).toBe("Incluido Sobrecoste por Datos de 1.016,25 Euros");
	 });

	 it("Revision de Precios0010_0011_0012_0013", function() {
         ctrl.setTabla([JSON.parse(JSON.stringify(x1)),JSON.parse(JSON.stringify(y1))],scope.datosSTD.VERSION);
 	     ctrl.actualizar(10,11,12,13);
	 	 expect(scope.datos.tabla[0].total_base).toBe(0.00);
	 	 expect(scope.datos.tabla[1].total_base).toBe(1.76);
	 	 expect(scope.datos.tabla[0].total_sin_IVA).toBe(39); 
	 	 expect(scope.datos.tabla[1].total_sin_IVA).toBe(39);
  		 expect(scope.datos.tabla[0].total_con_IVA).toBe(47.19);
  		 expect(scope.datos.tabla[1].total_con_IVA).toBe(47.19);
  		 expect(scope.datos.tabla[0].textos_especiales).toBe(" - Con 4G");
  		 expect(scope.datos.tabla[1].textos_especiales).toBe("");
	 });
	 
//queda pendiente una prueva de ordenacion
    
	 it("Yoigo Infinita 39", function() {
         ctrl.setTabla([JSON.parse(JSON.stringify(x9))],scope.datosSTD.VERSION);
         ctrl.actualizar(1000,150,75,5000);
         expect(scope.datos.tabla[0].coste_sms).toBe(10);
	 	 expect(scope.datos.tabla[0].total_base).toBe(7.50);
  		 expect(scope.datos.tabla[0].total_con_IVA).toBe(48.07);
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

	 
});  
