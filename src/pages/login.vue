<template>
  <div  class="center"  >
    <mu-text-field hintText="账号" type="text" icon="person"/><br/>
    <mu-text-field hintText="密码" type="text" icon="lock"/><br/>
    <mu-checkbox label="记住我"  /> <br/>
    <mu-raised-button label="登录"  ref="button"@click="login" primary fullWidth />
  </div>
</template>

<script>
  import   types from '../store/mutation-types'
  import {  mapMutations} from 'vuex'

  export default {
    data () {
      return {
        value: '默认文字'
      }

    },
    methods:{
      login(){
        this.http.post ( this.api.LOGIN,{username:'l' ,pwd:'123456'})
          .then(data=>{
            var redirectUrl = '/index';
            if (this.$router.query && this.$router.query != null && this.$router.query.redirect && this.$router.query.redirect != null) {
              redirectUrl = this.$router.query.redirect;
            }
            this.setUserInfo(data)
            this.auth.setUserInfo(data);
            this.$router.push({path: redirectUrl});

          })


      },
      ...mapMutations({
        setUserInfo: types.SET_USER_INFO,

      }),

    }
  }
</script>

<style  >

  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }

</style>
