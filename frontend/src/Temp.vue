<template>
  <v-app>
    
    <NavBar />

      <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid app>
        <HelloWorld />
        <!-- If using vue-router -->
        <!-- <router-view></router-view> -->
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import NavBar from './components/NavBar';
// import Card from './components/Card';

export default {
  name: 'App',

  components: {
    HelloWorld,
    NavBar,
    // Card,
  },

  data: () => ({
    
  //
  }),
};
</script>
