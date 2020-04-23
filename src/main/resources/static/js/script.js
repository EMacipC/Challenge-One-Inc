var actions=document.getElementById("action");
var alert= document.getElementById("alert");
var submit= document.getElementById("submit");
var edit= document.getElementById("edit");
var editalert= document.getElementById("editalert");
var app = angular.module('workSheet', []);
var idC=0;
app.controller('ctrlWorkSheet', function($scope, $http) {
	$scope.input=[];
	 buttons();
    $http.get("http://localhost:8080/input")
    .then(function(response) {
    	console.log(response);
      $scope.input = response.data;
      sumatoria($scope.input,$scope);
    });
    $scope.submit=function(){
    	proofs($scope.modelAmount,$scope);
    	sumatoria($scope.input,$scope);
    	
    	$http.post("http://localhost:8080/input",{
    		description:$scope.modelDescription,
    		date:$scope.modelDate,
    		amount:$scope.modelAmount,
    		id:idC
    	});
    }
    $scope.updateItem= function(x){
    	
    	  $scope.edit=function(){
    			editProof(x,$scope);
			   $http.put('http://localhost:8080/input/'+(x+1),{
			    	description:$scope.editDescription,
					date:$scope.editDate,
					amount:$scope.editAmount,
					id:(x+1)
			    });	 
    	} 
    }
    $scope.removeItem = function (x) {
    	idC--;
        $scope.input.splice(x, 1);
        console.log(x);
        sumatoria($scope.input,$scope);
        $http.delete('http://localhost:8080/input/'+(x+1))
    }
    sumatoria($scope.input,$scope); 
});
function sumatoria(inputs,$scope){
	var acumulador=0;
	for(let input of inputs){
		let inp=parseFloat(input.amount);
		acumulador=acumulador+inp;
		
	}
	$scope.total=acumulador;
}
function buttons(){
	actions.innerHTML = 
		'<button class="btn bg-danger" ng-click="removeItem($index)">' + 
			'<i class="fa fa-trash"></i>' +
	    '</button>' +
	    '<button class="btn bg-info" ng-click="updateItem($index)"data-toggle="modal" data-target="#edit">>' +
	        '<i class="fa fa-folder"></i>'
	    '</button>';
}
function habilitar(){
	submit.disabled=false;
	if(alert.childNodes!=null){
	alert.removeChild(alert.childNodes[0]);
	}
}

function proofs(number,$scope){
	var dec;
	
	var proof=number.indexOf("-",1)
	var proofP=number.indexOf(".",1)
	if(proofP!=1){
		number=number+"."
	}
	dec = String(number).split(".");
	var long=dec[1].length;
	var current = new Date();
	var date=$scope.modelDate;
	var time=current-date;
	console.log(current);
	console.log(date);
	console.log(time);
	var proofTime=(1000*60*60*24*7)
	var longDescription=$scope.modelDescription.length;
		 if(long>2) {
				submit.disabled=true;
			    alert.innerHTML=
			    	'<div class="alert alert-danger" role="alert">More than tow decimals</div>'
			    let myVar = setInterval(habilitar, 2000);
		  }else if(proof==1){
			  	submit.disabled=true;
			    alert.innerHTML=
			    	'<div class="alert alert-danger" role="alert">Negative number</div>'
			    let myVar = setInterval(habilitar, 2000);
		  }else if(longDescription>255){
			  	submit.disabled=true;
			    alert.innerHTML=
			    	'<div class="alert alert-danger" role="alert">More than 255 characters</div>'
			    let myVar = setInterval(habilitar, 2000);
			  
		  }else if(time>proofTime){
			  	submit.disabled=true;
			    alert.innerHTML=
			    	'<div class="alert alert-danger" role="alert">More than 7 days</div>'
			    let myVar = setInterval(habilitar, 2000);
			  
		  }else{
			  idC++;
			  $scope.input.push({description:$scope.modelDescription,
		    		date:$scope.modelDate,
		    		amount:$scope.modelAmount,
		    		id:idC});
		    	
		  }
}
function habilitarEdit(){
	edit.disabled=false;
	if(editalert.childNodes!=null){
	editalert.removeChild(editalert.childNodes[0]);
	}
}
function editProof(x,$scope){
	let number=$scope.editAmount
	
	let proof=number.indexOf("-",1)
	let proofP=number.indexOf(".",1)
	if(proofP!=1){
		number=number+"."
	}
	let dec;
	dec = String(number).split(".");
	let long=dec[1].length;
	let current = new Date();
	let date=$scope.editDate;
	let time=current-date;
	console.log(current);
	console.log(date);
	console.log(time);
	let proofTime=(1000*60*60*24*7)
	let longDescription=$scope.editDescription.length;
		 if(long>2) {
				edit.disabled=true;
			    editalert.innerHTML=
			    	'<div class="alert alert-danger" role="alert">More than tow decimals</div>'
			    let myVar = setInterval(habilitarEdit, 2000);
		  }else if(proof==1){
			  	edit.disabled=true;
			    editalert.innerHTML=
			    	'<div class="alert alert-danger" role="alert">Negative number</div>'
			    let myVar = setInterval(habilitarEdit, 2000);
		  }else if(longDescription>255){
			  	edit.disabled=true;
			    editalert.innerHTML=
			    	'<div class="alert alert-danger" role="alert">More than 255 characters</div>'
			    let myVar = setInterval(habilitarEdit, 2000);
			  
		  }else if(time>proofTime){
			  	edit.disabled=true;
			    editalert.innerHTML=
			    	'<div class="alert alert-danger" role="alert">More than 7 days</div>'
			    let myVar = setInterval(habilitarEdit, 2000);
			  
		  }else{
			
			  $scope.input[x].description=$scope.editDescription;
			  $scope.input[x].date=$scope.editDate;
			  $scope.input[x].amount=$scope.editAmount;
		  }
}