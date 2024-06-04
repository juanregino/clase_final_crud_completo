import { URL_COMPANIES } from "../api/URLS.js";


// selectores
const formLogin = document.getElementById("formLogin");
const email = document.getElementById("email");
const password = document.getElementById("password");


//Eventos de formulario
formLogin.addEventListener("submit", function (event) {
  event.preventDefault();
 login()
});


async function login() {

  //Le pasamos un query param a la url
  //Que es un query param es una variable que se envía en la url
  const response = await fetch(`${URL_COMPANIES}?email=${email.value}`);
  const data = await response.json();

  console.log(data)

  if (data.length == 0) {
    console.error("No existe un usuario con ese email");
    // le ponemos el return para que la ejecución de la función no pase a continuación
    return
  }

  //Si pasa luego validamos la contraseña
  if (data[0].password !== password.value) {
    console.error("Password incorrect");
   
  }

  console.log("correcto")

  //GUARDAR EN LOCALSTORAGE
  localStorage.setItem("user", JSON.stringify(data[0]));

  

  //Redirigir a la página de administrador
  //Window hace referencia a la ventana global
  window.location.href = "administrator.html";

}