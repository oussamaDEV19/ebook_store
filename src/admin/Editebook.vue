<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" sm="8" md="8" class>
        <v-snackbar v-model="snackbar" :timeout="timeout" color="success">{{ text }}</v-snackbar>
        <v-card>
          <v-card-title class=" pink white--text">{{  this.book.title.substring(0,50)+".." }}</v-card-title>

          <v-card-text>
            <v-form class="px-3" ref="form">
              <v-text-field
                v-model="book.title"
                label="Title of the book"
                prepend-icon="mdi-lead-pencil"
                :rules="inputrules"
              ></v-text-field>
              <v-text-field
                v-model="book.author"
                label="Author of the book(ex: nora roberts , James Patterson)"
                prepend-icon="mdi-account"
                :rules="inputrules"
              ></v-text-field>
              <v-text-field
                v-model="book.year"
                label="Year Published"
                prepend-icon="mdi-calendar-range"
                :rules="inputrules"
              ></v-text-field>
              <v-text-field
                v-model="book.price"
                label="Price"
                prepend-icon="mdi-currency-usd"
                :rules="inputrules"
              ></v-text-field>
              <v-text-field
                v-model="book.img"
                label="Image"
                prepend-icon="mdi-image-outline"
                :rules="inputrules"
              ></v-text-field>
              <v-text-field
                v-model="book.desc"
                label="Description"
                prepend-icon="mdi-form-textbox-password"
                :rules="inputrules"
              ></v-text-field>
              <v-text-field
                v-model="book.link"
                label="Link"
                prepend-icon="mdi-link-variant"
                :rules="inputrules"
              ></v-text-field>
              <v-spacer></v-spacer>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              outlined
              @click="submit"
              :loading="loading"
              color="pink"
              class="mx-0 mt-3"
            >Edit Ebook</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import db from "@/fb";

export default {
  name: "editeBook",
  data() {
    return {
      book: null,
      inputrules: [v => v.length >= 3 || "Minumum length is 3 characters"],
      loading: false,
      snackbar: false,
      text: "The Book successfully edited.",
      timeout: 2000
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        
        db.collection("books")
          .doc(this.book.id)
          .update({
            title: this.book.title,
            price: this.book.price,
            desc: this.book.desc,
            img: this.book.img,
            year: this.book.year,
            author: this.book.author,
            link: this.book.link
          })
          .then(() => {
            setTimeout( () => this.$router.push({ path: '/admin'}), 2000);
        this.snackbar = true;
            this.$emit("bookAdd");
            
          })
          .catch(err => {
            console.log(err);
          });
        //this.$refs.form.reset();
      }
    }
  },
  created() {
    let ref = db
      .collection("books")
      .doc(this.$route.params.book_id);
    ref.get().then(doc => {
        this.book = doc.data();
        this.book.id = doc.id;
      });
  }
};
</script>

<style>
</style>