<template>
    <v-dialog
    v-model="DModal"
    max-width="800px"
    persistent
    scrollable>
    <ConfirmSnackBar></ConfirmSnackBar>
    <!-- <ErrorSnackBar></ErrorSnackBar>  -->

    <v-card>
        <v-system-bar window dark>
                <span>작성일 : {{form.createdAt}}</span>
                <v-spacer></v-spacer>

                <v-icon v-if="user === form.writer"
                    size="30px"
                    class="mr-2"
                    @click="openEditModal(form)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon v-if="user === form.writer"
                     size="30px"
                    @click="deletePost(form)"
                >
                    mdi-delete
                </v-icon>
            <v-btn icon dark>
                <v-icon 
                 size="30px"
                @click="DModalClose">mdi-close</v-icon>
            </v-btn>
            </v-system-bar>
<<<<<<< HEAD

            <v-card-title 
                style="color:white;background-color:#230871">{{form.title}}
            </v-card-title>

            <v-container
                class="overflow-y-auto"
                style="max-height: 500px"
                id="scroll-target"
            >
                <v-layout wrap row>
                    <v-flex>
                        <viewer  :value="form.content" style="min-height:300px;"  class="ma-4"></viewer>
                        <v-divider style="background-color:#000000" ></v-divider>
                            <v-layout wrap row v-if="form.file">
                                <v-flex>
                                    <div>
                                     <v-chip color="deep-purple accent-4"
                                        dark
                                        small 
                                        close 
                                        @click="fileDown(item.file.orgName)"
                                         v-for="item in form.file" 
                                        :key="item.file.orgName">
                                        <v-icon >mdi-paperclip</v-icon>{{item.file.orgName}}
                                    </v-chip>
                                    </div>
                                </v-flex>
                            </v-layout>
                        <v-divider style="background-color:#000000" ></v-divider>
                        <v-list three-line>
                            <v-list-item
                                v-for="item in comments"
                                :key="item.id"
                                style="border-bottom:1px grey dashed"
                            >
                                <v-list-item-avatar>
                                <v-icon size="80"> mdi-account-circle</v-icon>
                                </v-list-item-avatar>
                        
                                <v-list-item-title>
                                    <strong>{{item.user.userNm}}</strong> {{item.createdAt}}<!--item.title-->
                                    <v-list-item-content>{{item.content}} </v-list-item-content>  
                                </v-list-item-title>
=======
    <v-card-title style="color:white;background-color:#230871">{{form.title}}         
    </v-card-title>
     
    <v-card-text class="pa-0">
        <v-container>

        <viewer :value="form.content" style="min-height: 300px" class="ma-4"></viewer>
        </v-container>
        <div style="border:2px black solid;border-radius:20px;border-color:#751df1" v-if="form.file">
            <v-chip class="ma-1" color="#751df1"
                dark 
                small 
                @click="fileDown(item.file.orgName)"
                v-for="item in form.file" 
                :key="item.file.orgName">
                <v-icon >mdi-paperclip</v-icon>{{item.file.orgName}}
            </v-chip>
     </div>
        <v-list three-line>
        <v-list-item
            v-for="item in comments"
            :key="item.id"
            style="border-bottom:1px grey dashed"
        >
            <v-list-item-avatar>
            <v-icon size="80"> mdi-account-circle</v-icon>
            </v-list-item-avatar>
    
            <v-list-item-title>
                <strong>{{item.user.userNm}}</strong> {{item.createdAt}}<!--item.title-->
                <v-list-item-content>{{item.content}} </v-list-item-content>  
            </v-list-item-title>
>>>>>>> 7292439ffcb5eb7c02dae75b7e97b0c4fd0fce33

            <v-icon v-if="user === item.user.userNm"
                @click="modCommentDialog(item)"
                size="30px"
                >mdi-pencil
            </v-icon>
        
            <v-icon v-if="user === item.user.userNm"
                size="30px"
                right
                @click="deleteComment(item)"
            >mdi-delete
            </v-icon>
        </v-list-item>
    </v-list>

        
   
    </v-card-text>
    <v-text-field
        v-model="commentAdd"
        label="댓글 작성"
        append-outer-icon="mdi-send"
        @click:append-outer="addComment"
        
     ></v-text-field>
    </v-card>
    <!-- <ErrorSnackBar></ErrorSnackBar> -->
    </v-dialog>
</template>
<script>
    import axios from 'axios'
    import ConfirmSnackBar from './ConfirmSnackBar.vue'
    import ErrorSnackBar from './ErrorSnackBar.vue'
    import eventBus from "./eventBus.js";

    export default {
        mounted()  {
            var self = this;
            this.user = localStorage.getItem('user')
            this.id = localStorage.getItem('id')
            eventBus.$on('triggerDModal', (boardId,form,comments) => { 
                this.boardId = boardId
                this.form = form
                this.comments = comments
                this.DModal = true

                // this.form.file.forEach(item => {
                //     console.log(item.orgName.length)
                //     if(item.orgName.length > 17){
                //         item.orgName=item.orgName.subString(0,17) + '...'
                //     }
                // });
            });
            
            
            eventBus.$on('triggerDelCommentOk', (comments) => { 
                this.comments = comments
            });
        },
        data () {
            return {
                id:0,
                DModal:false,
                confirmComment:false,
                confirmCommentText:'',
                flag:'',
                list:[1,2,3,4,5],
                form: {},
                comments:[],
                commentAdd:"",
                user:'',
                commentId:0,
                commentDialog: false, //두번째 수정하기창
                commentModify:'',
                commentSell:null,
                confirm:false,
                boardId:0,
            }
        },
        methods : {
            DModalClose(){
                this.form.title = ''
                this.form.content = ''
                this.form.file=''
                this.DModal = false
                
            },
            UModalClose(){
                this.form.title = ''
                this.form.content = ''
                this.UModal = false
            },
            modCommentDialog (cmt) {
                this.commentDialog = true
                this.commentId = cmt.id
                this.commentModify = cmt.content //현재의 컨텐츠 내용
                this.commentSell = cmt
                eventBus.$emit('triggerAddCommentModal',cmt);
            },
            addComment()
            {
                axios.post('/api/board/comment/add', {
                    boardId:this.boardId,
                    userId:this.id,
                    content:this.commentAdd,
                })
                .then((r) => {
                    console.log(r.data.comment)
                    var temp = {
                        id:1,
                        orgId:1,
                        userGroupId:1,
                        userNm:this.user,
                        userPw:'',
                        userYn:'',
                        boardId:1,
                        content:'',
                        createdAt:'',
                        id:0,
                    }

                    const comment = {
                        content: this.commentAdd,
                        boardId: this.boardId,
                        id: r.data.comment.id,
                        user:temp,
                        createdAt:'New'
                    }
                    console.log(comment)
                    this.comments.push(comment)
                    this.commentAdd=''
                })
                .catch((e) => {
                    eventBus.$emit('triggerError',true);
                    console.error(e.message)
                })
            },
            deleteComment(item){
                eventBus.$emit('triggerDelComment',item.id,this.comments);
            },
            deletePost (item) {
                console.log('asdd')
                eventBus.$emit('triggerDelPost',item.id);
            },
            openEditModal(item){
                this.DModal = false
                eventBus.$emit('triggerEditModal',item);
            },
            fileDown(item){
                let fileName = item;
                console.log(fileName)
                axios.post('/api/board/fileDown',{fileName : fileName}, {
                    responseType: "blob"
                }).then((response) => {
                    var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                    var fileLink = document.createElement('a');

                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', fileName);
                    document.body.appendChild(fileLink);

                    fileLink.click();
                }).catch((e)=> {
                    console.log(e);
                })
            }
        },
        components:{
            'ConfirmSnackBar':ConfirmSnackBar
        }    
    }
</script>