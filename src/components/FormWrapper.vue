<template>
  <form @submit="onSubmit" novalidate>
    <slot />
  </form>
</template>

<script>
import isValidHttpMethod from '@/utils/isValidHttpMethod';

export default {
  name: 'real-digital-form',
  props: {
    action: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      default: 'GET',
      validator: isValidHttpMethod,
    },
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      console.log(this.method);
    },
  },
};
</script>

<style></style>
