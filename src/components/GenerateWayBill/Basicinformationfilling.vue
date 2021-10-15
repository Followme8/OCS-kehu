<template>
  <div>
    <div class="container-dasf">SHIPPER'S ACCOUNT 发件人账号</div>
    <div class="psoetcontent">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="ACCOUNT 账号：">
          <el-input disabled v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="SERVICE 服务类型：">
          <el-select disabled v-model="form.service_id" >
            <el-option
              v-for="it in muves"
              :key="it.value"
              :label="it.label"
              :value="it.value"
            />
          </el-select>
        </el-form-item>
        <div>
          <el-form-item label="PRODUCT 产品类型：">
              <el-radio disabled v-model="product" label="DOC 文件"></el-radio>
              <el-radio disabled  v-model="product" label="SPS 包裹"></el-radio>
          </el-form-item>
          <el-form-item label="PIECES 件数：">
            <el-input v-model="form.pieces_num"></el-input>
          </el-form-item>
        </div>
        <div class="slectItem">
          <p>FROM(SHIPPER) 由(发件公司) ：</p>
          <el-form-item>
            <el-select v-model="form.opsef" style="width: 100%"   @change="handleRdaskdChange">
              <el-option
                v-for="it in sendPieceList"
                :key="it.id"
                :label="it.label"
                :value="it.id"
              />
            </el-select>
          </el-form-item>
        </div>
        <div class="slectItem">
          <p>DETAILED ADDRESS 详细地址：</p>
          <el-form-item>
            <el-input v-model="form.msiftile" />
          </el-form-item>
        </div>
        <el-form-item label="ATTN 发件人(姓名)：">
          <el-input disabled v-model="form.from_name"  ></el-input>
        </el-form-item>
        <el-form-item label="TEL 电话：">
          <el-input disabled v-model="form.TEL_lsifst"></el-input>
        </el-form-item>
        <div>
          <el-form-item label="Remark 发件人备注：">
            <el-input v-model="form.from_remaek"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="TO(CONSIGNEE) 至(收件公司) ：">
          <el-checkbox label="AMAZON FBA" v-model="resourowpqecew"></el-checkbox>
        </el-form-item>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
          v-if="resourowpqecew !== false"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <div class="slectItem">
          <el-form-item>
            <!-- <el-input v-model="form.accasi_sj" placeholder="MORRIN JAPAN CO,LTD" /> -->
            <el-select v-model="form.resourowpqece" style="width: 100%" @change="handleCountryChange">
              <el-option
                v-for="it in pickupList"
                :key="it.id"
                :label="it.label"
                :value="it.id"
              />
            </el-select>
          </el-form-item>
        </div>
        <div class="slectItem">
          <p>DETAILED ADDRESS 详细地址：</p>
          <el-form-item>
            <el-input v-model="form.fliefc"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="CNTY/REGN 国家/地区：">
            <el-input disabled v-model="form.lissaafjh"></el-input>
          </el-form-item>
          <el-form-item label="P.C 邮编：">
            <el-input disabled v-model="form.fhsgfgg"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="ATTN 收件人：">
          <el-input disabled v-model="form.to_name" ></el-input>
        </el-form-item>
        <el-form-item label="TEL 电话：">
          <el-input disabled v-model="form.telshfh"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="btmtitle">DESCRIPTION CONTENTS 物品描述</div>
    <div class="rombottom">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <div>
          <el-form-item label="PAYMENT 付费类型：">
            <el-checkbox v-model="payment" disabled>PP 预付</el-checkbox>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="INSURANCE 是否保险：">
            <el-radio disabled v-model="formRadio" label="是"></el-radio>
            <el-radio disabled v-model="formRadio" label="否"></el-radio>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="TARIFF PAYMENT METHOD 关税支付：">
            <el-checkbox
              v-model="Duty"
              label="DUTY-TAX BY SHIPPER 关税由发件人支付"
              >PP 预付</el-checkbox
            >
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import api from "@/api/user";
export default {
  data() {
    return {
      active: 0,
      payment: true,
      Duty: false,
      resourowpqecew: false,
      formRadio: "否",
      product: "SPS 包裹",
      sendPieceList: [], // 发件地址列表
      pickupList: [], // 收件地址列表
      muves: [], // 服务类型
      form: {
        username: "", // 账户名
        service_id: 1, // 服务类型id
        product: 0, // 产品类型id
        pieces_num: "", // 件数
        opsef: "", // FROM(SHIPPER) 由(发件公司) ：
        msiftile: "", // DETAILED ADDRESS 详细地址：
        from_company: "", // 发件人id
        TEL_lsifst: "", // 发件人 TEL ：
        from_remaek: "", // 发件人备注
        resourowpqece: "", // TO(CONSIGNEE) 至(收件公司) ：
        // accasi_sj: "",  图片
        fliefc: "", // DETAILED ADDRESS 详细地址：
        lissaafjh: "", // CNTY/REGN 国家/地区：
        form_lissaafjh: "",
        fhsgfgg: "", // P.C 邮编：
        to_company: 1, // 收件人id
        telshfh: "", // 收件人tel
        payment: "pp", // 付费类型
        insurance: 0, // 是否保险:1是0否
        Duty: 0, // 关税支付:1是0否
        delivery_name: "",
        import_name: ""
      },
      // product: [
      //   {
      //     value: 1,
      //     label: "DOC文件"
      //   },
      //   {
      //     value: 0,
      //     label: "SPS包裹"
      //   }
      // ],
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ]
    };
  },
  created() {
    this.fetchSendPieceList();
    this.fetchPikupList();
    this.getSaveForm();
    this.fetchStatusId();
    this.fetchUserName()
  },
  methods: {
    // 获取已经保存的表单
    getSaveForm() {},
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleCountryChange(id) {
      const result = this.pickupList.find(it => it.id === id)
      if (result) {
        this.form.lissaafjh = result.label
        this.form.fhsgfgg = result.fhsgfgg
        this.form.to_name = result.to_name
        this.form.telshfh = result.telshfh
        this.form.to_company = result.id
        this.form.import_name = result.import_name
      }
    },
    handleRdaskdChange(id) {
      const result = this.sendPieceList.find(it => it.id === id)
      if (result) {
        this.form.from_company = result.id
        this.form.TEL_lsifst = result.TEL_lsifst
        this.form.from_name = result.from_company
        this.form.delivery_name = result.delivery_name
        this.form.form_lissaafjh = result.label
      }
    },
    async fetchPikupList() {
      try {
        const res = await api.InformationFillinthedisplay();
        if (res.code === 1) {
          this.pickupList = res.data.to.map(it => ({
            label: it.import_address,
            id: it.id,
            lissaafjh: it.cnty + it.sheng + it.shi,
            to_name: it.import_attn,
            telshfh: it.import_tel,
            fhsgfgg: it.zc,
            import_name: it.import_name
          }));
          // console.log(this.pickupList, "pickupListpickupListpickupListpickupList")
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchSendPieceList() {
      try {
        const res = await api.InformationFillinthedisplay();
        if (res.code === 1) {
          console.log(res, "=-=-=-=-=-=-=-=-resres-=-=-=-==-")
          this.sendPieceList = res.data.from.map(it => ({
            label: it.delivery_address,
            id: it.id,
            from_company: it.delivery_attn,
            TEL_lsifst: it.delivery_tel,
            delivery_name: it.delivery_name
          }));
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchUserName() {
      try {
        const res = await api.InformationFillinthedisplay();
        if (res.code === 1) {
          this.form.username = res.data.name
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchStatusId() {
      try {
        const res = await api.InformationFillinthedisplay();
        if (res.code === 1) {
          this.muves = res.data.status.map(it => ({
            label: it.chinese_status + "-" + it.code,
            value: it.id
          }));
        }
      } catch (error) {
        console.log(error);
      }
    },
    async handleReset() {
      this.form = {
        service_id: 1, // 服务类型id
        product: 0, // 产品类型id
        pieces_num: "", // 件数
        opsef: "", // FROM(SHIPPER) 由(发件公司) ：
        msiftile: "", // DETAILED ADDRESS 详细地址：
        from_company: "", // 发件人id
        TEL_lsifst: "", // 发件人 TEL ：
        from_remaek: "", // 发件人备注
        resourowpqece: "", // TO(CONSIGNEE) 至(收件公司) ：
        // accasi_sj: "",  图片
        fliefc: "", // DETAILED ADDRESS 详细地址：
        lissaafjh: "", // CNTY/REGN 国家/地区：
        fhsgfgg: "", // P.C 邮编：
        to_company: 1, // 收件人id
        telshfh: "", // 收件人tel
        payment: "pp", // 付费类型
        insurance: 0, // 是否保险:1是0否
        Duty: 0 // 关税支付:1是0否
      }
    },
    getlccStorrrg() {
      const typeform = { form: this.form, type: 1 }
      localStorage.setItem("typeformone", JSON.stringify(typeform))
    },
    getForm() {
      return {
        type: 1,
        form: {
          ...this.form
        }
      };
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
  .psoetcontent {
    background: #ffffff;
    border: 1px solid #dedede;
    padding: 20px 30px 50px 20px;
    .slectItem {
      .el-form-item__content,
      .el-form-item {
        display: block;
      }
    }
  }
  .container-dasf {
    line-height: 50px;
    background: #2781fd;
    font-size: 18px;
    font-weight: 400;
    margin-top: 30px;
    color: #ffffff;
    border-radius: 10px 10px 0px 0px;
    display: block;
    padding-left: 20px;
  }
  .rombottom {
    background: #ffffff;
    border: 1px solid #dedede;
    padding: 20px 30px 50px 20px;
  }
  .upload-demo {
    margin-bottom: 15px;
  }
  .btmtitle {
    height: 50px;
    line-height: 50px;
    background: #2781fd;
    font-size: 18px;
    font-weight: 400;
    margin-top: 30px;
    color: #ffffff;
    border-radius: 10px 10px 0px 0px;
    display: block;
    padding-left: 20px;
  }
}
</style>
