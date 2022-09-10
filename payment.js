document.getElementById("pay").addEventListener("click", payment);

   
function payment(){

 var Fname = document.getElementById("Fname").value;
 var Lname = document.getElementById("Lname").value;
 var email = document.getElementById("email").value;
 var card = document.getElementById("card").value;
 var cvv = document.getElementById("cvv").value;
 var date = document.getElementById("date").value;


 if(Fname == "" || Lname == "" || email == "" || card == "" || cvv == "" || date == ""){
     alert("Please enter all the details")
     console.log(Fname)
 }
 else{
     console.log("clicked")
     alert("Payment Successful")
     location.href = "stream.html"
 }
 
}

let yourPlan_div = document.getElementById("yourPlan")
let SubTotal = JSON.parse(localStorage.getItem("SubTotal"));

yourPlan_div.append(`You choosed ${SubTotal} plan`)