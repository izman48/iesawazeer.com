<template>
  <div class="projects">
    
    <v-main
    >
      <v-row>
        <v-col 
          cols="12"
          sm="6"
          md="4"
          lg="4"
          v-for="(data,index) in info"
          :key="index"
          
        >
          <Card 
            :title="data.title"
            :tags="data.tags"
            :img="data.img"
            :text="data.text"
          />
        </v-col>
      </v-row>

    </v-main>


  </div>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/Card.vue'

export default {
  name: 'Projects',
  data () {
      return {
        info: [
          {
            img:'Traffic.png',
            title:'Visualising Traffic using Automated Agnets',
            tags: ['Java','Processing','AI'],
            text: 'We made cars go around a roundabout using automated agents',
            // index: 1
          },
          {
            img:'DocumentOCR.jpg',
            title:'Document detection and optimisation using Image Processing',
            tags: ['Python', 'OpenCV', 'Tesseract'],
            text: 'We use Python and OpenCV to detect documents and then optimise them for text extraction ',
            // index: 2

          },
          {
            img:'Website.png',
            title:'Derivitive Trade Website',
            tags: ['Javascript','Python','Django','MongoDB'],
            text: 'We created a website which accepts trades and stores them in a database. Using this we predict Derivitve trade info',
            // index: 3

          },
          {
            img:'Website.png',
            title:'Derivitive Trade Website',
            tags: ['Javascript','Python','Django','MongoDB'],
            text: 'We created a website which accepts trades and stores them in a database. Using this we predict Derivitve trade info',
            // index: 4

          },
        ]        
      }
    },
    computed: {
      numRows() {
        console.log(Math.ceil(this.info.length/2));
        return Math.ceil(this.info.length/2)
      }
    },
  components: {
    Card
  }
}
</script>
