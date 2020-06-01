<template>
    <div class="input-group">
        <input v-on:keyup.enter="agregarTarea" v-model="nuevaTarea" type="text" placeholder="Escribe una nueva tarea" class="form-control">
        <button type="button" v-on:click="agregarTarea" class="btn btn-primary">Agregar</button>
    </div>
</template>

<script>
import { bus } from './main.js';
export default {
    data(){
        return {
            nuevaTarea: ''
        }
    },
    props: ['tareas','actualizarContador'], // debe ser el mismo nombre que enviamos en el padre,es decir, este: <nueva-tarea-component v-bind:tareas..
    methods: {
        // Create http 
        agregarTarea(){
            var texto = this.nuevaTarea.trim();

            if(texto){
                this.tareas.push({ // agregamos la tarea al array tareas
                    texto: texto,
                    terminada: false
                })
                //this.actualizarContador(); // una vez que agregamos la tarea, actualizamos el contador 
                bus.actualizarContador(this.tareas.length);                 
            }
            this.nuevaTarea = '';
            /* Con esta línea mandamos los datos a la BD de Firebase; recordar poner un 
            nombre como "/tareas.json"; este llamdo es asíncrono porque no esperamos
            a que acabe de ejecutarse el post para que siga ejecutándose la aplicación, de hecho aquí estamos 
            haciendo una promesa. 
            El ".then" representa las acciones que van a ejecutarse cuando la promesa se 
            ejecute.
            No poner el "/" ya que definimos el URL en main.js
            */
            this.$http.post('tareas.json',{
                texto: texto,
                terminada: false
            }).then(respuesta=>{
                console.log(respuesta)
            }); 

        }
    },
    created(){
        bus.actualizarContador(this.tareas.length); // emitimos el evento cuando se agrega una nueva tarea, y le indicamos en cual objeto 


    }
    // forma antigua de hacerlo 
        /* 
        data: function(){

        }        
        
        */

}
</script>