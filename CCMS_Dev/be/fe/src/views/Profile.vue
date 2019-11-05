<template>
  <v-card
    max-width="475"
    class="mx-auto"
  >
    <v-img dark height="300px" :src="require(`@/assets/testimg.png`)">
    <v-row justify="end">
        <v-card-title>
          <v-btn dark icon class="mr-4">
            <v-icon>mdi-pencil</v-icon>
            편집
          </v-btn>
        </v-card-title>
    </v-row >
    </v-img>


     <!-- <v-row justify="center"
      v-for="(item, i) in items"
        :key="i" 
     >
      <v-col cols="12" sm="10">
        <v-text-field
          prepend-inner-icon="mdi-account"
          color="indigo"
          icon-color="red"
          :value="item.title"
          prefix="이름:"
        ></v-text-field>
      </v-col>
    </v-row>
     -->

    <v-row v-for="(item, i) in items"
    :key="i"> 
      <v-col cols="3">
        <div class="font-weight-bold" style="text-align:center">
        <v-icon color="teal darken-1">{{item.icon}}</v-icon>
         {{item.title}}</div>
      </v-col>
      <v-col cols="9">
          <div class="font-weight-bold">
	          <p>{{item.content}}</p>
          </div>
            <v-divider style="width:90%"></v-divider>
      </v-col>
    </v-row>
    

  </v-card>
</template>
<script>
export default {

  data(){
    return{
       items: [
        { title: '이름',content:'싱글하우스', icon: 'mdi-account'},
        { title: '주소',content:'서울광역시 강동구 천호대로 136길 32 ', icon: 'mdi-map-marker'},
        { title: '연락처',content:'010-6325-2223', icon: 'mdi-phone'},
        { title: '이메일',content:'kh.lee@cosweal.com', icon: 'mdi-email'},
        
      ],
    }
  }


}
</script>