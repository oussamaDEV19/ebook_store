<template>
  <div class="text-center">


    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="white" dark outlined v-bind="attrs" v-on="on"
          >Request an ebook</v-btn
        >
      </template>

      <v-card>
        <v-card-title class="headline pink white--text"
          >Please fill the form</v-card-title
        >

        <v-card-text>
          <v-form class="px-3" ref="form">
            <v-text-field
              v-model="title"
              label="Title of the book"
              prepend-icon="mdi-lead-pencil"
              :rules="inputrules"
            ></v-text-field>
            <v-text-field
              v-model="author"
              label="Author of the book(ex: nora roberts , James Patterson)"
              prepend-icon="mdi-account"
              :rules="inputrules"
            ></v-text-field>
            <v-text-field
              v-model="year"
              label="Year Published"
              prepend-icon="mdi-calendar-range"
              :rules="inputrules"
            ></v-text-field>
            <v-spacer></v-spacer>
          </v-form>
        </v-card-text>



        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined @click="submit" :loading="loading" color="pink" class="mx-0 mt-3"
            >Send Request</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import db from '@/fb'
import firebase from 'firebase'
export default {
  data() {
    return {
      dialog: false,
      title: "",
      author: "",
      year: "",
      status: "Pending",
      inputrules: [(v) => v.length >= 3 || "Minumum length is 3 characters"],
      loading: false,
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        var user = firebase.auth().currentUser;
        this.loading = true
        const book = {
          title : this.title,
          author : this.author,
          year : this.year,
          status : this.status,
          link : null,
          id : user.uid
          }

          db.collection('requested_books').add(book).then(() => {
            this.loading = false
            this.dialog = false;
            this.$emit('bookRequested')
          })
        
        
      }
    },
  },
};
</script>
