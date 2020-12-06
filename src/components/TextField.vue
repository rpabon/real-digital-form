<template>
  <div>
    <input type="text" v-model="inputValue" :name="name" :placeholder="name" />
    <p v-if="!isValid">invalid</p>
  </div>
</template>

<script>
export default {
  name: 'real-digital-textfield',
  props: {
    name: {
      type: String,
      required: true,
    },
    validation: {
      type: String,
      required: false,
    },
  },
  data: () => ({
    inputValue: '',
  }),
  computed: {
    isValid() {
      if (!this.validation || !this.inputValue) {
        return true;
      }

      try {
        const regex = new RegExp(`\\b${this.validation}\\b`);
        return regex.test(this.inputValue);
      } catch (error) {
        return false;
      }
    },
  },
};
</script>

<style></style>
