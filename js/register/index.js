import { get, post  } from "../api/clientHTTP.js";
import { URL_COMPANIES } from "../api/URLS.js";

 
//SELECTORES
const formRegister = document.querySelector("#formRegister");



//EVENTOS

//pongo un escuchador de eventos tipo "submit" para llamar la funion login y ver si la compañia existe para dar acceso
formRegister.addEventListener("submit", (event) => {
  event.preventDefault();
  //Hago uso de una doble destructuración  para traer los input del formulario por medio del target del evento
  const { target: { elements }} = event;

  //Le paso todos mis elementos a la función para que pueda trabajar con ellos
  register(elements);
});

// la funcion para registrar recibe todos los elementos y por medio del name de la etiqueta los destructuro
async function register({
  email,
  password,
  passwordConfirmation,
  nameCompany,
  imgCompany,
}) {
  //Valido si el email ya existe
  const emailValidated = await get(`${URL_COMPANIES}?email=${email.value}`);
  if (emailValidated.length) {
    alert("email ya registrado");
    return;
  }

  //Valido si la contraseña cumple con la seguridad haciendo uso de una expresion regular
  const regex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
  if (!regex.test(password.value)) {
    alert(
      "La contraseña debe tener una letra mayuscula un numero y un caracter especial"
    );
    return;
  }
  // Valido las contraseñas
  if (password.value != passwordConfirmation.value) {
    alert("las contraseñas no coinciden");
    return;
  }

  //Si las contraseñas coinciden creo mi objeto guardando los value de mis input
  const company = {
    email: email.value,
    password: password.value,
    nameCompany: nameCompany.value,
    imageCompany: imgCompany.value,
    nit: Date.now().toString(),
  };
  
    // Hago uso de una funcion asincrona para postear la info de la compañia que se esta registrando
    await post(URL_COMPANIES, company);
    alert("has sido registrado correctamente");
    window.location.href = "index.html";
  
}
