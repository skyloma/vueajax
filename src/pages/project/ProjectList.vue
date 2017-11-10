<template>
  <div slot="body">


    <h3 class="box-title" slot="header" style="width: 100%;">
      <el-button type="primary" icon="el-icon-plus" @click="newAdd" v-if="user.role.eName==='project_manager'">新增</el-button>
    </h3>
    <br/>

      <el-table
        :data="tableData"
        v-loading.body="loading"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          :formatter="dateFormat"
          label="创建日期"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
        >
        </el-table-column>
        <!--<el-table-column-->
        <!--prop="type"-->
        <!--label="项目类型"-->
        <!--&gt;-->
        <!--</el-table-column>-->
        <el-table-column
          prop="vesion"
          label="版本"
        >
        </el-table-column>

        <el-table-column
          prop="progress"
          label="完成进度"
        >
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="100">
          <template scope="scope">
            <!--<span> <el-button type="danger" icon="delete" @click="batchDelete">删除</el-button></span>-->
            <span>
            <el-button type="danger" plain icon="el-icon-edit"    v-if="user.role.eName=='project_manager'"  @click="editClick(scope.$index, scope.row)">编辑</el-button>
          </span>
            <span>
            <el-button type="primary"  icon="el-icon-info"  plain   @click="readClick(scope.$index, scope.row)">详情</el-button>
          </span>

          </template>
        </el-table-column>
      </el-table>


  </div>


</template>

<script>
  import api from "../../api"
  import moment from 'moment'
  import http from '../../http'

  import {mapGetters} from 'vuex'

  export default {

    computed: {
      ...mapGetters({
        user: 'userInfo'

      })
    },
    methods: {

      dateFormat: function (row, col) {
        let tempdate = row.date;
        if (tempdate == undefined) {
          return "";
        } else {

          return moment(tempdate).format("YYYY-MM-DD");

        }


      },
      readClick(index, row) {
        // console.log(index, row);
        this.$router.push({
          path: '/projectInfo',
          query: {
            projectId: row.id
          }
        })
      },

      editClick(index, row) {
        // console.log(index, row);
        this.$router.push({
          path: '/projectEdit',
          query: {
            projectId: row.id
          }
        })
      },
      newAdd() {
        this.$router.push('/projectAdd')
      },

      load() {
        this.loading=true
        http.get(api.PROJECT_LIST)
          .then(res => {
            this.loading=false
            this.tableData = res;

          })
      }
    },

    data() {
      return {
        tableData: [],
        loading: false

      }
    }
    ,
    created() {
      this.load()


    }


  }
</script>

