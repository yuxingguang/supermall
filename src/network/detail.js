import {request} from './request'

export function getDetailData(iid){
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

export class BaseInfo {
  constructor(data) {
    this.title = data.itemInfo.title;
    this.nowPrice = data.itemInfo.lowNowPrice;
    this.showPrice = data.itemInfo.price;
    this.oldPrice = data.itemInfo.oldPrice;
    this.discountDesc = data.itemInfo.discountDesc;
    this.sales = data.columns[0];
    this.collect = data.columns[1];
    this.service = data.shopInfo.services;
  }
}
export class ShopInfo{
  constructor(shopInfo) {
    this.shopLogo = shopInfo.shopLogo;
    this.shopName = shopInfo.name;
    this.saleNum = shopInfo.cSells;
    this.goodsNum = shopInfo.cGoods;
    this.score = shopInfo.score;

  }
}

export class GoodsInfo {
  constructor(detailInfo) {
    this.desc = detailInfo.desc;
    this.key =  detailInfo.detailImage[0].key;
    this.list = detailInfo.detailImage[0].list;
  }
}

export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables[0];
  }
}
