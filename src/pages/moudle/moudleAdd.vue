<template>
  <div slot="body">
    <el-form ref="form" :model="form" :rules="rules2" label-width="80px">
      <el-form-item label="编号">
        <el-input v-model="form.num" type="number"></el-input>
      </el-form-item>

      <el-form-item label="模块名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="工时(/天)">

        <el-input-number v-model="form.workhour"   :min="1" :max="10"      @change="handleChange"  ></el-input-number>
      </el-form-item>

      <el-form-item label="说明">

        <quill-editor v-model="form.description" ref="myQuillEditor"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)"

                     >
        </quill-editor>
      </el-form-item>


      <el-form-item>

        <el-button plain @click="onSubmit" :loading=addLoading v-if="form.id">修改</el-button>
        <el-button type="danger" @click="clear" :loading=addLoading v-if="form.id">清空</el-button>
        <el-button type="primary"  @click="onSubmit" :loading=addLoading v-else >立即创建</el-button>
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
        projectId:null,
        addLoading:false,
        form: { name:"", workhour:1, description:"" , num:"" },
        editorOption: {
          // some quill options
        },
        rules2: {
          name: [
            { required: true, message: '模块名称', trigger: 'blur' },

          ]

        }
      }},

    methods: {
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
      onEditorChange({ editor, html, text }) {
        console.log('editor change!', editor, html, text)
        this.content = html
      },
      clear(){
        this.form={}
      },

      handleChange(value) {
        this.form.workhour=value
      },
      onSubmit() {
        this.addLoading=true

        if(this.form.workhour )
        this.form.project={id:this.projectId}
        console.log('submit!'+JSON.stringify(this.form))
         http.post(api.MOUDLE_SAVE,this.form)
          .then(res=>{
            this.$msg.info("OK")
            this.form=res .Content
            this.addLoading=false


          })
      },
      loadMoudle(moudleId){
      http.post(api.MOUDLE_ID,{id: moudleId})
          .then(res=>{
            console.log(JSON.stringify(res))
            this.form=res

          })

      }




    },

    created(){
        if (this.$route.query&&this.$route.query.projectId!==null){
          this.projectId=this.$route.query.projectId
          this.project={id:this.projectId}
        }

    },

  }
</script>
