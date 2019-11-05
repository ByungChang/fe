<template>
    
    <v-snackbar
        :timeout='false'
        v-model="alert"
        top
        persistent
        multi-line
        color="blue lighten-2"
        dark
        icon="mdi-alert-circle-outline"
        transition="scale-transition"
    >{{message}}
        <v-btn flat  color="blue lighten-2"  @click="alertConfirm">확인</v-btn>
    </v-snackbar>
</template>

<script>
import { EventBus } from "./eventBus";

export default {
    data() {
        return {
            alert:false,
            access:false,
            user:[],
            message:''
        }
    },
    mounted(){
        EventBus.$on("SaveItem",(item,r) => { 

             this.alert = true
             this.message = '생성되었습니다'
            if(item==='user'){
                console.log(r)
                this.user = r
                this.access=false
            }
            if(item==='company')
                this.access=true
        });
        EventBus.$on("EditItem",(item,r) => { 

             this.alert = true
             this.message = '수정이 완료되었습니다'
            if(item==='user'){
                this.user = r
                this.access=false
            }
            if(item==='company')
                this.access=true
        });
    },
    methods:{
        alertConfirm(){
            if(this.access===false){
                this.alert = false
                EventBus.$emit('userAddOk',this.user)
            }

            if(this.access===true)
                location.href='/company'
        }
    }
}
</script>