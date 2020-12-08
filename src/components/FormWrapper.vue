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
import { mapState } from 'vuex';
import validator from '@/utils/isValidHttpMethod';
import { sendFormData } from '@/utils/form';

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
  data: () => ({ loading: false }),
  computed: mapState(['formData', 'formIsValid']),
  methods: {
    setLoading(loading = true) {
      this.loading = loading;
    },
    async submit() {
      if (!this.formIsValid) return;

      /**
       * I'd preferred to do the sending as an action in the
       * store, but the onSubmit task was a bit confusing,
       * so I just send the data (new reference)
       */
      const data = { ...this.formData };
      this.$emit('onSubmit', data);

      const { response, error } = await sendFormData({
        url: this.action,
        method: this.method,
        setLoading: this.setLoading,
        data,
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
