<template>
  <div class="note" ref="note" :class="{moving:isMoving}">
    <div class="move" @mousedown="catchNote" @mouseup="fixNote"></div>
    <div class="title"
         @mouseenter="showDelete=true"
         @mouseleave="showDelete=false">
      <div class="time">{{time}}</div>
      <div class="delete" @click.stop="deleteNote" v-if="showDelete">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-closes"></use>
        </svg>
      </div>
    </div>

    <div class="content" contenteditable="true" ref="text"
         @blur="editNote" @input="saveText">{{content}}
    </div>
  </div>
</template>

<script>
  import '../assets/svg'
  import mixin from './Mixin'
  import axios from 'axios'
  import url from '../assets/url'

  export default {
    name: "note",
    props: ['id', 'time', 'content'],
    data() {
      return {
        text: this.content,
        showDelete: false,
        disX: 0,
        disY: 0,
        isMoving: false,
      }
    },
    mounted() {
      let note = this.$refs.note
      let {height,top,left} = note.getBoundingClientRect()
      let n = parseInt( height / 10) + 1
      note.style.gridRow= `span ${n}`
      // 自动布局实现方案有待调整
      // this.$nextTick(()=>{
      //   this.$refs.note.style.position = 'absolute'
      //   note.style.left = left -10 + 'px'
      //   note.style.top = top-10 + 'px'
      // })

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
        this.$refs.note.style.zIndex = '1'
        note.style.left = left -10 + 'px'
        note.style.top = top-10 + 'px'
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
        note.style.top = e.pageY - this.disY -10+ 'px'
        let currentLeft = parseInt(note.style.left)
        if (currentLeft + width > document.body.clientWidth) {
          note.style.left = document.body.clientWidth - width - 20 + 'px'
          this.fixNote()
        }
      },
      editNote() {
        axios.post(url.edit + `?id=${this.id}&text=${this.text}`)
      },
      saveText() {
        this.text = this.$refs.text.innerText
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
    line-height: 25px;
    padding: 0.5em 0.5em;
    width: 15em;
    background: bisque;
    color: #4d4d4d;
    border: 1px solid #aaa;
    margin: 10px;
    -moz-user-select:none;
    -webkit-user-select:none;
    user-select:none;

  }

  .note .move {
    background: #2baca4;
    height: 20px;
    width: 50%;
    position: relative;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
  }

  .note.moving {
    opacity: 0.8;
  }

  .title {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #aaa;
    padding-bottom: 5px;
    position: relative;
    top: -20px;
  }

  .title:hover {
    background: bisque;
    cursor: pointer;
  }

  .content {
    padding-top: 5px;
    min-height: 3em;
    position: relative;
    top: -20px;
  }

  .content:focus {
    outline: none;
  }

  .icon {
    fill: #4d4d4d
  }
</style>
