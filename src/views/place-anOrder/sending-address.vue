<template>
  <div class="address-container">
    <el-form :inline="true" :model="form">
      <el-form-item label="公司名称">
        <el-input
          v-model="form.name"
          placeholder="请输入公司名称"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round @click="fetchList">查询</el-button>
        <el-button type="warning" round @click="addcreateBtn"
          >新增地址</el-button
        >
        <el-button type="danger" round @click="handleBoundleDelete"
          >批量删除</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      @selection-change="handleSelectionChange"
      :header-cell-style="{ background: '#F0F0F0', color: '#000000' }"
      style="width: 100%"
      size="small"
      v-loading="isloading"
      border
      stripe
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="序号" align="center" type="index" width="50" />
       <el-table-column
        min-width="180px"
        align="center"
        prop="delivery_name"
        label="公司名称（中文）"
      />
      <el-table-column
        min-width="180px"
        align="center"
        prop="delivery_en_name"
        label="公司名称（英文）"
      />
      <el-table-column
        min-width="180px"
        align="center"
        prop="delivery_attn"
        label="联系人"
      />
      <el-table-column
        min-width="180px"
        align="center"
        prop="cnty"
        label="国家/地区"
      />
      <el-table-column
        min-width="180px"
        align="center"
        prop="credit_code"
        label="统一社会信用代码"
      />
      <el-table-column
        min-width="180px"
        align="center"
        prop="delivery_address"
        label="地址"
      />
      <el-table-column
        min-width="160px"
        align="center"
        prop="delivery_tel"
        label="电话TEL"
      />
      <el-table-column
        min-width="160px"
        align="center"
        prop="zc"
        label="邮编"
      />
      <el-table-column
        class="czBtn"
        prop="address"
        align="center"
        label="操作"
        width="120"
      >
        <template slot-scope="{ row }">
          <el-button size="mini" type="" @click="editBtn(row)"
            ><i class="el-icon-edit"></i
          ></el-button>
          <el-button size="mini" @click="deleteBtn(row)"
            ><i class="el-icon-delete"></i
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <SendingAddress
      v-model="orderDialogVisible"
      :initForm="editForm"
      :type="type"
      @success="handleFormSuccess"
    />
  </div>
</template>
<script>
import api from "@/api/user";
import SendingAddress from "@/components/SendingAddress";

export default {
  components: {
    SendingAddress
  },
  data() {
    return {
      dialogFormVisible: false,
      type: "add",
      editForm: {},
      orderDialogVisible: false,
      form: {
        name: ""
      },
      selectIds: [],
      list: []
    };
  },
  created() {
    this.fetchList();
  },
  methods: {
    // 新增地址
    addcreateBtn() {
      this.type = "add";
      this.editForm = {};
      this.orderDialogVisible = true;
    },
    handleBoundleDelete() {
      this.postDelete(this.selectIds);
    },
    //
    initSearchCondition() {
      const condition = {};
      const { name, status } = this.form;
      if (name) {
        condition.name = name;
      }
      if (status) {
        condition.status = status;
      }
      return condition;
    },
    //
    async fetchList() {
      try {
        this.isloading = true;
        const creDacs = this.initSearchCondition();
        const res = await api.Shippingaddressdisplay(creDacs);
        if (res.code === 1) {
          this.list = res.data;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.isloading = false;
      }
    },
    // 表格
    // 当选择项发生变化时会触发该事件
    handleSelectionChange(rows) {
      this.selectIds = rows.map(it => it.id);
    },
    editBtn(row) {
      console.log(row, "row");
      this.type = "edit";
      const {
        delivery_name,
        delivery_en_name,
        credit_code,
        cnty,
        sheng,
        shi,
        delivery_attn,
        delivery_address,
        delivery_tel,
        zc,
        id
      } = row;
      this.editForm = {
        delivery_name,
        delivery_en_name,
        credit_code,
        cnty,
        sheng,
        shi,
        delivery_attn,
        delivery_address,
        delivery_tel,
        zc,
        id
      };
      this.orderDialogVisible = true;
    },
    postDelete(ids) {
      this.$confirm("是否删除?", "提示", {
        distinguishCancelAndClose: true,
        cancelButtonText: "取消",
        confirmButtonText: "确定"
      })
        .then(async () => {
          try {
            const result = await api.Shippingaddressdeletndisplay({
              id: ids
            });
            if (result.code === 1) {
              this.fetchList();
              this.$message({
                type: "info",
                message: "删除成功"
              });
            }
          } catch (error) {
            console.log(error);
          }
        })
        .catch(() => {});
    },
    deleteBtn(row) {
      const { id } = row;
      this.postDelete([id]);
    },
    getTypeText(row) {
      const { status } = row;
      switch (status) {
        case 1:
          return "收货地址";
        case 2:
          return "进口商地址";
        default:
          break;
      }
    },
    // 地址弹窗
    handleFormSuccess() {
      this.fetchList();
    }
  }
};
</script>
<style lang="scss">
.address-container {
  background: #ffffff;
  box-shadow: 0px 0px 5px 0px rgba(153, 153, 153, 0.05);
  border-radius: 16px;
  padding: 40px;
  .el-radio {
    margin-bottom: 20px;
  }
}
</style>
