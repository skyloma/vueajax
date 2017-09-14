<template>
  <div>
  <mu-appbar title="Title" :class="open ? 'example-appbar' : 'example-appbar   nav-hide' "   >
    <mu-icon-button icon="menu" slot="left" @click="toggle()" />
    <mu-flat-button label="expand_more" slot="right"/>
    <mu-icon-button icon="expand_more" slot="right"/>
  </mu-appbar>

    <mu-drawer :open="open" :docked="docked" @close="toggle()">
      <mu-list  >
        <mu-list-item  v-for="item in menus"  :title="item.title" :to="item.herf"/>
      </mu-list>
    </mu-drawer>

    <div :class="open ? 'example-content': 'example-content nav-hide '">

      <router-view></router-view>


    </div>

  </div>

</template>

<script>

  export default {
    name: 'hello',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        open: true,
        docked: false,
        about:'about',
        menus:[
          {
            'title':'Home',
            'herf':'Home'
          }, {
            'title':'Settings',
            'herf':'Settings'
          },
          {
            'title':'Todo',
           'herf' :'Todo'
          },
          {
            'title':'About',
            'herf' :'About'
          }
        ]
      }
    },
    methods: {
      test() {
       // http.get("department/list",{})
      },
      toggle (flag) {
        this.open = !this.open
        this.docked = !flag
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
    -webkit-transition: all .45s cubic-bezier(.23,1,.32,1);
    transition: all .45s cubic-bezier(.23,1,.32,1);
  }
  .exmaples-nav-appbar.mu-appbar {
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
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
    -webkit-transition: all .45s cubic-bezier(.23,1,.32,1);
    transition: all .45s cubic-bezier(.23,1,.32,1);
  }
  .example-content.nav-hide {
    padding-left: 0;
  }
  .example-appbar.nav-hide {
    left: 0;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
