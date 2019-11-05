<template>
    
    <v-form
      ref="form"
      v-model="valid"
    >
        <!-- <v-dialog v-model="dialog" persistent scrollable max-width="600px"  > -->
        <v-dialog v-model="dialog" scrollable max-width="600px">
      <v-card>
          <v-app-bar dark color="#2a3248">
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
        label="사용자명*"
        required
        prepend-inner-icon="mdi-account-check"
      ></v-text-field>
    </v-col>
 
    <v-col cols="12">
      <v-select
         v-model="state"
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


     <userHvSelect></userHvSelect>
 
    <v-col cols="12">
      <v-text-field
        v-model="address"
        :counter="30"
        :rules="addressRules"
        label="주소*"
        prepend-inner-icon="mdi-map-marker"
        required
      ></v-text-field>
    </v-col>
 
    <v-col cols="12">
      <v-text-field
        v-model="tel"
        :counter="12"
        :rules="telRules"
        label="연락처*"
        prepend-inner-icon="mdi-phone"
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
            v-model="endDay"
            :rules="endDayRules"
            label="만료일"
            :readonly="readonly"
            prepend-inner-icon="mdi-calendar"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker locale="ko"
 v-model="endDay" @input="menu = false"></v-date-picker>
      </v-menu>
    </v-col>
 
    <v-col cols="12" >
      <v-file-input
    :rules="imgRules"
    v-model="picture"
    accept="image/png, image/jpeg, image/bmp"
    prepend-inner-icon=mdi-camera
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
         @click="saveClick()"
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
         <AlertSnackBar></AlertSnackBar>

    </v-dialog>
    </v-form>
</template>
 
<script>

import { EventBus } from "./eventBus";
import axios from "axios"
import AlertSnackBar from './AlertSnackBar'
import userHvSelect from './userHvSelect'


  export default {
      components:{
      AlertSnackBar,
      userHvSelect
      },
    data: () => ({
      mode:'',
      select:[],
      branchId:0,
      formTitle:'',
      menu: false,
      dialog: false,
      valid: true,
      readonly: true,
      picture: null,   
      state: '',
      name: '',
      email: '',
      endDay: '',
      address: '',
      tel: '',

      nameRules: [
        v => !!v || '사용자명을 입력해주세요',
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
      
      
      endDayRules:[
      v => !!v || '만료일을 입력해주세요',
      ],

 
      address: '',
      addressRules: [
        v => !!v || '주소를 입력해주세요',
        v => (v && v.length <= 30) || '30글자 초과 하실 수 없습니다.',
      ],
 
      
      telRules: [
        v => !!v || '연락처 입력해주세요',
        v => (v && v.length <= 12) || '12글자 초과 하실 수 없습니다.',
      ],
 

      actitems: [
        'active', 'block'
      ],
    }),
    mounted(){
        EventBus.$on("userAdd", (what,cId) => {
          this.cId = cId
          if(what==='userAdd')
          {
            this.mode='post'
            this.formTitle='사용자 추가'
          }
          if(what==='userEdit')
          {
            this.mode='put'
            this.formTitle='사용자 정보 수정'
          }
          this.state=''
          this.select = []
          this.name=''
          this.email=''
          this.endDay=''
          this.address=''
          this.tel=''
          EventBus.$emit("HyperVisonClean",(true))
          this.dialog = true;
        });

        EventBus.$on("userEditInfo",(item) => {
          console.log(item)
          this.mode='put'
          this.name=item.name
          this.branchId = item.id
          this.endDay=item.expiredDate                          
          this.address=item.address
          this.tel=item.tel
          this.email=item.email
          this.state=item.state

          axios.post('/api/company/editDevice',{branchId : item.id})
          .then((r)=>{
            EventBus.$emit('userHVList',r.data.result)
          })

        });

        EventBus.$on("userAddOk", (what) => {
          this.dialog = false;
        });

        EventBus.$on("select",(item) => {
          this.select = item
        });
      },
       methods: {
      
        modalClose(){
          this.dialog = false
          this.$refs.form.resetValidation()
          this.state=''
          this.name=''
          this.email=''
          this.endDay=''
          this.address=''
          this.tel=''
          EventBus.$emit("HyperVisonClean",(true))
          },
        saveClick() {
          if(this.mode === 'post'){
            axios.post('/api/company/userAdd', {
                name : this.name,
                companyId : this.cId,
                address : this.address,
                tel : this.tel,
                expiredDate : this.endDay,
                devices : this.select,
                state : this.state,
                email : this.email
            })
            .then((r) => {
              EventBus.$emit("SaveItem",'user',r)
            })
            .catch((e) => {
                console.error(e.message)
            })
          }
          else if(this.mode === 'put'){
              axios.put('/api/company/user', {
                branchId : this.branchId,
                name : this.name,
                busNumber : this.business,
                address : this.address,
                tel : this.tel,
                expiredDate : this.date,
                devices : this.select
              })
              .then((r) => {
                  EventBus.$emit("EditItem",('user'))
              })
              .catch((e) => {
                  console.error(e.message)
              })
          }
        },
     
    },
  }
</script>

