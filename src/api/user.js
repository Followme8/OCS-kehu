import { handlePostJSON, handleGet } from "./hanlde";

export default {
  login: data => handlePostJSON("/api/login", data, undefined, false), // 登录验证，获取token
  getUserInfo: data => handlePostJSON("/api/getUserInfo", data), // 根据token 获取客户信息
  createUser: data => handlePostJSON("/api/createUser", data), // 创建子帐户
  userinitList: data => handlePostJSON("/api/userList", data), // 子帐户列 表
  userPermissionAdd: data => handlePostJSON("/api/userModify", data), // 客户子帐户（修改与删除）
  receivingimporter: data => handlePostJSON("/pkp/imp_list", data), // 收件地址/进口商展示
  receivingimpuer: data => handlePostJSON("/pkp/imp_select", data), // 收件地址/进口商修改展示
  receivingimmodify: data => handlePostJSON("/pkp/imp_edit", data), // 收件地址/进口商修改
  receivingimdetele: data => handlePostJSON("/pkp/imp_del", data), // 收件地址/进口商删除
  Urbanthreelinkage: data => handlePostJSON("/pkp/region", data), // 城市三级联动
  receivingimaddto: data => handlePostJSON("/pkp/imp_add", data), // 收件地址/进口商添加
  Shippingaddressdisplay: data => handlePostJSON("/pkp/very_list", data), // 发货地址展示
  Shippingaddressadddisplay: data => handlePostJSON("/pkp/very_add", data), // 发货地址添加
  Shippingaddressmodifydisplay: data => handlePostJSON("/pkp/very_select", data), // 发货公司修改展示
  Shippingaddressmodisdisplay: data => handlePostJSON("/pkp/very_edit", data), // 发货公司修改
  Shippingaddressdeletndisplay: data => handlePostJSON("/pkp/very_del", data), // 发货公司删除
  Commodityinformationdisplay: data => handlePostJSON("/pkp/good_list", data), // 商品信息展示
  Shippingaddressdeletnadddisplay: data => handlePostJSON("/pkp/good_add", data), // 商品信息添加
  Shippingaddressdeletnmodifydisplay: data => handlePostJSON("/pkp/good_edit_list", data), // 商品信息修改展示
  Shippingaddressdeletnmodifdisplay: data => handlePostJSON("/pkp/good_edit", data), // 商品信息修改
  Shippingaddressdeletndeletendisplay: data => handlePostJSON("/pkp/good_del", data), // 发货公司删除
  Waybilllistdisplay: data => handlePostJSON("/pkp/sing_list", data), // 运单列表展示
  Waybilllistdeletdisplay: data => handlePostJSON("/pkp/sing_del", data), // 运单删除
  Waybilllistmodisfydisplay: data => handlePostJSON("/pkp/edit_list", data), // 已下单修改
  Waybilllistsendoutdisplay: data => handlePostJSON("/pkp/send_list", data), // 发送数据展示
  Waybilllsenddata: data => handlePostJSON("/pkp/send", data), // 发送数据
  InformationFillingAndAdding: data => handlePostJSON("/pkp/action_add", data), // 基础信息填写添加
  InformationFillinthedisplay: params => handleGet("/pkp/action_list", params), // 基础信息填写展示
  CommodityModification: data => handlePostJSON("/pkp/goods_edit", data), // 商品修改
  ProductAddition: data => handlePostJSON("/pkp/goods_add", data), // 商品添加
  CommodityInformationQuery: params => handleGet("/pkp/goods_select", params), // 商品信息查询
  InvoiceDisplay: data => handlePostJSON("/pkp/invoice", data), // 发票展示
  ProductDeletion: data => handlePostJSON("/pkp/goods_del", data), // 商品删除
  ImporterModification: data => handlePostJSON("/pkp/to_edit", data), // 进口商修改
  GetDocNo: data => handlePostJSON("/pkp/order_add", data), // 获取单号
  NewWaybillWeight: data => handlePostJSON("/pkp/weight_add", data), // 新增运单重量
  ModifyWaybillWeight: data => handlePostJSON("/pkp/weight_edit", data), // 修改运单重量
  WeightDeletion: data => handlePostJSON("/pkp/weight_del", data), // 重量删除
  GeneratedOrderOfWeight: data => handlePostJSON("/pkp/order_no", data), // 重量的生成订单
  WaybillWeightDisplay: data => handlePostJSON("/pkp/weight_list", data) // 运单重量展示

}
