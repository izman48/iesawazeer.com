<template>
  <div class="projects">
    
    <!-- <v-main> -->
      <v-parallax 
      src="../assets/background.jpg"
      :height="$vuetify.breakpoint.smAndUp ? 500: 700"
      >
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
      </v-parallax>

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
            :src="selected.img"
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
    <!-- </v-main> -->


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
      }
    },
    mounted() {
      const db = this.$firebase.firestore();
      let storage = this.$firebase.storage();
      let storageRef = storage.ref().child('images');
      db
        .collection('projects')
        .onSnapshot(snap => {
          const info = [];
          snap.forEach(doc => {
            let data = doc.data();
            let imgName = data.img
            storageRef.child(imgName)
            .getDownloadURL().then((url) => {
              data.img = url
              // console.log(data.img)
            }).catch((error) => {
              // Handle any errors
              console.log(error)
            });
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
          if (searchString.toLowerCase().includes(this.inSearchBar.toLowerCase())) {
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
        let storage = this.$firebase.storage();
        let storageRef = storage.ref().child('images');
        var docRef = db.collection("projects").doc(id);

        docRef.get().then((doc) => {
          if (doc.exists) {
            // console.log('Document data:', doc.data());
            this.selected = doc.data()
            let imgName = this.selected.img
            storageRef.child(imgName)
            .getDownloadURL().then((url) => {
              this.selected.img = url
              // console.log(this.selected.img)
            }).catch((error) =>{
              // Handle any errors
              console.log(error)
            });
            // console.log(this.selected)
            this.dialog = true
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
        }).catch((error) => {
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
