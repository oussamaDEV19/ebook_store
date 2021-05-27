<template>
  <div class="requested-eboos">
    <h4 class="grey--text">Requested Ebooks</h4>
    <v-container class="my-12">
      <!--
      <v-layout row class="mb-3 ml-0">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              small
              outlined
              color="grey"
              @click="sortBy('title')"
              v-on="on"
            >
              <v-icon left small>mdi-sort</v-icon>
              <span class="caption text-lowercase">By book name</span>
            </v-btn>
          </template>
          <span>sort with book author</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              small
              outlined
              color="grey"
              class="ml-5"
              @click="sortBy('author')"
              v-on="on"
            >
              <v-icon left small>mdi-sort</v-icon>
              <span class="caption text-lowercase">By book author</span>
            </v-btn>
          </template>
          <span>Sort with book name</span>
        </v-tooltip>
      </v-layout>

      -->

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
            <div class="caption grey--text">Year</div>
            <div>{{ book.year }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Status</div>
            <div right>
              <v-chip
                outlined
                v-if="book.status == 'available'"
                small
                class="light-green accent-4"
                white--text
                caption
                my-2
                :href="book.link"
                target="_blank"
              >
                <v-avatar left >
                  <v-icon small color="green">mdi-google-drive</v-icon>
                </v-avatar>
                {{ book.status }}
              </v-chip>
              <v-chip
                outlined
                v-if="book.status == 'Pending'"
                small
                color="orange darken-1"
                white--text
                caption
                my-2
              >{{ book.status }}</v-chip>
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
import firebase from 'firebase'

export default {
  name: "Dashboard",
  data() {
    return {
      books: []
    };
  },
  methods: {
    sortBy(prop) {
      this.books.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    }
  },
  created() {
    let user = firebase.auth().currentUser;
    db.collection("requested_books").onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(change => {
        if (change.type === "added" && change.doc.data().id == user.uid) {
          this.books.push({
            ...change.doc.data(),
            id: change.doc.id
          });
        }
      });
    });
  }
};
</script>

<style scoped>
.book.online {
  border-left: 4px solid yellowgreen;
}
.book.offline {
  border-left: 4px solid tomato;
}
</style>
