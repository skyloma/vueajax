<template>
  <mu-card>


    <div>
      <mu-raised-button label="点这里" ref="button" @click="toggle"/>
      <mu-popover :trigger="trigger" :open="open" @close="handleClose">
        <mu-menu>
          <mu-menu-item title="Refresh"/>
          <mu-menu-item title="Send feedback"/>
          <mu-menu-item title="Settings"/>
          <mu-menu-item title="Help"/>
          <mu-menu-item title="Sign out"/>
        </mu-menu>
      </mu-popover>
    </div>

    <mu-card-header title="Myron Avatar" subTitle="sub title">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </mu-card-header>

    <mu-card-text>
      <mu-flexbox>
        <mu-flexbox-item>
          <mu-text-field label="项目名称" labelFloat fullWidth/>

        </mu-flexbox-item>
        <mu-flexbox-item>
          <mu-text-field label="版本" fullWidth labelFloat type='number'/>

        </mu-flexbox-item>
      </mu-flexbox>
      <mu-flexbox>
        <mu-flexbox-item>
          <mu-text-field label="API测试地址" labelFloat fullWidth/>

        </mu-flexbox-item>
        <mu-flexbox-item>
          <mu-text-field label="API部署地址" fullWidth labelFloat/>

        </mu-flexbox-item>
        <mu-flexbox-item>
          <mu-text-field label="源文件仓库" labelFloat fullWidth/>
        </mu-flexbox-item>
      </mu-flexbox>

      <mu-flexbox>
        <mu-flexbox-item>
          <mu-flexbox>
            <mu-flexbox-item>
              <b>包含子项目</b>

            </mu-flexbox-item>
            <mu-flexbox-item>
              <mu-checkbox label="android" uncheckIcon="android" checkedIcon="android"/>
            </mu-flexbox-item>
            <mu-flexbox-item>
              <mu-checkbox label="ios" uncheckIcon="phone_iphone" checkedIcon="phone_iphone"/>
            </mu-flexbox-item>
            <mu-flexbox-item>
              <mu-checkbox label="pc" uncheckIcon="desktop_windows" checkedIcon="desktop_windows"/>
            </mu-flexbox-item>
          </mu-flexbox>

        </mu-flexbox-item>
        <mu-flexbox-item>
        </mu-flexbox-item>
      </mu-flexbox>

      <mu-text-field label="简介" multiLine :rows="3" :rowsMax="6" labelFloat fullWidth/>
    </mu-card-text>


  </mu-card>


</template>

<script>
  export default {
    data() {
      return {
        open: false, dialogImageUrl: '',
        dialogVisible: false,
        trigger: null
      }
    },
    mounted() {
      this.trigger = this.$refs.button.$el
    },
    methods: {
      toggle() {
        this.open = !this.open
      },
      handleClose(e) {
        this.open = false
      }
      ,handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
  }
</script>
