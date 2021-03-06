<template>
  <form class="form" ref="formRef" @submit.prevent="submit" novalidate>
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
import {
  methodValidator,
  isFormValid,
  areFieldsEmpty,
  getFormData,
  sendFormData,
} from './utils';

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
      validator: methodValidator,
    },
  },
  data: () => ({ loading: false }),
  methods: {
    setLoading(loading = true) {
      this.loading = loading;
    },
    async submit() {
      const formRef = this.$refs.formRef;
      const valid = isFormValid(formRef);
      const noData = areFieldsEmpty(formRef);

      if (!valid || noData) return;

      const data = getFormData(formRef);
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
