let submit=document.getElementById("submit");
let username=document.getElementById("userName");
let password=document.getElementById("password");
let userNameError=document.getElementById("userNameError")
let passwordError=document.getElementById("passwordError")
submit.addEventListener("click", function(e){
    e.preventDefault();
   
    validate();
})
username.addEventListener("input",function(){
    if(username.value.length>=3||isNaN(username.value[0])){
        userNameError.style.display="none";
        username.style.border = "";
    }
})
password.addEventListener("input", function(){
    if(password.value.length>=8){
        passwordError.style.display="none";
        password.style.border="";
    }
})
function validate(){
     if(username.value===""||username.value.length<3){
       userNameError.innerText="user name can't be empty or lessthan 3 letters ";
        username.style.color="red";
        userNameError.style.display="block";

    }
    else if(!isNaN(username.value[0]) ){
        userNameError.innerText="user name can't starts with a number !";
         username.style.border = "2px solid red"
        userNameError.style.display="block";
    }
    if(password.value===""||password.value.length<8){
       passwordError.innerText="Field can't be empty or lessthan 8 letters";
         password.style.border = "2px solid red"
        passwordError.style.display="block";

    }
    
}