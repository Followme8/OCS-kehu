<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="商品名称：">
        <el-input
          style="width: 300px;"
          v-model="formInline.name"
          placeholder="请输入商品名称(支持中文，英文，日文)"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品海关编码：">
        <el-input
          v-model="formInline.code"
          placeholder="请输入商品海关编码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round @click="onSubmit">查询</el-button>
          <el-button type="danger" round @click="handleBoundleDelete">批量删除</el-button>
    <el-button type="primary" round @click="handlCreateBtn">新增商品</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      @selection-change="handleSelectionChange"
      :header-cell-style="{ background: '#F0F0F0', color: '#000000' }"
      style="width: 100%"
      size="small"
      max-height="480px"
      v-loading="isloading"
      border
      stripe
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="序号" align="center" type="index" width="50" />
      <!-- <el-table-column
        min-width="120px"
        align="center"
        prop="Serial_number"
        label="序号"
      /> -->
      <el-table-column
        min-width="180px"
        align="center"
        prop="good_code"
        label="商品/自定义(可填写SKU)"
      />
      <el-table-column
        min-width="180px"
        align="center"
        prop="cn_name"
        label="商品名称（中文）"
      />
      <el-table-column
        min-width="180px"
        align="center"
        prop="en_name"
        label="商品名称（英文）"
      />
      <el-table-column
        min-width="180px"
        align="center"
        prop="jp_name"
        label="商品名称（日文）"
      />
      <el-table-column
        min-width="180px"
        align="center"
        prop="model"
        label="款号"
      />
      <el-table-column
        min-width="180px"
        align="center"
        prop="customs_code"
        label="商品海关编码HS CODE"
      />
      <el-table-column
        min-width="180px"
        align="center"
        prop="cn_material"
        label="材质/工艺/用途（中文）"
      />
      <el-table-column
        min-width="160px"
        align="center"
        prop="en_material"
        label="材质/工艺/用途（英文）"
      />
      <el-table-column
        min-width="160px"
        align="center"
        prop="jp_material"
        label="材质/工艺/用途（日文）"
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
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form :model="form" label-suffix=":">
        <el-form-item
          label="商品/自定义(可填写SKU)"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.good_code" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品名称（中文）" :label-width="formLabelWidth">
          <el-input v-model="form.cn_name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品名称（英文）" :label-width="formLabelWidth">
          <el-input v-model="form.en_name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品名称（日文）" :label-width="formLabelWidth">
          <el-input v-model="form.jp_name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="款号" :label-width="formLabelWidth">
          <el-input v-model="form.model" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品海关编码HS CODE" :label-width="formLabelWidth">
          <el-input v-model="form.customs_code" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="材质/工艺/用途（中文）"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.cn_material" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="材质/工艺/用途（英文）"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.en_material" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="材质/工艺/用途（日文）"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.jp_material" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handelCreatefrom">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import api from "@/api/user";

export default {
  data() {
    return {
      formLabelWidth: " 180px",
      dialogFormVisible: false,
      formInline: {
        name: "",
        code: ""
      },
      list: [],
      form: {
        good_code: "", // 商品/自定义(可填写SKU)
        cn_name: "", // 商品名称（中文）
        en_name: "", // 商品名称（英文）
        jp_name: "", // 商品名称（日文）
        model: "", // 款号
        customs_code: "", // 商品海关编码HS CODE
        cn_material: "", // 材质/工艺/用途（中文）
        en_material: "", // 材质/工艺/用途（英文）
        jp_material: "" // 材质/工艺/用途（日文）
      }
    };
  },
  created() {
    this.fetchList();
  },
  methods: {
    // 查询
    onSubmit() {
      this.fetchList();
    },
    // 当选择项发生变化时会触发该事件
    handleSelectionChange(rows) {
      console.log(rows, "rows")
      this.selectIds = rows.map(it => it.id);
    },
    // 修改
    editBtn(row) {
      console.log(row);
      this.type = "edit";
      const {
        id,
        good_code,
        cn_name,
        en_name,
        jp_name,
        model,
        customs_code,
        cn_material,
        en_material,
        jp_material
      } = row;
      this.form = {
        id,
        good_code,
        cn_name,
        en_name,
        jp_name,
        model,
        customs_code,
        cn_material,
        en_material,
        jp_material
      };
      this.dialogFormVisible = true;
    },
    // 新增商品
    handlCreateBtn() {
      this.type = "add";
      this.resetForm();
      this.dialogFormVisible = true;
    },
    resetForm() {
      this.form = {
        good_code: "", // 商品/自定义(可填写SKU)
        cn_name: "", // 商品名称（中文）
        en_name: "", // 商品名称（英文）
        jp_name: "", // 商品名称（日文）
        model: "", // 款号
        customs_code: "", // 商品海关编码HS CODE
        cn_material: "", // 材质/工艺/用途（中文）
        en_material: "", // 材质/工艺/用途（英文）
        jp_material: "" // 材质/工艺/用途（日文）
      };
    },
    handleBoundleDelete() {
      this.postDelete(this.selectIds);
    },
    // 删除
    deleteBtn(row) {
      const { id } = row;
      this.postDelete([id]);
    },
    initSearchCondition() {
      const condition = {};
      const { name, code } = this.formInline;
      if (name) {
        condition.name = name;
      }
      if (code) {
        condition.code = code;
      }
      return condition;
    },
    //
    async fetchList() {
      try {
        this.isloading = true;
        const creDacs = this.initSearchCondition();
        const res = await api.Commodityinformationdisplay(creDacs);
        console.log(res, "124122352352345");
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
      const { type, postCreate, postEdit } = this;
      this.$confirm(
        type === "edit" ? "是否保存修改过后的数据？" : "确定新增地址？",
        "提示",
        {
          distinguishCancelAndClose: true,
          cancelButtonText: "取消",
          confirmButtonText: "确定"
        }
      )
        .then(async () => {
          const result = type === "add" ? await postCreate() : await postEdit();
          if (result) {
            this.dialogFormVisible = false;
            this.fetchList();
            this.$message({
              type: "success",
              message: type === "add" ? "新增成功" : "修改成功"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    async postCreate() {
      try {
        const result = await api.Shippingaddressdeletnadddisplay(
          this.initCondition()
        );

        if (result.code === 1) {
          return true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async postEdit() {
      try {
        const result = await api.Shippingaddressdeletnmodifdisplay(
          this.initCondition()
        );
        if (result.code === 1) {
          return true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    postDelete(ids) {
      this.$confirm("是否删除?", "提示", {
        distinguishCancelAndClose: true,
        cancelButtonText: "取消",
        confirmButtonText: "确定"
      })
        .then(async () => {
          try {
            const result = await api.Shippingaddressdeletndeletendisplay({
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
    initCondition() {
      const {
        id,
        good_code,
        cn_name,
        en_name,
        jp_name,
        model,
        customs_code,
        cn_material,
        en_material,
        jp_material
      } = this.form;
      return {
        id,
        good_code,
        cn_name,
        en_name,
        jp_name,
        model,
        customs_code,
        cn_material,
        en_material,
        jp_material
      };
    }
  }
};
</script>
<style lang="scss">
.app-container {
  background: #ffffff;
  box-shadow: 0px 0px 5px 0px rgba(153, 153, 153, 0.05);
  border-radius: 16px;
  padding: 40px;
}
</style>
