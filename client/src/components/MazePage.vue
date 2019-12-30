<template>
   <div>
        <b-row>
            <b-col cols="8" offset-md="2">
                <maze-form v-model="mazeSelected" :handleClick="handleClick"></maze-form>
                <maze-grid :selected="mazeSelected" :rawMazes="mazes" :path="path"></maze-grid>
            </b-col>
        </b-row>
    </div>
</template>


<script>
import MazeForm from './MazeForm.vue'
import MazeGrid from './MazeGrid.vue'
import mazes from '../assets/mazes.js'

export default {
  name: 'MazePage',
  data () {
    return {
      mazeSelected: null,
      mazes: {},
      path: []
    }
  },
  methods: {
    async handleClick () {
      try {
        const response = await this.axios.post('http://localhost:3000/maze/path', {
          maze: this.getMaze()
        })
        this.path = response.data
      } catch (ex) {
        alert(ex.response.data.message)
      }
    },
    getMaze () {
      return (this.mazeSelected == null ? [] : this.mazes[this.mazeSelected])
    }
  },
  computed: {
    hasError () {
      return (this.error !== '')
    }
  },
  components: {
    'maze-form': MazeForm,
    'maze-grid': MazeGrid
  },
  created () {
    this.mazes = mazes
  }
}
</script>