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
  
    <!--table에서 이미지를 넣는 template 현재윈도우가 1000px보다 작으면 이미지 size 50-->
      <template v-slot:item.img="{ item }">
        <v-avatar v-if="x>600"
          class="ma-3"
          size="100"        
        >
          <v-img :src="require(`@/assets/${item.src}`)"></v-img>
        </v-avatar>
        <v-avatar v-else
          size="40"        
        >
          <v-img :src="require(`@/assets/${item.src}`)"></v-img>
        </v-avatar>
      </template>

       <template v-slot:item.name="{item}">
   <v-list-item style="text-align:left" :to="to" >{{item.name}}</v-list-item>
      </template>

      <template v-slot:item.status="{ item }">
        <v-btn @click="statusChange(item)" :color="getColor(item.status)">{{item.status}}</v-btn>
 </template>

      <!--table action의 아이템 영역에 아이콘 삽입-->
      <template v-slot:item.action="{ item }">
    <v-btn @click="userDetail(item)" icon ><v-icon>mdi-information-outline</v-icon></v-btn>
    <v-btn @click="btnClick('edit'), editTable(item)" icon ><v-icon>mdi-square-edit-outline</v-icon></v-btn>
    <v-btn @click="deleteComment(item)" icon ><v-icon>mdi-trash-can-outline</v-icon></v-btn>
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
  import axios from 'axios'
  import companyAdd from '@/components/userComponents/companyAdd.vue'
  import userDetail from '@/components/userComponents/userDetail.vue'
  import ConfirmSnackBar from '@/components/userComponents/ConfirmSnackBar.vue'
  import { EventBus } from "../components/userComponents/eventBus";

  export default {
    components:{
      //userFooterComponent
      companyAdd,
      userDetail,
      ConfirmSnackBar
    },
    data () {
      return {
        to:{
          path:'/userManagement'
        },
        x:window.innerWidth,
        search:'',
        page: 1,
        pageCount: 0,
        headers: [
          { text: '프로필사진', align: 'center', value: 'img', sortable: false},
           { text: '회사', value: 'name', align:'center' },
          { text: '상태', value: 'status',align:'center',  },
          { text: '유저수', value: 'userNum', align:'center'},
          { text: 'HYPER VSN', value: 'hvNum', align:'center'  },
          { text: '계약 만료일', value: 'expiredDate' , align:'center' },
          { text: '정보보기/수정/삭제', value: 'action',sortable: false, align:'center'},
        ],
        companies: [
          {
            src:'korea.png',
            name: '강동구',
            status: 'active',
            userNum: 20,
            hvNum: 30,
            expiredDate: '2019-12-20',
            businessNum:48850703,
            comEmail:'la703@naver.com'
          },
          {
            src:'korea.png',
            name: '아디다스',
            status: 'block',
            userNum: 27,
            hvNum: 8,
            expiredDate: '2020-03-20',
            businessNum: 66473248,
            comEmail:'y3333@cosweal.com'
          },
          {
            src:'korea.png',
            name: '나이키',
            status: 'block',
            userNum: 27,
            hvNum: 8,
            expiredDate: '2021-01-01',
            businessNum: 25254546,
            comEmail:'gitt@gmail.com'
          },
        ],
            number:-1

      }
    },
    mounted(){
      axios.get('/api/company', {})
      .then((r) => {
        console.log(r.data)
        console.log(r.data.companies.length)
        let j=0;
        for(j=0;j<r.data.companies.length;j++){
            var y = r.data.companies[j].expiredDate.substr(0, 4);
            var m = r.data.companies[j].expiredDate.substr(5, 2);
            var d = r.data.companies[j].expiredDate.substr(8, 2);

            r.data.companies[j].expiredDate = y+'-'+m+'-'+d
        }
        this.companies = r.data.companies
        console.log(this.companies)
      });



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
      btnClick(what){
        console.log(what)
        EventBus.$emit("companyAdd", what)
      },
      statusChange(item){
           this.number=this.companies.indexOf(item)
            if(this.companies[this.number].status =='active'){
              console.log(this.companies[this.number].status)
              this.companies[this.number].status ='block'
            }
            else if(this.companies[this.number].status =='block'){
              this.companies[this.number].status ='active'
            }
   
              // itemIndex = this.posts.indexOf(item)
                             // console.log(this.posts.indexOf(item))
                             // console.log(this.number)
                            //  console.log(item.comName)           
           },
           editTable(item){
             EventBus.$emit("comEditInfo", item)
                  // console.log(item)
           },
           userDetail(item){
             EventBus.$emit("companyDetail", item )
           },
           deleteComment(item){
                EventBus.$emit("DelComment",item)//item.id,this.comments);
                console.log('emit됨')
            },
   }
  }
</script>
 