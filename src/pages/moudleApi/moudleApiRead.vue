<template >

  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="接口管理" name="first">
      <el-collapse     v-model="activeNames" v-for="form in moudleApis"

                      >


        <el-collapse-item name="1">
          <template slot="title">
            <span v-text="form.name"></span>
            <span v-text="form.url"></span>
          </template>


          <el-form ref="form" :model="form" label-width="150px">
            <el-form-item label="接口名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="接口">
              <el-input v-model="form.url"></el-input>
            </el-form-item>


            <el-form-item label="http请求方式">
              <el-input v-model="form.requst_mothed"></el-input>

            </el-form-item>
            <el-form-item label="content_type">
              <el-input v-model="form.content_type"></el-input>


            </el-form-item>


            <br/><br/>
            <hr/>
            <br/><br/>
            <el-row :gutter="6">
              <el-col :span="4">
              <h3>Requst参数</h3>
              </el-col>
              <el-col :span="20">
                <el-table
                  :data="form.apiParams"
                  style="width: 100%; ">
                  <el-table-column
                    label="请求参数名"
                   >
                    <template scope="scope">
                      <el-input v-model="scope.row.name"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="数据类型"
                  >
                    <template scope="scope">
                      <el-input v-model="scope.row.paramType"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column

                    label="备注">
                    <template scope="scope">
                      <el-input v-model="scope.row.note"></el-input>

                    </template>
                  </el-table-column>

                </el-table>





              </el-col>

            </el-row>
            <br/><br/>

            <hr/>

            <br/><br/>

            <el-row :gutter="6">
              <el-col :span="4">
               <span><el-button icon=""   v-clipboard:copy="form.params"
                                v-clipboard:success="onCopy"
                                v-clipboard:error="onError" size="small"   type="primary">拷贝返回数据示例</el-button></span>
              </el-col>
              <el-col :span="20">
                <el-table
                  :data="form.responseParams"
                  style="width: 100%; ">
                  <el-table-column

                    label="返回数据参数"
                  >
                    <template scope="scope">
                      <el-input v-model="scope.row.name"></el-input>

                    </template>
                  </el-table-column>
                  <el-table-column
                    label="数据类型"
                  >
                    <template scope="scope">
                      <el-input v-model="scope.row.paramType"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column

                    label="备注">
                    <template scope="scope">
                      <el-input v-model="scope.row.note"></el-input>

                    </template>
                  </el-table-column>

                </el-table>


              </el-col>

            </el-row>
            <br/><br/>
            <hr/>
            <br/><br/>


          </el-form>






        </el-collapse-item>


      </el-collapse>


    </el-tab-pane>
    <el-tab-pane label="变更记录" name="second">暂无</el-tab-pane>

  </el-tabs>



</template>
<script>
  import  api from "../../api"
  import  http from "../../http"

  export default {
    data() {
      return {
        moudleId: null,
        moudleApis: [],
        activeName: 'first',
        activeNames: ['1'],
        options: [{
          value: 'String',
          label: 'String'
        }, {
          value: 'Float',
          label: 'Float'
        }, {
          value: 'Interger',
          label: 'Interger'
        }, {
          value: 'Long',
          label: 'Long'
        }, {
          value: 'Date',
          label: 'Date'
        }],

        newForm: {
          id: null,
          moudle: {},
          name: "",
          url: "",
          params: "",
          requst_mothed: "Post",
          content_type: "application/json",
          apiParams:[]

        }
      }
    },

    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      onCopy(e) {
        alert('You just copied: ' + e.text)
      },

      onError(e) {
        alert('You just copied: ' + e.text)
      },

      loadApi(moudleId) {
        http.post(api.MOUDLE_API_BY_MOUDLEID, {id: moudleId})
          .then(res => {
            let apis =res;
            if (apis !== null && apis.length > 0) {
              this.moudleApis = apis
            } else {
//              this.moudleApis.push({
//                id: null,
//                moudle: {
//                  id: this.moudleId
//                },
//                name: "",
//                url: "",
//                params: "",
//                requst_mothed: "Post",
//                content_type: "application/json"
//
//
//              })
            }


          })

      },



    },

    created() {
      if (this.$route.query && this.$route.query.moudleId !== null) {
        this.moudleId = (this.$route.query.moudleId)
        this.loadApi(this.moudleId);
      }

    },
  }
</script>
