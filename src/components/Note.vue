<template>
  <div class="note" ref="note" :class="{moving:isMoving}">
    <div class="title" @mousedown="catchNote"
         @mouseup="fixNote"
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
    props: ['id', 'time', 'content'],
    data() {
      return {
        showDelete: false,
        disX: 0,
        disY: 0,
        isMoving: false
      }
    },
    methods: {
      deleteNote() {
        this.eventBus.$emit('delete', this.id)
      },
      catchNote(e) {

        this.isMoving = true
        let note = this.$refs.note
        let {top, left} = note.getBoundingClientRect()
        this.$refs.note.style.position = 'absolute'
        note.style.left = left + 'px'
        note.style.top = top + 'px'
        this.disX = e.clientX - note.offsetLeft;
        this.disY = e.clientY - note.offsetTop;
      },
      fixNote() {
        this.isMoving = false
        console.log('不动')
      },
      moveNote(e) {
        let note = this.$refs.note
        let {height, width} = note.getBoundingClientRect()
        note.style.left = e.pageX - this.disX + 'px'
        note.style.top = e.pageY -this.disY+ 'px'
        console.log(document.body.clientWidth);
        let currentLeft=parseInt( note.style.left)
        if(currentLeft+width>document.body.clientWidth){
          note.style.left=document.body.clientWidth-width-20+'px'
          this.fixNote()
        }
      }
    },
    watch: {
      isMoving(newValue) {
        if (newValue) {
          document.onmousemove = this.moveNote
          document.addEventListener('mouseup', this.fixNote)
        } else if (!newValue) {
          document.onmousemove = null
          document.removeEventListener('mouseup', this.fixNote)

        }
      }
    },
    mixins: [mixin],
    inject: ['eventBus']

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

  .note.moving{
    opacity: 0.8;
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

  .icon {
    fill: #4d4d4d
  }
</style>
