<template>
  <div slot="body">
    <el-form ref="form" :model="form" label-width="80px">

      <el-form-item lable="Icon">
        <h3>PC端</h3>
        <hr/>
        <br/>

        <el-row :gutter="10">
          <el-col :span="12">

            <el-upload
              class="upload-demo"
              drag
              :action="upload_url"
              :on-success="successUpload1"
              :file-list="fileList"

            >
              <img width="100px" height="100px" :src="this.pcUI" v-if="this.pcUI" style="margin: 24px"/>
              <i class="el-icon-upload" v-else="this.pcUI"></i>
              <div class="el-upload__text"><em><h2>PC设计图</h2></em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>

          </el-col>
          <el-col :span="12">

            <el-upload
              class="upload-demo"
              drag
              :action="upload_url"
              :on-success="successUpload2"
              :file-list="fileList"

            >
              <img width="100px" height="100px" :src="this.pcRes" v-if="this.pcRes" style="margin: 24px"/>
              <i class="el-icon-upload" v-else="this.pcRes"></i>
              <div class="el-upload__text"><em><h2>PC切图资源</h2></em></div>
              <div class="el-upload__tip" slot="tip">只能上传zip/rar文件，且不超过500kb</div>
            </el-upload>

          </el-col>


        </el-row>


      </el-form-item>

      <el-form-item lable="Icon">
        <h3>Android端</h3>
        <hr/>
        <br/>

        <el-row :gutter="10">
          <el-col :span="12">

            <el-upload
              class="upload-demo"
              drag
              :action="upload_url"
              :on-success="successUpload3"
              :file-list="fileList"

            >
              <img width="100px" height="100px" :src="this.androidUI" v-if="this.androidUI" style="margin: 24px"/>
              <i class="el-icon-upload" v-else="this.androidUI"></i>
              <div class="el-upload__text"><em><h2>Android设计图</h2></em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>

          </el-col>
          <el-col :span="12">

            <el-upload
              class="upload-demo"
              drag
              :action="upload_url"
              :on-success="successUpload4"
              :file-list="fileList"

            >
              <img width="100px" height="100px" :src="this.androidRes" v-if="this.androidRes" style="margin: 24px"/>
              <i class="el-icon-upload" v-else="this.androidRes"></i>
              <div class="el-upload__text"><em><h2>Android切图资源</h2></em></div>
              <div class="el-upload__tip" slot="tip">只能上传zip/rar文件，且不超过500kb</div>
            </el-upload>

          </el-col>


        </el-row>


      </el-form-item>

      <el-form-item lable="Icon">
        <h3>IOS端</h3>
        <hr/>
        <br/>

        <el-row :gutter="10">
          <el-col :span="12">

            <el-upload
              class="upload-demo"
              drag
              :action="upload_url"
              :on-success="successUpload5"
              :file-list="fileList"

            >
              <img width="100px" height="100px" :src="this.iosUI" v-if="this.iosUI" style="margin: 24px"/>
              <i class="el-icon-upload" v-else="this.iosUI"></i>
              <div class="el-upload__text"><em><h2>IOS设计图</h2></em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>

          </el-col>
          <el-col :span="12">

            <el-upload
              class="upload-demo"
              drag
              :action="upload_url"
              :on-success="successUpload6"
              :file-list="fileList"

            >
              <img width="100px" height="100px" :src="this.iosRes" v-if="this.iosRes" style="margin: 24px"/>
              <i class="el-icon-upload" v-else="this.iosRes"></i>
              <div class="el-upload__text"><em><h2>IOS切图资源</h2></em></div>
              <div class="el-upload__tip" slot="tip">只能上传zip/rar文件，且不超过500kb</div>
            </el-upload>

          </el-col>


        </el-row>


      </el-form-item>

      <el-form-item>

        <el-button type="primary" @click="onSubmit" :loading="addLoading">保存</el-button>
      </el-form-item>
    </el-form>

  </div>


</template>
<script>
  import * as api from "../../api"
  import   http from "../../http"
  export default {
    data() {
      return {
        upload_url: api.UPLOAD_URL,
        fileList: [],

        iosUI: "",
        androidUI: "",
        pcUI: "",
        iosRes: "",
        androidRes: "",
        pcRes: "",

        addLoading: false,
        form: {
          name: "",
          description: "",
          num: "",
          iosUI: "",
          androidUI: "",
          pcUI: "",
          iosRes: "",
          androidRes: "",
          pcRes: "",
        },

      }
    },


    methods: {

      reUpload(file) {

        const isJPG = file.type === 'application/x-zip-compressed' || 'application/x-rar-compressed';
        const isLt20M = file.size / 1024 / 1024 < 20;

        if (!isJPG) {
          this.$message.error('只能上传zip,rar压缩包格式!');
        }
        if (!isLt20M) {
          this.$message.error('只能上传大小不能超过 20MB的文件!');
        }
        return isJPG && isLt20M;
      },
      onSubmit() {

        console.log('submit!' + JSON.stringify(this.form))
         http.post(api.MOUDLE_SAVE, this.form)
          .then(res => {
            console.log(JSON.stringify(res))


            this.$router.go(-1)

          })
      },
      loadMoudle(moudleId) {
         http.post(api.MOUDLE_ID, {id: moudleId})
          .then(res => {
            console.log(JSON.stringify(res))
            this.form =res
//            this.ui = api.CONTEXT + "/" + this.form.ui
//            this.res = api.CONTEXT + "/" + this.form.res

          })

      },

      successUpload1(response, file, fileList) {
        console.log(JSON.stringify(response))
        console.log(response.Content[0])
        this.form.pcUI = response.Content[0];
        this.pcUI = api.CONTEXT + "/" + response.Content[0]
      },
      successUpload2(response, file, fileList) {
        console.log(JSON.stringify(response))
        console.log(response.Content[0])
        this.form.pcRes = response.Content[0];
        this.pcRes = api.CONTEXT + "/" + response.Content[0]

      },
      successUpload3(response, file, fileList) {
        console.log(JSON.stringify(response))
        console.log(response.Content[0])
        this.form.androidUI = response.Content[0];
        this.androidUI = api.CONTEXT + "/" + response.Content[0]
      },
      successUpload4(response, file, fileList) {
        console.log(JSON.stringify(response))
        console.log(response.Content[0])
        this.form.androidRes = response.Content[0];
        this.androidRes = api.CONTEXT + "/" + response.Content[0]

      }, successUpload5(response, file, fileList) {
        console.log(JSON.stringify(response))
        console.log(response.Content[0])
        this.form.iosUI = response.Content[0];
        this.iosUI = api.CONTEXT + "/" + response.Content[0]
      },
      successUpload6(response, file, fileList) {
        console.log(JSON.stringify(response))
        console.log(response.Content[0])
        this.form.iosRes = response.Content[0];
        this.iosRes = api.CONTEXT + "/" + response.Content[0]

      }

    },

    created() {
      if (this.$route.query && this.$route.query.moudleId !== null) {
        let moudleId = this.$route.query.moudleId
        this.loadMoudle(moudleId)
      }


    },
  }
</script>
