<template>
  <v-container fluid>
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />
    <Card />

    <!-- <v-footer app rounded width="66.7%">
        Copyright&copy; 2020 Iesa Wazeer
    </v-footer> -->

  </v-container>

  
</template>


<script>

  import Card from './Card';

  export default {
    name: 'HelloWorld',

    components: {
        Card,
    },

    data: () => ({
      Name: "Iesa Wazeer",
    }),
  }
</script>
