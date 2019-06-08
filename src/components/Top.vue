<template>
<div class="top">
  <div class="create" @click="addNote">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-close1"></use>
    </svg> 添加便签</div>
  <div class="login">GitHub登录</div>
</div>
</template>

<script>
  export default {
    name: "Top",
    inject:['eventBus'],
    methods:{
      addNote(){
        this.eventBus.$emit('add')
      }
    }
  }
</script>

<style scoped >
.top {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  font-size: 16px;
  color: #eee;
}

.create:hover{
  cursor: pointer;
}
</style>
