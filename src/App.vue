<template>
  <div id="app">
    <real-digital-form
      action="https://httpbin.org/post"
      method="post"
      @onSubmit="insertDate"
      @onResponse="logResponse"
    >
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
  methods: {
    logResponse(res, err) {
      if (res) console.log(res);
      if (err) console.error(err);
    },
    insertDate(formData) {
      // insert the date in the form data as a formatting example
      formData.timestamp = +new Date();
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
