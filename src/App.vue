<template>
  <div id="app" class="container">
    <div class="jumbotron">
      <!-- mandamos "titulo" (Lista de Tareas) como propiedad desde el componente padre, para recibirlo en el hijo -->
      <titulo-component v-bind:titulo="titulo"></titulo-component>
      
      <!-- hacemos un enlace en la propiedad "tareas" y le mandamos al componente hijo el arreglo de tareas definido en data()--> 
      <!-- llamamos al método actualizarContador y el $event es el número 1 que está en $emit; aquí entonces recibimos en el padre la info. del hijo -->
      <nueva-tarea-component v-bind:tareas="tareas" v-bind:actualizarContador="actualizarContador"></nueva-tarea-component>
      <!-- enviamos la propiedad "tareas" del padre al hijo-->
      <lista-tareas-component v-bind:tareas="tareas"></lista-tareas-component>

    </div>
  </div>
</template>

<script>
// importamos el componente titulo.component
import TituloComponent from './titulo.component.vue';
import NuevaTareaComponent from './nueva-tarea.component.vue'
import ListaTareasComponent from './lista-tareas.component.vue';
  export default {
    components:{
      TituloComponent,
      NuevaTareaComponent,
      ListaTareasComponent
    },
    data(){
      return{
        titulo: 'Lista de Tareas', 
        tareas: [
          {
            texto: 'Aprender Vue',
            terminada: false,
          },
          {
            texto: 'Aprender Angular',
            terminada: false,
          },
          {
            texto: 'Aprender Ionic',
            terminada: false,
          }
        ]
      }
    },
    created(){
        /*Esto es parecido al método post, pero aquí tenemos 2 promesas, así que tenemos que
        resolver las 2 adecuadamente; no poner aquí el "/" ya que se pone solo; 
        es para obtener todas las tareas que están en la BD */
        // Read http 
        this.$http.get('tareas.json')
          .then(respuesta =>{
            return respuesta.json(); 

          })
          .then(respuestaJson =>{
            console.log(respuestaJson); 

            // Para mostrar en la lista las tareas que están en la BD pero que no están definidas por defecto en el objeto "tareas" de aquí arriba; el id viene también de la BD Firebase 
            for(let id in respuestaJson){
              let tarea = {
                id: id,
                texto: respuestaJson[id].texto,
                terminada: respuestaJson[id].terminada
              }
              //this.tareas.push(respuestaJson[id]); 
              this.tareas.push(tarea); 
            }
          })
    },
    methods: {
      actualizarContador(){
        this.numTareas = this.numTareas + 1; 
      }
    }
  }
</script>
