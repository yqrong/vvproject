/**
 * Created by yqr on 2018/4/25.
 */
var TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;

export default {
  checkTel: {
    validateTel: function(tel){
      if(TEL_REGEXP.test(tel)){
        return true;
      }
      return false;
    }
  }
}
