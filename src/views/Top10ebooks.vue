<template>
  <div class="top10ebooks">
    <h4 class="grey--text">Top 10 ebooks this month</h4>
    <v-container>
      <v-row dense>
        <v-col v-for="(item, i) in items" :key="i" cols="12" xl="4" lg="4" md="6" xs="12" sm="12">
          <v-card class="d-flex flex-column ma-5" height="350" :color="item.color" dark shaped>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title>
                  <h4 v-if="item.title.length <= 25" class="font-weight-black">{{item.title}}</h4>
                  <h4 v-if="item.title.length > 25" class=" font-weight-black">{{item.title.substring(0,25)+'..'}}</h4>
                </v-card-title>

                <v-card-subtitle class="pb-5 pt-5">
                  <h3>By : {{item.author}}</h3>
                </v-card-subtitle>
                <v-card-subtitle class="pt-0 pb-5">
                  <h3>Year :{{item.year}}</h3>
                </v-card-subtitle>
                <v-card-subtitle class="pt-0 pb-5">
                  <h3>{{item.nb_sells}} Solds</h3>
                </v-card-subtitle>
                <v-card-subtitle class="pt-0">
                  <h3>Watchers : {{item.nb_watchers}}</h3>
                </v-card-subtitle>
              </div>

              <v-avatar class="ma-3" size="125" tile height="200">
                <v-img class="imgg" :style="{backgroundImage: `linear-gradient(to bottom , transparent,transparent, ${item.color}), url('${item.img}')` }"></v-img>
              </v-avatar>
            </div>
            <v-spacer></v-spacer>
            <v-card-actions class="mx-5">
              <v-btn text :href="item.link" target="_blank">Buy it Now</v-btn>
              <v-spacer></v-spacer>
              <div v-for="(stat, j) in item.status" :key="j">
                <v-icon v-if="stat == 'new'" size="40" color="blue">mdi-new-box</v-icon>
                <v-icon v-if="stat == 'danger'" size="40" color="red">mdi-arrow-up-bold-hexagon-outline</v-icon>
                <v-icon v-if="stat == 'hot_1'" size="40" color="red">mdi-fire</v-icon>
                <v-icon v-if="stat == 'hot_2'" size="40" color="orange">mdi-fire</v-icon>
                <v-icon v-if="stat == 'top'" size="40" color="green">mdi-rocket-launch</v-icon>
              </div>
              <v-spacer></v-spacer>
              <div class="headline font-weight-black white--text">{{ item.price }} $</div>
              
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import db from'@/fb'

export default {
  data() {
    return {
      items: [],
      colors: [
        "#FF8066",
        "#C34A36",
        "#0089BA",
        "#008F7A",
        "#FF6F91",
        "#D65DB1",
        "#845EC2",
        "#952175",
        "#1F7087"
      ],
      color_idx : null
    };
  },
  created() {
    
    db.collection("books").onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(change => {
        this.color_idx = this.generateRandomNumber(0,8);
        if (change.type === "added" && change.doc.data().top) {
          this.items.push({
            ...change.doc.data(),
            id: change.doc.id,
            color : this.colors[this.color_idx]
          });
        }
      });
    });

  },
  methods: {
    generateRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
  },
  }
};
</script>

<style scoped>
.imgg{
  background-size: cover;
}
</style>