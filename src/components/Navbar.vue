<template>
  <nav>

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      color="success"
    >
      {{ text }}
    </v-snackbar>


      <v-app-bar flat app>
        <v-app-bar-nav-icon v-if="user" class="grey--text" @click="drawer = ! drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase pink--text">
        <v-icon large color="pink" class="mr-3">mdi-pdf-box</v-icon>
        <span class="font-weight-light">Ebook</span>
        <span> Store</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>


      <v-menu v-if="user" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="grey"
          dark
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-icon left>mdi-chevron-down</v-icon>
          <span>Menu</span>
        </v-btn>
      </template>
      <v-list v-if="admin == false">
        <v-list-item
          v-for="(link,idx) in links"
          :key="idx"
          router :to="link.route"
        >
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item>

      </v-list>

      <v-list v-if="admin">
        <v-list-item
          v-for="(link,idx) in adminlinks"
          :key="idx"
          router :to="link.route"
        >
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item>

      </v-list>
    </v-menu>


      <v-btn v-if="user" text color="grey" @click="logout">
        <span>Sign Out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>


    </v-app-bar>
    <v-navigation-drawer v-if="user" v-model="drawer" app :class="bcgcolor" >
      <v-layout column align-center>
        <v-layout class="mt-5">
          <v-avatar size="100">
            <img src="/avatar-1.png">
          </v-avatar>
          
        </v-layout>
        <p class="white--text subheading mt-4 ">
            Ebook Store <span v-if="admin">(Admin)</span>
        </p>
        <v-flex v-if="admin == false" class="mt-4 mb-3">
          <popup @bookRequested="snackbar= true" />
        </v-flex>
      </v-layout>

      <v-list rounded  v-if="admin == false">
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route"> 
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list rounded v-if="admin">
        <v-list-item v-for="link in adminlinks" :key="link.text" router :to="link.route"> 
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

  </nav>
</template>

<script>
import Popup from './Popup'
import firebase from "firebase";
import db from '@/fb'

export default {
  components: { Popup, },
  data() {
    return {
      drawer: false,
      links: [
        {icon : 'mdi-view-dashboard', text : 'Dashboard', route : '/dashboard'},
        {icon : 'mdi-book-open-variant', text : 'My Ebooks', route : '/myebooks'},
        {icon : 'mdi-arrow-up-circle', text : 'Top 10 eBooks', route : '/top10ebooks'},
        {icon : 'mdi-timer-sand', text : 'Requested Ebooks', route : '/requestedebooks'},
      ],
      adminlinks: [
        {icon : 'mdi-view-dashboard', text : 'Admin Panel', route : '/admin'},
        {icon : 'mdi-book-plus-multiple', text : 'Add New Ebook', route : '/addebook'},
        {icon : 'mdi-database-refresh', text : 'Revise Requests', route : '/reviserequests'},
      ]
      ,
      snackbar: false,
      text: 'we receive your request, we will send you an email soon.',
      timeout: 5000,
      user: null,
      admin: false,
      bcgcolor : "indigo"
    }
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Auth" })
        })
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.user = user
      }else {
        this.user = null
      }
    })
  },
  mounted() {

    let user = firebase.auth().currentUser;

    if(user) {
      db.collection("users")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let user2 = doc.data();
          if(user2.admin && user2.user_id == user.uid){
            this.admin = true
            this.bcgcolor = "pink"
          }
        });
      });
    }

    

  },
};
</script>
