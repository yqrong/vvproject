/**
 * Created by yqr on 2018/4/13.
 */
import * as API from './'

export default {
  //查询列表
  findList: params => {
    return API.GET('/json', params)
  },
  findById: id => {
    return API.GET(`/api/enterprise/list/${id}`)
  }
}
