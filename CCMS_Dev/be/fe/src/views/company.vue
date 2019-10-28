<template>
  <v-card> 
    <companyAdd></companyAdd>
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
          <v-img :src="require(`@/assets/aaa.png`)"></v-img>
        </v-avatar>
        <v-avatar v-else
          size="40"        
        >
          <v-img :src="require(`@/assets/aaa.png`)"></v-img>
        </v-avatar>
      </template>

      <!--table에서 active는 초록색, block은 빨간색으로 나타내는 template getColor methods사용-->
      <template v-slot:item.status="{ item }">
              <v-btn  @click="statusChange(item.status)" :color="getColor(item.status)">{{item.status}}</v-btn>
      </template>

      <!--table action의 아이템 영역에 아이콘 삽입-->
      <template v-slot:item.action="{ item }">
          <v-btn 
          @click="btnClick('edit')" icon ><v-icon>mdi-square-edit-outline</v-icon></v-btn>
          <v-btn icon ><v-icon>mdi-trash-can-outline</v-icon></v-btn>
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
  import { EventBus } from "../components/userComponents/eventBus";

  export default {
    components:{
      //userFooterComponent
      companyAdd
    },
    data () {
      return {
        indexa:0,
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
          { text: '수정/삭제', value: 'action',sortable: false, align:'center'},
        ],
        companies: [
          {
            src:'korea.png',
            comName: '코스윌',
            status: 'active',
            userNum: 20,
            hvNum: 30,
            endDay: '2019-12-20',
          },
          {
            src:'korea.png',
            comName: '아디다스',
            status: 'block',
            userNum: 27,
            hvNum: 8,
            endDay: '2020-03-20',
          },
          {
            src:'korea.png',
            comName: '나이키',
            status: 'block',
            userNum: 27,
            hvNum: 8,
            endDay: '2021-01-01',
          },
        ],
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
      statusChange(status){
          
      }
   }
  }
</script>
 