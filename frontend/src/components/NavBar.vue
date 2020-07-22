<template>


    <v-navigation-drawer 
        app 
        width="33.3%" 
        v-model='drawerOpen'
        color="#f4f4f4" 
        fixed
      >
      
        <v-row 
            v-for="n in 1"
            :key=n
            justify="center"
        >
            <v-avatar size="200" > 
            <img
            src='../assets/iesa.jpg'
            alt="Iesa"
            >
            </v-avatar>

            <v-card-subtitle> 
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda eaque, nihil quia quo officiis mollitia ea iure amet deserunt fuga sequi quos voluptatibus saepe libero tempore laborum nesciunt nostrum animi?
            </v-card-subtitle>
        </v-row>

        
      
        <v-list>
            <v-list-item 
                v-for="(item, index) in items" :key=index>
                <v-btn dark block> 
                    {{item}} 
                </v-btn>
            </v-list-item>
        <!-- <v-btn>  </v-btn> -->
        </v-list>

        <v-footer app >
            Copyright&copy; 2020 Iesa Wazeer
        </v-footer>

    </v-navigation-drawer>
</template>

<script>
  export default {
    data () {
      return {
        // drawer: null,
        drawerOpen: true,
        items: ["Projects", "Games", "Resume"],
      }
    },
  }
</script>