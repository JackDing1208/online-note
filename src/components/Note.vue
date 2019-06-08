<template>
  <div class="note" refs="note">
    <div class="title" @mousedown="moveNote"
         @mouseenter="showDelete=true"
         @mouseleave="showDelete=false">
      <div class="time">{{createTime}}</div>
      <div class="delete" @click.stop="deleteNote" v-if="showDelete">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-closes"></use>
        </svg>
      </div>
    </div>

    <div class="content" contenteditable="true">{{content}}</div>
  </div>
</template>

<script>
  import '../assets/svg'
  import mixin from './Mixin'
  export default {
    name: "note",
    props:['id','time','content'],
    data(){
      return{
        showDelete:false
      }
    },
    methods:{
      deleteNote(){
        this.eventBus.$emit('delete',this.id)
      },
      moveNote(e){

      }
    },
    mixins:[mixin],
    inject:['eventBus']

  }
</script>

<style scoped>
  .note {
    padding: 0.5em 0.5em;
    width: 15em;
    background: bisque;
    color: #4d4d4d;
    border-radius: 5px;
    border: 1px solid #aaa;
    margin-bottom: 20px;
  }

  .title {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #aaa;
    padding-bottom: 5px;
  }

  .title:hover {
    background: bisque;
    cursor: pointer;
  }

  .content {
    padding-top: 5px;
    min-height: 3em;
  }

  .content:focus {
    outline: none;
  }

  .icon{
    fill:#4d4d4d
  }
</style>
