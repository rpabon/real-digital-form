<template>
  <form @submit.prevent="submit" novalidate>
    <slot />
    <p>Data: {{ formData }}</p>
    <p>Loading: {{ loading }}</p>
    <p>Valid: {{ formIsValid }}</p>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { SEND_FORM_DATA } from '@/store/constants';
import validator from '@/utils/isValidHttpMethod';

export default {
  name: 'real-digital-form',
  props: {
    action: String,
    method: {
      type: String,
      default: 'POST',
      validator,
    },
  },
  computed: mapState(['formData', 'loading', 'formIsValid']),
  methods: {
    ...mapActions([SEND_FORM_DATA]),
    async submit() {
      this.$emit('onSubmit', this.formData);

      const [response, error] = await this.SEND_FORM_DATA({
        url: this.action,
        method: this.method,
      });

      this.$emit('onResponse', response, error);
    },
  },
};
</script>

<style></style>
