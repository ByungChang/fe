<template>
    <v-dialog
    v-model="WModal"
    width="800px"
    persistent
    scrollable>
    <v-card>
        <v-system-ber window dark>
           
            <v-icon>mdi-heart</v-icon>
        </v-system-ber>
    <v-card-title> 여기는 폼타이틀이 들어갑니다
        여기는 폼타이틀이 들어갑니다
        여기는 폼타이틀이 들어갑니다
        여기는 폼타이틀이 들어갑니다          
    </v-card-title>
    <v-btn>ddd</v-btn>
    <v-card-text style="height: 300px">
        <viewer></viewer>
        뷰어가들어갈 부분
        <v-divider style="background-color:#000000" ></v-divider>
    </v-card-text>
    </v-card>
    </v-dialog>    

</template>
<script>
export default {
    data(){
        return{
            WModal:true
        }
    }
}
</script>