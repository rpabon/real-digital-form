<template>
  <div id="app">
    <real-digital-form method="post">
      <real-digital-textfield name="name" validation="[a-z]+">
      </real-digital-textfield>
      <real-digital-textfield name="phone" validation="[0-9]+">
      </real-digital-textfield>
      <real-digital-textfield name="subject"> </real-digital-textfield>
      <real-digital-button>
        Send
      </real-digital-button>
    </real-digital-form>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
