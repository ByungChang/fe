<template>
    
    <v-form
      ref="form"
      v-model="valid"
    >
        <!-- <v-dialog v-model="dialog" persistent scrollable max-width="600px"  > -->
        <v-dialog v-model="dialog" scrollable max-width="600px">
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
        label="사용자명*"
        required
      ></v-text-field>
    </v-col>
 
    <v-col cols="12">
      <v-select
         v-model="status"
        :items="actitems"
         label="활성화 여부*"
         >
      </v-select>
    </v-col>
 
    <v-col cols="12">
      <v-text-field
        v-model="email"
        :counter="20"
        :rules="emailRules"
        label="이메일*"
        required
      ></v-text-field>
    </v-col>


     <v-col cols="12">
      <v-text-field
        v-model="hv"
        :counter="20"
        label="HyperVison*"
        required
      ></v-text-field>
    </v-col>
 
    <v-col cols="12">
      <v-text-field
        v-model="address"
        :counter="30"
        :rules="addressRules"
        label="주소*"
        required
      ></v-text-field>
    </v-col>
 
    <v-col cols="12">
      <v-text-field
        v-model="tel"
        :counter="12"
        :rules="telRules"
        label="연락처*"
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
            prepend-icon="mdi-calendar"
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
    placeholder="사진 추가"
    prepend-icon="mdi-camera"
    label="사진"
  ></v-file-input>
    </v-col>
    <v-spacer></v-spacer>
 
 
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
         <v-btn
         :disabled="valid"
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
import AlertSnackBar from './AlertSnackBar'


  export default {
      components:{
      AlertSnackBar
      },
    data: () => ({
      //endDay: new Date().toISOString().substr(0, 10),
      formTitle:'',
      menu: false,
      dialog: false,
      valid: true,
      select: null,
      status: '',
      picture: null,   
      readonly: true,
    
      name: '',
      nameRules: [
        v => !!v || '사용자명을 입력해주세요',
        v => (v && v.length <= 20) || '20글자 초과 하실 수 없습니다.',
      ],
 
      email: '',
      emailRules: [
        v => !!v || 'E-mail을 입력해주세요',
        v => /.+@.+\..+/.test(v) || '잘못된 형식의 이메일 입니다',
        v => (v && v.length <= 20) || '20글자 초과 하실 수 없습니다.',
      ],
      imgRules: [
         value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
      hv:'',
      
      
    endDay: '',
      endDayRules:[
      v => !!v || '만료일을 입력해주세요',
      ],
    //   business: '',
    //   businessRules: [
    //     v => !!v || '사업자번호를 입력해주세요',
    //     v => (v && v.length <= 20) || '20글자 초과 하실 수 없습니다.',
    //   ],
 
      address: '',
      addressRules: [
        v => !!v || '주소를 입력해주세요',
        v => (v && v.length <= 30) || '30글자 초과 하실 수 없습니다.',
      ],

      address: '',
      addressRules: [
        v => !!v || '주소를 입력해주세요',
        v => (v && v.length <= 30) || '30글자 초과 하실 수 없습니다.',
      ],
 
      tel: '',
      telRules: [
        v => !!v || '연락처 입력해주세요',
        v => (v && v.length <= 12) || '12글자 초과 하실 수 없습니다.',
      ],
 
 
    //   items: [
    //     'hv-1', 'hv-2', 'hv-3', 'hv-4', 'hv-5', 'hv-6', 'hv-7', 'hv-8'
    //   ],
        actitems: [
        'active', 'block'
      ],
    }),
    mounted(){
        EventBus.$on("userAdd", (what) => {
     
            if(what==='userAdd')
            {
                this.formTitle='사용자 추가'
            }
            if(what==='userEdit')
            {
                this.formTitle='사용자 정보 수정'
            }
             this.dialog = true;
         });
         EventBus.$on("userEditInfo",(item) => {
            this.name=item.userName
            this.status=item.status
            this.endDay=item.endDay
            this.email=item.userEmail
            console.log(this.name)
         });
        },
       methods: {
      
        modalClose(){
          this.dialog = false
          this.$refs.form.reset()
          this.$refs.form.resetValidation()
          },
        saveClick() {
          EventBus.$emit("SaveItem",('user'))
          },
     
    },
  }
</script>

