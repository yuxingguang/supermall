/**
 * @desc 防抖函数，返回经防抖包装的处理方法
 * @param func 待处理的方法
 * @param wait 等待时间
 * @param immediate true表示前沿触发，而默认false表示后沿触发
 */
export default debounce;
function debounce(func,wait,immediate=false) {
  let timer = null;

  return function (...args) {
    const context = this;
    if(timer){
      clearTimeout(timer);
    }
    if(immediate){
      let callNow = !timer;
      timer = setTimeout(()=>{
        timer = null;
      },wait);
      if(callNow) func.apply(context,...args);
    }else{
      timer = setTimeout(()=>{
        func.apply(context,...args);
      },wait);
    }
  }
}
