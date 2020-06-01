import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'

// Decirle a Vue que utilica la librería de arriba
Vue.use(VueResource); 

// Dirección para hacer los llamandos http 
Vue.http.options.root = 'https://tareas-4dcfe.firebaseio.com'

export var bus = new Vue({
  methods:{
    actualizarContador(numTareas){
      this.$emit('actualizarContador',numTareas);

    }
  }
}); 

new Vue({
  el: '#app',
  render: h => h(App) 
})

