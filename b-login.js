var userdata = JSON.parse(localStorage.getItem('details'));

console.log(userdata)

  function login(){
  event.preventDefault();
   var  email = document.getElementById("email").value
   var password = document.getElementById("password").value
   for(i=0; i<userdata.length; i++){
     if(email == userdata[i].email && password == userdata[i].password){

      alert("success")
      localStorage.setItem("Bitrix_User",JSON.stringify(email) )
      window.location.href = "PricePage.html";
      break;
     }else{
      alert("Please enter correct email or number")
     }
   }

  }
