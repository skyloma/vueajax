<template>
  <div>
    <el-row :gutter="2">
      <el-col :span="2">
        <img width="100px" height="100px" :src="icon"/>
      </el-col>
      <el-col :span="22">
        <el-form ref="form" :model="project" label-width="80px">
          <el-row :gutter="2">
            <el-col :span="8">
              <el-form-item label="项目名称">
                <el-input readonly v-model="project.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="版本">
                <el-input v-model="project.vesion" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="项目类型">
                <el-input v-model="project.type" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="描述">
            <el-input type="textarea" readonly v-model="project.description"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    　<!--工具条-->
    <el-col :span="18" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <div  >
            <el-input placeholder="请输入模块/接口" v-model="input5">
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="模块" value="1"></el-option>
                <el-option label="接口" value="2"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" v-if="user.role.eName=='project_manager'" @click="newAdd">新增功能模块
          </el-button>
        </el-form-item>

        <el-form-item>
          <el-upload
            class="upload-demo"
            :data="this.project"
            :file-list="fileList"
            :action="upload_url"
            :on-success="successUpload"
            :before-upload="reUpload"

          >

            <el-button icon="el-icon-download" :loading="loading" v-if="user.role.eName==='project_manager'">Excel导入
            </el-button>
          </el-upload>


        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-upload2" @click="export2excel">Excel导出</el-button>
        </el-form-item>
      </el-form>


    </el-col>
    <el-table
      :data="pageMoudles"
      style="width:100%"
      border
      :default-sort="{prop: 'num', order: 'descending'}"
      :row-class-name="tableRowClassName">

      <el-table-column type="expand"


      >

        <template scope="props">

          <div v-html="props.row.description"></div>


        </template>
      </el-table-column>
      <el-table-column
        prop="num"
        label="#"
        sortable
        width="60">
      </el-table-column>
      <el-table-column
        prop="name"
        label="模块"
        width="180">
      </el-table-column>

      <el-table-column
        label="接口"
        width="180">
        <template scope="scope">
          <el-button v-if="scope.row.api" @click="openApi(scope.$index, scope.row)" type="text">查看api</el-button>

        </template>

      </el-table-column>
      <el-table-column

        width="180"
        label="PC">

        <template scope="scope">
          <el-button v-if="scope.row.pcUI" @click="openPic1(scope.$index, scope.row)" type="text">查看设计图</el-button>
          <el-button v-if="scope.row.pcRes" @click="openRes1(scope.$index, scope.row)" type="text">下载</el-button>
        </template>

      </el-table-column>

      <el-table-column

        width="180"
        label="Android">

        <template scope="scope">
          <el-button v-if="scope.row.androidUI" @click="openPic2(scope.$index, scope.row)" type="text">查看设计图</el-button>
          <el-button v-if="scope.row.androidRes" @click="openRes2(scope.$index, scope.row)" type="text">下载</el-button>
        </template>

      </el-table-column>

      <el-table-column

        width="180"
        label="IOS">

        <template scope="scope">
          <el-button v-if="scope.row.iosUI" @click="openPic3(scope.$index, scope.row)" type="text">查看设计图</el-button>
          <el-button v-if="scope.row.iosRes" @click="openRes3(scope.$index, scope.row)" type="text">下载</el-button>
        </template>

      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        min-width="100">
        <template scope="scope">
          <!--<span> <el-button type="danger" icon="delete" @click="batchDelete" v-if="user.role.eName=='project_manager'">删除</el-button></span>-->
          <span>
            <el-button type="primary"   icon="edit"   @click="editClick(scope.$index, scope.row)"
                       v-if="user.role.eName=='project_manager'">编辑</el-button>
          </span>
          <!--<span>-->
          <!--<el-button  size="small" @click="readClick(scope.$index, scope.row)">详情</el-button>-->
          <!--</span>-->

          <span>
            <el-button  type="danger"   @click="uiClick(scope.$index, scope.row)"
                        v-if="user.role.eName=='UI'">UI管理</el-button>
          </span>

          <span>
            <el-button  type="danger"    @click="apiClick(scope.$index, scope.row)"
                        v-if="user.role.eName=='API_dev'">编辑API</el-button>
          </span>
          <!--<span>-->
          <el-button  type="danger"   @click="reportClick(scope.$index, scope.row)"
                      v-if="user.role.parent!==null&&user.role.parent.eName=='Coder'">提交工作报告
          </el-button>
          <!--</span>-->
        </template>
      </el-table-column>


    </el-table>


    <br/>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pagination.pageNo"
      :page-size="pagination.pageSize"
      layout="total, prev, pager, next"
      :total="moudles.length">
    </el-pagination>


  </div>


</template>
<script>
  import   api from "../../api"
  import {mapGetters} from 'vuex'
  import http from "../../http"

  export default {
    data() {
      return {
        icon: "",
        filters: {name: ""},
        input5: '',
        select: '',
        upload_url: http.baseURL()+api.UPLOAD_EXCEL_URL,
        pagination: {
          total: 0,
          pageNo: 1,
          pageSize: 10,
          parentId: 0
        },
        fileList: [],
        loading: false,
        moudles: [],
        pageMoudles: [],
        project: {
          "id": null,
          "date": null,
          "description": "",
          "icon": "",
          "name": "",
          "progress": 0,
          "vesion": "",
          "type": "",

        }
      }
    },


    methods: {
      export2excel() {

        const {export_json_to_excel} = require('vendor/Export2Excel')
        const tHeader = ['序号', '模块', '说明',]
        const filterVal = ['num', 'name', 'description']

        const data = this.formatJson(filterVal, this.moudles)
        export_json_to_excel(tHeader, data, '列表excel')

      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      handleSizeChange(val) {
        this.pagination.pageSize = val;
//        this.loadData();
      },
      handleCurrentChange(val) {
        this.pagination.pageNo = val;
        this.pageMoudles = this.moudles.slice((val - 1) * 10, (val) * 10)

      },

      openPic1(index, row) {

        window.open(http.baseURL() + "/" + row.pcUI, "_blank", "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=yes")
      },
      openRes1(index, row) {

        window.open(http.baseURL() + "/" + row.pcRes, "_blank", "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=yes")
      },
      openPic2(index, row) {

        window.open(http.baseURL() + "/" + row.androidUI, "_blank", "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=yes")
      },
      openRes2(index, row) {

        window.open(http.baseURL() + "/" + row.androidRes, "_blank", "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=yes")
      },
      openPic3(index, row) {

        window.open(http.baseURL() + "/" + row.iosUI, "_blank", "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=yes")
      },
      openRes3(index, row) {

        window.open(http.baseURL() + "/" + row.iosRes, "_blank", "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=yes")
      },

      openApi(index, row) {
        this.$router.push({
          path: '/moudleApiRead',
          query: {
            moudleId: row.id
          }
        })
      },
      tableRowClassName(row, index) {
        if (row.api && row.res && row.ui) {
          return 'info-row'
        } else {
          return ''
        }

      },
      newAdd() {
        this.$router.push({
          path: '/moudleAdd',
          query: {
            projectId: this.project.id
          }
        })
      },
      loadProject(projectid) {
        http.post(api.PROJECT_ID, {id: projectid})
          .then(res => {

            this.project =res
            this.icon = http.baseURL() + "/" + this.project.icon
          })

      },
      loadMoudles(projectid) {
        http.post(api.MOUDLE_BY_PROJECTID, {id: projectid})
          .then(res => {

            this.moudles =res
            this.pageMoudles = this.moudles.slice(0, 10)
          })

      },


      editClick(index, row) {
        // console.log(index, row);
        this.$router.push({
          path: '/moudleEdit',
          query: {
            moudleId: row.id
          }
        })
      },
      uiClick(index, row) {

        this.$router.push({
          path: '/ui',
          query: {
            moudleId: row.id
          }
        })
      },

      apiClick(index, row) {

        this.$router.push({
          path: '/moudleApi',
          query: {
            moudleId: row.id
          }
        })
      },
      reportClick(index, row) {

        this.$router.push({
          path: '/coderReprot',
          query: {
            moudleId: row.id
          }
        })
      },
      successUpload(response, file, fileList) {
        this.loadMoudles(this.project.id)
        this.loading = false

      },
      reUpload(file) {
//        this.$message.error( file.type);
        this.loading = true
        const isXsl = file.type === 'application/x-zip-compressed' || 'application/x-rar-compressed';


        if (!isXsl) {
          this.$message.error('只能上传Execl格式!');
        }

        return isXsl;
      },
    },

    computed: {
      ...mapGetters({
        user: 'userInfo'

      })
    },
    created() {
      if (this.$route.query && this.$route.query.projectId !== null) {

        this.project.id = this.$route.query.projectId
        this.loadProject(this.project.id)
        this.loadMoudles(this.project.id)
      }


    },
  }
</script>
<style>
  .el-table .info-row {
    background: #c9e5f5;
  }

  .el-table .positive-row {
    background: #e2f0e4;
  }
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
