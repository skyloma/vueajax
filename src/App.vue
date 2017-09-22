<template>
  <div id="app">


    <mu-appbar title="Title" :class="open ? 'example-appbar' : 'example-appbar   nav-hide' ">
      <mu-icon-button icon="menu" slot="left" @click="toggle()"/>
      <mu-flat-button label="expand_more" slot="right" @click="showmsg( )"/>
      <mu-icon-button icon="expand_more" slot="right"/>
    </mu-appbar>

    <mu-drawer :open="open" :docked="docked" @close="toggle()" :overlay="open">
      <mu-appbar title="项目管理平台">

      </mu-appbar>

      <mu-list>
        <mu-list-item v-for="item in menus" :title="item.title" :to="item.herf"/>
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

  export default {
    name: 'app',
    data() {
      return {
        open: true,
        docked: true,

        menus: [
          {
            'title': 'Home',
            'herf': 'Home'
          }, {
            'title': 'Settings',
            'herf': 'Settings'
          },
          {
            'title': 'Todo',
            'herf': 'Todo'
          },
          {
            'title': 'About',
            'herf': 'About'
          }
          ,
          {
            'title': '项目列表',
            'herf': 'ProjectList'
          }
          ,
          {
            'title': '项目列表',
            'herf': 'Msg'
          }
        ]
      }
    },
    methods: {
      test() {
        // http.get("department/list",{})
      },
      toggle(flag) {

        this.open = !this.open
        this.docked = !flag
      }
      , showmsg() {
        this.$message('')
      }


    },

//    created() {
//
//
//      var json={
//        username: 'zjt',
//        pwd: '123'}
//        this.$http.postForm('user/login',json)
//        .then(response => {
//          alert(JSON.stringify(response.data.Content.username))
//        })
//        .catch(e => {
//          // this.errors.push(e)
//        })
//
//    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
