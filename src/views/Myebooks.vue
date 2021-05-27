<template>
  <div class="myebooks">
   <h4 class="grey--text">List of your ebooks</h4>
   <v-container class="my-5">
     
     <v-row justify="center">
    <v-expansion-panels inset>
      <v-expansion-panel v-for="(book,idx) in books" :key="idx">
        <v-expansion-panel-header>{{ book.title }} by {{book.author}}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            {{ book.desc}}
            <div class="my-2">
              
              <v-btn color="pink" outlined @click="book.link">
                <v-icon left>mdi-google-drive</v-icon>
                View and Download
                </v-btn>
            </div>
          </v-row>
         
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>

   </v-container>
  </div>
</template>

<script>


export default {
  name: 'Projects',
  data(){
    return{
      books : [
        {title: 'the lost ways' , link:'ebay.com' , author:'rani fanira' , desc:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non omnis laborum illum necessitatibus architecto animi quisquam quidem blanditiis, doloribus quo repudiandae, eveniet dolorem beatae corrupti tenetur, rerum sint nemo qui.'},
        {title: 'the lost book' , link:'ebay.com' , author:'dani dacha' , desc:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non omnis laborum illum necessitatibus architecto animi quisquam quidem blanditiis, doloribus quo repudiandae, eveniet dolorem beatae corrupti tenetur, rerum sint nemo qui.'},
        {title: 'the ninja book' , link:'ebay.com' , author:'hiko danirama' , desc:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non omnis laborum illum necessitatibus architecto animi quisquam quidem blanditiis, doloribus quo repudiandae, eveniet dolorem beatae corrupti tenetur, rerum sint nemo qui.'},
      ]
    }
  }
}
</script>
