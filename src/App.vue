<template>
  <div id="app">
    <Top></Top>
    <NoteList></NoteList>
  </div>
</template>

<script>
  import Top from './components/Top'
  import Note from './components/Note'
  import NoteList from './components/NoteList'
  import Vue from 'vue'
  export default {
    name: 'App',
    data(){
      return{
        eventBus:new Vue
      }
    },
    provide(){
      return{
        eventBus: this.eventBus
      }
    },
    components: {
      Top,Note,NoteList
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #app{
    background-image: url("https://s2.ax1x.com/2019/06/09/VrB0BR.jpg");
    background-repeat:no-repeat ;
    background-position: center;
    background-size: cover;
    background-attachment:fixed;
    min-height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }


  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
