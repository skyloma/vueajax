<template>
  <div slot="body">

    <span><el-button icon="el-icon-plus" @click="newAdd" type="primary">新添加一个接口</el-button></span>
    <br/><br/>

    <el-collapse v-model="activeName" v-for="form in moudleApis" :accordion="accordion">

      <el-collapse-item :name="form.index">
        <template slot="title">
          <span v-text="form.name"></span>
          <span v-text="form.url"></span>
        </template>

        <el-card>
          <el-form ref="form" :model="form" label-width="150px">


            <el-form-item label="接口名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="接口">
              <el-input v-model="form.url"></el-input>
            </el-form-item>


            <el-row :gutter="2">
              <el-col :span="8">
                <el-form-item label="http请求方式">
                  <el-radio-group v-model="form.requst_mothed">
                    <el-radio label="Post" border></el-radio>
                    <el-radio label="Get" border></el-radio>

                  </el-radio-group>
                </el-form-item>

              </el-col>
              <el-col :span="16">
                <el-form-item label="content_type">
                  <el-radio-group v-model="form.content_type">
                    <el-radio label="application/json" border>Json</el-radio>

                    <el-radio label="application/x-www-form-" border> URL</el-radio>
                    >
                    <el-radio label="multipart/form-data" border>FORM</el-radio>

                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>


            <hr/>

            <br/><br/>

            <el-row :gutter="6">
              <el-col :span="4">
                <span><el-button icon="el-icon-download" plain @click="importFromJson(form)" size="small"
                                 type="primary">从JSON导入</el-button></span>
                <br/>
                <br/>
                <span><el-button icon="el-icon-plus" plain @click="newAddParams(form)" size="small" type="primary">添加请求参数</el-button></span>

              </el-col>
              <el-col :span="20">
                <el-table
                  :data="form.requestParams"
                  style="width: 100%; ">
                  <el-table-column

                    label="请求参数"
                  >
                    <template scope="scope">
                      <el-input v-model="scope.row.name"></el-input>

                    </template>
                  </el-table-column>
                  <el-table-column
                    label="数据类型"
                  >
                    <template scope="scope">
                      <el-select v-model="scope.row.paramType" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column

                    label="备注">
                    <template scope="scope">
                      <el-input v-model="scope.row.note"></el-input>

                    </template>
                  </el-table-column>


                  <el-table-column
                    fixed="right"
                    label="操作"
                    min-width="100">
                    <template scope="scope">

                    <span>
                    <el-button type="danger" icon="el-icon-delete" size="small"
                               v-loading.fullscreen.lock="fullscreenLoading"
                               @click="batchDelete(scope.$index, scope.row,form)"> </el-button>
                   </span>


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
                <span><el-button icon="el-icon-download" plain @click="importFromJson2(form)" size="small"
                                 type="primary">从JSON导入</el-button></span>
                <br/><br/>
                <span><el-button icon="el-icon-plus" plain @click="newAddParams2(form)" size="small" type="primary">添加返回参数</el-button></span>

              </el-col>
              <el-col :span="20">
                <el-table
                  :data="form.responseParams"
                  style="width: 100%; ">
                  <el-table-column

                    label="参数名"
                  >
                    <template scope="scope">
                      <el-input v-model="scope.row.name"></el-input>

                    </template>
                  </el-table-column>
                  <el-table-column
                    label="数据类型"
                  >
                    <template scope="scope">
                      <el-select v-model="scope.row.paramType" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column

                    label="备注">
                    <template scope="scope">
                      <el-input v-model="scope.row.note"></el-input>

                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    label="操作"
                    min-width="100">
                    <template scope="scope">

                    <span>
                    <el-button type="danger" icon="el-icon-delete" size="small"
                               v-loading.fullscreen.lock="fullscreenLoading"
                               @click="batchDelete2(scope.$index, scope.row,form)"> </el-button>
                   </span>


                    </template>
                  </el-table-column>


                </el-table>


              </el-col>

            </el-row>
            <br/><br/>
            <hr/>
            <br/><br/>
            <el-form-item>
              <el-button type="primary" plain v-loading.fullscreen.lock="fullscreenLoading"
                         @click="onEditSubmit(form)" v-if="form.id"> 修改
              </el-button>
              <el-button type="danger" v-loading.fullscreen.lock="fullscreenLoading"   @click="onDel(form)"
                         v-if="form.id"> 删除
              </el-button>
              <el-button type="primary" v-loading.fullscreen.lock="fullscreenLoading"
                         @click="onSubmit(form )" v-else> 保存
              </el-button>
            </el-form-item>
          </el-form>

        </el-card>


      </el-collapse-item>


    </el-collapse>


  </div>


</template>
<script>
  import api from "../../api"
  import http from "../../http"
//  import index from "../../filters/index";
  import {MessageBox} from 'element-ui'

  export default {
    data() {
      return {
        moudleId: null,
        accordion: true,
        fullscreenLoading: false,
        index: 0,
        activeName: '',
        moudleApis: [],
        options: [{
          value: 'string',
          label: 'string'
        }, {
          value: 'float',
          label: 'float'
        }, {
          value: 'int',
          label: 'int'
        }, {
          value: 'long',
          label: 'long'
        }, {
          value: 'date',
          label: 'date'
        }],


      }
    },

    methods: {


      importFromJson(form) {

        this.$prompt('请输入JSON', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: "",
          inputErrorMessage: ''
        }).then(({value}) => {

          this.parseJson(form, value)

        })


      },
      importFromJson(form) {

        this.$prompt('请输入JSON', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: "",
          inputErrorMessage: ''
        }).then(({value}) => {

          this.parseJson(form, value)

        })


      },

      parseJson2(form, jsonstring) {

        var j = JSON.parse(jsonstring);
        if (j !== null) {

          var ptype = 'string'
          var x;
          for (x in j) {

            if (typeof j[x] == 'number') {
              if ((j[x]).toString().indexOf('.')) {
                ptype = "float"
              } else {
                ptype = "int"
              }
            }


            var responseParm = {
              id: null,
              name: x,
              paramType: ptype,
              note: j[x]
            }
            form.responseParams.push(responseParm)
          }


        }

      },
      parseJson(form, jsonstring) {

        var j = JSON.parse(jsonstring);
        if (j !== null) {

          var ptype = 'string'
          var x;
          for (x in j) {

            if (typeof j[x] == 'number') {
              if ((j[x]).toString().indexOf('.')) {
                ptype = "float"
              } else {
                ptype = "int"
              }
            }


            var requestParm = {
              id: null,
              name: x,
              paramType: ptype,
              note: j[x]
            }
            form.requestParams.push(requestParm)
          }


        }

      },


      newAdd() {

        this.index++;
        var newform = {
          id: null,
          moudle: {id: this.moudleId},
          name: "",
          url: "",
          params: "",
          index: this.index + "",
          requst_mothed: "Post",
          content_type: "application/json",
          requestParams: [],
          responseParams: []

        };


        this.moudleApis.splice(0, 0, newform)
        this.activeName = [newform.index]


      },

      batchDelete(index, row, form) {


        if (row.id === null) {
          form.requestParams.splice(index, 1)

        } else {

          http.post(api.MOUDLE_API_REQUEST_DEL, {id: row.id})
            .then(res => {
                this.fullscreenLoading = false
                if (res.Code == 0) {
                  form.requestParams.splice(index, 1)
                }
              }
            )
        }


      },
      batchDelete2(index, row, form) {


        if (row.id === null) {
          form.responseParams.splice(index, 1)

        } else {

          http.post(api.MOUDLE_API_REQUEST_DEL, {id: row.id})
            .then(res => {
                this.fullscreenLoading = false
                if (res.Code == 0) {
                  form.responseParams.splice(index, 1)
                }
              }
            )
        }


      },

      newAddParams(form) {
        form.requestParams.push({
          id: null,
          name: "text",
          paramType: "string",
          note: ""
        })


      },
      newAddParams2(form) {
        form.responseParams.push({
          id: null,
          name: "text",
          paramType: "string",
          note: ""
        })


      },
      loadApi(moudleId) {
        http.post(api.MOUDLE_API_BY_MOUDLEID, {id: moudleId})
          .then(res => {
            let apis =res;
            if (apis !== null && apis.length > 0) {
              this.moudleApis = apis
            }


          })

      },
      onEditSubmit(form) {
        this.fullscreenLoading = true
        http.post(api.MOUDLE_API_SAVE, form)
          .then(res => {

            this.fullscreenLoading = false
            form =res
            this.loadApi(this.moudleId)
          })


      },

      onDel(form) {
        this.fullscreenLoading = true
        http.post(api.MOUDLE_API_DEL, form)
          .then(res => {
            this.fullscreenLoading = false
            form =res
            this.loadApi(this.moudleId)
          })


      },
      onSubmit(form) {
        console.log(JSON.stringify(form))
        this.fullscreenLoading = true
        http.post(api.MOUDLE_API_ADD, form)
          .then(res => {

            this.fullscreenLoading = false
            this.loadApi(this.moudleId)

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
