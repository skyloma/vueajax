<template>
  <div slot="body">
    <h3 class="box-title" slot="header" style="width: 100%;">
      <el-button type="primary" icon="el-icon-plus" @click="newAdd" v-if="user.role.eName==='Tester'">提交新bug
      </el-button>

    </h3>
    <br/>

    <el-table

      :data="tableData"
      v-loading.body="loading"
      border
      style="width: 100%">
      <el-table-column
        prop="submitTime"
        :formatter="dateFormat"
        label="提出时间"
      >
      </el-table-column>
      <el-table-column
        prop="moudle.name"
        label="功能模块"
      >
      </el-table-column>
      <el-table-column
        prop="note"
        label="问题描述"
      >
      </el-table-column>
      <el-table-column
        prop="grade"
        label="bug等级"
      >
      </el-table-column>
      <el-table-column
        prop="state"
        label="bug状态"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        min-width="80">
        <template scope="scope">
          <!--<span> <el-button type="danger" icon="delete" @click="batchDelete">删除</el-button></span>-->
          <span>
            <el-button type="danger" icon="el-icon-edit"    v-if="user.role.eName=='Tester'"  @click="editClick(scope.$index, scope.row)">编辑</el-button>
          </span>
          <span>
            <el-button type="primary"  plain icon="el-icon-info"  plain @click="readClick(scope.$index, scope.row)">详情</el-button>
          </span>

        </template>
      </el-table-column>
    </el-table>

  </div>


</template>

<script>
  import   api from "../../api"
  import moment from 'moment'
  import   http from "../../http"
  import {mapGetters} from 'vuex'

  export default {

    computed: {
      ...mapGetters({
        user: 'userInfo'

      })
    },
    methods: {

      dateFormat: function (row, col) {
        let tempdate = row.submitTime;
        if (tempdate == undefined) {
          return "";
        } else {

          return moment(tempdate).format("YYYY-MM-DD");

        }


      },
      readClick(index, row) {
        // console.log(index, row);
        this.$router.push({
          path: '/bugInfo',
          query: {
            bugId: row.id
          }
        })
      },

      editClick(index, row) {
        // console.log(index, row);
        this.$router.push({
          path: '/bugEdit',
          query: {
            bugId: row.id
          }
        })
      },
      newAdd() {
        this.$router.push('/bugAdd')
      },

      load() {
        this.loading=true
         http.get(api.BUG_LIST)
          .then(res => {
            this.loading=false
            this.tableData =res;

          }).catch((error) => {
          this.loading=false
          console.log(error)
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

<style>
  body {
    margin: 0;
  }
</style>
