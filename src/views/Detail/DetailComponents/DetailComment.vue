<template>
  <div id="comment">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>
    <div class="comment-bottom">
      <div class="comment-user" v-if="comment.user">
        <img :src="comment.user.avatar" alt="">
        <span>{{comment.user.uname}}</span>
      </div>
      <p class="com-content">
        {{comment.content}}
      </p>
      <div class="com-style">
        <span>{{comment.created | timeDate}}</span>
        <span>{{comment.style}}</span>
      </div>
      <div class="com-buyerShow">
        <img v-for="item in comment.images" :src="item">
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from "../../../JS/utils";

  export default {
    name: "DetailComment",
    props:{
      comment:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    filters:{
      timeDate:value=>{
        let date = new Date(value * 1000);
        return formatDate(date, 'yyyy-MM-dd') ;
      }
    }
  }
</script>

<style scoped>
  #comment{
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
    width: 100%;
  }
  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  .info-header .header-title {
    float: left;
    font-size: 15px;
  }

  .info-header .header-more {
    float: right;
    margin-right: 10px;
    font-size: 13px;
  }
  .comment-user{
    padding: 10px 0 5px;
  }
  .comment-user img{
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }
  .comment-user span{
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
  }
  .com-content{
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }
  .com-style{
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }
  .com-style :first-child{
    margin-right: 8px;
  }
  .com-buyerShow{
    margin-top: 10px;
  }
  .com-buyerShow img{
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>
