var a = [];
  function signup(){
    var obj = {
    name : document.querySelector("#name").value,
    email : document.querySelector("#email").value,
    password : document.querySelector("#password").value,
    }
  
    a.push(obj )
    console.log(a);
    localStorage.setItem("details", JSON.stringify(a))
    alert("Signup successfull!")
    window.location.href = "b-login.html"
}