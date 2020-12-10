<template>
  <form class="form" @submit.prevent="submit" novalidate>
    <div
      :class="{
        'form__loading-overlay': true,
        'form__loading-overlay--visible': loading,
      }"
    ></div>
    <slot></slot>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { SEND_FORM_DATA } from '@/store/constants';
import validator from '@/utils/isValidHttpMethod';

export default {
  name: 'real-digital-form',
  props: {
    action: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
      default: 'POST',
      validator,
    },
  },
  computed: mapState(['formData', 'loading']),
  methods: {
    ...mapActions([SEND_FORM_DATA]),
    async submit() {
      this.$emit('onSubmit', this.formData);

      const { response, error } = await this.SEND_FORM_DATA({
        url: this.action,
        method: this.method,
      });

      this.$emit('onResponse', response, error);
    },
  },
};
</script>

<style>
.form {
  display: block;
  position: relative;
  width: 100%;
  max-width: 480px;
  padding: 8px;
  margin: 0 auto;
  line-height: 1.5;
}

.form__control {
  position: relative;
  width: 100%;
  margin-bottom: 16px;
}

.form__loading-overlay {
  display: none;
  z-index: 100;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.form__loading-overlay--visible {
  display: block;
}
</style>
