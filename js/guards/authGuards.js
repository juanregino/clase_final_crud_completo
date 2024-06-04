//Para el guardian debemos crear una funcion autoinvocable
//Abrimos dos parentesis , y el primero resive un callback
(
() => {

  const user = localStorage.getItem("user");

  if(user == false) {
    window.location.href = "index.html";
  }
}
)()

//Este guardian lo tenemos que importar en la cabezera de la pagina que queremos proteger