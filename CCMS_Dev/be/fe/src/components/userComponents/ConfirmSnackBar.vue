<template>
    <v-snackbar
        :timeout=10000
        v-model="confirm"
        top
        multi-line
        persistent
        color="error"
        dark
        icon="mdi-alert-circle-outline"
        transition="scale-transition"
      >정말 삭제 하시겠습니까?
        <v-btn flat  color="error"  @click="confirmYes">네</v-btn>
        <v-btn flat  color="error"  @click="confirmNo">아니요</v-btn>
    </v-snackbar>
</template>
<script>
import { EventBus } from "./eventBus";
export default {
    data(){
        return{
            confirm:false
        }
    },
    mounted(){

        EventBus.$on("DelComment", (item) => { 

            this.confirm = true
            
        });
        EventBus.$on("DelUser", (item/*item,comments*/) => { 
            this.confirm = true
            // this.commentId = item
            // this.comments = comments
            // this.CommentORPost = 'Comment'
        });
    },
    methods:{
        confirmYes(){
            EventBus.$emit('delCompanyOk',true)
            this.confirm=false
        },
        confirmNo(){
            this.confirm=false
        }
    }
    
}
</script>