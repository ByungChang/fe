<template>
  <v-app v-if="$store.state.token">
    <!--1.clipped 추가-->
  <v-navigation-drawer 
   v-model="drawer"
    app
    clipped
    color="#2a3248">
    <v-list-item-group color="primary">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
      >
        <v-list-item-icon>
          <v-icon class="white--text">{{item.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-navigation-drawer>

    <!--2.clipped-left추가-->
  <v-app-bar 
    app
    clipped-left
    color="#1c065a"
    dark>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn img color="#1c065a">
        <v-img
          class="mx-0"
          src="./assets/cosweal.logo.png"
          max-height="150"
          max-width="200"
          contain
          @click="logoClick"
        ></v-img>
      </v-btn>
     <!--3.v-app-bar-nav-icon추가-->
      <div class="flex-grow-1"></div>
      <v-btn img color="#1c065a">
        <v-img
          class="mx-0"
          src="./assets/korea.png"
          max-height="30"
          max-width="40"
          contain
        ></v-img>
      </v-btn>
      <v-btn 
        color="#1c065a"
        dark
        depressed
        @click='signOut'>Logout</v-btn>
  </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-content>

    <!-- Provides the application the proper gutter -->
    <v-container fluid>
      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
  </v-content>

  
  </v-app>
  <v-app style="background: #1c065a;" v-else>
    <v-container
      class="fill-height"
      fluid
    >
      <v-row
        align="top"
        justify="center"
      >
        <v-col
          cols="100"
          sm="80"
          md="30"
        >
          <v-toolbar-title>
            <div class="display-4">
              <div style="color:#FFFFFF;">
                <!-- style="color:#FFFFFF;" 이거를 div에 삽임 -->
                
                  <v-img
                    class="mx-0"
                    src="./assets/cosweal.logo.png"
                    max-height="200"
                    width="700"
                    contain
                  ></v-img> 
                
              </div>
            </div>
          </v-toolbar-title>
          <div><br><br></div>
          <v-toolbar-title>
              <h2 style="color:#FFFFFF;"> Enter your e-mail and password to Log in</h2>
          </v-toolbar-title>
          <div><br></div>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              label="ID"
              type="text"
              v-model='id'
              :rules="idRules"
              outlined
              dark
            ></v-text-field>

            <v-text-field
              label="Password"
              type="password"
              v-model='pw'
              :rules="pwRules"
              dark
              outlined
            ></v-text-field>
            <v-btn block color="primary" :disabled="!valid" @click='loginClick'>Login</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
import axios from 'axios'

export default {
  name: 'App',
  data () {
    return {
      valid:true,
      user:'',
      auth:'',
      cId:0,
      clipped: false,
      drawer: true,
      fixed: false,
     
      id:'',
      pw:'',
      items: [
        { title: '홈', icon: 'mdi-home', to: {path: '/'}},
        { title: '나의 계정', icon: 'mdi-account',to: {path: '/account'} },
        { title: '미디어 공간', icon: 'mdi-image',to: {path: '/media'} },
        { title: '캠페인 관리', icon: 'mdi-book',to: {path: '/campaign'} },
        { title: '3D 스튜디오', icon: 'mdi-pencil',to: {path: '/3d'} },
        { title: '사용자 관리', icon: 'mdi-wrench',to: {path: '/company'} },
        { title: '휴지통', icon: 'mdi-trash-can',to: {path: '/boardUpdate'} },
        { title: 'Q&A', icon: 'mdi-help-box',to: {path: '/board'} },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      idRules: [
          v => !!v || 'ID를 입력해주세요',
      ],
      pwRules: [
          v => !!v || '패스워드를 입력해주세요',
      ],
    }
  },
  mounted(){
    
  },
  methods: {
    logoClick(){
      location.href="/"
    },
    loginClick(){
      let user={};
      if (this.$refs.form.validate()) {
        axios.post('/api', {
          orgId:this.id,
          userPw:this.pw,
        })
        .then((r) => {
          if (r.data.success){
            localStorage.setItem('token', r.data.token)
            this.$store.commit('getToken', r.data.user)
            
          }
          const token = localStorage.getItem('token')
          axios.get(`/api/company/getInfo`, { headers: { Authorization: token } })
          .then((r) => {
              if (!r.data.success) return console.error(r.data.msg)
              if(r.data.success){
                this.auth = r.data.user
                this.cId = r.data.id
              }
          })
        })
        .catch((e) => {
          alert("에러가 발생하였습니다.")
          console.error(e.message)
        })
      }
    },
    signOut () {
      localStorage.removeItem('token')
      location.href = '/'
    }
  },
  components:{
 
  }
}
</script>