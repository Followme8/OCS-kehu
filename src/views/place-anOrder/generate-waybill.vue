<template>
  <div class="wblten-container">
    <el-steps finish-status="success" :active="active" simple>
      <el-step title="基础信息填写">1</el-step>
      <el-step title="生成发票">2</el-step>
      <el-step title="重量/尺寸录入（可不填）">3</el-step>
    </el-steps>
    <div class="steps">
      <keep-alive>
        <component :is="curComponent" ref="childComp" />
      </keep-alive>
    </div>
    <div class="actions">
      <el-button
        v-if="active !== 0"
        style="margin-top: 12px;"
        @click="handlePrev"
        >上一步</el-button
      >
      <el-button
        v-if="active !== 2"
        :loading="nextBtnIsloading"
        style="margin-top: 12px;"
        @click="handleNext"
        >下一步</el-button
      >
      <el-button
        v-if="active !== 0"
        style="margin-top: 12px;"
        @click="handleGetOrderNo"
        >获取单号</el-button
      >
      <el-button
        v-if="active !== 2"
        style="margin-top: 12px;"
        @click="handleResetPus"
        >重置</el-button
      >
      <el-button
        v-if="active !== 2"
        style="margin-top: 12px;"
        @click="handleRessadaetPus"
        >重置123123</el-button
      >
    </div>
  </div>
</template>
<script>
import Step1 from "@/components/GenerateWayBill/Basicinformationfilling.vue";
import Step2 from "@/components/GenerateWayBill/GenerateInvoice.vue";
import Step3 from "@/components/GenerateWayBill/WeightDimensionEntry.vue";
import api from "@/api/user";

export default {
  components: {
    Step1,
    Step2,
    Step3
  },
  data() {
    return {
      active: 0,
      curComponent: "Step1",
      comps: ["Step1", "Step2", "Step3"],
      nextBtnIsloading: false,
      gtaId: [], // 返回的基本信息id
      typeform: {},
      finieForm: {
        asin: "",
        cn_material: "",
        cn_name: " ",
        currency_id: 1,
        customs_code: "",
        en_material: " ",
        en_name: " ",
        good_code: "",
        model: " ",
        num: 1,
        price: "",
        to_price: ""
      }, // 第二个页面
      textForm: {
        account_no: "",
        delivery_address: "",
        delivery_attn: "",
        delivery_name: "",
        delivery_tel: "",
        import_address: "",
        import_name: "",
        import_tel: "",
        incoterm: 1,
        resource: 1
      },
      listing_id: [],
      asas: {}
    };
  },
  created() {
    const typeforms = localStorage.getItem("typeformone");
    this.typeform = typeforms ? JSON.parse(typeforms) : {};
  },
  methods: {
    handleRessadaetPus() {
      const childInfo = this.$refs.childComp.getForm();
      // console.log(childInfo, "childInfochildInfochildInfochildInfochildInfochildInfo")
      // console.log(this.textForm = childInfo.formInline, "231212312312312312312childInfochildInfochildInfochildInfo")
      // console.log(this.textForm.delivery_address, "numnumnumnum")
      const { type, form, formInline, listing_id } = childInfo;
      if (type === 2) {
        this.finieForm = form
        this.textForm = formInline
        this.listing_id = listing_id
        console.log(this.textForm, " this.formInline this.formInline this.formInline this.formInline")
        console.log(this.finieForm, " this.form this.form this.form this.form")
        console.log(this.listing_id, " this.listing_id this.listing_id this.listing_id this.listing_id")
        console.log(this.asas = this.finieForm.to_price, "123123123123123123123")
      }
    },
    isEmptyObject(obj) {
      return !Object.keys(obj).every(key => typeof obj[key] === "number" || !!obj[key]
      );
    },
    // handleAggregate() {},
    async handleNext() {
      const childInfo = this.$refs.childComp.getForm();
      const { type, form } = childInfo;
      if (type === 1) {
        this.$refs.childComp.getlccStorrrg();
      } else if (type === 2) {
        this.$refs.childComp.getlccStorrrtwo();
      } else {
        return
      }
      const result = this.isEmptyObject(form);
      if (result) {
        this.$message.warning("还有没有填写的表单!");
        return;
      }
      const id = await this.postSaveForm(type, form);
      // console.log(id, "postSaveFormpostSaveFormpostSaveFormpostSaveFormpostSaveForm")
      this.handleSaveStepForm(type, form, id);
    },
    async postSaveForm() {
      // TODO AJAX
      try {
        this.isloading = true;
        const res = await api.InformationFillingAndAdding(this.initCondition());
        console.log(res, "=-=-=-=-=-=-=-=-=添加信息-=-=-=-=-=-=-=-=-==-");
        if (res.code === 1) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.gtaId = res.data.id
          console.log(this.gtaId, "this.gtaIdthis.gtaIdthis.gtaIdthis.gtaId")
          this.active = this.active + 1;
          this.curComponent = this.comps[this.active];
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.isloading = false;
      }
    },
    initCondition() {
      const {
        service_id,
        insurance,
        Duty,
        to_company,
        from_remaek,
        from_company,
        pieces_num,
        product,
        payment
      } = this.typeform.form;
      const res = {
        service_id,
        insurance,
        Duty,
        to_company,
        from_remaek,
        from_company,
        pieces_num,
        product,
        payment
      };
      return res;
    },
    initCition() {
      const information_id = this.gtaId
      // const {
      //   resource,
      //   account_no,
      //   incoterm
      // } = this.textForm
      // const listing_id = this.listing_id
      // const { to_price } = this.finieForm
      // const opset = {
      //   status: 1,
      //   information_id,
      //   commercial: resource,
      //   taxpayers_code: account_no,
      //   incoterm,
      //   listing_id: listing_id,
      //   freight: "12",
      //   total_price: to_price
      // };
      const opset = {
        status: 1,
        information_id: 4,
        commercial: 1,
        taxpayers_code: "13123123",
        incoterm: "1",
        listing_id: [1, 2],
        freight: 12,
        total_price: 123
      };
      const order_id = opset.information_id
      console.log(order_id, "order_idorder_idorder_idorder_idorder_idorder_idorder_idorder_idorder_idorder_idorder_idorder_idorder_id")
      localStorage.setItem("order_id", JSON.stringify(order_id))
      return opset;
    },
    handleSaveStepForm(type, form, id) {
      if (type === 1) {
      } else if (type === 2) {
      } else if (type === 3) {
      }
    },
    handlePrev() {
      this.active = this.active - 1;
      this.curComponent = this.comps[this.active];
      localStorage.removeItem("typeformone");
      localStorage.removeItem("typeformtwo");
    },
    handlePrevs() {
      this.active = this.active - 2;
      this.curComponent = this.comps[this.active];
      localStorage.removeItem("typeformone");
      localStorage.removeItem("typeformtwo");
      localStorage.removeItem("typeformthree");
    },
    handleResetPus(type) {
      if (type !== 1) {
        this.$refs.childComp.handleReset();
      } else if (type === 2) {
      } else if (type === 3) {
      }
    },
    async handleGetOrderNo() {
      const childInfo = this.$refs.childComp.getForm();
      const { type, form } = childInfo
      if (type === 2) {
        this.$refs.childComp.getlccStorrrtwo();
      } else if (type === 3) {
        this.$refs.childComp.getlccStorrrThree();
      }
      console.log(childInfo, "childInfochildInfochildInfochildInfochildInfochildInfochildInfochildInfochildInfo")
      this.$confirm("请你确认是否下单，发送数据！", "提示", {
        distinguishCancelAndClose: true,
        cancelButtonText: "否",
        confirmButtonText: "是"
      })
        .then(async () => {
          try {
            this.postSaveOddNumbers();
          } catch (error) {
            console.log(error);
          }
        })
        .catch(() => {});
    },
    async postSaveOddNumbers() {
      try {
        const childInfo = this.$refs.childComp.getForm();
        const { type, form, formInline, listing_id } = childInfo;
        if (type === 2) {
          this.finieForm = form
          this.textForm = formInline
          this.listing_id = listing_id
        }
        const result = this.isEmptyObject(form);
        if (result) {
          this.$message.warning("还有没有填写的表单!")
          return;
        }
        const res = await api.GetDocNo(this.initCition());
        if (res.code === 1) {
          console.log(res, "运单号id运单号id运单号id运单号id运单号id运单号id运单号id运单号id")
          this.$message({
            message: "获取成功",
            type: "success"
          });
          this.handleGetOrderXiete();
        }
      } catch (error) {
        console.log(error);
      }
    },
    handleGetOrderXiete() {
      const childInfo = this.$refs.childComp.getForm();
      const { type, form } = childInfo;
      this.$confirm("是否直接进行打印", "提示", {
        distinguishCancelAndClose: true,
        cancelButtonText: "否",
        confirmButtonText: "是"
      })
        .then(async () => {
          try {
            this.$message({
              message: "选择了打印",
              type: "success"
            });
            if (type === 2) {
              this.handlePrev();
            } else if (type === 3) {
              this.handlePrevs()
            }
          } catch (error) {
            console.log(error);
          }
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss">
.wblten-container {
  background: #ffffff;
  box-shadow: 0px 0px 5px 0px rgba(153, 153, 153, 0.05);
  border-radius: 16px;
  font-family: Source Han Sans SC;
  color: #000;
  .toporders {
    width: 100%;
  }
  .formBoder {
    border: 1px solid #dedede;
    & > .el-form {
      display: flex;
      justify-content: center;
    }
  }
  .actions {
    padding: 10px 0 20px 20px;
  }
}
</style>
