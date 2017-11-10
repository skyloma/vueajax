<template>
  <div slot="body">
    <el-form ref="form" :model="bug" label-width="100px" >


      <el-form-item label="所属模块">
        <el-input  v-model="bug.moudle.name" readonly="true"></el-input>

      </el-form-item>
      <el-form-item label="问题描述">
        <el-input type="textarea" v-model="bug.description"></el-input>

      </el-form-item>
      <el-form-item label="bug等级">

        <el-radio-group v-model="bug.grade">
     <el-radio label="致命"></el-radio>
          <el-radio label="严重"></el-radio>
          <el-radio label="打开的"></el-radio>
          <el-radio label="一般"></el-radio>
          <el-radio label="提示"></el-radio>

        </el-radio-group>
      </el-form-item>
      <el-form-item label="bug状态">
        <el-radio-group v-model="bug.state">
          <el-radio label="新bug"></el-radio>
          <el-radio label="已指派的"></el-radio>
          <el-radio label="打开的"></el-radio>
          <el-radio label="未复测"></el-radio>
          <el-radio label="复测没问题已关闭的"></el-radio>
          <el-radio label="复测出现问题再次打开的"></el-radio>
          <el-radio label="被拒绝的"></el-radio>
          <el-radio label="延期的"></el-radio>
        </el-radio-group>
      </el-form-item>


      <el-form-item lable="图标">
        <el-upload
          class="upload-demo"
          drag
          :action="upload_url"
          :on-success="successUpload"
          :file-list="fileList"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>

      </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="onEditSubmit" :loading="addLoading" v-if="bug.id">保存</el-button>
        <el-button type="primary" @click="onSubmit" :loading="addLoading" v-else>立即创建</el-button>
      </el-form-item>
    </el-form>

  </div>


</template>
<script>
  import  api from "../../api"
  import   http from "../../http"
  export default {
    data() {
      return {

        upload_url:api.UPLOAD_URL,

        optionMoudle: [],
        addLoading: false,

        fileList: [],
        bug: {
          moudle:{},
          id: null,
          picUrl: null,
          description: "",
          note: "",
          grade: "",
          state: "",


        }
      }
    },


    methods: {




      loadbug(bugId) {
        console.log('bugId' + bugId)
        http.post(api.BUG_ID, {id: bugId})
          .then(res => {
            console.log(JSON.stringify(res))
            this.bug =res

          })

      },
      onEditSubmit() {

        this.addLoading = true

         http.post(api.BUG_UPDATE, this.bug)
          .then(res => {
            this.bug =res
            this.addLoading = false
            this.$router.push("/bugList")

          })
      },

      successUpload(response, file, fileList) {
        console.log(JSON.stringify(response))
        console.log(response.Content[0])
        this.bug.picUrl = response.Content[0]
      },


    },

    created() {
        if (this.$route.query && this.$route.query.bugId !== null) {
          let bugId = this.$route.query.bugId
          this.loadbug(bugId)
        }



    }


  }
</script>
