<template>
  <form @submit="onSubmit" novalidate>
    <slot />
    <p>Data: {{ formData }}</p>
    <p>Loading: {{ loading }}</p>
    <p>Valid: {{ formIsValid }}</p>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import isValidHttpMethod from '@/utils/isValidHttpMethod';

export default {
  name: 'real-digital-form',
  props: {
    action: String,
    method: {
      type: String,
      default: 'POST',
      validator: isValidHttpMethod,
    },
  },
  computed: {
    ...mapState(['formData', 'loading', 'formIsValid']),
  },
  methods: {
    ...mapActions(['fetchFormData']),
    onSubmit(e) {
      e.preventDefault();
      this.fetchFormData({ action: this.action, method: this.method });
    },
  },
};
</script>

<style></style>
