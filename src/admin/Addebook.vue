<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" sm="8" md="8" class>
          <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      color="success"
    >
      {{ text }}
    </v-snackbar>
        <v-card>
          <v-card-title class="headline pink white--text">Add New eBook </v-card-title>

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
              <v-text-field
                v-model="price"
                label="Price"
                prepend-icon="mdi-currency-usd"
                :rules="inputrules"
              ></v-text-field>
              <v-text-field
                v-model="img"
                label="Image"
                prepend-icon="mdi-image-outline"
                :rules="inputrules"
              ></v-text-field>
              <v-text-field
                v-model="desc"
                label="Description"
                prepend-icon="mdi-form-textbox-password"
                :rules="inputrules"
              ></v-text-field>
              <v-text-field
                v-model="link"
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
            >Add Ebook</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import db from '@/fb'

export default {
  name: "addBook",
  data() {
    return {
      title: "",
      price: "",
      desc: "",
      year: "",
      img: "",
      author: "",
      link:"",
      inputrules: [(v) => v.length >= 3 || "Minumum length is 3 characters"],
      loading : false,
      snackbar: false,
      text: 'The Book successfully added.',
      timeout: 5000,
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true
        const book = {
          title : this.title,
          price : this.price,
          desc : this.desc,
          img : this.img,
          year : this.year,
          author : this.author,
          link : this.link,
          status: [],
          nb_sells : null,
          nb_watchers : null,
          top : false
          }

          db.collection('books').add(book).then(() => {
            this.loading = false
            this.snackbar = true
            this.$emit('bookAdd')
          })
        
        this.$refs.form.reset()
      }
    },
  }
};
</script>

<style>
</style>