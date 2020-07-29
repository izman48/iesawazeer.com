import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'

require('firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyDBF7lQKvliXGY0lKO_9yjtZsowokO1eJ0",
    authDomain: "iesawazeersite.firebaseapp.com",
    databaseURL: "https://iesawazeersite.firebaseio.com",
    projectId: "iesawazeersite",
    storageBucket: "iesawazeersite.appspot.com",
    messagingSenderId: "625248647866",
    appId: "1:625248647866:web:671ebe6e449bd00dd3e083",
    measurementId: "G-B8DC40LP34"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.prototype.$firebase = firebase;


Vue.config.productionTip = false

new Vue({
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app')