import { mount } from 'svelte'
import './app.css'
// @ts-ignore
import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app'),
})

export default app

let eso = document.getElementById("id-instrumento2");
eso.addEventListener("click", cambio);

function cambio() {
  // @ts-ignore
  document.getElementById("depth-2").value = 99;

}

eso.addEventListener("click", pinza);

function pinza() {
  let esto = document.getElementById("instrument-2");
  //modificar segundo numero en el primer par y segundo numero en el tercer par
  esto.setAttribute("points", "10,40 80,50 10,60");
}

  window.addEventListener("load",oculto);
  function oculto() {
    let esto = document.getElementById("id-instrumento3");
    esto.style.display="none";
    esto.style = "background-color: #5a5757; opacity:90%";
    let esto2 = document.getElementById("id-instrumento4");
    esto2.style.display="none";
  }