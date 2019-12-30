<template>
  <div id="app">
    <header>
      <span>CookUnity [MazeTest]</span>
    </header>
    <main>
      <b-container fluid>
        <router-view></router-view>
      </b-container>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
