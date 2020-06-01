<template>
    <ul class="list-group"> <!-- se aplica el bind para cambiar el nombre de la clase a "terminada" si el campo tarea.terminada es true -->
        <li v-bind:key="indice" v-for="(tarea, indice) in tareas" class="list-group-item" 
            v-bind:class="{ terminada: tarea.terminada}">
            {{ tarea.texto }}
            <span class="float-right">
                <button type="button" class="btn btn-danger btn-xs glyphicon glyphicon-delete" 
                v-on:click="borrarTarea(indice)">Borrar</button>
            </span>

            <span class="float-right">
                <!--Antes de implementar la funcionalidad de la BD-->
                <!-- <button type="button" class="btn btn-success btn-xs glyphicon glyphicon-ok" 
                v-on:click="tarea.terminada = !tarea.terminada">Terminada</button> -->

                <button type="button" class="btn btn-success btn-xs glyphicon glyphicon-ok" 
                v-on:click="verEstado(indice)">Terminada</button>
            </span>
        </li>
    </ul>
</template>

<script>
export default {
    props: ['tareas', 'indice'], // recibimos la variable "tareas" que se envia en el padre que es App.vue
    methods:{
        // Delete http 
        borrarTarea(indice){

            // Obtenemos el id numerico de la BD Firebase de nuestra tarea 
            let id = this.tareas[indice].id; 

            // borramos un elemento que viene del "indice"
            this.tareas.splice(indice,1);

            this.$http.delete('tareas/' + id + '.json')
            .then(respuesta => {
                console.log(respuesta);
            });
        },
        // Update http 
        verEstado(indice){

            // Obtenemos las variables definidas en el padre, que es App.vue
            let terminada = this.tareas[indice]. terminada = !this.tareas[indice].terminada; 
            
            // Obtenemos el id de la BD Firebase
            let id = this.tareas[indice].id; 

            /*Hace un cambio en un elemento si le pasamos el id, debemos
            tener en cuenta que este formato es el acorde al que muestra el URL
            de Firebase. Es la funcionalidad de actualizar la tarea que sería como un update.
            El segundo argumento es el elemento al que le vamos a aplicar el cambio.
            La segunda "terminada" es la que declaramos aquí  */
            this.$http.patch('tareas/' + id + '.json',{
                terminada: terminada
            }).then(respuesta =>{
                console.log(respuesta); 
            }); 

        }
    }
}
</script>

<style scoped>
    .terminada{
        color: red;
        text-decoration: line-through;
    }
</style>