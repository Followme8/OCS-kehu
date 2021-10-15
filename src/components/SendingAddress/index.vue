<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      custom-class="ancsDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="true"
      :before-close="handleBeforeClose"
    >
      <el-form label-suffix=":" :model="form" class="demo-form-inline">
        <el-form-item label="公司名称(中文)" :label-width="formLabelWidth">
          <el-input v-model="form.delivery_name" />
        </el-form-item>
        <el-form-item label="公司名称(英文)" :label-width="formLabelWidth">
          <el-input v-model="form.delivery_en_name" />
        </el-form-item>
        <el-form-item label="统一社会信用代码" :label-width="formLabelWidth">
          <el-input v-model="form.credit_code" />
        </el-form-item>
        <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-input v-model="form.delivery_attn" />
        </el-form-item>
        <el-form-item label="国家/地区" :label-width="formLabelWidth">
          <el-select
            v-model="form.cnty"
            class="selectwidht"
            @change="handleCountryChange"
          >
            <el-option
              v-for="it in countryList"
              :key="it.value"
              :label="it.label"
              :value="it.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="!disProvince"
          label="省"
          :label-width="formLabelWidth"
        >
          <!-- sheng -->
          <el-select
            v-model="form.sheng"
            :disabled="provinceList.length <= 0"
            class="selectwidht"
            @change="handleProvinceChange"
          >
            <el-option
              v-for="it in provinceList"
              :key="it.value"
              :label="it.label"
              :value="it.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="!disCity" label="市" :label-width="formLabelWidth">
          <el-select
            v-model="form.shi"
            :disabled="cityList.length <= 0"
            class="selectwidht"
          >
            <el-option
              v-for="it in cityList"
              :key="it.value"
              :label="it.label"
              :value="it.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.delivery_address" />
        </el-form-item>
        <el-form-item label="电话TEL" :label-width="formLabelWidth">
          <el-input v-model="form.delivery_tel" />
        </el-form-item>
        <el-form-item label="邮编" :label-width="formLabelWidth">
          <el-input v-model="form.zc"></el-input>
        </el-form-item>
      </el-form>

      <el-button type="primary" @click="handleConfirm" round>保存</el-button>
      <el-button type="info" @click="handleReset" round>重置</el-button>
    </el-dialog>
  </div>
</template>
<script>
import api from "@/api/user";
export default {
  model: {
    prop: "visible",
    event: "change"
  },
  props: {
    visible: Boolean,
    type: {
      type: String,
      default: "add" // add or edit
    },
    initForm: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    initForm(form) {
      console.log(this.type, "type");
      if (this.type === "add") {
        this.resetForm();
        return;
      }
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
        zc
      } = form;
      this.fetchProvinceByPId(cnty);
      this.fetchCityPid(sheng);
      this.form = {
        delivery_name,
        delivery_en_name,
        credit_code,
        cnty: +cnty,
        sheng: +sheng,
        shi: +shi,
        delivery_attn,
        delivery_address,
        delivery_tel,
        zc
      };
    }
  },
  data() {
    return {
      formLabelWidth: "130px",
      countryList: [],
      provinceList: [],
      cityList: [],
      disProvince: false,
      disCity: false,
      form: {
        delivery_name: "", // 公司中文名
        delivery_en_name: "", // 公司英文名
        delivery_address: "", // 地址
        delivery_attn: "", // 联系人
        delivery_tel: "", // 电话
        cnty: "", // 国家/地区\
        sheng: "",
        shi: "",
        credit_code: "", // 统一社会信用代码
        zc: ""// 邮编
      },
      muves: [
        {
          value: 1,
          label: "收货地址"
        },
        {
          value: 2,
          label: "进口商地址"
        }
      ]
    };
  },
  created() {
    this.fetchAllCountry();
  },
  methods: {
    resetForm() {
      this.form = {
        delivery_name: "", // 公司中文名
        delivery_en_name: "", // 公司英文名
        delivery_address: "", // 地址
        delivery_attn: "", // 联系人
        delivery_tel: "", // 电话
        cnty: "", // 国家/地区
        sheng: "",
        shi: "",
        credit_code: "", // 统一社会信用代码
        zc: "" // 邮编
      };
    },
    handleBeforeClose() {
      this.$emit("change", false);
    },
    // 重置
    handleReset() {
      this.resetForm();
      this.provinceList = [];
      this.cityList = [];
    },
    async handlePostCreateUser() {
      try {
        const result = await api.receivingimaddto({});
        if (result.code === 1) {
          return true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 保存
    handleConfirm() {
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
            this.$message({
              type: "success",
              message: type === "add" ? "新增成功" : "修改成功"
            });
            this.$emit("change", false);
            this.$emit("success");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    initCondition() {
      const {
        cnty,
        sheng,
        shi,
        delivery_name,
        delivery_en_name,
        credit_code,
        delivery_attn,
        delivery_address,
        delivery_tel,
        zc
      } = this.form;
      console.log(this.form);
      const res = {
        cnty: cnty,
        sheng,
        shi,
        delivery_name,
        delivery_en_name,
        credit_code,
        delivery_attn,
        delivery_address,
        delivery_tel,
        zc
      };
      if (this.type !== "add") {
        res.id = this.initForm.id;
      }

      return res;
    },
    async postCreate() {
      try {
        const result = await api.Shippingaddressadddisplay(this.initCondition());
        if (result.code === 1) {
          return true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async postEdit() {
      try {
        const result = await api.Shippingaddressmodisdisplay(this.initCondition());
        if (result.code === 1) {
          return true;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async fetchRegion(id = 0) {
      try {
        const result = await api.Urbanthreelinkage({
          id
        });
        console.log(result, "result");
        if (result.code === 1) {
          return result.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchAllCountry() {
      const result = await this.fetchRegion();
      if (result) {
        this.countryList = result.map(it => ({
          value: it.id,
          label: it.country
        }));
      }
    },
    async fetchProvinceByPId(countryId) {
      const result = await this.fetchRegion(countryId);
      if (result) {
        this.disProvince = result.length <= 0;
        this.disCity = result.length <= 0;
        this.provinceList = result.map(it => ({
          value: it.id,
          label: it.state || it.city || it.region
        }));
      }
    },
    async fetchCityPid(pId) {
      const result = await this.fetchRegion(pId);
      if (result) {
        this.disCity = result.length <= 0;
        this.cityList = result.map(it => ({
          value: it.id,
          label: it.state || it.city || it.region
        }));
      }
    },
    handleCountryChange(id) {
      this.form.sheng = "";
      this.form.shi = "";
      this.cityList = [];
      this.fetchProvinceByPId(id);
    },
    handleProvinceChange(id) {
      this.form.shi = "";
      this.fetchCityPid(id);
    },
    handleCityChange(cId) {
      console.log(cId)
    }
  }
};
</script>

<style lang="scss" scoped>
.selectwidht {
  width: 100%;
}
</style>
