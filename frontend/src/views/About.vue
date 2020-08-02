<template>
  <div class="about">
    <v-container>
      <v-row>
        <v-col>
          <v-img src="../assets/iesa-about.jpg" background> </v-img>
          <h1>Hi, I'm Iesa</h1>
          <p> </p>
          <p> 
            <strong> Who are you? </strong>
          </p>
          <p>
            I'm a Computer Science student who enjoys messing around with software and building new things! I'm from Sri Lanka which is 
            very sunny and by the beach so I am really bad with cold weather. 
          </p>
          <p> 
            <strong> Where do you study? </strong>
          </p>
          <p>
            I'm currently in my final year at The University of Warwick. Prior to this I studied at Wycherley International School which is from 
            Sri Lanka.
          </p>
          <p> 
            <strong> When do you graduate? </strong>
          </p>
          <p>
            I'm expected to graduate on July 2021. 
          </p>
          <p> 
            <strong> What languages do you use? </strong>
          </p>
          <p>
            Java, Python, JavaScript, C... I'm happy to pick up any language or framework really as long as I get to work on something interesting. 
          </p>
          <p> 
            <strong> Hobbies? </strong>
          </p>
          <p>
            I play Rocket League quite a lot and am an active member of the Warwick Rocket League Discord (I've taken part in loads of tournaments
            too!). Other than that I enjoy Anime, Movies, Tv, Audiobooks and hanging out with people. 
          </p>
          <p> 
            <strong> Why did you make this site? </strong>
          </p>
          <p>
            To learn Vue while I was bored during quarantine as well as for fun. Building stuff is always exciting and I love having my own space 
            on the internet. I'm hoping to add loads of little games on this site in the future and to keep a little journal of all my projects I have
            done!
          </p>
          <p> 
            <strong> Where can I find your resume? </strong>
          </p>
          <p>
            Here's a 
            <a :href="link" target="_blank">copy </a> of my resume! I'll be updating it periodically but feel free to contact me on LinkedIn, check out my GitHub or 
              email me by following the links at the bottom of the page!
          </p>

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
      return {
        link: ""
      }
  },
  mounted() {
    let storage = this.$firebase.storage();
    let storageRef = storage.ref().child('documents');
    storageRef.child("Resume.pdf")
    .getDownloadURL().then((url) => {
      this.link = url
    // console.log(this.selected.img)
    }).catch((error) =>{
      // Handle any errors
      console.log(error)
      this.link = "https://www.linkedin.com/in/iesaw/"
    });
  }
}
</script>
