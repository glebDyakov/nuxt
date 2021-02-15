import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
export const state=() => ({
  token:true
})
export const actions={
  async createUser({commit},formData){

  },
  async login({commit,dispatch},formData){
    try{
      const token = await new Promise(resolve,reject => {
        setTimeout(()=> resolve('mock-token'),2000)
      })
      dispatch("setToken",token)
    }catch(e){
      commit('setError',e,{root:true})
    }
  },
setToken({commit},token){
  this.$axios.setToken(token,"Bearer")
  commit("setToken",token)
  Cookies.set('jwt-token',token)
},
logout({commit}){
  this.$axios.setToken(token,false)
  commit("clearToken")
  Cookies.remove('jwt-token')
},
autologin({dispatch}){
  const cookieStr=process.browser ? document.cookie : this.app.context.req.headers.cookie
  const cookies=Cookie.parse(cookieStr || '') || {}
  const token=cookies['jwt-token']
  if(ifJWTValid(token)){
    dispatch("setToken",token)
  }else{
    dispatch("logout")
  }
}
}
export const mutations={
  setToken(state,token){
    state.token=token
  },
  clearToken(state){
    state.token=null
  }
}
export const getters={
  isAuthenticated:(state)=>state.token,
  token:state => state.token
}

function isJWTValid(token){
  if(!token){
    return false

  }
  const jwtData=jwtDecode(token) || {}
  const expires=jwtData.exp || 0
  return (new Date().getTime() / 1000) < expires
}
