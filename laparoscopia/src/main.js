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
