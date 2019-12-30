<template>
      <b-form class="form">
        <b-row>
          <b-col cols="10">
              <b-form-select class="mt-2"
               v-model="mazeSelected" 
               :options="options">
                <template v-slot:first>
                  <option :value="null">Choose...</option>
                </template>
                </b-form-select>
          </b-col>
          <b-col cols="2">
            <b-button variant="primary" class="mt-2 button" @click="handleClick">Find path</b-button>
          </b-col>
        </b-row>
      </b-form>
</template>

<script>

export default {
  name: 'MazeForm',
  props: {
    value: String,
    handleClick: Function
  },
  data () {
    return {
      mazeSelected: this.value,
      options: {
        'mazeWithExit': 'Maze with exit',
        'mazeWithoutExit': 'Maze without exit',
        'mazeWithoutStartPoint': 'Maze without start point'
      }
    }
  },
  watch: {
    mazeSelected (val) {
      this.$emit('input', this.mazeSelected)
    }
  }

}
</script>

<style scoped>
.form {
  margin-top: 20px;
  width: 100%;
}
.button {
  width: 100%;
}
</style>
