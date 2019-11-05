<template>
  <v-card> 
    <companyAdd></companyAdd>
    <userDetail></userDetail>
    <ConfirmSnackBar></ConfirmSnackBar>
    <v-card-title>
      기업 관리
      <v-spacer></v-spacer>
      <v-text-field 
        v-model="search"
        append-icon="mdi-magnify"
        label="검색어입력"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-card-title>
      <v-row justify="end">
        <v-btn @click="btnClick('add')" dark>기업 추가</v-btn>
      </v-row>
    </v-card-title>
  
    <v-data-table
      :search="search"
      :headers="headers"
      :items="companies"
      hide-default-footer
      :items-per-page="3"
      class="font-weight-bold"
      :page.sync="page"
      @page-count="pageCount = $event"  
    >
      <template v-slot:item.img="{ item }">
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
        <v-list-item style="text-align:left" @click="companyDetail(item)" >{{item.name}}</v-list-item>
      </template>

      <template v-slot:item.state="{ item }">
        <v-btn @click="statusChange(item)" :color="getColor(item.state)">{{item.state}}</v-btn>
 </template>

      <template v-slot:item.action="{ item }">
    <v-btn @click="userDetail(item)" icon ><v-icon>mdi-information-outline</v-icon></v-btn>
    <v-btn @click="btnClick('edit'), editTable(item)" icon ><v-icon>mdi-square-edit-outline</v-icon></v-btn>
    <v-btn @click="deleteCompany(item)" icon ><v-icon>mdi-trash-can-outline</v-icon></v-btn>
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
  </v-card>
</template>
 
<script>
  import Vue from "vue"
  import moment from "moment"
  import VueMomentJS from "vue-momentjs"
  import axios from 'axios'
  import companyAdd from '@/components/userComponents/companyAdd.vue'
  import userDetail from '@/components/userComponents/userDetail.vue'

  import ConfirmSnackBar from '@/components/userComponents/ConfirmSnackBar.vue'
  import { EventBus } from "../components/userComponents/eventBus";

  Vue.use(VueMomentJS, moment)

  export default {
    components:{
      companyAdd,
      userDetail,
      ConfirmSnackBar
    },
    data () {
      return {
        to:{
          path:'/userManagement'
        },
        info:[],
        x:window.innerWidth,
        companyId:0,
        branchId:0,
        devices:[],
        search:'',
        page: 1,
        pageCount: 0,
        headers: [
          { text: '프로필사진', align: 'center', value: 'img', sortable: false},
           { text: '회사', value: 'name', align:'center' },
          { text: '상태', value: 'state',align:'center',  },
          { text: '유저수', value: 'userNum', align:'center'},
          { text: 'HYPER VSN', value: 'hvNum', align:'center'  },
          { text: '계약 만료일', value: 'expiredDate' , align:'center' },
          { text: '정보보기/수정/삭제', value: 'action',sortable: false, align:'center'},
        ],
        companies: [
          // {
          //   src:'korea.png',
          //   name: '강동구',
          //   status: 'active',
          //   userNum: 20,
          //   hvNum: 30,
          //   expiredDate: '2019-12-20',
          //   businessNum:48850703,
          //   comEmail:'la703@naver.com'
          // },
          // {
          //   src:'korea.png',
          //   name: '아디다스',
          //   status: 'block',
          //   userNum: 27,
          //   hvNum: 8,
          //   expiredDate: '2020-03-20',
          //   businessNum: 66473248,
          //   comEmail:'y3333@cosweal.com'
          // },
          // {
          //   src:'korea.png',
          //   name: '나이키',
          //   status: 'block',
          //   userNum: 27,
          //   hvNum: 8,
          //   expiredDate: '2021-01-01',
          //   businessNum: 25254546,
          //   comEmail:'gitt@gmail.com'
          // },
        ],
            number:-1
      }
    },
    mounted(){
      EventBus.$on("delCompanyOk", (item) => { 
        this.info = [
          {
            cId: this.companyId,
          }
        ]
        axios.delete('/api/company', {data: { info : this.info} })
        .then((r) => {
          location.href = '/company'
        });
      });

      const token = localStorage.getItem('token')
      axios.get('/api/company', { headers: { Authorization: token } })
      .then((r) => {
        if (!r.data.success) return console.error(r.data.msg)
        r.data.companies.forEach((company) => {
          company.expiredDate = this.$moment(company.expiredDate).format('YYYY-MM-DD')
        });
        this.companies = r.data.companies
      }).catch((e) => {
          console.error(e.message)
      });
    },
    methods:{
      companyDetail(item){
        let CId = item.companyId
        localStorage.setItem("cId",item.id);
        this.$router.push({name:'userManagement', params:{CId}});
      },
 
      getColor(status)
      {
        if(status ==='active')
          return 'green'
        else return 'red'
      },

      btnClick(what){
        EventBus.$emit("companyAdd", what)
      },

      statusChange(item){
        this.number=this.companies.indexOf(item)
        if(this.companies[this.number].state ==='active'){
          this.companies[this.number].state ='block'
          axios.put('/api/company/state', {
            id : item.id,
            state : 'block'
          })
          .catch((e) => {
              console.error(e.message)
          })
        }
        else if(this.companies[this.number].state ==='block'){
          this.companies[this.number].state ='active'
          axios.put('/api/company/state', {
            userGroupId : item.userGroupId,
            state : 'active'
          })
          .catch((e) => {
              console.error(e.message)
          })
        }
      },

      editTable(item){
        EventBus.$emit("comEditInfo", item)
      },

      userDetail(item){
        axios.post('/api/company/detail',{id : item.id})
        .then((r)=>{
          EventBus.$emit("companyDetail", item, r.data.devices )
        }).catch((e) => {
          console.error(e.message)
        })
      },

      deleteCompany(item){
        this.companyId = item.companyId
        this.branchId = item.branchId
        EventBus.$emit("DelCompany",item)
      },
   }
  }
</script>
 