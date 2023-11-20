const contenido = document.querySelector(".contenido");
const palabra = document.querySelector(".palabra");
const enviar = document.querySelector(".enviar");
const borrar = document.querySelector(".borrar");
const errorContainer = document.querySelector(".error-message");
borrar.addEventListener("click", () => {
  contenido.innerHTML = "";
  localStorage.clear();
  errorContainer.innerHTML = "";
});

// Cargar datos almacenados al cargar la página
window.addEventListener("load", () => {
  cargarTweets();
  // Add this line to initialize error control
  controlErrores();
});
palabra.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Evitar el comportamiento predeterminado del Enter en un campo de texto (nueva línea)
    enviar.click(); // Simular clic en el botón enviar
  }
});

enviar.addEventListener("click", () => {
  if (palabra.value.trim() !== "") {
    agregarTweet();
    controlErrores("");
  } else {
    controlErrores("El tweet no puede estar vacío");
  }
});

function agregarTweet() {
  const tweet = palabra.value;

  // Clear error message
  contenido.innerHTML = "";

  // Obtener el array de tweets almacenados o crear un array vacío si no hay ninguno
  const tweets = JSON.parse(localStorage.getItem("tweets")) || [];

  // Agregar la nueva palabra al array de tweets
  tweets.push(tweet);

  // Almacenar el array actualizado en el Local Storage
  localStorage.setItem("tweets", JSON.stringify(tweets));

  // Actualizar la visualización
  mostrarTweets();
  palabra.value = "";
}

function mostrarTweets() {
  contenido.innerHTML = "";

  // Obtener el array de tweets almacenados
  const tweets = JSON.parse(localStorage.getItem("tweets")) || [];

  // Mostrar cada tweet en el contenido
  tweets.forEach((tweet, index) => {
    const contenedorTweet = document.createElement("div");
    contenedorTweet.classList.add("tweet"); //Añade una línea
    contenedorTweet.style.display = "flex"; // Hacer el contenedor un contenedor flexible
    contenedorTweet.style.alignItems = "center"; // Alinear elementos verticalmente al centro
    // Crear elemento para el avatar del usuario
    const avatarUsuario = document.createElement("div");
    avatarUsuario.classList.add("user-avatar");

    // Crear elemento para el texto
    const texto = document.createElement("p");
    texto.innerHTML = `${tweet}`;

    // Crear elemento para la cruz
    const cruz = document.createElement("span");
    cruz.innerHTML = "&#10006;"; // Símbolo de cruz (X)
    cruz.style.cursor = "pointer";
    cruz.style.marginLeft = "5px";
    cruz.style.color = "red";

    // Agregar evento de clic para eliminar el tweet
    cruz.addEventListener("click", () => {
      eliminarTweet(index);
    });

    // Agregar elementos al contenedor
    contenedorTweet.appendChild(avatarUsuario);
    contenedorTweet.appendChild(texto);
    contenedorTweet.appendChild(cruz);
    
    // Agregar el contenedor al contenido
    contenido.appendChild(contenedorTweet);
  });
}

function eliminarTweet(index) {
  // Obtener el array de tweets almacenados
  const tweets = JSON.parse(localStorage.getItem("tweets")) || [];

  // Eliminar el tweet del array
  tweets.splice(index, 1);

  // Actualizar el Local Storage con el nuevo array
  localStorage.setItem("tweets", JSON.stringify(tweets));

  // Actualizar la visualización
  mostrarTweets();
}

function cargarTweets() {
  mostrarTweets();
}

function controlErrores(mensaje = "") {
  errorContainer.innerHTML = mensaje;
}
