/**
 * @desc 函数节流，wait周期内只响应func一次
 * @param func 函数
 * @param wait 延迟执行毫秒数
 */
export default  throttle;
function throttle(func, wait ,) {
  let timer = null;
  return function (...args) {
    let context = this;
    if(!timer){
      timer = setTimeout(()=>{
        func.apply(context,...args);
        timer = null;
      })
    }
  }
}
