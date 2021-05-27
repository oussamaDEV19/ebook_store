
<template>
  <v-container class="fill-height"  v-scroll="onScroll">
    <v-card shaped width="500" class="mx-auto mb-5">
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        class="mt-0 pt-0"
        placeholder="Search with title or author.."
      ></v-text-field>
    </v-card-title>
    
  </v-card>
    <v-row align="center" justify="center" no-gutters>

      

      <v-hover v-slot:default="{ hover }" v-for="(book,idx) in filteredList" :key="idx">
        <v-card
          shaped
          width="244"
          height="450"
          class="mx-auto mb-5"  
          
          :elevation="hover ? 12 : 2"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="subheading font-weight-bold">{{ book.title}}</v-list-item-title>
              <v-list-item-subtitle>by {{ book.author }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-img :src="book.img" height="190" contain></v-img>

              <v-card-text>{{ book.desc.substring(0,140)+".." }}</v-card-text>
              

              <v-card-actions>
                <div class="pl-4 headline font-weight-black pink--text">{{ book.price }} $</div>
                <v-spacer></v-spacer>
                <v-btn outlined color="pink">Buy it Now</v-btn>
              </v-card-actions>



        </v-card>
      </v-hover>

            <v-fab-transition>
      <v-btn color="pink"  dark fab fixed bottom right v-show="showFab" @click="$vuetify.goTo('#app', {duration: 500, offset: 0})">
         <v-icon x-large>mdi-arrow-up-drop-circle-outline</v-icon>
      </v-btn>
    </v-fab-transition>




    </v-row>
  </v-container>
</template>

<script>
import db from "@/fb";

export default {
  name: "addBook",
  data() {
    return {
      books: [],
      offsetTop: 0,
      search: '',
    };
  },
  methods: {
      onScroll() {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;
    }
  },
  computed: {
    showFab() {
      return this.offsetTop > 60;
    },
    filteredList() {
      return this.books.filter(book => {
        return book.title.toLowerCase().includes(this.search.toLowerCase()) + book.author.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  created() {
    db.collection("books")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let book = doc.data();
          this.books.push(book);
        });
      });
  }
};
</script>

<style scoped>
.v-card__text{
    height: 130px;
}



</style>

<!--
<template>
  <div class="dashboard">
    <h4 class="grey--text">Dashboard</h4>
    <v-container class="my-12">

      <v-layout row class="mb-3 ml-0">
        <v-tooltip top>
          <template v-slot:activator="{ on}">
            <v-btn small outlined color="grey" @click="sortBy('title')" v-on="on">
              <v-icon left small>mdi-sort</v-icon>
              <span class="caption text-lowercase">By book name</span>
            </v-btn>
          </template>
          <span>sort with book author</span>
        </v-tooltip>
        
        <v-tooltip top>
          <template v-slot:activator="{ on}">
            <v-btn small outlined color="grey" class="ml-5" @click="sortBy('author')" v-on="on">
              <v-icon left small>mdi-sort</v-icon>
              <span class="caption text-lowercase">By book author</span>
            </v-btn>
        </template>
        <span>Sort with book name</span>
        </v-tooltip>
        
      </v-layout>


      <v-card tile flat v-for="book in books" :key="book.title">
        <v-layout ma-0 row rounded wrap :class="`pa-3 book ${book.status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Book Title</div>
            <div>{{ book.title }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Author</div>
            <div>{{ book.author }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Price</div>
            <div>{{ book.price }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Status</div>
            <div right >
              <v-chip outlined v-if="book.status == 'online'" small class="light-green accent-4" white--text caption my-2>{{ book.status}}</v-chip>
              <v-chip outlined v-if="book.status == 'offline'" small color="orange darken-1" white--text caption my-2>{{ book.status}}</v-chip>
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>

import db from "@/fb";

export default {
  name: "Dashboard",
  data() {
    return {
      books: [
        {
          title: "The lost book",
          author: "laureat pazl",
          price: "12.5",
          status: "online"
        },
        {
          title: "The planet Paradox",
          author: "Dani zara",
          price: "12.5",
          status: "offline"
        },
        {
          title: "The lost Ways",
          author: "Nansi kikona",
          price: "12.5",
          status: "online"
        },
        {
          title: "The Irish Man",
          author: "Anas Bodanif",
          price: "19.5",
          status: "online"
        }
      ],
    };
  },
  methods: {
    sortBy(prop){
      this.books.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
    },
  },
  mounted() {
    db.collection("users")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let user = doc.data();
          if(user.admin){
            console.log("adminnnn")
          }
        });
      });
  },
};
</script>

<style>
.book.online {
  border-left: 4px solid yellowgreen;
}
.book.offline {
  border-left: 4px solid tomato;
}

</style>
-->