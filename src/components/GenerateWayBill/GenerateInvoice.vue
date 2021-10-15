<template>
  <div>
    <div>
      <div class="container-dasf">生成发票</div>
      <div class="psoetcontent">
        <div class="titleHeader">INVOICE</div>
        <div class="formnameclass">SHIPPER 发货人</div>
        <el-form
          label-suffix=":"
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
        >
          <el-form-item
            label="CORP NAME 公司名称"
            class="formWidtheit"
            :label-width="formLabelWidth"
          >
            <el-input  disabled v-model="formInline.delivery_name"></el-input>
          </el-form-item>
          <el-form-item
            label="ADDRESS 地址"
            class="formWidtheit"
            :label-width="formLabelWidth"
          >
              <el-select  disabled v-model="formInline.delivery_address" style="width: 100%"  @change="handleRdaskdChange">
              <el-option
                v-for="it in sendPieceList"
                :key="it.id"
                :label="it.label"
                :value="it.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item  label="ATTENTION 姓名" :label-width="formLabelWidth">
            <el-input disabled  v-model="formInline.delivery_attn"></el-input>
          </el-form-item>
          <el-form-item label="TEL 电话">
            <el-input  disabled v-model="formInline.delivery_tel"></el-input>
          </el-form-item>
          <el-divider />
          <div class="formFlexname">
            <div class="formnameclass">IMPORTER 进口商</div>
            <div class="fromLeftfex">
              <div><el-checkbox label="与面单收件公司相同" name="type" /></div>
            </div>
          </div>
          <el-form-item
            label="CORP NAME 公司名称"
            class="formWidtheit"
            :label-width="formLabelWidth"
          >
            <el-input disabled v-model="formInline.import_name"></el-input>
          </el-form-item>
          <el-form-item
            label="ADDRESS 地址"
            class="formWidtheit"
            :label-width="formLabelWidth"
          >
            <el-select v-model="formInline.import_address" style="width: 100%"  @change="handleCountryChange">
              <el-option
                v-for="it in pickupList"
                :key="it.id"
                :label="it.label"
                :value="it.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="ATTENTION 姓名" :label-width="formLabelWidth">
            <el-input  disabled v-model="formInline.import_attn"></el-input>
          </el-form-item>
          <el-form-item  label="TEL 电话">
            <el-input disabled v-model="formInline.import_tel"></el-input>
          </el-form-item>
          <el-divider />
          <div class="fromContent">
            <div>
              <el-form-item>
                <div class="fromRadiogrous">
                  <el-radio
                    v-model="resource"
                    label= "1"
                  >COMMERCIAL VALUE 有商业价值</el-radio>
                  <el-radio
                    v-model="resource"
                    label= "0"
                  >COMMERCIAL VALUE 无商业价值</el-radio>
                </div>
              </el-form-item>
            </div>
            <div class="fromCodenameeig">
              <el-form-item label="TAXPAYER NUMBER 纳税人编号：">
                <el-input v-model="formInline.account_no"></el-input>
              </el-form-item>
              <el-form-item label="INCOTERM(贸易方式)：">
                <el-select disabled v-model="formInline.incoterm">
                  <el-option
                    v-for="it in muves"
                    :key="it.value"
                    :label="it.label"
                    :value="it.value"
                  />
                </el-select>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div class="btmtitle">商品清单</div>
      <div class="rombottom">
        <el-table
          :data="list"
          align="center"
          border
          class="sfTableList"
          @selection-change="handleSelectionChange"
          :header-cell-style="{ background: '#F0F0F0', color: '#000000' }"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column
            prop="good_code"
            align="center"
            label="商品/自定义"
            min-width="175"
          />
          <el-table-column
            prop="en_name"
            align="center"
            label="商品名称(英文)"
            min-width="250"
          />
          <el-table-column
            prop="cn_name"
            align="center"
            label="商品名称(中文)"
            min-width="140"
          />
          <el-table-column
            prop="en_material"
            align="center"
            label="材质/工艺/用途(英文)"
            min-width="250"
          />
          <el-table-column
            prop="cn_material"
            align="center"
            label="材质/工艺/用途(中文)"
            min-width="250"
          />
          <el-table-column
            prop="model"
            align="center"
            label="款号"
            min-width="250"
          />
          <el-table-column
            prop="customs_code"
            align="center"
            label="商品海关编码HS CODE"
            min-width="250"
          />
          <el-table-column
            prop="num"
            align="center"
            label="数量"
            min-width="100"
          >
          <template slot-scope="{ row }">
           <el-input v-model="row.num "/>
           </template>
          </el-table-column>
          <el-table-column
            prop="asin"
            align="center"
            label="ASIN码"
            min-width="100"
          >
          <template slot-scope="{ row }">
          <el-input v-model="row.asin"/>
          </template>
          </el-table-column>
          <el-table-column
           prop="price"
            align="center"
            label="单价"
            min-width="70"
          >
          <template slot-scope="{ row }">
          <el-input v-model="row.price "/>
          </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="币种"
            min-width="150"
          >
          <template slot-scope="{ row }">
           <el-select v-model="row.currency_id" >
              <el-option
                v-for="it in currencyList"
                :key="it.value"
                :label="it.label"
                :value="it.value"
              />
            </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="to_price"
            align="center"
            label="金额"
            min-width="70"
          >
            <template slot-scope="{ row }">
              {{ getTypeNUbel(row.to_price ) }}
            </template>
          </el-table-column>
           <el-table-column
            align="center"
            label="操作"
            min-width="280"
          >
          <template slot-scope=" { row }">
          <!-- <el-button size="mini"
           @click="postCreate(row)"
             round><i class="el-icon-edit"></i
          ></el-button> -->
          <el-button
            size="mini"
            @click="handleEdit( row)"
            v-model="row.$index"
            ><i class="el-icon-edit"/>
            修改
          </el-button>
          <el-button
          size="mini"
            icon="el-icon-delete"
            v-model="row.$index"
            @click="handleCancle( row)"
            >保存
          </el-button>
          <el-button size="mini" @click="postDelete(row)" round><i class="el-icon-delete"></i
          > 删除</el-button>
          </template>
           </el-table-column>
        </el-table>
        <div>
          <el-button type="primary" @click="postAdd" round>添加</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/user";
export default {
  data() {
    return {
      formLabelWidth: "170px",
      active: 0,
      list: [],
      sendPieceList: [], // 发件地址列表
      pickupList: [], // 收件地址列表
      currencyList: [], // 币种
      resource: "1",
      muves: [
        {
          value: 1,
          label: "POB"
        }
      ],
      form: {
        good_code: "123", // 商品/自定义
        en_name: "123 ", // 商品名称(英文)
        cn_name: " 123", // 商品名称(中文)
        en_material: "123 ", // 材质/工艺/用途(英文)
        cn_material: "123", // 材质/工艺/用途(中文)
        model: " 123", // 款号
        customs_code: "123", // 商品海关编码HS CODE
        num: 1, // 数量
        asin: "123", // ASIN码
        price: "123", // 单价
        currency_id: 1, // 币种
        to_price: "123" // 金额
      },
      formInline: {
        import_address: "", // 进口商地址
        delivery_address: "", // 发货人地址
        resource: 1, // 商业价值1有0无
        delivery_name: "", // 发货公司名称
        import_tel: "", // 进口TEL
        import_name: "", // 进口商公司名
        delivery_attn: "", // 发货人姓名
        delivery_tel: "", // 发货人TEL
        account_no: "", // 纳税人编号
        incoterm: 1 // pob

      },
      lists: {},
      typeform: {} // from && type
    };
  },
  created() {
    this.fetchList()
    this.fetchCurrencyList()
    this.fetchSendPieceList()
    this.fetchPikupList()
    const typeforms = localStorage.getItem("typeformone")
    this.typeform = typeforms ? JSON.parse(typeforms) : {}
    console.log(this.typeform, "this.typeformthis.typeformthis.typeform")
    this.fetchAssignment()
  },
  methods: {
    handleChange() {},
    // 当选择项发生变化时会触发该事件
    handleSelectionChange(rows) {
      this.selectIds = rows.map(it => it.id);
      console.log(this.selectIds, " this.selectIds this.selectIds this.selectIds this.selectIds this.selectIds this.selectIds")
    },
    // 添加
    postAdd() {
      const newValue = {
        good_code: "", // 商品/自定义
        en_name: " ", // 商品名称(英文)
        cn_name: " ", // 商品名称(中文)
        en_material: " ", // 材质/工艺/用途(英文)
        cn_material: "", // 材质/工艺/用途(中文)
        model: " ", // 款号
        customs_code: "", // 商品海关编码HS CODE
        num: "", // 数量
        asin: "", // ASIN码
        price: "", // 单价
        currency_id: 1, // 币种
        to_price: "" // 金额
      };
      // 添加新的行数
      this.list.push(newValue);
    },
    handleEdit(index, row) {
      console.log(index, row, "修改row")
      this.lists = JSON.parse(JSON.stringify(row));
      console.log(this.lists, "lists")
    },
    handleCancle(index, row) {
      console.log(index, row, "保存row")
      let prevContent = this.prevValue.good_code;
      this.$set(row, "good_code", prevContent);
    },
    // 删除
    postDelete(row) {
      console.log(row.id, "删除ididididididiidid")
      this.$confirm("是否删除?", "提示", {
        distinguishCancelAndClose: true,
        cancelButtonText: "取消",
        confirmButtonText: "确定"
      })
        .then(async () => {
          try {
            const result = await api.ProductDeletion({
              id: row.id
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
    async fetchList() {
      try {
        this.isloading = true;
        const res = await api.CommodityInformationQuery();
        if (res.code === 1) {
          this.list = res.data.list;
          console.log(this.list, "resdasdasdasdasdasdasdasdasdasdasdasd")
          // this.list = res.data
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.isloading = false;
      }
    },
    handleCountryChange(id) {
      const result = this.pickupList.find(it => it.id === id)
      if (result) {
        this.formInline.import_name = result.import_name
        this.formInline.import_tel = result.import_tel
        this.formInline.import_attn = result.import_attn
      }
    },
    async fetchCurrencyList() {
      try {
        this.isloading = true;
        const res = await api.CommodityInformationQuery();
        if (res.code === 1) {
          this.currencyList = res.data.currency.map(it => ({
            label: it.chinese_name,
            value: it.id
          }));
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.isloading = false;
      }
    },
    handleRdaskdChange(id) {
      const result = this.sendPieceList.find(it => it.id === id)
      if (result) {
        this.formInline.delivery_attn = result.delivery_attn;
        this.formInline.delivery_tel = result.delivery_tel;
        this.formInline.delivery_address = result.label;
        this.formInline.delivery_name = result.delivery_name;
      }
    },
    async fetchSendPieceList() {
      try {
        const res = await api.InformationFillinthedisplay();
        if (res.code === 1) {
          this.sendPieceList = res.data.from.map(it => ({
            label: it.delivery_address,
            id: it.id,
            delivery_attn: it.delivery_attn,
            delivery_tel: it.delivery_tel,
            delivery_name: it.delivery_name
          }));
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchPikupList() {
      try {
        const res = await api.InformationFillinthedisplay();
        if (res.code === 1) {
          console.log(res, "=-=-=-=-=res=--=res=-res-=v=v-=res=res=resres-=-=-=")
          this.pickupList = res.data.to.map(it => ({
            label: it.import_address,
            id: it.id,
            import_name: it.import_name,
            import_tel: it.import_tel,
            import_attn: it.import_attn
          }));
        }
      } catch (error) {
        console.log(error);
      }
    },
    getTypeNUbel(row) {
      // (obj.a * obj.b).toFixed(2)
      // row.to_price = (row.num * row.price).toFixed(2)
      // console.log(row, "rowswswswss")
    },
    async fetchAssignment() {
      const { type, form } = this.typeform
      if (type === 1) {
        this.formInline.delivery_name = form.delivery_name
        this.formInline.delivery_attn = form.from_name
        this.formInline.import_name = form.import_name
        this.formInline.delivery_tel = form.TEL_lsifst
        this.formInline.import_attn = form.to_name
        this.formInline.import_tel = form.telshfh
        this.formInline.import_address = form.lissaafjh
        this.formInline.delivery_address = form.form_lissaafjh
      }
    },
    getlccStorrrtwo() {
      const typeformtwo = { form: this.form, type: 2 }
      localStorage.setItem("typeformtwo", JSON.stringify(typeformtwo))
    },
    getForm() {
      return {
        type: 2,
        form: {
          ...this.form
        },
        formInline: {
          ...this.formInline
        },
        listing_id: {
          ...this.selectIds
        }
      };
    }
  }
};
</script>
<style lang="scss">
.wblten-container {
  min-width: 80%;
  // height: 1500px;
  background: #ffffff;
  box-shadow: 0px 0px 5px 0px rgba(153, 153, 153, 0.05);
  border-radius: 16px;
  font-family: Source Han Sans SC;
  color: #000;
  .toporders {
    width: 100%;
  }
  .psoetcontent {
    // width: 980px;
    // height: 990px;
    background: #ffffff;
    border: 1px solid #dedede;
    padding: 20px 30px 50px 20px;
    .slectItem {
      .el-form-item__content,
      .el-form-item {
        display: block;
      }
    }
    .titleHeader {
      height: 30px;
      text-align: center;
      font-size: 14px;
      font-family: Source Han Sans SC;
      font-weight: bold;
      color: #000000;
    }
    .formWidtheit {
      width: 100%;
      & > .el-form-item__content {
        width: 70%;
      }
    }
    .formnameclass {
      font-size: 14px;
      font-family: Source Han Sans SC;
      font-weight: bold;
      color: #000000;
    }
    .fromContent {
      display: flex;
      justify-content: space-between;
      .fromRadiogrous {
        height: 100px;
        flex-direction: column;
        display: flex;
        justify-content: space-around;
        margin-left: 200px;
      }
      .fromCodenameeig {
        height: 100px;
        margin-right: 300px;
        flex-direction: column;
        display: flex;
        justify-content: space-around;
      }
    }
    .formFlexname {
      display: flex;
      justify-content: space-between;
      // .fromLeftfex{
      //   width: 300px;
      //   display: flex;
      //   justify-content: space-around;
      // }
    }
  }
  .container-dasf {
    // width: 979px;
    // height: 50px;
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
    // width: 980px;
    // height: 220px;
    background: #ffffff;
    border: 1px solid #dedede;
    padding: 20px 30px 50px 20px;
  }
  .btmtitle {
    //  width: 979px;
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
