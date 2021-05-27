<template>
  <v-container id="signinup-form" class="fill-height">

    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" sm="5" md="5" class="">
        <v-card class="evelation-12 card">
              <v-row class="">
                <v-col cols="12" md="12" class="pt-6 pb-6">
                  <v-card-text>
                    <v-form class="signup-form-form" @submit.prevent="login">
                      <h1
                        class="text-center display-1 mb-10"
                        :class="`${bgColor}--text`"
                      >
                        Sign in
                      </h1>
                      <v-text-field
                        id="username"
                        v-model="email"
                        label="Email"
                        name="email"
                        append-icon="mdi-email"
                        type="text"
                        :color="bgColor"
                      />
                      <v-text-field
                        id="password"
                        v-model="password"
                        label="Password"
                        name="Password"
                        append-icon="mdi-lock"
                        type="password"
                        :color="bgColor"
                      />
                      <div class="text-center mt-6">
                          <p v-if="feedback" class="center"> <span class="red--text">{{ feedback }} </span> </p>
                        <v-btn type="submit" large :color="bgColor" dark
                          >Sign In</v-btn
                        >
                      </div>
                    </v-form>
                  </v-card-text>
                </v-col>
              </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import firebase from 'firebase'

export default {
  name: 'Signupform',
  components: {
    
  },
  props: {
    source: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: 'indigo'
    },
    fgColor: {
      type: String,
      default: 'white'
    }
  },
  data: () => ({
    email: '',
    password: '',
    feedback: null,
  }),
  methods: {
      login() {
            if(this.email && this.password){
                this.feedback = null
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    this.$router.push({name : 'dashboard'})
                })
                .catch(err => {
                    console.log(err)
                    this.feedback = err.message
                })
            }else {
                this.feedback = "You should Enter All Information"
            }
        },
  }
}
</script>

<style scoped lang="scss">
.v-input__icon--double .v-input__icon {
  margin-left: -4.25rem !important;
}
a.no-text-decoration {
  text-decoration: none;
}
#signinup-form {
  max-width: 75rem;
}
.signup-form-form {
  max-width: 23rem;
  margin: 0 auto;
}
.card {
  overflow: hidden;
}
.vcenter {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>