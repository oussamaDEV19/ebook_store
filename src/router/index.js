import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Myebooks from '../views/Myebooks.vue'
import Top10ebooks from '../views/Top10ebooks.vue'
import Auth from '../components/auth/Auth.vue'
import RequestEdebooks from '../views/RequestedEbooks.vue'
import Adminlogin from '../admin/adminlogin.vue'
import Admin from '../admin/Admin.vue'
import Addebook from '../admin/Addebook.vue'
import Reviserequests from '../admin/Reviserequests.vue'
import Editebook from '../admin/Editebook.vue'
import ManageTop10ebooks from '../admin/ManageTop10ebooks.vue'
import ErrorPage from '../views/404.vue'
import firebase from "firebase";
import db from '@/fb.js'

Vue.use(VueRouter)


  const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    beforeEnter: (to, from , next) => {
      let user = firebase.auth().currentUser;
      if(user){
        next();
      }else {
        next({ name: "Auth" });
      }
    }
  },
  {
    path: '/myebooks',
    name: 'Myebooks',
    component: Myebooks,
    beforeEnter: (to, from , next) => {
      let user = firebase.auth().currentUser;
      if(user){
        next();
      }else {
        next({ name: "Auth" });
      }
      
    }

  },
  {
    path: '/top10ebooks',
    name: 'Top10ebooks',
    component: Top10ebooks,
    beforeEnter: (to, from , next) => {
      let user = firebase.auth().currentUser;
      if(user){
        next();
      }else {
        next({ name: "Auth" });
      }
      
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
  },
  {
    path: '/requestedebooks',
    name: 'Requestedebooks',
    component: RequestEdebooks,
    beforeEnter: (to, from , next) => {
      let user = firebase.auth().currentUser;
      if(user){
        next();
      }else {
        next({ name: "Auth" });
      }
      
    }
  },
  {
    path: '/adminlogin',
    name: 'Adlinlogin',
    component: Adminlogin,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter: (to, from , next) => {
      let user = firebase.auth().currentUser;
      if(user){
        db.collection("users")
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              let user2 = doc.data();
              if(user2.admin && user2.user_id == user.uid){
                next();
              }
            });
          });
        
      }else {
        next({ name: "Auth" });
      }

      
    }
  },
  {
    path: '/addebook',
    name: 'Addebook',
    component: Addebook,
    beforeEnter: (to, from , next) => {
      let user = firebase.auth().currentUser;
      if(user){
        db.collection("users")
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              let user2 = doc.data();
              if(user2.admin && user2.user_id == user.uid){
                next();
              }
            });
          });
        
      }else {
        next({ name: "Auth" });
      }

      
    }
  },
  {
    path: '/reviserequests',
    name: 'Reviserequests',
    component: Reviserequests,
    beforeEnter: (to, from , next) => {
      let user = firebase.auth().currentUser;
      if(user){
        db.collection("users")
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              let user2 = doc.data();
              if(user2.admin && user2.user_id == user.uid){
                next();
              }
            });
          });
        
      }else {
        next({ name: "Auth" });
      }

      
    }
  },
  {
    path: '/editebook/:book_id',
    name: 'Editebook',
    component: Editebook,
    beforeEnter: (to, from , next) => {
      let user = firebase.auth().currentUser;
      if(user){
        next();
      }else {
        next({ name: "Auth" });
      }
      
    }
  },
  {
    path: '/manageTop10ebooks/:book_id',
    name: 'ManageTop10ebooks',
    component: ManageTop10ebooks,
    beforeEnter: (to, from , next) => {
      let user = firebase.auth().currentUser;
      if(user){
        next();
      }else {
        next({ name: "Auth" });
      }
      
    }
  },
  {
    path: '/errorpage',
    name: 'ErrorPage',
    component: ErrorPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})






export default router
