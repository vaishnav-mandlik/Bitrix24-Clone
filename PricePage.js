// import navbar from "./deepak_camponants/navbar.js";
// var nav_div = document.getElementById("navbar_div");
// nav_div.innerHTML = navbar();

var basic_price = document.getElementById("basic_price");
var standard_price = document.getElementById("standard_price");
var professional_price = document.getElementById("professional_price");
var enterprise_price = document.getElementById("enterprise_price");

var Basicyearly = 3490;
var Standardyearly = 6990;
var Professionalyearly = 13990;
var Enterpriseyearly = 27990;

var BasicMon = 4360;
var StandardMon = 8740;
var ProfessionalMon = 14490;
var EnterpriseMon = 34990;

document.getElementById("plans").addEventListener("change", getInput);

function getInput(){
   


    var plans = document.getElementById("plans").value
    if(plans == "1year"){
        basic_price.innerText = `Rs. ${Basicyearly}/month -20%`
        standard_price.innerText = `Rs. ${Standardyearly}/month -20%`
        professional_price.innerText = `Rs. ${Professionalyearly}/month -20%`
        enterprise_price.innerText = `Rs. ${Enterpriseyearly}/month -20%`
        
    }
    else{
        basic_price.innerText = `Rs. ${BasicMon}/month`
        standard_price.innerText = `Rs. ${StandardMon}/month`
        professional_price.innerText = `Rs. ${ProfessionalMon}/month`
        enterprise_price.innerText = `Rs. ${EnterpriseMon}/month`
    }

}

 const basic_total = document.getElementById("basicBtn").addEventListener("click", getBasic)
function getBasic(){
    console.log("Buy")
    localStorage.setItem("SubTotal",JSON.stringify(basic_price.innerText))
}

const standard_total = document.getElementById("standardBtn").addEventListener("click", getStandard)
function getStandard(){
    console.log("Buy")
    localStorage.setItem("SubTotal",JSON.stringify(standard_price.innerText))
}

const professional_total = document.getElementById("professionalBtn").addEventListener("click", getprofessional)
function getprofessional(){
    console.log("Buy")
    localStorage.setItem("SubTotal",JSON.stringify(professional_price.innerText))
}

const enterprise_total = document.getElementById("enterpriseBtn").addEventListener("click", getenterprise)
function getenterprise(){
    console.log("Buy")
    localStorage.setItem("SubTotal",JSON.stringify(enterprise_price.innerText))
}





//  let bas = document.getElementById("basicbtn").addEventListener("click", basicFun)
// function basicFun(){
//     localStorage.setItem("SubPrice", JSON.stringify(basic_price));
//     alert("Do payment securely");
//     console.log("basicbtn")
// }






