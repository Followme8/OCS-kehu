<template>
  <div class="container">
    <div class="headPos">
      <el-form :inline="true" :model="formInline">
        <el-form-item label="运单状态">
          <el-select v-model="formInline.status">
            <el-option
              v-for="it in options"
              :key="it.value"
              :label="it.label"
              :value="it.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运单号">
          <el-input
            placeholder="请输入运单号"
            v-model="formInline.cwb_no"
            class="ptWidth"
          />
        </el-form-item>
        <el-form-item class="dateWidht" label="下单日期：">
          <el-date-picker
            v-model="formInline.range"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          />
        </el-form-item>
        <el-button type="primary" class="seiBtn" @click="fetchList"
          >搜 索</el-button
        >
      </el-form>
    </div>
    <div class="contentMsx">
      <el-table
        :data="list"
        align="center"
        border
        class="sfTableList"
         @selection-change="handleSelectionChange"
        v-loading="isloading"
        :header-cell-style="{ background: '#F0F0F0', color: '#000000' }"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="序号" align="center" type="index" width="50" />
        <el-table-column
          prop="cwb_status"
          align="center"
          label="运单状态"
          min-width="165"
        >
          <template slot-scope="{ row }">
            {{ getTypeText(row) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="cwb_no"
          align="center"
          label="运单号"
          min-width="175"
        />
        <el-table-column
          prop="address"
          align="center"
          label="目的地"
          min-width="250"
        />
        <el-table-column
          prop="attn"
          align="center"
          label="收件人"
          min-width="140"
        />
        <el-table-column
          prop="add_time"
          align="center"
          label="时间"
          min-width="250"
        />
        <el-table-column
          class="czBtn"
          prop="address"
          align="center"
          label="操作"
          min-width="190"
        >
          <template slot-scope="{ row }">
               <el-button size="mini" type="" @click="editBtn(row)"
              ><i class="el-icon-document-add"></i
            ></el-button>
            <el-button size="mini" type="" @click="editBtn(row)"
              ><i class="el-icon-edit"></i
            ></el-button>
            <el-button size="mini" @click="deleteBtn(row)"
              ><i class=" el-icon-printer"></i
            ></el-button>
            <el-button size="mini" @click="deleteBtn(row)"
              ><i class="el-icon-delete"></i
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="success" @click="handelEsendData" round>发送数据</el-button>
    </div>
  </div>
</template>
<script>
import api from "@/api/user";
export default {
  data() {
    return {
      formLabelWidth: " 100px",
      formInline: {
        status: "",
        cwb_no: "",
        range: []
      },
      list: [],
      selectIds: [], // 选中的运单
      form: {
        cwb_status: "", // 运单状态
        cwb_no: "", // 运单号
        address: "", // 目的地
        attn: "", // attn
        add_time: "" // 时间
      },
      editId: null,
      options: [
        {
          value: "PKP",
          label: "已下单"
        },
        {
          value: "CNP",
          label: "未下单"
        }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: ""
    };
  },
  created() {
    this.fetchList();
  },
  methods: {
    getTypeText(row) {
      const { cwb_status } = row;
      switch (cwb_status) {
        case "PKP":
          return "已下单";
        case "CNP":
          return "未下单";
        default:
          break;
      }
    },
    // 当选择项发生变化时会触发该事件
    handleSelectionChange(rows) {
      this.selectIds = rows.map(it => it.cwb_no);
      console.log(this.selectIds, "123123123123")
    },
    // 修改
    editBtn(row) {
      this.$message("是否修改")
      console.log(row)
    },
    // 删除
    deleteBtn(row) {
      this.$confirm("是否删除?", "提示", {
        distinguishCancelAndClose: true,
        cancelButtonText: "取消",
        confirmButtonText: "确定"
      })
        .then(async () => {
          this.postdelete(row);
          this.fetchList();
          this.$message({
            type: "info",
            message: "删除成功"
          });
          this.outerVisible = false;
        })
        .catch(() => {});
    },
    // 发送数据
    handelEsendData() {
      this.handelEsendDataStart(this.selectIds)
    },
    async handelEsendDataStart() {
      try {
        this.isloading = true;
        const wayBillNo = this.selectIds
        console.log(wayBillNo)
        const res = await api.Waybilllsenddata({
          cwb_no: [wayBillNo]
        });
        console.log(res, "resres")
        if (res.code === 1) {
          return this.$message("发送成功！")
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.isloading = false;
      }
    },
    async postdelete(row) {
      try {
        const { id } = row;
        const result = await api.Waybilllistdeletdisplay({ id: [id] });
        if (result.code === 1) {
          return true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    initSearchCondition() {
      const condition = {};
      const { status, cwb_no, range } = this.formInline;
      if (status) {
        condition.status = status;
      }
      if (cwb_no) {
        condition.cwb_no = cwb_no;
      }
      if (range && range.length > 0) {
        condition.start_time = +range[0];
        condition.end_time = +range[0];
      } else {
        condition.start_time = null;
        condition.end_time = null;
      }
      return condition;
    },
    //
    async fetchList() {
      try {
        this.isloading = true;
        const creDacs = this.initSearchCondition();
        const res = await api.Waybilllistdisplay(creDacs);
        if (res.code === 1) {
          console.log(res);
          this.list = res.data;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.isloading = false;
      }
    },
    handelCreatefrom() {
      const { postEdit } = this;
      this.$confirm("是否保存修改过后的数据？", "提示", {
        distinguishCancelAndClose: true,
        cancelButtonText: "取消",
        confirmButtonText: "确定"
      })
        .then(async () => {
          const result = await postEdit();
          if (result) {
            this.dialogFormVisible = false;
            this.fetchList();
            this.$message({
              type: "success",
              message: "修改成功"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    async postEdit() {
      try {
        const result = await api.Waybilllistmodisfydisplay({
          ...this.form,
          list_id: this.editId
        });
        if (result.code === 1) {
          return true;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<style lang="scss">
.container {
  min-width: 900px;
  // height: 440px;
  background: #ffffff;
  box-shadow: 0px 0px 5px 0px rgba(153, 153, 153, 0.05);
  border-radius: 16px;
  padding: 12px 20px;
  .headPos {
    display: flex;
    .seiBtn {
      width: 90px;
      height: 36px;
      background: #2781fd;
      border-radius: 10px;
      color: #fff;
      // float: right;
    }
    .ptWidth {
      width: 150px;
    }
  }
  .contentMsx {
    .sfTableList {
      width: 100%;
    }
  }
  .selectwidht {
    width: 100%;
  }
}
</style>
