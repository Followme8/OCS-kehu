<template>
  <div class="opsr-container">
    <el-card>
      <div class="bottomBtn">
        <el-button
          type="primary"
          @click="handleCreateUser"
          class="originBtn"
          >新增</el-button
        >
      </div>
      <el-table
        :data="list"
        @selection-change="handleSelectionChange"
        :header-cell-style="{ background: '#F0F0F0', color: '#000000' }"
        style="width: 100%"
        size="small"
        max-height="680px"
        border
        stripe
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          min-width="120px"
          align="center"
          prop="user_id"
          label="主帐户号ID"
        />
        <el-table-column
          min-width="180px"
          align="center"
          prop="username"
          label="账号"
        />
        <el-table-column
          min-width="160px"
          align="center"
          prop="password"
          label="密码"
        />
        <el-table-column min-width="160px" label="界面" align="center">
          <template slot-scope="{ row }">
            <el-select
              v-model="row.group_id"
              multiple
              disabled
              size="small"
            >
              <el-option
                v-for="it in per"
                :key="it.value"
                :label="it.label"
                :value="it.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          min-width="160px"
          align="center"
          prop="bei"
          label="备注"
        />
        <el-table-column
          class="czBtn"
          prop="address"
          align="center"
          label="操作"
          width="120"
        >
          <template slot-scope="{ row }">
            <el-button size="mini" @click="editBtn(row)"
              ><i class="el-icon-edit"></i
            ></el-button>
            <el-button size="mini" @click="deleteBtn(row)"
              ><i class="el-icon-delete"></i
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      :visible.sync="dialogFormVisible"
      :title="type === 'add' ? '新增账号' : '修改账号'"
      custom-class="ancsDialog"
    >
      <el-form ref="form" :model="form" label-suffix=":">
        <el-form-item label="主帐户号ID" :label-width="formLabelWidth" prop="nickname">
          <el-input v-model="form.user_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth"  prop="password">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="界面" :label-width="formLabelWidth" prop="group_id">
          <el-select v-model="form.group_id" multiple placeholder="请选择活动区域">
            <el-option
              v-for="it in per"
              :key="it.value"
              :label="it.label"
              :value="it.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="bei">
          <el-input v-model="form.bei" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" align="center" class="dialog-footer">
        <el-button class="styBtn" type="primary" @click="handleConfirm">确 定</el-button>
        <el-button class="bueBtn" @click="dialogFormVisible = false"
          >取 消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/api/user";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      list: [],
      dialogFormVisible: false,
      formLabelWidth: "90px",
      type: "add", // add or edit
      form: {
        nickname: "",
        username: "",
        group_id: [],
        password: "",
        bei: ""
      },
      per: [
        {
          value: 1,
          label: "生成运单"
        },
        {
          value: 2,
          label: "商品信息管理"
        },
        {
          value: 3,
          label: "收件地址/进口商"
        },
        {
          value: 4,
          label: "发件地址"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  created() {
    this.fetchUserList();
  },
  methods: {
    handleCreateUser() {
      this.type = "add";
      this.resetForm();
      this.dialogFormVisible = true;
    },
    resetForm() {
      this.form = {
        user_id: "",
        username: "",
        group_id: [],
        password: "",
        bei: ""
      }
    },
    // 当选择项发生变化时会触发该事件
    handleSelectionChange() {
    },
    // 删除
    deleteBtn() {
      this.$confirm("是否删除?", "提示", {
        distinguishCancelAndClose: true,
        cancelButtonText: "取消",
        confirmButtonText: "确定"
      })
        .then(async() => {
          this.postdelete()
          this.fetchUserList()
          this.$message({
            type: "info",
            message: "删除成功"
          });
          this.outerVisible = false;
        })
        .catch(() => {
        });
    },
    async postdelete() {
      try {
        const result = await api.userPermissionAdd(
          this.initCondition()
        );
        if (result.code === 1) {
          return true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    initCondition() {
      const {
        user_id,
        username,
        group_id,
        password,
        bei
      } = this.form;
      console.log(this.form);
      const res = {
        user_id,
        username,
        group_id,
        password,
        bei
      };
      return res;
    },
    // 编辑
    editBtn(row) {
      this.type = "edit";
      const { user_id, password, group_id, bei, username } = row;
      this.form = {
        username,
        user_id,
        password,
        group_id,
        bei
      };
      this.dialogFormVisible = true;
    },
    // // 查询子账户列表
    async fetchUserList() {
      const { user_id } = this.$store.getters.userInfo;
      try {
        const res = await api.userinitList({
          user_id
        });
        if (res.code === 1) {
          this.list = res.data.list.map(it => ({
            ...it,
            group_id: it.group_id.split(",").map(it => +it)
          }));
          console.log(this.list, "12312312312412412412412444444444444444");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async handlePostCreateUser() {
      try {
        const { company } = this.userInfo;
        const result = await api.createUser({
          ...this.form,
          group_id: this.form.group_id.join(","),
          Manager: "9",
          name: this.form.username,
          company
        });
        if (result.code === 1) {
          return true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async handleEditUser() {
      return true
    },
    handleConfirm() {
      const { type, handlePostCreateUser, handleEditUser, fetchUserList } = this;
      this.$confirm(type === "edit" ? "是否保存修改过后的数据？" : "确定新增账户？", "提示", {
        distinguishCancelAndClose: true,
        cancelButtonText: "取消",
        confirmButtonText: "确定"
      })
        .then(async() => {
          const result = type === "add" ? await handlePostCreateUser() : await handleEditUser();
          if (result) {
            this.dialogFormVisible = false;
            fetchUserList()
            this.$message({
              type: "success",
              message: type === "add" ? "添加成功" : "修改成功"
            });
          }
        })
        .catch(action => {
          this.$message({
            type: "info",
            message:
              action === "cancel" ? "放弃保存并离开页面" : "停留在当前页面"
          });
        });
    }
  }
};
</script>
<style lang="scss">
.opsr-container {
  .bottomBtn {
    // display: flex;
    margin-bottom: 30px;
    .originBtn {
      width: 120px;
      height: 36px;
      border-radius: 10px;
    }
    // .originBtn:nth-of-type(n + 2) {
    //   margin-left: 60px;
    // }
  }
  .ancsDialog {
    width: 500px;
    // height: 600px;
    background: #ffffff;
    border-radius: 20px;
    .el-dialog__header {
      width: 500px;
      height: 50px;
      background: #2781fd;
      border-radius: 20px 20px 0px 0px;
      // line-height: 10px;
      span {
        color: #fff;
      }
    }
    .el-dialog__body {
      display: flex;
    }
    .dlogInput {
      .put {
        width: 220px;
        height: 200px;
        background: #f6f6f6;
        border: 1px solid #e2e2e2;
        border-radius: 6px;
        overflow: hidden;
        resize: none;
        margin-left: 20px;
      }
    }
    .bueBtn {
      width: 90px;
      height: 36px;
      background: #2781fd;
      color: #fff;
      border-radius: 10px;
      margin: 0 20px;
    }
    .styBtn {
      width: 90px;
      height: 36px;
      background: #ffffff;
      border: 1px solid #2781fd;
      border-radius: 10px;
      color: #2781fd;
    }
  }
  .aplDialog {
    width: 400px;
    height: 200px;
    background: #ffffff;
    border-radius: 20px;
    // position: fixed;
    .el-dialog__header {
      width: 400px;
      height: 50px;
      background: #2781fd;
      border-radius: 20px 20px 0px 0px;
      .el-dialog__title {
        color: #fff;
      }
    }
    .el-dialog__body {
      display: flex;
      justify-content: center;
    }
    .el-dialog__footer {
      text-align: center;
      .ofkBtn {
        width: 90px;
        height: 36px;
        background: #2781fd;
        border-radius: 10px;
        margin: 0 20px;
      }
      .klsBtn {
        width: 90px;
        height: 36px;
        background: #ffffff;
        border: 1px solid #2781fd;
        border-radius: 10px;
        color: #2781fd;
      }
    }
  }
}
.el-message-box {
  width: 400px;
  height: 200px;
  background: #ffffff;
  border-radius: 20px;
  .el-message-box__header {
    width: 400px;
    height: 40px;
    background: #2781fd;
    border-radius: 20px 20px 0px 0px;
    .el-message-box__title {
      width: 40px;
      height: 19px;
      font-size: 20px;
      font-family: Source Han Sans SC;
      font-weight: 400;
      color: #ffffff;
    }
  }
  .el-message-box__content {
    height: 100px;
    text-align: center;
    font-size: 16px;
    font-family: Source Han Sans SC;
    font-weight: 400;
    color: #000000;
    p {
      margin-top: 35px;
    }
  }
  .el-message-box__btns {
    text-align: center;
    .el-button--small:nth-of-type(1) {
      width: 90px;
      height: 36px;
      background: #ffffff;
      border: 1px solid #2781fd;
      border-radius: 10px;
      color: #2781fd;
    }
    .el-button--small:nth-of-type(2) {
      width: 90px;
      height: 36px;
      background: #2781fd;
      border-radius: 10px;
      color: #fff;
    }
  }
}
</style>
