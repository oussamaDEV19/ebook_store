<template>
  <v-app >
    <Navbar />
    <v-main class="grey lighten-4 ma-0 pa-0">
      <v-content class="mx-4">
        <router-view></router-view>
      </v-content>
    </v-main>
    
  </v-app>
</template>

<script>

import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {Navbar,},
  data () {
    return{

    }
  }
};
</script>


<style>
#app{
  
}
</style>