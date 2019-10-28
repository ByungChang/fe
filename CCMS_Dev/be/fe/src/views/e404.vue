  
 <template>
<v-card> 
  <companyAdd></companyAdd>
  <userDetail></userDetail>
    <v-card-title>
      기업 관리
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
          <v-btn  @click="btnClick('add')" dark>기업 추가</v-btn>
      </v-row>
       
      </v-card-title>
 
  <v-data-table
    :search="search"
    :headers="headers"
    :items="posts"
    hide-default-footer
    :items-per-page="3"
    class="font-weight-bold"
    :page.sync="page"
    @page-count="pageCount = $event"  
  >
 
  <!--table에서 이미지를 넣는 template 현재윈도우가 1000px보다 작으면 이미지 size 50-->
  <template v-slot:item.name="{ item }">
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
 
 <template v-slot:item.comName="{item}">
   <v-list-item style="text-align:left" :to="to" >{{item.comName}}</v-list-item>
 </template>

 
 
 
 
 <!--table에서 active는 초록색, block은 빨간색으로 나타내는 template getColor methods사용-->
 <template v-slot:item.status="{ item }">
        <v-btn @click="statusChange(item)" :color="getColor(item.status)">{{item.status}}</v-btn>
 </template>
 
 
<!--table 헤더영역중 action헤드 부분에 companyadd버튼(기업 추가 버튼) component를 삽입
 <template v-slot:header.action="{ item }">
   <companyAdd></companyAdd>
 </template>
 -->
 
 
 
 
<!--table action의 아이템 영역에 아이콘 삽입-->
 <template v-slot:item.action="{ item }">
    <v-btn @click="userDetail(item)" icon ><v-icon>mdi-information-outline</v-icon></v-btn>
    <v-btn 
    @click="btnClick('edit'), editTable(item)" icon ><v-icon>mdi-square-edit-outline</v-icon></v-btn>
    <v-btn @click="deleteTable(item)" icon ><v-icon>mdi-trash-can-outline</v-icon></v-btn>
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
   import companyAdd from '@/components/userComponents/companyAdd.vue'
   import { EventBus } from "../components/userComponents/eventBus";
   import userDetail from '@/components/userComponents/userDetail.vue'


  export default {
    components:{
      //userFooterComponent
      companyAdd,
      userDetail
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
          {
            text: '',
            align: 'center',
            sortable: false,
            value: 'name',
 
          },
          { text: '회사', value: 'comName', align:'center'},
          { text: '상태', value: 'status',align:'center',  },
          { text: '유저수', value: 'userNum',},
          { text: 'HYPER VSN', value: 'hvNum',  },
          { text: '계약 만료일', value: 'endDay' , },
          { text: '정보보기/수정/삭제', value: 'action',sortable: false,},
        ],
        posts: [
          {
            src:'korea.png',
            comName: '강동구',
            status: 'active',
            userNum: 20,
            hvNum: 30,
            endDay: '2019-12-20',
            businessNum:48850703,
            comEmail:'la703@naver.com'
            //action:'오니?',
          },
          {
            src:'korea.png',
            comName: '아디다스',
            status: 'block',
            userNum: 27,
            hvNum: 8,
            endDay: '2020-03-20',
            businessNum: 66473248,
            comEmail:'y3333@cosweal.com'

          },
          {
            src:'korea.png',
            comName: '나이키',
            status: 'block',
            userNum: 27,
            hvNum: 8,
            endDay: '2021-01-01',
            businessNum: 25254546,
            comEmail:'gitt@gmail.com'
          },
          
        ],
        number:-1
      }
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
            //console.log(what)
            EventBus.$emit("companyAdd", what)
             },

           statusChange(item){
           this.number=this.posts.indexOf(item)
            if(this.posts[this.number].status =='active'){
              this.posts[this.number].status ='block'
            }
            else if(this.posts[this.number].status =='block'){
              this.posts[this.number].status ='active'
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
           deleteTable(item){
        const index = this.posts.indexOf(item)
        confirm('정말로 삭제하시겠습니까?') && this.posts.splice(index, 1)
           },
        }
  }
</script>
 