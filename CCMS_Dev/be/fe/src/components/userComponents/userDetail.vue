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
          src="@/assets/korea.png"
          height="150px"
          dark
          >
          </v-img>
<v-list v-if="userAccess" two-line>
      <v-list-item  
       v-for="(item, i) in lists1" 
       :key="i" >
        <v-list-item-icon>
          <v-icon color="indigo">{{item.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle>{{item.titleHead}}</v-list-item-subtitle> 
        </v-list-item-content>
      </v-list-item> 

        <v-list-group
        color="indigo"
        
      >
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon color="indigo">mdi-help</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>HV title을 가져와야함</v-list-item-title>
            <v-list-item-subtitle>하이퍼비전 목록</v-list-item-subtitle>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="(item, i) in hvlists"
          :key="i"
        >
          <v-list-item-content>
            <v-list-item-title style="text-align:right" v-text="item"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
</v-list>
<v-list v-else two-line>
      <v-list-item  
       v-for="(item, i) in lists2" 
       :key="i" >
        <v-list-item-icon>
          <v-icon color="indigo">{{item.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle>{{item.titleHead}}</v-list-item-subtitle> 
        </v-list-item-content>
      </v-list-item> 

        <v-list-group
        color="indigo"
      >
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon color="indigo">mdi-help</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>HV title을 가져와야함</v-list-item-title>
            <v-list-item-subtitle>하이퍼비전 목록</v-list-item-subtitle>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="(item, i) in hvlists"
          :key="i"
        >
          <v-list-item-content>
            <v-list-item-title style="text-align:right" v-text="item"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
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
         hvlists:[
           'hv-11111', 'hv-2', 'hv-3', 'hv-4', 'hv-5', 'hv-6', 'hv-7', 'hv-8'
         ],

         formTitle:'',
         userAccess:true, 
         dialog:false,
         lists1: 
            [
        { title: '', icon: 'mdi-account-check', titleHead:'사용자'},
        { title: '', icon: 'mdi-lock',titleHead:'활성화 상태' },
        { title: '', icon: 'mdi-calendar',titleHead:'계약 만료일 '},
        { title: '', icon: 'mdi-phone',titleHead:'연락처' },
        { title: '', icon: 'mdi-email',titleHead:'이메일' },
        { title: '', icon: 'mdi-map-marker',titleHead:'주소'},
           ],


         lists2: 
            [
        { title: '', icon: 'mdi-account-check',titleHead:'기업'},
        { title: '', icon: 'mdi-lock',titleHead:'활성화 상태' },
        { title: '', icon: 'mdi-calendar',titleHead:'계약 만료일'},
        { title: '', icon: 'mdi-email',titleHead:'이메일' },
        { title: '', icon: 'mdi-domain',titleHead:'사업자 번호' },

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
          this.lists1[2].title=item.endDay  
          this.lists1[3].title=item.Tel
          this.lists1[4].title=item.userMail
          this.lists1[5].title=item.userAdress
          
          this.formTitle=item.userName
          this.dialog=true
          this.userAccess=true
    });
    EventBus.$on("companyDetail",(item) => {
          this.lists2[0].title=item.comName   
          this.lists2[1].title=item.status 
          //this.lists[2].title=item.hv
          this.lists2[2].title=item.endDay  
          this.lists2[3].title=item.comEmail  
          this.lists2[4].title=item.businessNum  

          this.formTitle=item.comName

          this.dialog=true
          this.userAccess=false
    });
    },
    
    
}
</script>