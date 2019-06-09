<template>
  <ul class="noteList">
    <Note class="note" v-for="value in noteList" :content="value.text" :time="value.time" :key="value.id"
          :id="value.id"></Note>
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
          console.log(res.data)
          this.noteList = res.data.data
          console.log(this.noteList);
        })
      },
      addNote() {
        axios.post(url.add + `?time=${this.createTime}`).then((res) => {
          let newNote = {
            id: res.data.data,
            time: new Date(),
            content: ''
          }
          this.noteList.push(newNote)
          console.log(this.noteList)
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
    display: inline-flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 0 20px;
  }

  .note {
    margin-right: 20px;
  }
</style>
