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

      var x1 = ["x1","Orange",24.9502,"60 minutos de IP","- Con 4G",15,16,17,18,19,20,21,"SI",1000,2000,0,0,0,0,0,20.62,33,"SI"];
	  var y1 = ["y1","Orange",24.9502,"60 minutos de IP","- Con 4G",15,16,17,18,19,20,21,"NO",1000,2000,0,0,0,0,0,20.62,33,"NO"];
	  var z1 = ["z1","Orange",24.9502,"60 minutos de IP","- Con 4G",25,26,17,18,19,20,21,"NO",1000,2000,0,0,0,0,0,20.62,33,"NO"];
	  var x9 =  ["Yoigo Infinita 39","Yoigo+Movistar",0,"bbbb"," - Con 4G",0,0,10,0,32.23,0,99999,"SI",0,4000,1000,150,75,5000,0,0,0,"SI"];
	  var tab1 = [x1,y1];

    
    it("Revision de Precios0_66666_7777_6666", function() { 
         ctrl.setTabla(tab1,scope);
     	 ctrl.actualizar(9999,8888,7777,6666); 
	     expect(ctrl.getMinutos()).toBe(9999);
  		 expect(ctrl.getLlamadas()).toBe(8888);
  		 expect(ctrl.getSMS()).toBe(7777);
  		 expect(ctrl.getInternet()).toBe(6666);
  		 expect(scope.datos.tabla[0][12]).toBe("SI");
  		 expect(scope.datos.tabla[1][12]).toBe("NO");
  		 expect(scope.datos.tabla[0][15]).toBe(9999);
  		 expect(scope.datos.tabla[1][15]).toBe(9999);
  		 expect(scope.datos.tabla[0][16]).toBe(8888);
  		 expect(scope.datos.tabla[1][16]).toBe(8888);
  		 expect(scope.datos.tabla[0][17]).toBe(7777);
  		 expect(scope.datos.tabla[1][17]).toBe(7777);
  		 expect(scope.datos.tabla[0][18]).toBe(6666);
  		 expect(scope.datos.tabla[1][18]).toBe(6666);
 	 });

    it("Revision de Precios0_0_0_0", function() {
        ctrl.setTabla([x1.slice(),y1.slice()]);
  	    ctrl.actualizar(0,0,0,0);
        expect(scope.datos.tabla[0][20]).toBe(0);
  		expect(scope.datos.tabla[1][20]).toBe(0);
  		expect(scope.datos.tabla[0][21]).toBe(39);
  		expect(scope.datos.tabla[1][21]).toBe(39);
  		expect(ctrl.getPrecio(0)).toBe(47.19);
  		expect(ctrl.getPrecio(1)).toBe(47.19);
  		expect(scope.datos.tabla[0][4]).toBe(" - Con 4G");
  		expect(scope.datos.tabla[1][4]).toBe("bbbb");
 	 });


  
 	 it("Revision de Precios9999_0_0_0", function() {
     	 ctrl.setTabla([x1.slice(),y1.slice()]);
    	 ctrl.actualizar(9999,0,0,0);
		 expect(scope.datos.tabla[0][20]).toBe(1496.70);
	 	 expect(scope.datos.tabla[1][20]).toBe(1496.70);
		 expect(scope.datos.tabla[0][21]).toBe(1515.70);
	 	 expect(scope.datos.tabla[1][21]).toBe(1515.70);
  		 expect(ctrl.getPrecio(0)).toBe(1834);
  		 expect(ctrl.getPrecio(1)).toBe(1834);
  		 expect(scope.datos.tabla[0][4]).toBe(" - Con 4G");
  		 expect(scope.datos.tabla[1][4]).toBe("bbbb");
 	 });	
 	 
	 it("Revision de Precios9999_8888_0_0", function() {
         ctrl.setTabla([x1.slice(),y1.slice()]);
 	     ctrl.actualizar(9999,8888,0,0);
	     expect(scope.datos.tabla[0][20]).toBe(2915.79);
	 	 expect(scope.datos.tabla[1][20]).toBe(2918.78);
	 	 expect(scope.datos.tabla[0][21]).toBe(2934.79);
	 	 expect(scope.datos.tabla[1][21]).toBe(2937.78);
  		 expect(ctrl.getPrecio(0)).toBe(3551.10);
  		 expect(ctrl.getPrecio(1)).toBe(3554.71);
  		 expect(scope.datos.tabla[0][4]).toBe(" - Con 4G");
  		 expect(scope.datos.tabla[1][4]).toBe("bbbb");
	 });

	 it("Revision de Precios9999_8888_7777_0", function() {
     	 ctrl.setTabla([x1.slice(),y1.slice()]);
    	 ctrl.actualizar(9999,8888,7777,0);
    	 expect(scope.datos.tabla[0][20]).toBe(4067.88);
	 	 expect(scope.datos.tabla[1][20]).toBe(4070.87);
	 	 expect(scope.datos.tabla[0][21]).toBe(4086.88);
	 	 expect(scope.datos.tabla[1][21]).toBe(4089.87);
  		 expect(ctrl.getPrecio(0)).toBe(4945.12);
  		 expect(ctrl.getPrecio(1)).toBe(4948.74);
  		 expect(scope.datos.tabla[0][4]).toBe(" - Con 4G");
  		 expect(scope.datos.tabla[1][4]).toBe("bbbb");
	 });



	 it("Revision de Precios9999_8888_7777_6666", function() {
    	 ctrl.setTabla([x1.slice(),y1.slice()]);
  	     ctrl.actualizar(9999,8888,7777,6666);
         expect(scope.datos.tabla[0][20]).toBe(4907.76);
	 	 expect(scope.datos.tabla[1][20]).toBe(4910.75);
	 	 expect(scope.datos.tabla[0][21]).toBe(4926.76);
	 	 expect(scope.datos.tabla[1][21]).toBe(4929.75);
  		 expect(ctrl.getPrecio(0)).toBe(5961.38);
  		 expect(ctrl.getPrecio(1)).toBe(5965.00);
  		 expect(scope.datos.tabla[0][4]).toBe("Incluido Sobrecoste por Datos de 1.016,25 Euros - Con 4G");
  		 expect(scope.datos.tabla[1][4]).toBe("Incluido Sobrecoste por Datos de 1.016,25 Euros");
	 });

	 it("Revision de Precios0010_0011_0012_0013", function() {
         ctrl.setTabla([x1.slice(),y1.slice()]);
 	     ctrl.actualizar(10,11,12,13);
	 	 expect(scope.datos.tabla[0][20]).toBe(0.00);
	 	 expect(scope.datos.tabla[1][20]).toBe(1.76);
	 	 expect(scope.datos.tabla[0][21]).toBe(39); 
	 	 expect(scope.datos.tabla[1][21]).toBe(39);
  		 expect(ctrl.getPrecio(0)).toBe(47.19);
  		 expect(ctrl.getPrecio(1)).toBe(47.19);
  		 expect(scope.datos.tabla[0][4]).toBe(" - Con 4G");
  		 expect(scope.datos.tabla[1][4]).toBe("bbbb");
	 });
	 
	 it("Revision de Precios9999_8888_7777_6666_2", function() {
         ctrl.setTabla([z1.slice(),y1.slice(),x1.slice()]);
         ctrl.actualizar(9999,8888,7777,6666);
		 expect(scope.datos.tabla[0][0]).toBe("x1");
		 expect(scope.datos.tabla[1][0]).toBe("y1");
		 expect(scope.datos.tabla[2][0]).toBe("z1");
  		 expect(ctrl.getPrecio(0)).toBe(5961.38);
  		 expect(ctrl.getPrecio(1)).toBe(5965.00);
  		 expect(ctrl.getPrecio(2)).toBe(8247.78);
	 });

	 it("Yoigo Infinita 39", function() {
         ctrl.setTabla([x9]); 
         ctrl.actualizar(1000,150,75,5000);
         expect(scope.datos.tabla[0][7]).toBe(10);
	 	 expect(scope.datos.tabla[0][20]).toBe(7.50);
  		 expect(ctrl.getPrecio(0)).toBe(48.07);
	 });

 	 it("Verficar Version", function() {
         ctrl.setTabla([x1.slice(),y1.slice()]);
         expect(ctrl.verificarVF(scope.datosSTD.VERSION)).toBe(true);
	 	 expect(ctrl.verificarVF("VERSION")).toBe(false);
	 });

 	 it("Verficar Fecha1", function() {
         ctrl.setTabla([x1.slice(),y1.slice()]);
         scope.datos.fecha.year = "2000";
         expect(ctrl.verificarVF(scope.datosSTD.VERSION)).toBe(false);
	 	 expect(ctrl.verificarVF("VERSION")).toBe(false);
		 });

 	 it("Verficar Fecha1", function() {
         ctrl.setTabla([x1.slice(),y1.slice()]);
         scope.datos.fecha.month += 1;
         expect(ctrl.verificarVF(scope.datosSTD.VERSION)).toBe(false);
	 	 expect(ctrl.verificarVF("VERSION")).toBe(false);
		 });

 	 it("Verficar Fecha1", function() {
         ctrl.setTabla([x1.slice(),y1.slice()]);
         scope.datos.fecha.day -= 1;
	 	 expect(ctrl.verificarVF(scope.datosSTD.VERSION)).toBe(false);
	 	 expect(ctrl.verificarVF("VERSION")).toBe(false);
		 });

	 
});  
