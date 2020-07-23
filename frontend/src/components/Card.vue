<template>
  
  <v-card
    class="mx-auto"
    max-width="400"
    min-height="600"
    app
  >
    <!-- <img v-bind:src="img" /> -->
    
    <v-img
      dark
      class="white--text align-end"
      height="400px"
      :src="require('../assets/' + img)"
      :alt="`${title}`"
      
    >
    </v-img>
    <v-card-title>{{title}}</v-card-title>
    
    <v-card-subtitle class="pb-0">{{taglist}}</v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{text}}</div>
    </v-card-text>

    <v-card-actions>

      <v-btn
        color="orange"
        text
      >
        Read More
      </v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>
  export default {
    name: 'Card',
    computed: {
      taglist() {
        let list = "";
        for (let t of this.tags) {
          list = list + t + ", ";
        console.log("TEST:" + this.tags);
        }
        
        list = list.substring(0, list.length-2);
        return list;
      }
    },
    props: {
      title: String,
      tags: Array,
      img: String,
      text: String,
    }
  }
</script>