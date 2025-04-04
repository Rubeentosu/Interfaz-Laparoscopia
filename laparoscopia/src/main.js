import { mount } from 'svelte'
import './app.css'
// @ts-ignore
import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app'),
})

export default app

let eso = document.querySelector(".vertical-2");
eso.addEventListener("click", cambio);

function cambio() {
  document.getElementById("depth-4").value = 99;

}

eso.addEventListener("click", pinza);

function pinza() {
  let esto = document.getElementById("instrument-4");
  //modificar segundo numero en el primer par y segundo numero en el tercer par
  esto.setAttribute("points", "10,40 80,50 10,60");
}
