<template>
  <v-container class="fill-height" v-scroll="onScroll">
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
      <v-hover v-slot:default="{ hover }" v-for="book in filteredList" :key="book.id">
        <v-card shaped width="244" height="450" class="mx-auto mb-5" :elevation="hover ? 12 : 2">
          <router-link :to="{ name: 'Editebook', params: {book_id: book.id}}">
            <v-btn class="edit" icon>
              <v-icon color="purple">mdi-circle-edit-outline</v-icon>
            </v-btn>
          </router-link>
          <router-link :to="{ name: 'ManageTop10ebooks', params: {book_id: book.id}}">
            <v-btn class="top" icon>
              <v-icon color="red">mdi-fire</v-icon>
            </v-btn>
          </router-link>
          <v-btn class="remove" icon @click="deletebook(book.id)">
            <v-icon color="pink">mdi-delete-circle-outline</v-icon>
          </v-btn>

          <v-btn v-if="book.top" class="no_top" icon @click="stop_ads(book.id)">
            <v-icon color="red">mdi-campfire</v-icon>
          </v-btn>

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
            <v-btn outlined color="pink" :href="book.link" target="_blank">Buy it Now</v-btn>
          </v-card-actions>
        </v-card>
      </v-hover>

      <v-fab-transition>
        <v-btn
          color="pink"
          dark
          fab
          fixed
          bottom
          right
          v-show="showFab"
          @click="$vuetify.goTo('#app', {duration: 500, offset: 0})"
        >
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
      search: ""
    };
  },
  methods: {
    onScroll() {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;
    },
    deletebook(id) {
      db.collection("books")
        .doc(id)
        .delete()
        .then(
          (this.books = this.books.filter(book => {
            return book.id != id;
          }))
        );
    },
    stop_ads(id) {
      db.collection("books")
        .doc(id)
        .update({
          top: false
        })
        .then(() => {
          window.location.reload();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    showFab() {
      return this.offsetTop > 60;
    },
    filteredList() {
      return this.books.filter(book => {
        return (
          book.title.toLowerCase().includes(this.search.toLowerCase()) +
          book.author.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    }
  },
  created() {
    db.collection("books")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let book = doc.data();
          book.id = doc.id;
          this.books.push(book);
        });
      });
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

<style scoped>
.v-card__text {
  height: 130px;
}

.v-card {
  position: relative;
}

.edit {
  position: absolute;
  top: 100px;
  right: 10px;
  z-index: 100;
}

.remove {
  position: absolute;
  top: 200px;
  right: 10px;
  z-index: 100;
}
.top {
  position: absolute;
  top: 150px;
  right: 10px;
  z-index: 100;
}
.no_top {
  position: absolute;
  top: 150px;
  left: 10px;
  z-index: 100;
}
</style>