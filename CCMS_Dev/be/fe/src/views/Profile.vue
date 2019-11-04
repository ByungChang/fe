<template>
  <v-card
    max-width="375"
    class="mx-auto"
  >
    <v-img
      src="https://cdn.vuetifyjs.com/images/lists/ali.png"
      height="300px"
      dark
    >
    <v-row justify="end">
        <v-card-title>
          <v-btn dark icon class="mr-4">
            <v-icon>mdi-pencil</v-icon>
            편집
          </v-btn>
        </v-card-title>
    </v-row>
    </v-img>

    <v-list >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>이름: (650) 555-1234</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      
    </v-list>
  </v-card>
</template>
<script>
export default {

  data(){
    return{

    }
  }


}
</script>