describe('tarifasAppControl', function() {

    beforeEach(module('tarifasApp'));
    
    it("Pruebas numEdit: Varaibles", function() {
       var scope = {},
           ctrl = $controller('Datos', {$scope:scope});
	   expect(ctrl.numEdit(0,0)).toBe("0");
        
       expect(ctrl.numEdit(0,2)).toBe("0,00");        
        
       expect(ctrl.numEdit(12.34,0)).toBe("12");        
        
       expect(ctrl.numEdit(12.34,2)).toBe("12,34");                
        
       expect(ctrl.numEdit(12.34,2)).toBe("12,34");                

       expect(ctrl.numEdit(123456789.123456,0)).toBe("123.456.789");                
        
       expect(ctrl.numEdit(123456789.123456,2)).toBe("123.456.789,13");                
        
       expect(ctrl.numEdit(-123456789.123456,0)).toBe("-123.456.789");                        
        
       expect(ctrl.numEdit(-123456789.123456,2)).toBe("-123.456.789,13");                        
    });

});
 
/* 	 
  
  
  
//TDD
  describe("Pruebas precios.v01: ", function() {
	 
	 	 
	 var x1 = ["x1","Orange",24.9502,"60 minutos de IP","- Con 4G",15,16,17,18,19,20,21,"SI",1000,2000,0,0,0,0,0,20.62,33,"SI"];
	 var y1 = ["y1","Orange",24.9502,"60 minutos de IP","- Con 4G",15,16,17,18,19,20,21,"NO",1000,2000,0,0,0,0,0,20.62,33,"NO"];
	 var z1 = ["z1","Orange",24.9502,"60 minutos de IP","- Con 4G",25,26,17,18,19,20,21,"NO",1000,2000,0,0,0,0,0,20.62,33,"NO"];
	 var x9 =  ["Yoigo Infinita 39","Yoigo+Movistar",0,"bbbb"," - Con 4G",0,0,10,0,32.23,0,99999,"SI",0,4000,1000,150,75,5000,0,0,0,"SI"];
	 var tab1 = [x1,y1];
	 var precios1 = new Precios;
	 precios1.setTabla(tab1);
	 precios1.actualizar(9999,8888,7777,6666); 
	  
  	 it("Varaibles", function() {
  		 expect(precios1.getMinutos()).toBe(9999);
  		 expect(precios1.getLlamadas()).toBe(8888);
  		 expect(precios1.getSMS()).toBe(7777);
  		 expect(precios1.getInternet()).toBe(6666);
  		 expect(precios1.datos.tabla[0][12]).toBe("SI");
  		 expect(precios1.datos.tabla[1][12]).toBe("NO");
  		 expect(precios1.datos.tabla[0][15]).toBe(9999);
  		 expect(precios1.datos.tabla[1][15]).toBe(9999);
  		 expect(precios1.datos.tabla[0][16]).toBe(8888);
  		 expect(precios1.datos.tabla[1][16]).toBe(8888);
  		 expect(precios1.datos.tabla[0][17]).toBe(7777);
  		 expect(precios1.datos.tabla[1][17]).toBe(7777);
  		 expect(precios1.datos.tabla[0][18]).toBe(6666);
  		 expect(precios1.datos.tabla[1][18]).toBe(6666);
 	 });

  	 var precios2 = new Precios;
  	 precios2.setTabla([x1.slice(),y1.slice()]);
  	 precios2.actualizar(0,0,0,0);
  	 it("Revision de Precios0_0_0_0", function() {
  		 expect(precios2.datos.tabla[0][20]).toBe(0);
  		 expect(precios2.datos.tabla[1][20]).toBe(0);
  		 expect(precios2.datos.tabla[0][21]).toBe(39);
  		 expect(precios2.datos.tabla[1][21]).toBe(39);
  		 expect(precios2.getPrecio(0)).toBe(47.19);
  		 expect(precios2.getPrecio(1)).toBe(47.19);
  		 expect(precios2.datos.tabla[0][4]).toBe(" - Con 4G");
  		 expect(precios2.datos.tabla[1][4]).toBe("bbbb");
 	 });

	 var precios3 = new Precios;
	 precios3.setTabla([x1.slice(),y1.slice()]);
  	 precios3.actualizar(9999,0,0,0);
 	 it("Revision de Precios9999_0_0_0", function() {
		 expect(precios3.datos.tabla[0][20]).toBe(1496.70);
	 	 expect(precios3.datos.tabla[1][20]).toBe(1496.70);
		 expect(precios3.datos.tabla[0][21]).toBe(1515.70);
	 	 expect(precios3.datos.tabla[1][21]).toBe(1515.70);
  		 expect(precios3.getPrecio(0)).toBe(1834);
  		 expect(precios3.getPrecio(1)).toBe(1834);
  		 expect(precios3.datos.tabla[0][4]).toBe(" - Con 4G");
  		 expect(precios3.datos.tabla[1][4]).toBe("bbbb");
 	 });	
 	 
	 var precios4 = new Precios;
	 precios4.setTabla([x1.slice(),y1.slice()]);
 	 precios4.actualizar(9999,8888,0,0);
	 it("Revision de Precios9999_8888_0_0", function() {
	 	 expect(precios4.datos.tabla[0][20]).toBe(2915.79);
	 	 expect(precios4.datos.tabla[1][20]).toBe(2918.78);
	 	 expect(precios4.datos.tabla[0][21]).toBe(2934.79);
	 	 expect(precios4.datos.tabla[1][21]).toBe(2937.78);
  		 expect(precios4.getPrecio(0)).toBe(3551.10);
  		 expect(precios4.getPrecio(1)).toBe(3554.71);
  		 expect(precios4.datos.tabla[0][4]).toBe(" - Con 4G");
  		 expect(precios4.datos.tabla[1][4]).toBe("bbbb");
	 });

	 var precios5 = new Precios;
	 precios5.setTabla([x1.slice(),y1.slice()]);
 	 precios5.actualizar(9999,8888,7777,0);
	 it("Revision de Precios9999_8888_7777_0", function() {
	 	 expect(precios5.datos.tabla[0][20]).toBe(4067.88);
	 	 expect(precios5.datos.tabla[1][20]).toBe(4070.87);
	 	 expect(precios5.datos.tabla[0][21]).toBe(4086.88);
	 	 expect(precios5.datos.tabla[1][21]).toBe(4089.87);
  		 expect(precios5.getPrecio(0)).toBe(4945.12);
  		 expect(precios5.getPrecio(1)).toBe(4948.74);
  		 expect(precios5.datos.tabla[0][4]).toBe(" - Con 4G");
  		 expect(precios5.datos.tabla[1][4]).toBe("bbbb");
	 });

	 var precios6 = new Precios;
	 precios6.setTabla([x1.slice(),y1.slice()]);
 	 precios6.actualizar(9999,8888,7777,6666);
	 it("Revision de Precios9999_8888_7777_6666", function() {
	 	 expect(precios6.datos.tabla[0][20]).toBe(4907.76);
	 	 expect(precios6.datos.tabla[1][20]).toBe(4910.75);
	 	 expect(precios6.datos.tabla[0][21]).toBe(4926.76);
	 	 expect(precios6.datos.tabla[1][21]).toBe(4929.75);
  		 expect(precios6.getPrecio(0)).toBe(5961.38);
  		 expect(precios6.getPrecio(1)).toBe(5965.00);
  		 expect(precios6.datos.tabla[0][4]).toBe("Incluido Sobrecoste por Datos de 1.016,25 Euros - Con 4G");
  		 expect(precios6.datos.tabla[1][4]).toBe("Incluido Sobrecoste por Datos de 1.016,25 Euros");
	 });

	 var precios7 = new Precios;
	 precios7.setTabla([x1.slice(),y1.slice()]);
 	 precios7.actualizar(10,11,12,13);
	 it("Revision de Precios0010_0011_0012_0013", function() {
	 	 expect(precios7.datos.tabla[0][20]).toBe(0.00);
	 	 expect(precios7.datos.tabla[1][20]).toBe(1.76);
	 	 expect(precios7.datos.tabla[0][21]).toBe(39);
	 	 expect(precios7.datos.tabla[1][21]).toBe(39);
  		 expect(precios7.getPrecio(0)).toBe(47.19);
  		 expect(precios7.getPrecio(1)).toBe(47.19);
  		 expect(precios5.datos.tabla[0][4]).toBe(" - Con 4G");
  		 expect(precios5.datos.tabla[1][4]).toBe("bbbb");
	 });
	 
	 var precios8 = new Precios;
	 precios8.setTabla([z1.slice(),y1.slice(),x1.slice()]);
 	 precios8.actualizar(9999,8888,7777,6666);
	 it("Revision de Precios9999_8888_7777_6666", function() {
		 expect(precios8.datos.tabla[0][0]).toBe("x1");
		 expect(precios8.datos.tabla[1][0]).toBe("y1");
		 expect(precios8.datos.tabla[2][0]).toBe("z1");
  		 expect(precios8.getPrecio(0)).toBe(5961.38);
  		 expect(precios8.getPrecio(1)).toBe(5965.00);
  		 expect(precios8.getPrecio(2)).toBe(8247.78);
	 });

	 var precios9 = new Precios;
	 precios9.setTabla([x9]);
 	 precios9.actualizar(1000,150,75,5000);
	 it("Yoigo Infinita 39", function() {
	 	 expect(precios9.datos.tabla[0][7]).toBe(10);
	 	 expect(precios9.datos.tabla[0][20]).toBe(7.50);
  		 expect(precios9.getPrecio(0)).toBe(48.07);
	 });

	 var precios10 = new Precios;
	 precios10.setTabla([x1.slice(),y1.slice()]);
 	 it("Verficar Version", function() {
	 	 expect(precios10.verificarVF(VERSION)).toBe(true);
	 	 expect(precios10.verificarVF("VERSION")).toBe(false);
	 });

	 var precios11 = new Precios;
	 precios11.setTabla([x1.slice(),y1.slice()]);
	 precios11.datos.fecha.year = "2000";
 	 it("Verficar Fecha1", function() {
	 	 expect(precios11.verificarVF(VERSION)).toBe(false);
	 	 expect(precios11.verificarVF("VERSION")).toBe(false);
		 });

	 var precios12 = new Precios;
	 precios12.setTabla([x1.slice(),y1.slice()]);
	 precios12.datos.fecha.month += 1;
 	 it("Verficar Fecha1", function() {
	 	 expect(precios12.verificarVF(VERSION)).toBe(false);
	 	 expect(precios12.verificarVF("VERSION")).toBe(false);
		 });

	 var precios13 = new Precios;
	 precios13.setTabla([x1.slice(),y1.slice()]);
	 precios13.datos.fecha.day -= 1;
 	 it("Verficar Fecha1", function() {
	 	 expect(precios13.verificarVF(VERSION)).toBe(false);
	 	 expect(precios13.verificarVF("VERSION")).toBe(false);
		 });

	 
  });
});
  
  
*/
