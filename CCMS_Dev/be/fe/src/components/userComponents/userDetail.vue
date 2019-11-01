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

        <v-dialog max-width="400px" scrollable v-model="dialogHv">
        <template v-slot:activator="{ on }">
          <v-list>
            <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo">mdi-help</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-on="on">HV title을 가져와야함</v-list-item-title>
          </v-list-item-content>
            </v-list-item>
          </v-list>
        </template>
        <v-card>
           <v-app-bar dark  color="purple">
          <v-app-title>하이퍼비전 목록</v-app-title>
          <v-spacer></v-spacer>
          <v-btn @click="dialogHv=flase" icon><v-icon>mdi-close</v-icon></v-btn>
           </v-app-bar>
           <div>
           <v-chip color="green" outlined>목록1</v-chip>
           </div>
          
        </v-card>
        </v-dialog>     
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

       <v-dialog max-width="400px" scrollable v-model="dialogHv">
        <template v-slot:activator="{ on }">
          <v-list>
            <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo">mdi-help</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-on="on">HV title을 가져와야함</v-list-item-title>
          </v-list-item-content>
            </v-list-item>
          </v-list>
        </template>
        <v-card>
           <v-app-bar dark  color="purple">
          <v-app-title>하이퍼비전 목록</v-app-title>
          <v-spacer></v-spacer>
          <v-btn @click="dialogHv=flase" icon><v-icon>mdi-close</v-icon></v-btn>
           </v-app-bar>
           <div>
           <v-chip color="green" outlined>목록1</v-chip>
           </div>
          
        </v-card>
        </v-dialog>
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
         dialogHv:false,
        //  hvlists:[
        //    'hv-11111', 'hv-2', 'hv-3', 'hv-4', 'hv-5', 'hv-6', 'hv-7', 'hv-8'
        //  ],

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
            this.lists1[0].title=item.name  
            this.lists1[1].title=item.status 
            //this.lists[2].title=item.hv
            this.lists1[2].title=item.expiredDate  
            this.lists1[3].title=item.tel
            this.lists1[4].title=item.userMail
            this.lists1[5].title=item.userAdress
            
            this.formTitle=item.userName
            this.dialog=true
            this.userAccess=true
      });
      EventBus.$on("companyDetail",(item) => {
            this.lists2[0].title=item.name   
            this.lists2[1].title=item.status 
            //this.lists[2].title=item.hv
            this.lists2[2].title=item.expiredDate  
            this.lists2[3].title=item.comEmail  
            this.lists2[4].title=item.busNumber

            this.formTitle=item.comName


            this.dialog=true
            this.userAccess=false
      });
    },
    
    
}
</script>