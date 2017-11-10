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

        <el-input-number v-model="workhour"   :min="1" :max="10"      @change="handleChange"  ></el-input-number>
      </el-form-item>

      <el-form-item label="说明">
        <quill-editor v-model="form.description" ref="myQuillEditor"
                      >
        </quill-editor>
      </el-form-item>


      <el-form-item>

        <el-button type="primary" @click="onSubmit" :loading=addLoading >修改</el-button>
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
        workhour:0,
        form: { name:"", workhour:1, description:"" , num:"" },

        rules2: {
          name: [
            { required: true, message: '模块名称', trigger: 'blur' },

          ]

        }
      }},

    methods: {
      onSubmit() {
//        this.form.project={id:this.projectId}
        console.log('submit!'+JSON.stringify(this.form))
         http.post(api.MOUDLE_SAVE,this.form)
          .then(res=>{
            console.log(JSON.stringify(res))
            this.form=res. Content
            this.$router.go(-1)

          })
      },
      loadMoudle(moudleId){
      http.post(api.MOUDLE_ID,{id: moudleId})
          .then(res=>{
            console.log(JSON.stringify(res))
            this.form=res
            this.workhour=this.form.workhour

          })

      },
      handleChange(value) {
        this.form.workhour=value
      },


    },

    created(){
        if (this.$route.query&&this.$route.query.projectId!==null){

          this.projectId=this.$route.query.projectId
          this.project={id:this.projectId}

        }


        if (this.$route.query&&this.$route.query.moudleId!==null){
          let moudleId = this.$route.query.moudleId
          this.loadMoudle(moudleId)
        }




    },
  }
</script>

