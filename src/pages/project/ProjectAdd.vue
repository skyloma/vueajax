<template>

    <el-form ref="form" :model="project" label-width="100px">
      <el-form-item label="项目名称">
        <el-input v-model="project.name"></el-input>
      </el-form-item>
      <el-form-item label="版本">
        <el-input v-model="project.vesion"></el-input>
      </el-form-item>


      <el-form-item label="包含子项目">


        <el-checkbox label="PC"  v-model="project.pc"></el-checkbox>
        <el-checkbox label="Android"  v-model="project.android"></el-checkbox>
        <el-checkbox label="IOS"  v-model="project.ios"></el-checkbox>

      </el-form-item>

      <el-form-item label="描述">
        <el-input type="textarea" v-model="project.description"></el-input>


      </el-form-item>
      <el-form-item label="API测试地址">
        <el-input type="text" v-model="project.testURL"></el-input>
      </el-form-item>

      <el-form-item label="API部署地址">
        <el-input type="text" v-model="project.devURL"></el-input>
      </el-form-item>
      <el-form-item label="源文件仓库">
        <el-input type="text" v-model="project.src_vsc"></el-input>
      </el-form-item>
      <el-form-item label="开始开发日期">

        <el-date-picker
          v-model="project.endDate"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions0">
        </el-date-picker>
      </el-form-item>
      <el-form-item lable="图标">
        <el-upload

          multiple="false"
          :action="this.upload_url"
          :on-success="successUpload"
          :file-list="fileList"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>


        </el-upload>


        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="onEditSubmit" :loading="addLoading" v-if="project.id">保存</el-button>
        <el-button type="primary" @click="onSubmit" :loading="addLoading" v-else>立即创建</el-button>
      </el-form-item>
    </el-form>




</template>
<script>
  import   api from "../../api"
  import   http from "../../http"
  export default {
    data() {
      return {
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        dialogImageUrl: '',
        dialogVisible: false,
        upload_url: http.baseURL()+api.UPLOAD_URL,
        addLoading: false,
        fileList: [],
        project: {
          id: null,
          date: null,
          description: "",
          icon: "",
          name: "",
          progress: 0,
          vesion: "",
          type: "",
          moudles: [],
          testURL: "",
          src_vsc: "",
          endDate: "",
          devURL: "",
          pc:true,
          ios:true,
          android:true



        }
      }
    },


    methods: {

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
      onSubmit() {
        this.addLoading = true
        http.post(api.PROJECT_SAVE, this.project)
          .then(res => {

            this.project = res
            this.addLoading = false
            this.$router.push("/PROJECT_LIST")
          })
      },
      loadProject(projectId) {
        http.post(api.PROJECT_ID, {id: projectId})
          .then(res => {
            console.log(JSON.stringify(res))
            this.project = res

          })

      },
      onEditSubmit() {

        this.addLoading = true

        http.post(api.PROJECT_UPDATE, this.project)
          .then(res => {
            this.project = res
            this.addLoading = false
            this.$router.push("/PROJECT_LIST")

          })
      },

      successUpload(response, file, fileList) {
        this.project.icon = response.Content[0]
      }


    },

    created() {
      if (this.$route.path === "/projectAdd") {

      } else {
        if (this.$route.query && this.$route.query.projectId !== null) {
          let projectId = this.$route.query.projectId
          this.loadProject(projectId)
        }
      }


    },
  }
</script>
