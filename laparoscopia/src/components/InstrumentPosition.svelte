<script>
    const positions = ["top-right", "top-left", "bottom-left", "bottom-right"];
</script>

{#each positions as _, i}
    <div class="vertical {positions[i]}">
        <button>Añadir instrumento</button>
    </div>  
{/each}
  
<style>
    .vertical {
        padding: 15px;
        transform: rotate(-270deg);
        border-radius: 15px;
        background-color: black;
        width: 270px;
        opacity: 80%;
        display: flex;
        align-items: center;
    }
    .top-right {
        position: absolute;
        top: 30%;
        right: -4%;
    }
    .top-left {
        position: absolute;
        top: 30%;
        left: -4%;
    }
    .bottom-left {
        position: absolute;
        top: 70%;
        left: -4%;
    }
    .bottom-right {
        position: absolute;
        top: 70%;
        right: -4%;
    }
    @media screen and (max-width: 1024px) {
        .vertical {
            width: 220px;
            height: 50px;
        }
    }

    /* Pantallas grandes (PCs) */
    @media screen and (min-width: 1440px) {
        .vertical {
            width: 250px;
            height: 50px;
        }
    }
    /* Pantallas de portátiles (1024px - 1440px) */
    @media screen and (min-width: 1024px) and (max-width: 1440px) {
        .vertical {
            width: 250px; /* Ajuste de tamaño intermedio */
            height: 50px;
            padding: 12px; /* Levele reducción de padding */
        }
    }
</style>
