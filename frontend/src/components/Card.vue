<template>
  
  <v-card
    class="mx-auto"
    max-width="90%"
    min-height="600"
    app
    @click="selectCard(id)"
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
    <v-card-title>
      <p class="text-wrap">{{title}}</p>
    </v-card-title>
    
    <v-card-subtitle class="pb-0">{{taglist}}</v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{summary(text)}}</div>
    </v-card-text>

    <v-card-actions>

      <v-btn
        color="orange"
        text
        @click="selectCard(id)"
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
        // console.log("TEST:" + (1===this.id))
        }
        
        list = list.substring(0, list.length-2);
        return list;
      }
    },
    methods: {
      selectCard(id) {
        this.$emit('expandCard',id)
      },
      
      summary(info) {
        return (info.substring(0,100) + "...")
      }
    },
    
    props: {
      title: String,
      tags: Array,
      img: String,
      text: String,
      id: Number,
    }
  }
</script>