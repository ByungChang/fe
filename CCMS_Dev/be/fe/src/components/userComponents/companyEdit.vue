<template>
    <v-form
      ref="form"
      v-model="valid"
      :lazy-validation="lazy"
    >
        <!-- <v-dialog v-model="dialog" persistent scrollable max-width="600px"  > -->
        <v-dialog v-model="dialog"  max-width="600px">
      <template v-slot:activator="{ on }">
            <v-btn @click="btnClick" icon ><v-icon>mdi-square-edit-outline</v-icon></v-btn>
      </template>
      <v-card>
          <v-app-bar dark color="blue-grey">
        <v-card-title>
          <span>기업 회원 수정</span>
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
        required
      ></v-text-field>
    </v-col>
 
    <v-col cols="12">
      <v-select
         v-model="actselect"
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
 
    <v-col cols="12" >
      <v-select
         v-model="select"
        :items="items"
         label="Hypervision"
         multiple
         >
         <v-btn>
         </v-btn>
      </v-select>
    </v-col>

    <v-col cols="12">
      <v-text-field
        v-model="business"
        :counter="20"
        :rules="businessRules"
        label="사업자번호*"
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
            v-model="date"
            label="만료일"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker locale="ko"
 v-model="date" @input="menu = false"></v-date-picker>
      </v-menu>
    </v-col>
 
    <v-col cols="12" >
      <v-file-input
    :rules="imgRules"
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
         :disabled="!valid"
         color="success"
        @click="validate"
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
  export default {
    data: () => ({
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      dialog: false,
      valid: true,
      select: null,
      actselect: null,
      name: '',
      nameRules: [
        v => !!v || '기업명을 입력해주세요',
        v => (v && v.length <= 20) || '20글자 초과 하실 수 없습니다.',
      ],
 
      email: '',
      emailRules: [
        v => !!v || 'E-mail을 입력해주세요',
        v => /.+@.+\..+/.test(v) || '잘못된 형식의 이메일 입니다',
        v => (v && v.length <= 20) || '20글자 초과 하실 수 없습니다.',
      ],
      imagRules: [
         value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
      
 
      business: '',
      businessRules: [
        v => !!v || '사업자번호를 입력해주세요',
        v => (v && v.length <= 20) || '20글자 초과 하실 수 없습니다.',
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
 
 
      items: [
        'hv-1', 'hv-2', 'hv-3', 'hv-4', 'hv-5', 'hv-6', 'hv-7', 'hv-8'
      ],
        actitems: [
        'active', 'block'
      ],
    }),
 
    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
 
       modalClose(){
        this.dialog = false
        this.$refs.form.reset()
        this.$refs.form.resetValidation()
         
        },
        btnClick(){
            this.dialog=true
        }
     
    },
  }
</script>

