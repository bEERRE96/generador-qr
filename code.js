const app = document.querySelector("#app");
const linkUrl = document.querySelector("#linkUrl");
const boton = document.querySelector("button");

async function llamada() {
  try {
    const imagenExistente = document.querySelector("#miImagen");

    if (imagenExistente) {
      app.removeChild(imagenExistente);
    }

    const response = await fetch(
      `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${linkUrl.value}`
    );
    const imagen = document.createElement("img");
    const link = await response.url;
    imagen.id = "miImagen";
    imagen.src = link;
    app.appendChild(imagen);
  } catch (err) {
    console.log(err);
  }
}

boton.addEventListener("click", llamada);

/* TITULO CON INTERVALO */

const appDiv = document.querySelector(".titulo");

let frase = "Bienvenido al generador de QR!";
let index = 0;
let tex = "";
let intervalId;

function renderizar() {
  let parag = document.createElement("p");
  intervalId = setInterval(() => {
    if (index < frase.length) {
      tex += frase[index];

      parag.textContent = tex;
      appDiv.appendChild(parag);

      index++;
    } else {
      clearInterval(intervalId);
    }
  }, 200);
}

renderizar();

const descargaButton = document.querySelector("#descarga");

async function descargarQR() {
  const imagen = document.querySelector("#miImagen");

  if (imagen) {
    const enlaceDescarga = document.createElement("a");
    try {
      enlaceDescarga.href = imagen.src;
      enlaceDescarga.download = "qrcode.png";
      document.body.appendChild(enlaceDescarga);
      enlaceDescarga.click();
      document.body.removeChild(enlaceDescarga);
    } catch (error) {
      console.error("Error al descargar el QR:", error);
    }
  } else {
    alert("Primero genera el QR antes de intentar descargarlo.");
  }
}

descargaButton.addEventListener("click", descargarQR);
