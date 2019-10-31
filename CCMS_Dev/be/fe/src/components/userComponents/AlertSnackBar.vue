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
    >완료되었습니다
        <v-btn flat  color="blue lighten-2"  @click="alertConfirm">확인</v-btn>
    </v-snackbar>
</template>
<script>
//import axios from 'axios'
  import { EventBus } from "./eventBus";

export default {
    data() {
        return {
            alert:false,
            access:false
        }
    },
    mounted(){
        EventBus.$on("SaveItem",(item) => { 
             this.alert = true
            if(item=='user')
            this.access=false

            if(item=='company')
            this.access=true
        });
    },
    methods:{
        alertConfirm(){
            if(this.access==false)
            location.href='/userManagement'
            if(this.access==true)
            location.href='/company'
        }
    }
}
</script>