import { get, post, remove,put } from "../api/clientHTTP.js";
import { URL_JOBS } from "../api/URLS.js";
import { printInfo } from "./functionsDOM.js";

//Selectores
const formJobs = document.getElementById("formJobs");
const tbodyJobs = document.querySelector("#tbodyJobs");
const idJobUpdate = document.getElementById("idJobUpdate");
const btnModalJob = document.querySelector("#btnModalJob");


//Eventos de formulario
formJobs.addEventListener("submit", function (event) {
  event.preventDefault();
  // Desestructuración doble en JavaScript:
  // Aquí estamos utilizando la desestructuración para extraer propiedades específicas de un objeto de manera más concisa.

  // En este caso, 'event' es un objeto que contiene un montón de propiedades relacionadas con el evento, como 'type', 'target', 'currentTarget', etc.

  // Lo que estamos haciendo aquí es extraer la propiedad 'target' del objeto 'event' y, al mismo tiempo, extraer la propiedad 'elements' del objeto 'target'.
  // Es decir, primero accedemos a 'event.target' y luego accedemos a 'target.elements', todo en una sola línea.
  
  const { target: { elements }, } = event;//En vez de usar la destructuracion podemos seleccionar todos por el id
  
  // Ahora, 'elements' está disponible como una variable individual y contiene los elementos del formulario (en caso de que 'target' sea un formulario, por ejemplo).
  // Esto es útil en el contexto de manejar eventos de formularios donde 'elements' contiene los controles del formulario, como input, select, etc.

  // Pregunto si el input tipo hidden tiene algun valor quiere decir que estamos editando
  if(idJobUpdate.value){
    fetchEdit(idJobUpdate.value,elements)
  }else{
  //por el contrario estoy agregando 
    postJob(elements);
  }
});

//EVENTO DOMCONTENTLOADED
// Para cuando la pagina se recargue busque todos los jobs y lo muestra en el tablero
document.addEventListener("DOMContentLoaded", function () {
  getJobs();
});
//EVENTO DEL TBODY PARA VER SI ESTA ELIMINANDO O ACTUALIZANDO
tbodyJobs.addEventListener("click",  (event) => {
  // Verificamos si el objetivo("target") contiene la clase "delete" que le creamos al boton en la funcion printInfo
  if (event.target.classList.contains("delete")) {
    const jobId = event.target.getAttribute("data-id");
    //PONER PRIMERO CON DELETE delete(jobId)

    remove(URL_JOBS ,jobId)
  }
//Verificamos si el objetivo("target") contiene la clase "update" que le creamos al boton en la funcion printInfo
  if (event.target.classList.contains("edit")) {
    //Le extraemos atributo que contiene el id del job, para poderlo buscar
    const jobId = event.target.getAttribute("data-id");
    updateJob(jobId);
  }
});



//esta es mi funcion para agregar un nuevo job 
//destructuro los input
async function postJob({
  titleJob,
  experience,
  salary,
  location,
  modality,
  description,
}) {

 //Creo el nuevo objeto de job
 const newJob = {
  titleJob: titleJob.value,
  experience: experience.value,
  salary: salary.value,
  location: location.value,
  modality: modality.value,
  description: description.value,
  companyId: localStorage.getItem("user").companyId,
  publicationDate: new Date().toISOString(),
 };

   await post(URL_JOBS, newJob);
   
 
}

async function getJobs() {
 const data = await get(URL_JOBS)
 console.log(data)
 //Crear un nuevo archivo donde van a estar las funciones que manipulan el dom
 // alli va a estar alojada la funcion printInfo
 printInfo(data, tbodyJobs)
}


//Mi funcion para editar recibe el id trae el job  por el id y le forza un click al boton que despliega el modal
//LLeno el value del input tipo hidden para que se sepa que está editando 
//y lleno los campos del formulario para que se sepa que job se está editando
async function updateJob(jobId) {
  const jobEdit = await get(`${URL_JOBS}/${jobId}`);
  btnModalJob.click();
  //Accedo al formulario luego a los elementos y luego a cada elemento por el name
  formJobs.elements.titleJob.value = jobEdit.titleJob;
  formJobs.elements.experience.value = jobEdit.experience;
  formJobs.elements.salary.value = jobEdit.salary;
  formJobs.elements.location.value = jobEdit.location;
  formJobs.elements.modality.value = jobEdit.modality;
  formJobs.elements.description.value = jobEdit.description;

  //Le agreggo el valor del id del job al input tipo hidden
  //Para que se sepa que estamos editando
  idJobUpdate.value = jobId;
}
// Para hacer la peticion del put una vez se cumpla la edicion del job
//Le pasamos el id que esta guardado en el input hidden y otra vez los valores del formulario
//Destructuro los elementos para guardar sus valores y enviarlos a la base de datos
async function fetchEdit(id,
{  titleJob,
  experience,
  salary,
  location,
  modality,
  description}
) {

 // Creo el nuevo objeto y se lo paso a la funcion put junto con la URL
  const jobEdited = {
    titleJob: titleJob.value,
    experience: experience.value,
    salary: salary.value,
    location: location.value,
    modality: modality.value,
    description: description.value
  };
//Configuramos la URL para que me encuentre por ese id , y me actualice 
//Esta funcion viene de clientHTTP.js
put(`${URL_JOBS}/${id}`,jobEdited)
}
