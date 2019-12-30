<template>
     <div class="grid">
         <b-row v-for="(row, index) in mazeSeleted" v-bind:key=index>
             <grid-item v-for="(item, itemIndex) in row" v-bind:key=itemIndex :item="item"></grid-item>
         </b-row>
     </div>
</template>

<script>
import GridItem from './MazeGridItem.vue'

export default {
  name: 'MazeGrid',
  data () {
    return {
      mazes: {
        mazeWithExit: {},
        mazeWithoutStartPoint: {},
        mazeWithoutExit: {}
      }
    }
  },
  props: {
    selected: String,
    rawMazes: Object,
    path: Array
  },
  computed: {
    mazeSeleted () {
      return (this.selected == null ? [] : this.mazes[this.selected])
    }
  },
  methods: {
    formatMaze (maze) {
      return maze.map((row, y) => row.map((col, x) => {
        return {x, y, value: col, active: 0}
      }))
    },
    setActive (point) {
      this.mazeSeleted[point.y][point.x].active = 1
    }
  },
  created () {
    this.mazes.mazeWithExit = this.formatMaze(this.rawMazes.mazeWithExit)
    this.mazes.mazeWithoutExit = this.formatMaze(this.rawMazes.mazeWithoutExit)
    this.mazes.mazeWithoutStartPoint = this.formatMaze(this.rawMazes.mazeWithoutStartPoint)
  },
  watch: {
    path (paths) {
      paths.forEach(this.setActive)
    },
    selected (name) {
      this.mazes[name].forEach((row) => {
        row.forEach((item) => {
          item.active = 0
        })
      })
    }
  },
  components: {
    'grid-item': GridItem
  }
}
</script>

<style scoped>
div.grid {
    margin-top: 20px;
}
</style>
