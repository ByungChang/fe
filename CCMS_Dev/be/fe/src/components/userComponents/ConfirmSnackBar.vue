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
            confirm:false,
            CorB:'',
            branchId:0
        }
    },
    mounted(){

        EventBus.$on("DelCompany", (item) => {
            this.branchId = item.id
            this.CorB = 'company'
            this.confirm = true
        });
        EventBus.$on("DelUser", (item,CorB) => {
            this.branchId = item.id
            this.CorB = 'branch'
            this.confirm = true
        });
    },
    methods:{
        confirmYes(){
            if(this.CorB === 'company')
                EventBus.$emit('delCompanyOk',true)
            else if(this.CorB === 'branch')
                EventBus.$emit('delUserOk',this.branchId)
            this.confirm=false
        },
        confirmNo(){
            this.confirm=false
        }
    }
    
}
</script>