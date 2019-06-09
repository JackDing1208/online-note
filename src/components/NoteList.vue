<template>
  <ul class="noteList">
    <Note class="note" v-for="value in noteList"
          :content="value.text" :time="value.time" :key="value.id"
          :id="value.id"  ref="note"
    ></Note>
  </ul>
</template>

<script>
  import axios from "axios"
  import url from '../assets/url'
  import Note from './Note'
  import Mixin from "./Mixin";

  export default {
    name: "NoteList",
    data() {
      return {
        noteList: null
      }
    },
    created() {
      this.getList()
    },
    mounted() {
      this.eventBus.$on('add', () => {
        this.addNote()
      })
      this.eventBus.$on('delete', (id) => {
        this.deleteNote(id)
      })
    },
    methods: {
      getList() {
        axios.get(url.all).then((res) => {
          this.noteList = res.data.data
        })
      },
      addNote() {
        let time=this.getTime()
        axios.post(url.add + `?time=${time}`).then((res) => {
          let newNote = {
            id: res.data.id,
            time: res.data.time,
            content: ' '
          }
          this.noteList.push(newNote)
        })
      },
      deleteNote(id) {
        this.noteList.forEach((note, index) => {
          if (note.id === id) {
            this.noteList.splice(index, 1)
          }
        })
        axios.post(url.delete + `?id=${id}`)
      }
    },
    components: {
      Note
    },
    inject: ['eventBus'],
    mixins: [Mixin]
  }
</script>

<style scoped>
  .noteList {
    display: grid;
    grid-template-columns: repeat(auto-fill,300px);
    grid-template-rows: repeat(auto-fill,10px);
    align-items: start;
    justify-items:center;
    justify-content:center
  }

  .note {
    margin-right: 20px;
  }
</style>
