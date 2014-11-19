
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
    $http.get('products.csv').then(function(res) {
        
        $scope.filteredProducts = $scope.products = csv2json(res.data,";");
        
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
                    var a = value.split(",");
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