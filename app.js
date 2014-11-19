
//Define an angular module for our app
var app = angular.module('pf', []);
 
// everything is handled in the controller
app.controller('ProductFilterCtrl', function($scope, $http) {
    
    // define the fields you want to search in
    var searchFields=["Produktnamen","Produkt"];
    
     // define the fields you want to use as a filter
    var filterFields=["Anwendung","Ausbringvariante","Baustoffklasse","MDI / MA / MDI-frei"];   
    
    
    // scope data
    $scope.products         = null;
    $scope.filteredProducts = null;
    $scope.filters          = null;
    $scope.selectedFilters  = {};
    
    
    // load csv data and convert it to a json
    $http.get("products.csv").success(function(data) {
        $scope.filteredProducts = $scope.products = csv2json(data);
        generateFilters();
        
        
    }).error(function(){
        //this can be removed
        $scope.filteredProducts = $scope.products = [{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Kennzeichnungsfreier Füllschaum","MDI / MA / MDI-frei":"MA","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"EOEbase"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Kennzeichnungsfreier Füllschaum","MDI / MA / MDI-frei":"MA","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"EOEbase"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Kennzeichnungsfreier Füllschaum","MDI / MA / MDI-frei":"MA","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"EOEbase"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Kennzeichnungsfreier Füllschaum","MDI / MA / MDI-frei":"MA","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"EOEbase"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Kennzeichnungsfreier Füllschaum","MDI / MA / MDI-frei":"MA","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"EOEbase plus"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Kennzeichnungsfreier Füllschaum","MDI / MA / MDI-frei":"MA","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"EOEbase plus"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Kennzeichnungsfreier Füllschaum","MDI / MA / MDI-frei":"MA","Ausbringvariante":"PS","Baustoffklasse":"E (B2)","Produktnamen":"EOEbase plus pro"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Kennzeichnungsfreier Füllschaum","MDI / MA / MDI-frei":"MA","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"EOEbase plus pro"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Kennzeichnungsfreier Füllschaum","MDI / MA / MDI-frei":"MA","Ausbringvariante":"PS","Baustoffklasse":"E (B2)","Produktnamen":"EOEbase pro"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Kennzeichnungsfreier Füllschaum","MDI / MA / MDI-frei":"MA","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"EOEbase pro"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Kennzeichnungsfreier Füllschaum","MDI / MA / MDI-frei":"MA","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"EOEbase top"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Kennzeichnungsfreier Füllschaum","MDI / MA / MDI-frei":"MA","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"EOEbase top"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Kennzeichnungsfreier Füllschaum","MDI / MA / MDI-frei":"MA","Ausbringvariante":"Combi","Baustoffklasse":"E (B2)","Produktnamen":"EOEbase top combi"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Kennzeichnungsfreier Füllschaum","MDI / MA / MDI-frei":"MA","Ausbringvariante":"PS","Baustoffklasse":"E (B2)","Produktnamen":"EOEbase top pro"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Kennzeichnungsfreier Füllschaum","MDI / MA / MDI-frei":"MA","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"EOEbase top pro"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Kennzeichnungsfreier Füllschaum","MDI / MA / MDI-frei":"MA","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"EOEfill MEGA"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Kennzeichnungsfreier Füllschaum","MDI / MA / MDI-frei":"MA","Ausbringvariante":"Combi","Baustoffklasse":"E (B2)","Produktnamen":"EOEfill MEGA combi"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Kennzeichnungsfreier Füllschaum","MDI / MA / MDI-frei":"MA","Ausbringvariante":"PS","Baustoffklasse":"E (B2)","Produktnamen":"EOEfill MEGA pro"},{"Anwendung":"Fenster","Produkt":"Kennzeichnungsfreier Füllschaum","MDI / MA / MDI-frei":"MA","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"EOEflex"},{"Anwendung":"Fenster","Produkt":"Kennzeichnungsfreier Füllschaum","MDI / MA / MDI-frei":"MA","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"EOEflex"},{"Anwendung":"Fenster","Produkt":"Kennzeichnungsfreier Füllschaum","MDI / MA / MDI-frei":"MA","Ausbringvariante":"Combi","Baustoffklasse":"E (B2)","Produktnamen":"EOEflex combi"},{"Anwendung":"Fenster","Produkt":"Kennzeichnungsfreier Füllschaum","MDI / MA / MDI-frei":"MA","Ausbringvariante":"PS","Baustoffklasse":"E (B2)","Produktnamen":"EOEflex pro"},{"Anwendung":"Fenster","Produkt":"Kennzeichnungsfreier Winter Füllschaum","MDI / MA / MDI-frei":"MA","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"EOEfrost"},{"Anwendung":"Fenster","Produkt":"Kennzeichnungsfreier Winter Füllschaum","MDI / MA / MDI-frei":"MA","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"EOEfrost"},{"Anwendung":"Fenster","Produkt":"Kennzeichnungsfreier Winter Füllschaum","MDI / MA / MDI-frei":"MA","Ausbringvariante":"PS","Baustoffklasse":"E (B2)","Produktnamen":"EOEfrost pro"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Isocyanatfreier Füllschaum","MDI / MA / MDI-frei":"MDI-frei","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"EOElan"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Isocyanatfreier Füllschaum","MDI / MA / MDI-frei":"MDI-frei","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"EOElan pro"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Isocyanatfreier Füllschaum","MDI / MA / MDI-frei":"MDI-frei","Ausbringvariante":"Combi","Baustoffklasse":"F (B3)","Produktnamen":"EOElan top"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Standardfüllschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"FARAbase"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Standardfüllschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"FARAbase"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Standardfüllschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"FARAbase"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Standardfüllschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAbase"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Standardfüllschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAbase"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Standardfüllschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAbase"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Standard Füllschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"E (B2)","Produktnamen":"FARAbase pro"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Standard Füllschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"E (B2)","Produktnamen":"FARAbase pro"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Standard Füllschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"FARAbase pro"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Standard Füllschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"FARAbase pro"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Standard Füllschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"Combi","Baustoffklasse":"F (B3)","Produktnamen":"FARAbase top"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"EOEnomic Standard Füllschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"FARAbasic"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"EOEnomic Standard Füllschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"FARAbasic"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"EOEnomic Standard Füllschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"FARAbasic"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"EOEnomic Standard Füllschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAbasic"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"EOEnomic Standard Füllschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAbasic"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"EOEnomic Standard Füllschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAbasic"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"EOEnomic Standard Füllschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"E (B2)","Produktnamen":"FARAbasic pro"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"EOEnomic Standard Füllschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"E (B2)","Produktnamen":"FARAbasic pro"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"EOEnomic Standard Füllschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"FARAbasic pro"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"EOEnomic Standard Füllschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"FARAbasic pro"},{"Anwendung":"Perimeter","Produkt":"Kleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAcell"},{"Anwendung":"Perimeter","Produkt":"Kleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAcell"},{"Anwendung":"Perimeter","Produkt":"Kleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAcell"},{"Anwendung":"Perimeter","Produkt":"Kleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"FARAcell pro"},{"Anwendung":"Perimeter","Produkt":"Kleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"FARAcell pro"},{"Anwendung":"Perimeter","Produkt":"Kleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"Combi","Baustoffklasse":"F (B3)","Produktnamen":"FARAcell top"},{"Anwendung":"Pistolen Reinigung / Reinigung frischer PUR-Schaum","Produkt":"Standardreingier","MDI / MA / MDI-frei":"n.r.","Ausbringvariante":"PR","Baustoffklasse":"n.r.","Produktnamen":"FARAclean   "},{"Anwendung":"Pistolen Reinigung & Pflege / Reinigung frischer PUR-Schaum","Produkt":"Pflegereingier","MDI / MA / MDI-frei":"n.r.","Ausbringvariante":"PR","Baustoffklasse":"n.r.","Produktnamen":"FARAclean & care"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Schallschutzschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"FARAcoustic"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Schallschutzschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"FARAcoustic"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Schallschutzschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"FARAcoustic"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Schallschutzschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAcoustic"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Schallschutzschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAcoustic"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Schallschutzschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAcoustic"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Schallschutzschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS ","Baustoffklasse":"E (B2)","Produktnamen":"FARAcoustic pro"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Schallschutzschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS ","Baustoffklasse":"E (B2)","Produktnamen":"FARAcoustic pro"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Schallschutzschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS ","Baustoffklasse":"F (B3)","Produktnamen":"FARAcoustic pro"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Schallschutzschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS ","Baustoffklasse":"F (B3)","Produktnamen":"FARAcoustic pro"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Schallschutzschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"Combi","Baustoffklasse":"F (B3)","Produktnamen":"FARAcoustic top"},{"Anwendung":"Türen","Produkt":"2K-Schaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"E (B2)","Produktnamen":"FARAduo fix"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Megaschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"FARAfill"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Megaschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"FARAfill"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Megaschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"FARAfill"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Megaschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"E (B2)","Produktnamen":"FARAfill pro"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Megaschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"E (B2)","Produktnamen":"FARAfill pro"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Megaschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"FARAfill pro"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Sanitär; Leitungsbau","Produkt":"Megaschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"FARAfill pro"},{"Anwendung":"Türen","Produkt":"1.5K-Schaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"FARAfix"},{"Anwendung":"Türen","Produkt":"1.5K-Schaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"FARAfix"},{"Anwendung":"Türen","Produkt":"1.5K-Schaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"FARAfix"},{"Anwendung":"Türen","Produkt":"1.5K-Schaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"FARAfix"},{"Anwendung":"Türen","Produkt":"1.5K-Schaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"FARAfix"},{"Anwendung":"Türen","Produkt":"1.5K-Schaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"FARAfix"},{"Anwendung":"Sanitär","Produkt":"1.5K-Schaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"FARAfix bath"},{"Anwendung":"Sanitär","Produkt":"1.5K-Schaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"FARAfix bath"},{"Anwendung":"Sanitär","Produkt":"1.5K-Schaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"FARAfix bath"},{"Anwendung":"Sanitär","Produkt":"1.5K-Schaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"FARAfix bath"},{"Anwendung":"Fenster; Innenausbau","Produkt":"Weichschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAflex"},{"Anwendung":"Fenster; Innenausbau","Produkt":"Weichschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAflex"},{"Anwendung":"Fenster; Innenausbau","Produkt":"Weichschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAflex"},{"Anwendung":"Fenster; Innenausbau","Produkt":"Weichschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"E (B2)","Produktnamen":"FARAflex pro"},{"Anwendung":"Fenster; Innenausbau","Produkt":"Weichschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"E (B2)","Produktnamen":"FARAflex pro"},{"Anwendung":"Fenster; Innenausbau","Produkt":"Weichschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"FARAflex pro"},{"Anwendung":"Fenster; Innenausbau","Produkt":"Weichschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"FARAflex pro"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Leitungsbau","Produkt":"Winterschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"E (B2)","Produktnamen":"FARAfrost pro"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Leitungsbau","Produkt":"Winterschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"E (B2)","Produktnamen":"FARAfrost pro"},{"Anwendung":"Leitungsbau","Produkt":"Sicherungsschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAguard"},{"Anwendung":"Leitungsbau","Produkt":"Sicherungsschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAguard"},{"Anwendung":"Leitungsbau","Produkt":"Sicherungsschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAguard"},{"Anwendung":"Leitungsbau","Produkt":"Sicherungsschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"FARAguard pro"},{"Anwendung":"Leitungsbau","Produkt":"Sicherungsschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"FARAguard pro"},{"Anwendung":"Leitungsbau","Produkt":"Sicherungsschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"Combi","Baustoffklasse":"F (B3)","Produktnamen":"FARAguard top"},{"Anwendung":"Fenster; Türen; Innenausbau; Hohlräume; Leitungsbau","Produkt":"Brandschutzschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"B / EI","Produktnamen":"FARAheat"},{"Anwendung":"Fenster; Türen; Innenausbau; Hohlräume; Leitungsbau","Produkt":"Brandschutzschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"B / EI","Produktnamen":"FARAheat"},{"Anwendung":"Fenster; Türen; Innenausbau; Hohlräume; Leitungsbau","Produkt":"Brandschutzschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"B / EI","Produktnamen":"FARAheat"},{"Anwendung":"Fenster; Türen; Innenausbau; Hohlräume; Leitungsbau","Produkt":"Brandschutzschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"B / EI","Produktnamen":"FARAheat pro"},{"Anwendung":"Fenster; Türen; Innenausbau; Hohlräume; Leitungsbau","Produkt":"Brandschutzschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"B / EI","Produktnamen":"FARAheat pro"},{"Anwendung":"Fenster; Türen; Innenausbau; Hohlräume; Leitungsbau","Produkt":"Brandschutzschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"Combi","Baustoffklasse":"B / EI","Produktnamen":"FARAheat top"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Leitungsbau","Produkt":"Winterschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAice"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Leitungsbau","Produkt":"Winterschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAice"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Leitungsbau","Produkt":"Winterschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAice"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Leitungsbau","Produkt":"Winterschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"FARAice pro"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Leitungsbau","Produkt":"Winterschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"FARAice pro"},{"Anwendung":"Fenster; Innenausbau; Hohlräume; Leitungsbau","Produkt":"Winterschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"Combi","Baustoffklasse":"E (B2)","Produktnamen":"FARAice top"},{"Anwendung":"Schalungsbau","Produkt":"Schalungsschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAmould"},{"Anwendung":"Schalungsbau","Produkt":"Schalungsschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAmould"},{"Anwendung":"Schalungsbau","Produkt":"Schalungsschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAmould"},{"Anwendung":"Schalungsbau","Produkt":"Schalungsschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"FARAmould pro"},{"Anwendung":"Schalungsbau","Produkt":"Schalungsschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"FARAmould pro"},{"Anwendung":"Dach","Produkt":"Dachpfannenschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"FARAroof"},{"Anwendung":"Dach","Produkt":"Dachpfannenschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"FARAroof"},{"Anwendung":"Dach","Produkt":"Dachpfannenschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"FARAroof"},{"Anwendung":"Dach","Produkt":"Dachpfannenschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAroof"},{"Anwendung":"Dach","Produkt":"Dachpfannenschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAroof"},{"Anwendung":"Dach","Produkt":"Dachpfannenschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAroof"},{"Anwendung":"Dach","Produkt":"Dachpfannenschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"E (B2)","Produktnamen":"FARAroof pro"},{"Anwendung":"Dach","Produkt":"Dachpfannenschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"E (B2)","Produktnamen":"FARAroof pro"},{"Anwendung":"Dach","Produkt":"Dachpfannenschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"FARAroof pro"},{"Anwendung":"Dach","Produkt":"Dachpfannenschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"FARAroof pro"},{"Anwendung":"Dach","Produkt":"Dachpfannenschaum","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"Combi","Baustoffklasse":"F (B3)","Produktnamen":"FARAroof top"},{"Anwendung":"Dach","Produkt":"Dämmstoffplatten Kleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"E (B2)","Produktnamen":"FARAroofing pro"},{"Anwendung":"Dach","Produkt":"Dämmstoffplatten Kleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"E (B2)","Produktnamen":"FARAroofing pro"},{"Anwendung":"Mauerwerk","Produkt":"Steinkleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAstone"},{"Anwendung":"Mauerwerk","Produkt":"Steinkleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAstone"},{"Anwendung":"Mauerwerk","Produkt":"Steinkleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAstone"},{"Anwendung":"Mauerwerk","Produkt":"Steinkleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"FARAstone pro"},{"Anwendung":"Mauerwerk","Produkt":"Steinkleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"FARAstone pro"},{"Anwendung":"Mauerwerk","Produkt":"Steinkleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"Combi","Baustoffklasse":"F (B3)","Produktnamen":"FARAstone top"},{"Anwendung":"Schacht- und Abwasserelemente","Produkt":"Schachtkleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAsub"},{"Anwendung":"Schacht- und Abwasserelemente","Produkt":"Schachtkleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAsub"},{"Anwendung":"Schacht- und Abwasserelemente","Produkt":"Schachtkleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAsub"},{"Anwendung":"Schacht- und Abwasserelemente","Produkt":"Schachtkleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"FARAsub pro"},{"Anwendung":"Schacht- und Abwasserelemente","Produkt":"Schachtkleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"FARAsub pro"},{"Anwendung":"Schacht- und Abwasserelemente","Produkt":"Schachtkleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"Combi","Baustoffklasse":"F (B3)","Produktnamen":"FARAsub top"},{"Anwendung":"Fassade","Produkt":"WDVS-Kleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"B2","Produktnamen":"FARAtherm pro"},{"Anwendung":"Fassade","Produkt":"WDVS-Kleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"B2","Produktnamen":"FARAtherm pro"},{"Anwendung":"Fassade","Produkt":"WDVS-Kleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"FARAtherm pro"},{"Anwendung":"Fassade","Produkt":"WDVS-Kleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"FARAtherm pro"},{"Anwendung":"Brunnenelemente","Produkt":"Brunnenkleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAtube"},{"Anwendung":"Brunnenelemente","Produkt":"Brunnenkleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAtube"},{"Anwendung":"Brunnenelemente","Produkt":"Brunnenkleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAtube"},{"Anwendung":"Brunnenelemente","Produkt":"Brunnenkleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"FARAtube pro"},{"Anwendung":"Brunnenelemente","Produkt":"Brunnenkleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"FARAtube pro"},{"Anwendung":"Innenausbau","Produkt":"Plattenkleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"FARAwall"},{"Anwendung":"Innenausbau","Produkt":"Plattenkleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"FARAwall"},{"Anwendung":"Innenausbau","Produkt":"Plattenkleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"E (B2)","Produktnamen":"FARAwall"},{"Anwendung":"Innenausbau","Produkt":"Plattenkleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAwall"},{"Anwendung":"Innenausbau","Produkt":"Plattenkleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAwall"},{"Anwendung":"Innenausbau","Produkt":"Plattenkleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"AS","Baustoffklasse":"F (B3)","Produktnamen":"FARAwall"},{"Anwendung":"Innenausbau","Produkt":"Plattenkleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"E (B2)","Produktnamen":"FARAwall pro"},{"Anwendung":"Innenausbau","Produkt":"Plattenkleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"E (B2)","Produktnamen":"FARAwall pro"},{"Anwendung":"Innenausbau","Produkt":"Plattenkleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"FARAwall pro"},{"Anwendung":"Innenausbau","Produkt":"Plattenkleber","MDI / MA / MDI-frei":"MDI","Ausbringvariante":"PS","Baustoffklasse":"F (B3)","Produktnamen":"FARAwall pro"}];
        generateFilters();
    });
    
    
    // detect filter change
    $scope.$watch('selectedFilters', function(o) {
        if( Object.getOwnPropertyNames(o).length > 0 ){
           
            console.log(o);
            filterProducts();
        }
    },true);
    
    
    
    
    $scope.$watch('query', function(s) {
        if( s !== undefined ){
            filterProducts();
        }
    });
    
    
    var filterProducts = function(){
        var s = "";
        if($scope.query)
            s=$scope.query.toLowerCase();
        
        

        $scope.filteredProducts = $scope.products.filter(function(o) {
            var bReturn=true;
            
            angular.forEach($scope.selectedFilters, function(filters,groupName) {
                if(bReturn ) {
                    angular.forEach(filters, function(v,k) {
                        if( bReturn && v ){
                            bReturn = (o[ groupName ].indexOf( k )>=0);
                        }
                    });
                }
            });
            
            
            
            if( bReturn && s !== "" ){
                for(var i = 0; i<searchFields.length;i++){
                    bReturn = (o[ searchFields[i] ].toLowerCase().indexOf(s)>=0);
                    if(bReturn) break;                
                }
            }
            
            
            return bReturn;
        });
        generateFilters();
    };
    
    
    var generateFilters = function(data){
        
        var filters = {};
        
        for(var i = 0; i<filterFields.length;i++)
            filters[ filterFields[i] ]={name:filterFields[i],items:[]};   
        
        
        // create filter based on products attributes
        angular.forEach($scope.filteredProducts, function(record) {
            angular.forEach(record, function(value, key) {
                if( filters[key] ){
                    var a = value.split(";");
                    for(var i=0;i<a.length;i++){
                        var s = a[i].trim();
                        if( s!=="" && filters[key].items.indexOf(s) === -1 ){
                            filters[key].items.push(s);
                        }
                    }
                }
            });
        });
        
        $scope.filters = filters;
    };

});

 
 
 
 
 
 


function csv2json(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
    
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp((
    // Delimiters.
    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
    // Quoted fields.
    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
    // Standard fields.
    "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];
    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {
        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];
        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (strMatchedDelimiter.length && (strMatchedDelimiter !== strDelimiter)) {
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);
        }
        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]) {
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            var strMatchedValue = arrMatches[2].replace(
            new RegExp("\"\"", "g"), "\"");
        } else {
            // We found a non-quoted value.
            var strMatchedValue = arrMatches[3];
        }
        // Now that we have our value string, let's add
        // it to the data array.
        arrData[arrData.length - 1].push(strMatchedValue);
    }
    
    
    var objArray = [];
    for (var i = 1; i < arrData.length; i++) {
        objArray[i - 1] = {};
        for (var k = 0; k < arrData[0].length && k < arrData[i].length; k++) {
            var key = arrData[0][k].trim();
            objArray[i - 1][key] = arrData[i][k];
        }
    }
    
    // Return the parsed data.
    return objArray;
}