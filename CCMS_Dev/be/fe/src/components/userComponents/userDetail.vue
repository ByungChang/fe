<template>

<v-dialog v-model="dialog" scrollable max-width="400px" >
  <v-card>
      <v-app-bar dark color="purple">
        <v-card-title>
          <span>{{formTitle}} 회원정보</span>
        </v-card-title>
          <v-spacer></v-spacer>
          <v-btn 
          @click="infoClose()"
      icon
      dark>
        <v-icon 
        size="30px">mdi-close</v-icon>
      </v-btn>
          </v-app-bar>
          <v-card-text class="pa-0">
    <v-img
      src="https://cdn.vuetifyjs.com/images/lists/ali.png"
      height="200px"
      dark
    >
    </v-img>
<v-list v-if="userAccess">
      <v-list-item   v-for="(item, i) in lists1" 
        :key="i"
      >
        <v-list-item-icon>
          <v-icon color="indigo">{{item.icon}}</v-icon>
        </v-list-item-icon>
        
        <v-list-item-content>
          <v-list-item-title >{{ item.title }}</v-list-item-title>
          
        </v-list-item-content>
      </v-list-item>
<v-divider inset></v-divider>
</v-list>

<v-list v-else>
      <v-list-item v-for="(item, i) in lists2" 
        :key="i"
      >
        <v-list-item-icon>
          <v-icon color="indigo">{{item.icon}}</v-icon>
        </v-list-item-icon>
        
        <v-list-item-content>
          <v-list-item-title >{{ item.title }}</v-list-item-title>
          
        </v-list-item-content>
      </v-list-item>
<v-divider inset></v-divider>
</v-list>

          </v-card-text>

    
  </v-card>
</v-dialog>
</template>
<script>
import { EventBus } from "./eventBus";

export default {
    data(){
        return{
          formTitle:'',
         userAccess:true, 
         dialog:false,
         lists1: 
            [
        { title: '', icon: 'mdi-account-check',},
        { title: '', icon: 'mdi-lock', },
        { title: '', icon: 'mdi-antenna', },
        { title: '', icon: 'mdi-calendar',},
        { title: '', icon: 'mdi-phone', },
        { title: '', icon: 'mdi-email', },
        { title: '', icon: 'mdi-map-marker',},
           ],

         lists2: 
            [
        { title: '', icon: 'mdi-account-check',},
        { title: '', icon: 'mdi-lock', },
        { title: '', icon: 'mdi-antenna', },
        { title: '', icon: 'mdi-calendar',},
        { title: '', icon: 'mdi-email', },
        { title: '', icon: 'mdi-domain', },

           ],
        }

    },
    methods:{
        infoClose(){
          this.dialog=false
        }
    },
    mounted(){
      EventBus.$on("userDetail",(item) => {
            this.lists1[0].title=item.userName   
            this.lists1[1].title=item.status 
            //this.lists[2].title=item.hv
            this.lists1[3].title=item.endDay  
            this.lists1[4].title=item.Tel
            this.lists1[5].title=item.userMail
            this.lists1[6].title=item.userAdress
            
            this.formTitle=item.userName
            this.dialog=true
            this.userAccess=true
      });
      EventBus.$on("companyDetail",(item) => {
            this.lists2[0].title=item.name   
            this.lists2[1].title=item.status 
            //this.lists[2].title=item.hv
            this.lists2[3].title=item.expiredDate  
            this.lists2[4].title=item.comEmail  
            this.lists2[5].title=item.businessNum  

            this.formTitle=item.name

            this.dialog=true
            this.userAccess=false
      });
    },
    
    
}
</script>