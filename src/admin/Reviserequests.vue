<template>
  <div class="revise">
      <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      color="success"
    >
      {{ text }}
    </v-snackbar>

    <h4 class="grey--text">List of requested ebooks</h4>
    <v-container class="my-5">
      <v-row justify="center">
        <v-expansion-panels inset>
          <v-expansion-panel v-for="(book,idx) in requested_ebooks" :key="idx">
            <v-expansion-panel-header>{{ book.title }} by {{book.author}} ({{book.year}})</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                {{ book.desc}}
                <v-col cols="9" sm="9" md="9">
                  <v-text-field
                    solo
                    label="Enter Link"
                    prepend-inner-icon="mdi-link-variant-plus"
                    v-model="link"
                  ></v-text-field>
                </v-col>
                <v-col cols="3" sm="3" md="3">
                  <v-btn
                    height="45"
                    outlined
                    @click="submit(book.id)"
                    :loading="loading"
                    color="pink"
                    :disabled="link ? false: true"
                  >Submit</v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import db from "@/fb";
import firebase from "firebase"

export default {
  name: "revise",
  data() {
    return {
      requested_ebooks: [],
      link: null,   
      loading: false,
      snackbar: false,
      text: 'The Link successfully added.',
      timeout: 5000,
      admin : false,
    };
  },
  created() {



    db.collection("requested_books").onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(change => {
        if (change.type === "added" && change.doc.data().status == "Pending") {
          this.requested_ebooks.push({
            ...change.doc.data(),
            id: change.doc.id
          });
        }
      });
    });



  },
  methods: {
    submit(index) {
        this.loading = true
      if(this.link){
                db.collection('requested_books').doc(index).update({
                    link : this.link,
                    status : "available"
                }).then( () => {
                      this.loading = false
                      this.snackbar = true
                }).catch( err => {
                    console.log(err)
                })
            }
    }
  },
};
</script>
