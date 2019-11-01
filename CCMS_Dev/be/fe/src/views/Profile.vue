<template>
    <v-dialog
    v-model="WModal"
    width="800px"
    persistent
    scrollable>
    <v-card>
        <v-system-bar window dark>
           
            <v-icon>mdi-heart</v-icon>
        </v-system-bar>
    <v-card-title> 여기는 폼타이틀이 들어갑니다
        여기는 폼타이틀이 들어갑니다
        여기는 폼타이틀이 들어갑니다
        여기는 폼타이틀이 들어갑니다          
    </v-card-title>
    <v-card-text  class="pa-1">
        <viewer style="min-height: 300px"></viewer>
        <v-divider style="background-color:#000000; width:100%" ></v-divider>
        <v-list three-line>
                            <v-list-item
                            
                                style="border-bottom:1px grey dashed"
                            >
                                <v-list-item-avatar>
                                <v-icon size="80"> mdi-account-circle</v-icon>
                                </v-list-item-avatar>
                        
                                <v-list-item-title>
                                    <strong>이름</strong> 생성날짜<!--item.title-->
                                    <v-list-item-content>댓글내용입니다.</v-list-item-content>  
                                </v-list-item-title>

                                <v-icon
                                    @click="modCommentDialog(item)"
                                    small
                                    >mdi-pencil
                                </v-icon>
                            
                                <v-icon
                                    small
                                    right
                                    @click="deleteComment(item)"
                                >mdi-delete
                                </v-icon>
                            </v-list-item>
                        </v-list>
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