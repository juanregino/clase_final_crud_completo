//Aca estan todas las funciones para interactuar con la base de datos 
// Se usan todas las funciones de fetch para realizar peticiones HTTP
// POST: Crea un nuevo recurso.
// GET: Obtiene un recurso.
// DELETE: Elimina un recurso.
// PATCH: Actualiza un recurso.





export async function post(URL, contentData) {
  await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contentData),
  })
}

export async function get(URL) {
  const response = await fetch(URL);
  const data = await response.json();
  return data;  

}

// .then: Adecuado para encadenar múltiples promesas, pero puede resultar en código menos legible debido al "callback hell".
// await: Facilita la escritura de código asíncrono más legible y fácil de mantener, pero solo puede ser usado dentro de funciones async.

// El "callback hell" (infierno de callbacks) se refiere a una situación en la que el uso excesivo de funciones de callback anidadas en JavaScript lleva a un código que es difícil de leer, entender y mantener. Esto ocurre comúnmente cuando se tienen múltiples operaciones asíncronas que dependen unas de otras, y se manejan mediante callbacks anidados.

//delete es una palabra reservada en javascript, por lo que no se puede usar como nombre de variable o función.
export async function remove(URL , id) {
  //Asi es como quedaria mi URL final "localhost:3000/companies/id";
  await fetch(`${URL}/${id}` ,{
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Se utiliza PATCH porque a diferencia de PUT me guarda solo algunas cosas
export async function put ( URL,contentData ) {
 await fetch(URL, {
   method: "PATCH",
   headers: {
     "Content-Type": "application/json",
   },
   body: JSON.stringify(contentData),
 });
}

// Alcance de Actualización:

// PUT: Reemplaza completamente el recurso.
// PATCH: Aplica cambios parciales al recurso.
// Carga Útil:

// PUT: Contiene una representación completa del recurso.
// PATCH: Contiene solo los cambios que se deben aplicar.
// Idempotencia:

// PUT: Es idempotente.
// PATCH: No necesariamente es idempotente.
// Uso Común:

// PUT: Se usa cuando se quiere actualizar o reemplazar un recurso completo.
// PATCH: Se usa cuando se quiere hacer una actualización parcial, solo modificando ciertos campos.