<template>
    <v-dialog
      v-model="WModal"
      width="800px"
      persistent
    >
      <v-card>
        
        <v-card-title  v-model="form.title" style="color:white;background-color:#230871">
          <p class=font-weight-white id=board>{{mode}}</p>
        </v-card-title>
          <v-row 
          class="ma-0"
          > 

            <v-col
              class="align-center justify-space-between"
              cols="12"
            >
              <v-row align="center">
                <v-avatar
                  size="40px"
                  class="mr-4"
                >
                </v-avatar>
                <v-btn-toggle
                      v-model="text"
                      color="deep-purple accent-3"
                      
                      rounded
                      style="background-color:grey"
                    >
                      <v-btn value="left" @click="setNormal" >
                        일반
                      </v-btn>
                      <v-btn value="center" @click="setNotice">
                        공지
                      </v-btn>
                </v-btn-toggle>
                
                <v-form ref="form" v-model="valid" lazy-validation style="width:500px">
                  <v-text-field
                    placeholder="제목을 입력해주세요" 
                    v-model="form.title"
                    :rules="titleRules"
                  ></v-text-field>
                </v-form>
              </v-row>
            </v-col>
            
            <v-container>
              <editor v-model="form.content"/>
            </v-container>
            
          </v-row>
          <v-divider style="background-color:#000000" ></v-divider>
          
          
            <v-layout wrap row v-if="file_cpy[0]">
                <v-flex>
                    <v-list>
                        <v-list-item
                            v-for="item in file_cpy"
                            :key="item.id"
                        >
                            <v-list-item-title>
                              <v-icon >mdi-paperclip</v-icon>{{item.file.orgName}}
                              <v-icon style="color:red;" @click="delFile(item)">mdi-close</v-icon>
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-flex>
            </v-layout>
       
            <v-divider style="background-color:#000000" ></v-divider>
            <v-row>
              <v-container>
                <v-file-input
                  v-model="files"
                  color="deep-purple accent-4"
                  counter
                  label="File input"
                  multiple
                  placeholder="Select your files"
                  prepend-icon="mdi-paperclip"
                  outlined
                  id="bin"
                  :show-size="1000"
                  enctype="multipart/form-data"
                >
                  <template v-slot:selection="{ index, text }">
                    <v-chip
                      v-if="index < 3"
                      color="deep-purple accent-4"
                      dark
                      label
                      small
                    >
                      {{ text }}
                    </v-chip>

                    <span
                      v-else-if="index === 3"
                      class="overline grey--text text--darken-3 mx-2"
                    >
                      +{{ files.length - 3 }} File(s)
                    </span>
                  </template>
                </v-file-input>
              </v-container>
            </v-row>
            <v-card-actions>
              <v-btn
                color="success"
                @click="saveClick()"
              >저장</v-btn>
              <v-btn
                color="error"
                @click="modalClose"
              >취소</v-btn>
            </v-card-actions>
          
      </v-card>
        <AlertSnackBar></AlertSnackBar> 
        <ErrorSnackBar></ErrorSnackBar>
    </v-dialog>
</template>
<script>
import axios from 'axios'
import eventBus from "./eventBus.js";
import AlertSnackBar from './AlertSnackBar.vue'
import ErrorSnackBar from './ErrorSnackBar.vue'

export default {
    data(){
        return{
            file_cpy:[],
            file_cpy_save:[],
            del_files:[],
            files:[],
            fileList:false,
            fileId:0,
            WModal:false,
            mode:'',
            form: {},
            catagory:'일반',
            user:localStorage.getItem('user'),
            titleRules: [
                v => !!v || '제목을 입력해주세요',
            ],
        }
    },
    mounted(){
        eventBus.$on('triggerAddModal', (item) => { 
          this.WModal=true
          this.mode='게시글 생성'
        });
        eventBus.$on('triggerEditModal', (item) => {
          this.form = item
          if(item.file){
            this.file_cpy = JSON.parse(JSON.stringify(item.file));
            this.file_cpy_save = this.file_cpy = JSON.parse(JSON.stringify(item.file));
          }
          this.WModal=true
          
          this.mode='게시글 수정'
          this.fileList = true
        });
    },
    methods : {
        saveClick () {
          this.form.title = this.form.title.trim()
          this.form.content = this.form.content.trim()

          if (!this.form.title || !this.form.content)
              return

          if(this.catagory !== ''){
            
            if(this.catagory === '공지')
              var cata = 1
            if(this.catagory === '일반')
              var cata = 2

            let fd = new FormData()

            let i=0;
            console.log(this.files)
            this.files.forEach(file => {
              fd.append(`${i}`, file)
              i++
            });

            fd.append('userId', localStorage.getItem('id'))
            fd.append('title', this.form.title)
            fd.append('boardPostId', cata)
            fd.append('content', this.form.content)
            fd.append('hit', 0)
            fd.append('id',this.form.id)

            if(this.mode === '게시글 생성'){

              axios.post('/api/board',fd)
              .then((r) => {
                  eventBus.$emit('triggerAlert',true);
              })
              .catch((e) => {
                  console.error(e.message)
              });
            }
            else if(this.mode === '게시글 수정'){
              axios.delete('/api/board/fileDel', 
              {
                  data: { files: this.del_files } 
              })
              .then((r) => {
                console.log('r받음')
              })
              .catch((e) => {
                  this.alertText='에러가 발생했습니다'
                  this.alert=true
                  console.error(e.message)
              })

              axios.put('/api/board',fd )
              .then((r) => {
                eventBus.$emit('triggerAlert',true);
              })
              .catch((e) => {
                eventBus.$emit('triggerError',true);
                console.error(e.message)
              })
            }
          }
        },
        setNormal(){
            this.catagory = '일반'
        },
        setNotice(){
            this.catagory = '공지'
        },
        modalClose(){
          console.log('모달 닫기')
          this.form.title = ''
          this.form.content = ''
          this.form.file = []
          this.del_files=[]
          this.WModal = false
          function copy(mainObject) {
            let newObject = {};
          
            for (let key in mainObject) {
              newObject[key] = mainObject[key];
            }
            return newObject;
          }

          this.file_cpy = copy(this.file_cpy_save);
        },
        upload () {
          axios.post('/api/board', fd)
            .then(r => {
              this.pop(r.data.success)
            })
            .catch((e) => {
              this.pop(e.message)
            })
        },
        delFile(item){
          let i =0;

          this.file_cpy.forEach((temp)=>{
            if(temp.file.orgName === item.file.orgName){
              this.del_files.push(this.file_cpy[i])
              this.file_cpy.splice(i,1)
              console.log(this.del_files)
            }
            i++
          })
        }
    },
    components:{
            'AlertSnackBar':AlertSnackBar
        }    
}
</script>