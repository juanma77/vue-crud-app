<template> <!-- sólo se puede tener un elemento raíz en <template>-->
    <div>
        <h2>{{ titulo }}</h2>
        <!-- <h3>Pendientes a realizar: {{ numTareas }} </h3> -->
    </div>
   
</template>

<script>
    import { bus } from './main.js';
    export default {
        props: ['titulo'], // recibimos la propiedad en el componente hijo desde el componente padre; debe ser el mismo que el de arriba
        /*data(){
            return { // para tomar este titulo y renderizarlo en el mismo componente
                titulo: 'Lista de Tareas'
            }
        }*/
        data(){
            return{
                numTareas: 0
            }
        },
        created(){
            bus.$on('actualizarContador', (numTareas)=>{ // escuchamos el evento, cuando suceda asignamos el valor que tengamos en data() de numTareas a numTareas                this.numTareas = numTareas; 
                this.numTareas = numTareas; 
            }) 
        }
    }
</script>
