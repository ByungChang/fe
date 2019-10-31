<template>
  <v-card>   
    <v-card-title>
      Q&A
      <v-spacer></v-spacer>
      <v-text-field 
        v-model="search"
        append-icon="mdi-magnify"
        label="검색어입력"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-snackbar
      :timeout=10000
      v-model="confirm_"
      top
      multi-line
      color="error"
      dark
      icon="mdi-alert-circle-outline"
      transition="scale-transition"
    >
      {{confirmText}}
      <v-btn flat  color="error"  @click="confirmYes(item)">네</v-btn>
      <v-btn flat  color="error"  @click="confirmNo">아니요</v-btn>
    </v-snackbar>

    <v-data-table
        :headers="headers"
        :items="posts"
        :search="search"
        :page.sync="page"
        :items-per-page="12"
        hide-default-footer
        class="elevation-1"
        @page-count="pageCount = $event"  
        style="border-top:1px black solid;border-bottom:1px black solid"
    >   
        <template v-slot:item.updatedAt="props">
            <v-chip :color="getColor(props.item.board_post.name)" dark>  {{props.item.board_post.name}} </v-chip>
        </template>
        
        <template v-slot:item.title="props">
            <a @click="boardDetail(props.item)" style="color:black;text-align:left;display:block;">
                {{props.item.title}}
            </a>
        </template>

    </v-data-table>

    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>

    <v-btn
      bottom
      color="purple darken-4"
      dark
      fab
      fixed
      right
      @click="openAddModal"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <DetailModal></DetailModal>

    <WritePostModal></WritePostModal>
    
    <AddCommentModal></AddCommentModal>
  </v-card>
</template>

<script>
  import axios from 'axios'
  import DetailModal from '../components/BoardComp/DetailModal.vue'
  import AddCommentModal from '../components/BoardComp/AddCommentModal.vue'
  import WritePostModal from '../components/BoardComp/WritePostModal.vue'
  import eventBus from "../components/BoardComp/eventBus.js";

  export default {
    props: {
      source: String,
    },
    data () {
      return {
        totalItem:0,
        valid:true,
        alertText:'',
        confirmText:'',
        confirmCommentText:'',
        general:'',
        catagory:'',
        id:'',
        name:'',
        boardId:0,
        snackbar: false,
        timeout: 999,
        dialog: false,
        dialog2: false,
        flag:'post',
        alert: false,
        confirm_: false,
        confirmComment: false,
        page: 1,
        pageCount: 0,
        search: '',
        postCreateLink:[
          {
            to: {path: '/board/create'}
          }
        ],
        getMd: '',
        
        form: {

        },
        titleRules: [
            v => !!v || '제목을 입력해주세요',
        ],
        
        copyPosts:[],
        posts: [],
        headers: [
                    { width:'100px', text: '말머리', sortable: false, value: 'updatedAt', align: 'center'},
                    { text: '번호', value: 'id' , align: 'center', sortable: false},
                    { text: '제목', align: 'center', sortable: false, value: 'title'},
                    { text: '작성자', value: 'user.userNm' , align: 'center', sortable: false},
                    { text: '작성일', value: 'createdAt' , align: 'center', sortable: false},
                    { text: '조회수', value: 'hit', sortable: false , align: 'center'},
                ],
      }
    },
    mounted () 
    {
        const token = localStorage.token
        this.user = localStorage.getItem('user')
        this.id = localStorage.getItem('id')
        axios.get('/api/board', {
            //headers: { Authorization: token },
    })
    .then((r) => {
        console.log(r)
        let j=0;
        for(j=0;j<r.data.posts.length;j++){
            var y = r.data.posts[j].createdAt.substr(0, 4);
            var m = r.data.posts[j].createdAt.substr(5, 2);
            var d = r.data.posts[j].createdAt.substr(8, 2);
            var h = r.data.posts[j].createdAt.substr(11, 2);
            var min = r.data.posts[j].createdAt.substr(14, 2);
            var s = r.data.posts[j].createdAt.substr(17, 2);
            var temp = y+'-'+m+'-'+d+' '+h+':'+min+':'+s

            var diffDate_1 = temp instanceof Date ? temp :new Date(temp);
            var diffDate_2 = new Date();
        
            diffDate_1 =new Date(diffDate_1.getFullYear(), diffDate_1.getMonth()+1, diffDate_1.getDate());
            diffDate_2 =new Date(diffDate_2.getFullYear(), diffDate_2.getMonth()+1, diffDate_2.getDate());
        
            var diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());
            diff = Math.ceil(diff / (1000 * 3600 * 24));

            if(diff<1)
                r.data.posts[j].createdAt = h+':'+min+':'+s
            else
                r.data.posts[j].createdAt = y+'-'+m+'-'+d +' '+h+':'+min+':'+s
            }
            
            this.posts = r.data.posts
            this.posts.reverse()
            this.posts.sort(function (a, b) {
            
              if(a.board_post.name !== b.board_post.name){
                return a.board_post.name < b.board_post.name ? -1 : 1;  
              }
              else
                return a.id > b.id ? -1 : 1;
            });
            // this.posts.sort(function (a, b) { 
            //   return a.board_post.name < b.board_post.name ? -1 : 1;  
            // });
        console.log(this.posts)
    })
    .catch((e) => {
        console.error(e.message)
    })
    },
    methods: 
    {
      openAddModal(){
        eventBus.$emit('triggerAddModal','add');
      },
      
      modalClose2(){
        this.form.title = ''
        this.form.content = ''
        this.comments = []
        this.dialog2 = false
      },
      
      isNew(item){
        var diffDate_1 = item.createdAt instanceof Date ? item.createdAt :new Date(item.createdAt);
        var diffDate_2 = new Date();
    
        diffDate_1 =new Date(diffDate_1.getFullYear(), diffDate_1.getMonth()+1, diffDate_1.getDate());
        diffDate_2 =new Date(diffDate_2.getFullYear(), diffDate_2.getMonth()+1, diffDate_2.getDate());
    
        var diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());
        diff = Math.ceil(diff / (1000 * 3600 * 24));

        if(diff<3 || isNaN(diff)){
          return true
        }
        else{
          return false
        }
      },
      getColor (item) {
          if (item === '공지') return 'red'
              else return 'grey'
      },
      boardDetail(item){
          item.hit= item.hit+1
          this.boardId = item.id
          this.form.id = item.id
          this.form.title = item.title
          this.form.writer = item.user.userNm
          this.form.content = item.content
          if(item.board_files.length !== 0)
            this.form.file = item.board_files

          if(item.createdAt.length < 10){
              var today = new Date()
              this.form.createdAt = today.getFullYear()+'-'+(today.getMonth()+1)+'-' +today.getDate()+' '+ item.createdAt
          }
          else
              this.form.createdAt = item.createdAt
          axios.post('/api/board/comment', {
              boardId: item.id,
              hit: item.hit
          })
          .then((r) => {
              let j=0;
              for(j=0;j<r.data.comments.length;j++){
                  var y = r.data.comments[j].createdAt.substr(0, 4);
                  var m = r.data.comments[j].createdAt.substr(5, 2);
                  var d = r.data.comments[j].createdAt.substr(8, 2);
                  var h = r.data.comments[j].createdAt.substr(11, 2);
                  var min = r.data.comments[j].createdAt.substr(14, 2);
                  var s = r.data.comments[j].createdAt.substr(17, 2);
                  var temp = y+'-'+m+'-'+d+' '+h+':'+min+':'+s
                  r.data.comments[j].createdAt=temp
              }
              this.comments = r.data.comments
              eventBus.$emit('triggerDModal',this.boardId,this.form,this.comments);
              })
          .catch((e) => {
              console.error(e.message)
          })
      },
    },
  components:{
    'DetailModal' : DetailModal,
    'AddCommentModal' : AddCommentModal,
    'WritePostModal' : WritePostModal,
  }
 }
</script>
<style scoped>

#board
{
  color : white
}

</style>