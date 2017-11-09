<template>
  <div>

    <mu-card z-index="4">
      <mu-card-header>
        <h3>
          项目列表
        </h3>

        <mu-divider/>

      </mu-card-header>

      <mu-card-text>

        <mu-table :selectable="false":showCheckbox="false" >
          <mu-thead slot="header">
            <mu-tr>
              <mu-th tooltip="ID">ID</mu-th>
              <mu-th tooltip="名称">Name</mu-th>
              <mu-th tooltip="版本">版本</mu-th>
              <mu-th tooltip="状态">状态</mu-th>
              <mu-th tooltip="操作">操作</mu-th>
            </mu-tr>
          </mu-thead>
          <mu-tbody>
            <mu-tr v-for="item,index in tableData" :key="index"  >
              <mu-td>{{item.id}}</mu-td>
              <mu-td>{{item.name}}</mu-td>
              <mu-td>{{item.version}}</mu-td>
              <mu-td>{{item.state}}</mu-td>
              <mu-td>
                  <mu-icon-button icon="edit" @click="editClick(item, index)"/>
                  <mu-icon-button icon="info" @click="readClick(item, index)"/>
              </mu-td>
            </mu-tr>
          </mu-tbody>
          <mu-tfoot slot="footer">
            <br/>
            <mu-pagination :total="tableData.length" :current="current" @pageChange="handleClick">
            </mu-pagination>
          </mu-tfoot>
        </mu-table>

      </mu-card-text>
      <mu-card-actions>


      </mu-card-actions>

    </mu-card>
    <div   class="mu-back-up" style="right: 30px; bottom: 30px;">  <mu-float-button icon="add"  @click="addClick"/> </div>


  </div>
</template>

<script>


  export default {
    data() {
      return {
        tableData: [],
        fixedHeader: true,
        fixedFooter: true,

        height: '300px',
        total: 50,
        current: 1,
         dialog:false,

      }
    },
    methods: {
      readClick(item, row) {
        // console.log(index, row);

        this.$router.push({
          path: '/projectInfo',
          query: {
            projectId: item.id
          }
        })
      },

      editClick(item, row) {
        // console.log(index, row);

        this.$router.push({
          path: '/projectEdit',
          query: {
            projectId: item.id
          }
        })
      },
      addClick(item, row) {
        // console.log(index, row);

        this.$router.push({
          path: '/projectAdd'

        })
      },
      handleClick(){
        if (this.current<this.tableData.length){

        }

      },
      open () {
         this.dialog = true

      },
      close () {
        this.dialog = false
      }
    },
    created() {
      this.http.get(this.api.projectList)
        .then(res => {
          this.tableData = res;

        })
    }


  }
</script>

<style lang="css">



  .mu-back-up  {
    position: fixed;
    z-index: 100;
    cursor: pointer;

  }
</style>
