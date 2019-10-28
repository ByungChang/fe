<template>
    <v-dialog
      v-model="WModal"
      width="800px"
      persistent
    >
      <v-card>
        <v-card-title  v-model="form.title" style="color:white;background-color:#230871">
          <p class=font-weight-white id=board> 게시판 </p>
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
              v-if="index < 2"
              color="deep-purple accent-4"
              dark
              label
              small
            >
              {{ text }}
            </v-chip>

            <span
              v-else-if="index === 2"
              class="overline grey--text text--darken-3 mx-2"
            >
              +{{ files.length - 2 }} File(s)
            </span>
          </template>
        </v-file-input>

        <v-card-actions>
          <v-card-text>
            <v-row
                align="center"
                justify="center"
            >
              <v-col>

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
              </v-col>
            </v-row>
          </v-card-text>
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
            WModal:false,
            mode:'',
            form: {
                id:1,
                title: '',
                writer:'',
                content: '',
                createdAt:''
            },
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
          this.mode='add'
        });
        eventBus.$on('triggerEditModal', (item) => { 
          this.form = item
          this.WModal=true
          console.log('on')
          this.mode='edit'
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
            fd.append('nameame', this.fileName)
            fd.append('bin', document.getElementById('bin').files[0])

            if(this.mode === 'add'){
              axios.post('/api/board', fd,{
                userId:localStorage.getItem('id'),
                title:this.form.title,
                boardPostId:cata,
                content:this.form.content,
                hit:0
              })
              .then((r) => {
                  eventBus.$emit('triggerAlert',true);
              })
              .catch((e) => {
                  console.error(e.message)
              })
            }
            else if(this.mode === 'edit'){
              axios.put('/api/board', 
              { 
                id: this.form.id,
                title: this.form.title,
                content: this.form.content } 
              )
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
          this.form.title = ''
          this.form.content = ''
          this.WModal = false
        },
        upload () {
          

          axios.post('/api/board', fd)
            .then(r => {
              this.pop(r.data.success)
            })
            .catch((e) => {
              this.pop(e.message)
            })
        }
    },
    components:{
            'AlertSnackBar':AlertSnackBar
        }    
}
</script>