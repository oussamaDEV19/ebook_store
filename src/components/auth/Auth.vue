<template>
  <v-container id="signinup-form" class="fill-height">

    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" sm="8" md="8" class="">
        <v-card class="evelation-12 card">
          <v-window v-model="step">
            <!--SignIn-->
            <v-window-item :value="1">
              <v-row class="">
                <v-col cols="12" md="8" class="pt-6 pb-6">
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
                      <div class="text-center">
                        <a
                          href="#"
                          class="mt-3 overline no-text-decoration"
                          :class="`${bgColor}--text`"
                          @click="step = 3"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <div class="text-center mt-6">
                          <p v-if="feedback_1" class="center"> <span class="red--text">{{ feedback_1 }} </span> </p>
                        <v-btn type="submit" large :color="bgColor" dark
                          >Sign In</v-btn
                        >
                      </div>
                    </v-form>
                  </v-card-text>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                  class="darken-2 vcenter"
                  :class="`${bgColor}`"
                >
                  <div>
                    <v-card-text :class="`${fgColor}--text`">
                      <h1 class="text-center headline mb-3">No User?</h1>
                      <h5 class="text-center overline mb-3">
                        Please Sign Up to continue
                      </h5>
                    </v-card-text>
                    <div class="text-center mb-6">
                      <v-btn dark outlined @click="step = 2">Sign Up</v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <!--SignUp-->
            <v-window-item :value="2">
              <v-row class="fill-height">
                <v-col
                  cols="12"
                  md="4"
                  class="darken-2 vcenter"
                  :class="`${bgColor}`"
                >
                  <div>
                    <v-card-text :class="`${fgColor}--text`">
                      <h1 class="text-center headline mb-3">Already a user?</h1>
                      <h5 class="text-center overline mb-3">Please Sign In</h5>
                    </v-card-text>
                    <div class="text-center mb-6">
                        
                      <v-btn dark outlined @click="step = 1">Sign In</v-btn>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" md="8" class=" pt-6 pb-6">
                  <v-card-text>
                    <h1
                      class="text-center display-1 mb-10"
                      :class="`${bgColor}--text`"
                    >
                      Sign Up
                    </h1>
                    <v-form class="signup-form-form" @submit.prevent="signup">
                      <v-text-field
                        id="alias"
                        v-model="alias"
                        label="Full Name"
                        name="alias"
                        append-icon="mdi-account-circle"
                        type="text"
                      />
                      <v-text-field
                        id="email"
                        v-model="email"
                        label="email"
                        name="email"
                        append-icon="mdi-email"
                        type="email"
                      />
                      <v-text-field
                        id="password"
                        v-model="password"
                        label="Password"
                        name="password"
                        append-icon="mdi-lock"
                        type="password"
                      />
                      <div class="text-center mt-6">
                          <p v-if="feedback_2" class="red-text center"><span class="red--text"> {{ feedback_2 }} </span> </p>
                        <v-btn type="submit" large :color="bgColor" dark>
                          Sign Up</v-btn
                        >
                      </div>
                    </v-form>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-window-item>
            <!--PW Rest-->
            <v-window-item :value="3">
              <v-row class="fill-height">
                <v-col
                  cols="12"
                  md="4"
                  class="darken-2 vcenter"
                  :class="`${bgColor}`"
                >
                  <div>
                    <v-card-text :class="`${fgColor}--text`">
                      <h1 class="text-center headline mb-3">Already a user?</h1>
                      <h5 class="text-center overline mb-3">Please Sign In</h5>
                    </v-card-text>
                    <div class="text-center mb-6">
                      <v-btn dark outlined @click="step = 1">Sign In</v-btn>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" md="8" class="pt-6 pb-6">
                  <v-card-text>
                    <v-form class="signup-form-form">
                      <h1
                        class="text-center display-1 mb-10"
                        :class="`${bgColor}--text`"
                      >
                        Reset Password
                      </h1>
                      <v-text-field
                        id="login"
                        v-model="login"
                        label="Username / eMail"
                        name="login"
                        append-icon="person / email"
                        type="text"
                        :color="bgColor"
                        class="v-input__icon--double"
                      />
                      <div class="text-center mt-6">
                        <v-btn large :color="bgColor" dark
                          >Reset Password</v-btn
                        >
                      </div>
                    </v-form>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import db from '@/fb'
import firebase from 'firebase'
import slugify from 'slugify'

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
    step: 1,
    email: '',
    password: '',
    alias: '',
    slug: null,
    feedback_1: null,
    feedback_2: null,
  }),
  methods: {
      login() {
            if(this.email && this.password){
                this.feedback_1 = null
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    this.$router.push({name : 'dashboard'})
                })
                .catch(err => {
                    console.log(err)
                    this.feedback_1 = err.message
                })
            }else {
                this.feedback_1 = "You should Enter All Information"
            }
        },
        signup(){
            if(this.alias && this.email && this.password){
                this.slug = slugify(this.alias,{
                    replacement: '-',
                    remove: /[$*_+~.()'"!-:@]/g,
                    lower: true
                })
                console.log(this.slug)
                let ref = db.collection('users').doc(this.slug)
                ref.get().then(doc => {
                    if(doc.exists){
                        this.feedback_2 = 'User Already Exist !'
                    }else {
                        firebase.auth().createUserWithEmailAndPassword(this.email , this.password)
                        .then(cred => {
                            ref.set({zz
                                alias: this.alias,
                                user_id: cred.user.uid,
                                admin: false
                            })
                        }).then(() => {
                            this.$router.push({name: 'dashboard'})                        
                            })
                        .catch(err => {
                            console.log(err)
                            this.feedback_2 = err.message
                        })
                    }
                })
            }else {
                this.feedback_2 = 'You must enter all informations !'
            }
        }
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