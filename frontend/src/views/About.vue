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
            I'm a Computer Science student from Sri Lanka who enjoys building software and working with others to make a difference in the world.
          </p>
          <p> 
            <strong> Where do you study? </strong>
          </p>
          <p>
            I'm currently in my final year of my BSc (Hons) at The University of Warwick. Prior to this I studied at Wycherley International School from 
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
            Java, Python, JavaScript, C, C#, C++... I try to be language agnostic and am willing to learn anything as long as I get to work on something interesting. 
          </p>
          <p> 
            <strong> Hobbies? </strong>
          </p>
          <p>
            I try to spend my free time hanging out with people as much as I can. I spent about 6 years playing cricket for my school team and now
            enjoy spending some time taking part in University Esports for Rocket League.
            Other hobbies include DnD, Music, Audiobooks, Movies, Gaming and TV.
          </p>
          <p> 
            <strong> Why did you make this site? </strong>
          </p>
          <p>
            To learn Vue while I was bored during quarantine (also for fun). Building stuff is always exciting and I love having my own space 
            on the internet. I'm hoping to add loads of little games on this site in the future and to keep a little journal of all the projects I have
            done!
          </p>
          <p> 
            <strong> Where can I find your resume? </strong>
          </p>
          <p>
            Here's a 
            <a :href="link" target="_blank">copy</a> of my resume! I'll be updating it periodically but feel free to contact me on LinkedIn, check out my GitHub or 
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
