<script>
    import { PrimaryButtonController } from "./PrimaryButtonController";

    export let controller;

    if(!(controller instanceof PrimaryButtonController)){
        throw new Error("Controller of PrimaryButton must be a PrimaryButtonController");
    }
</script>

<button class="button-41" onclick={controller.onClick}
 style=" border-radius: {controller.borderRadius}px;">
    {controller.title}
</button>

<style>
/* CSS */
.button-41 {
  background-color: initial;
  background-image: linear-gradient(-180deg, #00D775, #00BD68);

  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: Inter,-apple-system,system-ui,Roboto,"Helvetica Neue",Arial,sans-serif;
  height: 44px;
  line-height: 44px;
  outline: 0;
  overflow: hidden;
  padding: 0 20px;
  pointer-events: auto;
  position: relative;
  text-align: center;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: top;
  white-space: nowrap;
  width: 100%;
  z-index: 9;
  border: 0;
}

.button-41:hover {
  background: #00bd68;
}
</style>