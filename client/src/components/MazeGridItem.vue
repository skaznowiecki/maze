<template>
    <b-col class="box" v-bind:class="{ active:item.active }">{{ item.value }}</b-col>
</template>

<script>

export default {
  name: 'MazeGridItem',
  data () {
    return {
    }
  },
  props: {
    item: Object
  }
}
</script>

<style scoped>
.box{
    margin-bottom: 12px;
    border-style:solid;
    border-width:thin;
    text-align: center;
}
.box.active{
  background-color: darkgray;
}
</style>
