<template>
  <v-col cols="12">
     <v-menu
        :close-on-content-click="false"
        :nudge-right="10"
        transition="scale-transition"
        offset-y
        min-width="290px"
      > 
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="hvText"
            label="하이퍼비전"
            prepend-inner-icon="mdi-plus"
            v-on="on"
          ></v-text-field>
        </template>
        <v-card max-width="400px" class="mx-auto">
           <v-chip close @click:close="remove(item)" v-for="item in selected" :key="item.name">
             {{item.name}}
   
           </v-chip>
          <v-card-title class="font-weight-bold">
            하이퍼비전 리스트
            <v-spacer></v-spacer>
            <v-text-field
            v-model="search"
            append-icon="mdi-heart"
            label="하이퍼비전 검색"
            single-line
            hide-details
            >
            </v-text-field>
                      </v-card-title>
            
            
        <v-data-table
        :items-per-page="perpage=5"
         v-model="selected"
         :search="search"
         :headers="headers"
         :items="items"
         show-select
         item-key="name"
         class="font-weight-bold"
         >
        </v-data-table>
        <v-row justify="center">
        <v-btn @click="hvSelect" dark>선택완료</v-btn>
        </v-row >
        </v-card>

      </v-menu>
    </v-col>
</template>
<script>
  export default {
    data () {
      return {
        hvText:'',
        selected:[],
        search: '',
        pageCount: 0,
        page:1,
        headers: [

          {
            text: '하이퍼 비전',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          

        ],
        items: [
          {
            name: 'HV-00474438',
          },
          {
            name: 'HV-00472237',
          },
          {
            name: 'HV-00432123',
          },
          {
            name: 'HV-00432121',
          },
          {
            name: 'HV-00432122',
          },
          {
            name: 'HV-00432125',
          },
          {
            name: 'HV-00432129',
          },
           {
            name: 'HV-00474440',
          },
           {
            name: 'HV-00474431',
          },
           {
            name: 'HV-00474430',
          },
           {
            name: 'HV-00464438',
          },

        ],
      }
    },
    methods:{
      remove(item){
        console.log(item)
      this.selected.splice(this.selected.indexOf(item), 1)
      //this.selected = [...this.selected]
      },
      hvSelect(){
        this.hvText=this.selected[0].name+'등('+this.selected.length +')개 선택됨'
       
      }
    }
  }
</script>
<style>
.btncolor:hover{
  background-color:pink;
}
</style>