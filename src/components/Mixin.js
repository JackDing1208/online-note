export default {
  computed: {
    createTime() {
      let year = new Date().getFullYear()
      let month = new Date().getMonth() + 1
      let date = new Date().getDate()
      let hour = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()
      let min = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
      let time = year + '年' + month + '月' + date + '日 ' + ' ' + hour + ':' + min
      return time
    }
  },
  methods: {
    getTime(){
      let year = new Date().getFullYear()
      let month = new Date().getMonth() + 1
      let date = new Date().getDate()
      let hour = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()
      let min = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
      let time = year + '年' + month + '月' + date + '日 ' + ' ' + hour + ':' + min
      return time
    }
  },
  filters:{
    format(text){
      let reg=new RegExp("<br/>","g");
      let stt= text.replace(reg,"\r\n");
      return stt
    }
  }
}
