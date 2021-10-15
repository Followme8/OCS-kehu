<template>
  <div class="generateContainer">
    <el-form ref="form" label-suffix=":" :model="form" label-width="80px">
      <el-form-item label="实际重量">
        <div class="formIput" >
          <el-input v-model="form.actual_weight" />
          <span >KG</span>
        </div>
      </el-form-item>
      <el-form-item label="体积重量">
        <div class="formIput" >
          <el-input v-model="form.volume" />
          <span >KG</span>
        </div>
      </el-form-item>
      <el-form-item label="计费重量">
        <div class="formIput" >
          <el-input v-model="form.chargeable_weight" />
          <span >KG</span>
        </div>
      </el-form-item>
      <el-form-item label="总件数">
        <el-input v-model="form.jianshu"></el-input>
      </el-form-item>
    </el-form>
     <div class="rombottom">
      <el-table
        :data="list"
        align="center"
        border
        class="sfTableList"
        :header-cell-style="{ background: '#F0F0F0', color: '#000000' }"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          prop="long"
          align="center"
          label="长（CM）"
          min-width="175"
        />
        <el-table-column
          prop="wide"
          align="center"
          label="宽（CM）"
          min-width="250"
        />
        <el-table-column
          prop="high"
          align="center"
          label="高（CM）"
          min-width="140"
        />
        <el-table-column
          prop="actual_weight"
          align="center"
          label="实际重量（KG）"
          min-width="250"
        />
        <el-table-column
          prop="volume"
          align="center"
          label="体积重量（KG）"
          min-width="250"
        />
        <el-table-column
          prop="jianshu"
          align="center"
          label="件数"
          min-width="250"
        />
      </el-table>
       <div class="handelTablebtn">
          <el-button type="primary" round>添加</el-button>
        <el-button type="warning" round>修改</el-button>
        <el-button type="danger"  round>删除</el-button>
        </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/user";
export default {
  data() {
    return {
      list: [
        {
          long: "123", // 长
          wide: "123", // 宽
          high: "12", // 高
          actual_weight: "123", // 实际重量（KG）
          volume: "123", // 体积重量
          jianshu: "2" // 件数

        }
      ],
      form: {
        long: "", // 长
        wide: "", // 宽
        high: "", // 高
        actual_weight: "", // 实际重量（KG）
        volume: "", // 体积重量
        chargeable_weight: "" // 计费重量
      },
      order_id: {} // 运单号id
    }
  },
  created() {
    this.order_id = localStorage.getItem("order_id")
    console.log(this.order_id, "12=-=-=-=-=-=12312312=-31=2-3=1-2=3-12=3-=12-3=12=312-3=1-2=3-12=-31=-23=12=-")
    this.handlePostWeight()
  },
  methods: {
    async handlePostWeight() {
      try {
        const res = await api.WaybillWeightDisplay({
          order_id: this.order_id
        });
        if (res.code === 1) {
          this.list = res.data.weight_list;
        }
      } catch (error) {
        console.log(error);
      }
    },
    getlccStorrrThree() {
      const typeformthree = { form: this.form, type: 3 }
      localStorage.setItem("typeformthree", JSON.stringify(typeformthree))
    },
    getForm() {
      return {
        type: 3,
        form: {
          ...this.form
        }
      }
    }
  }
}
</script>
<style lang="scss">
.generateContainer{
  &> .el-form {
    display: flex;
    justify-content: center;
    margin: 20px;
    border: 1px solid #DEDEDE;
  }
  .formIput{
    display: flex;
    & > span {
      margin-left: 6px;
    }
  }
  .handelTablebtn{
    margin-top: 20px;
  }
}

</style>
