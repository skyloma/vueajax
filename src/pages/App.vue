<template>
  <div id="app" class="app">

    <mu-appbar title="Title" :class="open ? 'example-appbar' : 'example-appbar   nav-hide' ">
      <mu-icon-button icon="menu" slot="left" @click="toggle()"/>

      <mu-badge slot="right" class="demo-icon-badge" content="12" circle secondary>
        <mu-icon-button icon="notifications"/>
      </mu-badge>
      <mu-icon-button icon="expand_more" slot="right" ref="expand_more" @click="rightToggle()"/>
      <mu-popover :trigger="trigger" :open="rightOpen" @close="handleClose">
      <mu-menu >
        <mu-menu-item title="Settings" />
        <mu-menu-item title="Help" />
        <mu-menu-item title="Sign out" @click="logout()"/>
      </mu-menu>
      </mu-popover>
    </mu-appbar>

    <mu-drawer :open="open" :docked="docked" @close="toggle()" :overlay="open">
      <mu-appbar title="项目管理平台">

      </mu-appbar>

      <mu-list>
        <mu-list-item v-for="item in userInfo.role.menus" :title="item.name" :to="item.href"   >
          <mu-icon slot="left" :value="item.icon"/>
        </mu-list-item>
      </mu-list>
    </mu-drawer>

    <div :class="open ? 'example-content': 'example-content nav-hide '">
      <div class="content-wrapper">
        <router-view></router-view>
      </div>


    </div>

  </div>

</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import types from "@/store/mutation-types"
  export default {
    name: 'app',
    data() {
      return {
        open: true,
        rightOpen:false,
        trigger:null,
        docked: true,

      }
    },
    mounted(){
      this.trigger=this.$refs.expand_more.$el
    },
    computed: mapGetters({
      userInfo: 'userInfo',

    }),
    methods: {
      ...mapMutations({
        setUserInfo: types.SET_USER_INFO,
      }),

      rightToggle () {
        this.rightOpen = !this.rightOpen
      },
      handleClose (e) {
        this.rightOpen = false
      },
      toggle(flag) {

        this.open = !this.open
        this.docked = !flag
      }
      , showmsg() {
        this.$message('ddddddddddddddddddddddddddddd')
      }
      , logout() {
        this.auth.logout();
        this.$router.push("/login")
      }

    },

    created() {
      let item = this.auth.getUserInfo()
      if (!!item){
        this.setUserInfo(item);
      }else {
        this.$router.push("/login")
      }


    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .app{
    background-color: #ddd;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;

  }
  .demo-badge-container{
    padding-top: 24px;
  }
  .demo-icon-badge {
    padding: 0px;
    margin-right: 0px;
  }
  .example-appbar {
    position: fixed;
    left: 256px;
    right: 0;
    top: 0;
    width: auto;
    -webkit-transition: all .45s cubic-bezier(.23, 1, .32, 1);
    transition: all .45s cubic-bezier(.23, 1, .32, 1);
  }

  .exmaples-nav-appbar.mu-appbar {
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;

  }

  .demo-popup-top {
    width: 100%;
    opacity: .8;
    height: 48px;
    line-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 375px;
  }

  .content-wrapper {
    padding: 48px 72px;
    width: 100%;

    height: 100%;

  }

  .exmaples-appbar-title {
    color: inherit;
    display: inline-block;
  }

  .exmaple-drawer-content {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .example-content {
    padding-top: 56px;
    padding-left: 256px;
    -webkit-transition: all .45s cubic-bezier(.23, 1, .32, 1);
    transition: all .45s cubic-bezier(.23, 1, .32, 1);

  }

  .example-content.nav-hide {
    padding-left: 0;
  }

  .example-appbar.nav-hide {
    left: 0;
  }


</style>
