<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" sm="8" md="8" class>
        <v-snackbar v-model="snackbar" :timeout="timeout" color="success">{{ text }}</v-snackbar>
        <v-card>
          <v-card-title class="pink white--text">{{ this.book.title.substring(0,50)+".." }}</v-card-title>

          <v-card-text>
            <v-form class="px-3" ref="form">
              <h2 class="mt-5">Status of the ebook :</h2>
              <v-row class="mx-5">
                <v-row v-for="(item,idx) in items" :key="idx">
                  <v-icon class="ml-2" :color="item.color">{{item.icon}}</v-icon>
                  <v-switch v-model="item.id" :label="item.title"></v-switch>
                </v-row>
              </v-row>

              <v-text-field
                v-model="nb_sells"
                label="Number of sells in other markets"
                prepend-icon="mdi-numeric"
              ></v-text-field>
              <v-text-field
                v-model="nb_watchers"
                label="Number of watchers"
                prepend-icon="mdi-eye-circle-outline"
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
      loading: false,
      snackbar: false,
      text: "The Book successfully edited.",
      timeout: 2000,
      items: [
        {
          title: "Hot 1",
          icon: "mdi-fire",
          color: "red",
          id: false,
          data: "hot_1"
        },
        {
          title: "Hot 2",
          icon: "mdi-fire",
          color: "orange",
          id: false,
          data: "hot_2"
        },
        {
          title: "New",
          icon: "mdi-new-box",
          color: "blue",
          id: false,
          data: "new"
        },
        {
          title: "Top",
          icon: "mdi-rocket-launch",
          color: "green",
          id: false,
          data: "top"
        },
        {
          title: "Danger",
          icon: "mdi-arrow-up-bold-hexagon-outline",
          color: "red",
          id: false,
          data: "danger"
        }
      ],
      nb_sells : "",
      nb_watchers : "",
      status: []
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.items.forEach(item => {
          if(item.id){
            this.status.push(item.data)
          }
        });
        db.collection("books")
          .doc(this.book.id)
          .update({
            status: this.status,
            nb_sells : this.nb_sells,
            nb_watchers : this.nb_watchers,
            top : true
          })
          .then(() => {
            setTimeout(() => this.$router.push({ path: "/admin" }), 2000);
            this.snackbar = true;
            this.$emit("bookAdd");
          })
          .catch(err => {
            console.log(err);
          });
      }
      


    }
  },
  created() {
    let ref = db.collection("books").doc(this.$route.params.book_id);
    ref.get().then(doc => {
      this.book = doc.data();
      this.book.id = doc.id;
    });
  }
};
</script>

<style>
</style>