<template>
  <div> <h1>4555 </h1> </div>

</template>
<style>

</style>
<script>
//import {Toast}  from 'muse-ui'
//let  toast = new Toast()
export  default {

  name:'about',

  created() {

//    toast('dddddddd',1000)


    var json={
      username: 'zjt',
      pwd: '123'}
      this.$http.get('user/list')
      .then(response => {
        alert(JSON.stringify(response.data.Content))
      })
      .catch(e => {
        // this.errors.push(e)
      })

  }

}
</script>
