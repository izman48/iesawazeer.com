<template>
  <div class="projects">
    
    <v-main>
      <v-container>
        <v-row>
          <v-col>
              <!-- <v-toolbar width="90%" class="mx-auto"> -->
                <v-text-field
                  clear-icon="mdi-close-circle"
                  clearable

                  single-line
                  append-icon="mdi-magnify"
                  solo
                  class="mx-auto"
                  label="Projects"
                  @click:append="search"
                  @input="searchContent"
                ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-row>
        
        <v-col 
          cols="12"
          sm="6"
          md="4"
          lg="4"
          v-for="data in filterInfo"
          :key="data.index"
          
        >
          <Card 
            :title="data.title"
            :tags="data.tags"
            :img="data.img"
            :text="data.text"
            :id="data.index"
             @expandCard="showCard"
          />
        </v-col>
      </v-row>
      
      <v-dialog  v-model="dialog" max-width="500px">
        <v-card 
          v-if="dialog">
            <v-img
            dark
            class="white--text align-center"
            height="80%"
            :src="require('../assets/' + selected.img)"
            :alt="`${selected.title}`"
            
            >
            </v-img>
            <v-card-title>
            <p class="text-wrap">{{selected.title}}</p>
            </v-card-title>
            
            <v-card-subtitle class="">{{taglist}}</v-card-subtitle>

            <v-card-text class="text--primary">
            <div>{{selected.text}}</div>
            </v-card-text>

            <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text color="primary" @click="dialog = false">Return</v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>


  </div>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/Card.vue'

export default {
  name: 'Projects',
  created() {

  },
  data () {
      return {
        dialog: false,
        hasSearched: false,
        inSearchBar: '',
        info: [],
        selected: {
          img: '',
          title: '',
          tags: [],
          text: '',
          index: ''
        }
          // {
          //   img:'Traffic.png',
          //   title:'Visualising Traffic using Automated Agnets',
          //   tags: ['Java','Processing','AI'],
          //   text: 'We made cars go around a roundabout using automated agents',
          //   index: 0
          // },
          // {
          //   img:'DocumentOCR.jpg',
          //   title:'Document OCR',
          //   tags: ['Python', 'OpenCV', 'Tesseract'],
          //   text: 'We use Python and OpenCV to detect documents and then optimise them for text extraction ',
          //   index: 1

          // },
          // {
          //   img:'Website.png',
          //   title:'Derivitive Trade Website',
          //   tags: ['Javascript','Python','Django','MongoDB'],
          //   text: 'We created a website which accepts trades and stores them in a database. Using this we predict Derivitve trade info',
          //   index: 2

          // },
          // {
          //   img:'Website.png',
          //   title:'Derivitive Trade Website',
          //   tags: ['Javascript','Python','Django','MongoDB'],
          //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend porta fermentum. Nullam bibendum at enim sed suscipit. Praesent accumsan elementum dui sit amet tincidunt. Sed non efficitur erat. Vivamus massa metus, tempus nec molestie ut, imperdiet sed turpis. Sed enim ex, malesuada congue elit ut, lacinia pharetra est. Maecenas tellus odio, ullamcorper vel luctus a, imperdiet fermentum erat. Etiam auctor cursus odio. Donec sed lectus vel arcu tincidunt rutrum. Fusce vel dui imperdiet, posuere ex ut, imperdiet sapien. Quisque ultricies fringilla blandit. Sed non enim iaculis ex commodo convallis. In dictum leo risus, vel sagittis neque placerat id. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque nisi nulla, pulvinar elementum gravida sed, rhoncus eu felis. Morbi congue lobortis quam nec malesuada. Aenean consequat, risus quis sodales consectetur, metus ligula pulvinar ipsum, vel venenatis mi est gravida sem. Nulla ornare euismod est, vitae laoreet velit laoreet quis. Cras semper ligula auctor mi condimentum luctus. Pellentesque eget elit at massa volutpat sagittis id eu leo. Etiam nisi ipsum, varius ac lacinia vitae, rhoncus nec nunc. Integer vel viverra lectus. Integer blandit blandit sem, congue sagittis ligula. Quisque nec nunc gravida, consectetur purus at, convallis ex. Aliquam ut sollicitudin erat. Quisque scelerisque luctus lorem id imperdiet. Maecenas dignissim vulputate erat, non blandit dolor elementum ut. Sed maximus porttitor luctus. Quisque nec leo ut elit posuere semper et ut risus. Pellentesque vel mollis dolor, id volutpat leo. Phasellus ut nisl interdum, rutrum magna at, elementum libero. Donec at tempus nisl. Duis leo enim, vehicula vel pretium ut, bibendum nec orci. Fusce aliquet lectus non urna pharetra, eu interdum felis pulvinar. Integer in eros neque.Etiam efficitur hendrerit odio, eu aliquet elit faucibus et. Fusce id risus elit. Sed auctor neque et dictum consequat. Proin quis ante ac elit viverra varius quis porta arcu. In ultricies ornare urna in fermentum. Suspendisse tincidunt quis risus quis imperdiet. Aenean et feugiat libero, ac vulputate metus. Aenean quis purus egestas, lobortis eros id, euismod dolor. Morbi ut malesuada lacus, facilisis congue neque. Quisque lacinia massa a egestas finibus. Cras purus ante, laoreet eget enim et, laoreet rhoncus sapien. Fusce efficitur ipsum a justo viverra consequat. Donec at rhoncus sapien.Ut eu dui eleifend, venenatis mi id, rutrum nunc. Nulla et varius nisl. Sed est sapien, bibendum id diam id, varius eleifend justo. Aliquam viverra consectetur felis sit amet consequat. Cras vitae consequat libero. Sed blandit ullamcorper mi, in ornare erat viverra id. Suspendisse potenti. Donec cursus augue non leo pharetra mollis ut id odio. Nam hendrerit nisl ex. Nunc ut lacus at urna porta semper. Sed at laoreet sem. Sed non est diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consec',
          //   index: 3

          // },
        // ],    
      }
    },
    mounted() {
      const db = this.$firebase.firestore();
      db
        .collection('projects')
        .onSnapshot(snap => {
          const info = [];
          snap.forEach(doc => {
            var data = doc.data();
            data.index = doc.id;
            info.push(data);
          });
          this.info = info;
        });
    },

    computed: {
      
      filterInfo() {
        // console.log(this.inSearchBar)
        // if title or tags are a substring of payload then return an array of data found here
        const filtered = []
        for (let data of this.info) {
          let searchString = data.title + " " + data.text
          for (let tag of data.tags) {
            searchString = searchString + " " + tag;
          // console.log("TEST:" + (1===this.id))
          }
          if (searchString.includes(this.inSearchBar)) {
            filtered.push(data)
          }
          searchString = ""
        }
        // console.log(filtered)
      
        return filtered
      },
      taglist() {
        let list = "";
        for (let t of this.selected.tags) {
          list = list + t + ", ";
        // console.log("TEST:" + (1===this.id))
        }
        
        list = list.substring(0, list.length-2);
        return list;
      }
    },

    methods: {
      showCard(id) {
        const db = this.$firebase.firestore()
        var docRef = db.collection("projects").doc(id);

        docRef.get().then((doc) => {
          if (doc.exists) {
            console.log('Document data:', doc.data());
            this.selected = doc.data()
            console.log(this.selected)
            this.dialog = true
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
      },

      reached() {
        console.log("reached")
      },
      search() {
        this.hasSearched = true;
        console.log("search")
      },
      searchContent(payload) {
        this.inSearchBar = payload
      },
    },
  components: {
    Card
  }
}
</script>
