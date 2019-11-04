  
 <template>
 
<v-card> 
  
  <userAdd></userAdd>
  <userDetail></userDetail>
  <ConfirmSnackBar></ConfirmSnackBar>

    <v-card-title>
      사용자 관리
      <v-spacer></v-spacer>
      <v-text-field 
        v-model="search"
        append-icon="mdi-heart"
        label="검색어입력"
        single-line
        hide-details
      ></v-text-field>
          </v-card-title>
          <v-card-title>
           <v-row justify="end">
          <v-btn  @click="btnClick('userAdd',$route.params.CId)" dark>사용자 추가</v-btn>
      </v-row>
       
      </v-card-title>
 
  <v-data-table
    :search="search"
    :headers="headers"
    :items="users"
    hide-default-footer
    :items-per-page="3"
    class="font-weight-bold"
    :page.sync="page"
    @page-count="pageCount = $event"
    
  >
 
  <template v-slot:item.src="{ item }">
    <v-avatar v-if="x>600"
      class="ma-3"
      size="100"   
    >
      <v-img :src="require(`@/assets/aaa.png`)"></v-img>
    </v-avatar>
    <v-avatar v-else
      size="40"        
    >
      <v-img :src="require(`@/assets/aaa.png`)"></v-img>
    </v-avatar>
 </template>

 <template v-slot:item.name="{item}">
   <v-list-item style="text-align:left">{{item.name}}</v-list-item>
 </template>

 <template v-slot:item.state="{ item }">
        <v-btn @click="statusChange(item)" :color="getColor(item.state)">{{item.state}}</v-btn>
 </template>

 <template v-slot:item.action="{ item }">
    <v-btn @click="userDetail(item)" icon ><v-icon>mdi-information-outline</v-icon></v-btn>
    <v-btn 
    @click="btnClick('userEdit'), editTable(item)" icon ><v-icon>mdi-square-edit-outline</v-icon></v-btn>
    <v-btn @click="deleteUser(item)" icon ><v-icon>mdi-trash-can-outline</v-icon></v-btn>
    
 </template>
</v-data-table>
 
<div class="text-center">
    <v-pagination
      v-model="page"
      :length="pageCount"
      circle
    >
    </v-pagination>
  </div>
  <router-view :key="$route.fullPath"></router-view>
</v-card>
</template>
 
<script>

  import axios from 'axios'
  import userDetail from '@/components/userComponents/userDetail.vue'
  import userAdd from '@/components/userComponents/userAdd.vue'
  import { EventBus } from "./eventBus";
  import ConfirmSnackBar from './ConfirmSnackBar.vue'


  export default {
    components:{
      //userFooterComponent
      userAdd,
      userDetail,
      ConfirmSnackBar
    },
    data () {
      
      return {
        companyId:0,
        mode:'',
        x:window.innerWidth,
        devices:[],
        search:'',
        state:'',
        page: 1,
        pageCount: 0,
        headers: [
          {
            text: '',
            align: 'center',
            sortable: false,
            value: 'src',
 
          },
          { text: '사용자', value: 'name', align:'center'},
          { text: '상태', value: 'state',align:'center',  },
          { text: 'HYPER VSN', value: 'hvNum',align:'center',  },
          { text: '계약 만료일', value: 'expiredDate' , },
          { text: '정보보기/수정/삭제', value: 'action',sortable: false,},
        ],

        users: [
          // {
          //   src:'aaa.png',
          //   userName: '이마트 천호역점',
          //   status: 'active',
          //   hvNum: 30,
          //   endDay: '2019-12-20',
          //   userEmail: 'abc@co.kr'
          // },
          // {
          //   src:'aaa.png',
          //   userName: '롯데리아 길동사거리점',
          //   status: 'block',
          //   hvNum: 8,
          //   endDay: '2020-03-20',
          //   userEmail: 'abc@co.kr'

          // },
          // {
          //   src:'aaa.png',
          //   userName: '나이키 강동역점',
          //   status: 'block',
          //   hvNum: 8,
          //   endDay: '2021-01-01',
          //   userEmail: 'abc@co.kr'
          // },
        ],
        number:-1
      }
    },

    created(){
      EventBus.$on('userAddOk',(item)=>{
        axios.post('/api/company/user',{
          companyId : this.$route.params.CId
        })
        .then((r)=>{
          let j=0;
          for(j=0;j<r.data.users.length;j++){
              var y = r.data.users[j].expiredDate.substr(0, 4);
              var m = r.data.users[j].expiredDate.substr(5, 2);
              var d = r.data.users[j].expiredDate.substr(8, 2);

              r.data.users[j].expiredDate = y+'-'+m+'-'+d
          }
          console.log(this.users)
          this.users = r.data.users
          
        })
        .catch((e)=>{
        })
      })

      EventBus.$on("delUserOk", (item) => { 
        this.info = [
          {
            id: item,
          }
        ]
        axios.delete('/api/company/user', {data: { info : this.info} })
        .then((r) => {
            axios.post('/api/company/user',{
            companyId : this.$route.params.CId
          })
          .then((r)=>{
            let j=0;
            for(j=0;j<r.data.users.length;j++){
                var y = r.data.users[j].expiredDate.substr(0, 4);
                var m = r.data.users[j].expiredDate.substr(5, 2);
                var d = r.data.users[j].expiredDate.substr(8, 2);

                r.data.users[j].expiredDate = y+'-'+m+'-'+d
            }
            this.users = r.data.users
            
          })
          .catch((e)=>{

          })  
        });
      });

      axios.post('/api/company/user',{
        companyId : this.$route.params.CId
      })
      .then((r)=>{
        let j=0;
        for(j=0;j<r.data.users.length;j++){
            var y = r.data.users[j].expiredDate.substr(0, 4);
            var m = r.data.users[j].expiredDate.substr(5, 2);
            var d = r.data.users[j].expiredDate.substr(8, 2);

            r.data.users[j].expiredDate = y+'-'+m+'-'+d
        }
        this.users = r.data.users
        console.log(users)
      })
      .catch((e)=>{

      })

    },
    methods:{
      btnStatus(){
          
      },
      getColor(status)
      {
        if(status=='active')
        return 'green'
        else return 'red'
      },

      btnClick(what,cId){
        EventBus.$emit("userAdd", what, cId)
      },

      statusChange(item){
        this.number=this.users.indexOf(item)
        if(this.users[this.number].state =='active'){
          this.users[this.number].state ='block'
        }
        else if(this.users[this.number].state =='block'){
          this.users[this.number].state ='active'
        }
      },

      editTable(item){
        EventBus.$emit("userEditInfo", item)
      },

      userDetail(item){
        console.log(item)
        axios.post('/api/company/detail',{id : item.id})
        .then((r)=>{
          console.log(r)
          EventBus.$emit("userDetail", item, r.data.devices )
        })
      },

      deleteUser(item){
        EventBus.$emit("DelUser",item)
      },
      
    }
  }
</script>
 