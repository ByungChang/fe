<template>
    
    <v-form
      ref="form"
      v-model="valid"
    >
        <!-- <v-dialog v-model="dialog" persistent scrollable max-width="600px"  > -->
        <v-dialog v-model="dialog" scrollable max-width="600px">
          <AlertSnackBar></AlertSnackBar>
      <v-card>
          <v-app-bar dark color="blue-grey">
        <v-card-title>
          <span>{{formTitle}}</span>
        </v-card-title>
          <v-spacer></v-spacer>
          <v-btn 
      icon
      dark>
        <v-icon 
        @click="modalClose"
        size="30px">mdi-close</v-icon>
      </v-btn>
          </v-app-bar>
     <v-card-text>
 
    <v-divider></v-divider>
   
    <v-col cols="12">
      <v-text-field
        v-model="name"
        :counter="20"
        :rules="nameRules"
        label="기업명*"
        prepend-inner-icon="mdi-account-check"
        required
      ></v-text-field>
    </v-col>
 
    <v-col cols="12">
      <v-select
         v-model="status"
        :items="actitems"
         label="활성화 여부*"
         prepend-inner-icon="mdi-lock"
         >
      </v-select>
    </v-col>
 
    <v-col cols="12">
      <v-text-field
        v-model="email"
        :counter="20"
        :rules="emailRules"
        label="이메일*"
        prepend-inner-icon="mdi-email"
        required
      ></v-text-field>
    </v-col>
 
    <HyperVisonSelect></HyperVisonSelect>
 
    <v-col cols="12">
      <v-text-field
        v-model="business"
        :counter="20"
        :rules="businessRules"
        label="사업자번호*"
        prepend-inner-icon="mdi-domain"
        required
      ></v-text-field>
    </v-col>
 
    <v-col cols="12" >
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="10"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date"
            label="만료일"
           :rules="dateRules"
           :readonly="readonly"
            prepend-inner-icon="mdi-calendar"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker locale="ko"
 v-model="date" @input="menu = false"></v-date-picker>
      </v-menu>
    </v-col>
 
    <v-col cols="12" >
      <v-file-input
    v-model="picture"
    :rules="imgRules"
    accept="image/png, image/jpeg, image/bmp"
    placeholder="사진 추가"
    prepend-inner-icon="mdi-camera"
    prepend-icon=""
    label="사진"
  ></v-file-input>
    </v-col>
    <v-spacer></v-spacer>
 
 
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
         <v-btn
         :disabled="!valid"
         color="success"
        @click="saveClick"
         >
         저장
         </v-btn>
         <v-btn
         color="error"
        @click="modalClose"
         >
         닫기
         </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-form>
</template>
 
<script>
import axios from 'axios'
import { EventBus } from "./eventBus";
import AlertSnackBar from './AlertSnackBar.vue'
import HyperVisonSelect from './HyperVisonSelect'


  export default {
      components:{
        AlertSnackBar,
        HyperVisonSelect
      },
    data: () => ({
      //date: new Date().toISOString().substr(0, 10),
      readonly:true,
      formTitle:'',
      menu: false,
      dialog: false,
      valid: true,
      status: '',
      picture: null,
      name: '',
      email: '',
      date: '',
      business: '',
      nameRules: [
        v => !!v || '기업명을 입력해주세요',
        v => (v && v.length <= 20) || '20글자 초과 하실 수 없습니다.',
      ],
 
      emailRules: [
        v => !!v || 'E-mail을 입력해주세요',
        v => /.+@.+\..+/.test(v) || '잘못된 형식의 이메일 입니다',
        v => (v && v.length <= 20) || '20글자 초과 하실 수 없습니다.',
      ],
      imgRules: [
         value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
      
      dateRules:[
      v => !!v || '만료일을 입력해주세요',
      ],

      
      businessRules: [
        v => !!v || '사업자번호를 입력해주세요',
        v => (v && v.length <= 20) || '20글자 초과 하실 수 없습니다.',
      ],
 
        actitems: [
        'active', 'block'
      ],
    }),
    mounted(){
        EventBus.$on("companyAdd", (what) => {
            if(what==='add')
            {
                this.formTitle='기업 추가'
            }
            if(what==='edit')
            {
                this.formTitle='기업 정보 수정'
            }
             this.dialog = true;

           });
        EventBus.$on("comEditInfo",(item) => {
                           this.name=item.comName
                           this.status=item.status
                           this.endDay=item.endDay                           
           });
         },
       methods: {
          saveClick () {
        // axios.post('/api/company', {
        //   name : this.name,
        //   busNumber : this.business,
        //   address : this.address,
        //   tel : this.tel,
        //   expiredDate : this.date,
        // })
        // .then((r) => {
        //     console.log('post완료')
        // })
        // .catch((e) => {
        //     console.error(e.message)
        // })
        EventBus.$emit("SaveItem",('company'))
      },
 
       modalClose(){
        this.dialog = false
        //this.$refs.form.reset()
        this.$refs.form.resetValidation()
        this.status= '',
        this.picture= null,
        this.name= ''
        this.email= ''
        this.date= ''
        this.business= ''
        EventBus.$emit("HyperVisonClean",(true))
          
      },
    },
  }
</script>

