<template>
  <form class="form" ref="formRef" @submit.prevent="submit" novalidate>
    <slot />
  </form>
</template>

<script>
import { getFormData, isValidForm, sendFormData } from '@/utils/form';
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
  data: () => ({ loading: false }),
  methods: {
    setLoading(loading = true) {
      this.loading = loading;
    },
    async submit() {
      const formRef = this.$refs.formRef;
      const isFormValid = isValidForm(formRef);
      const formData = getFormData(formRef);

      if (!isFormValid || !formData) return;

      this.$emit('onSubmit', formData);

      const { response, error } = await sendFormData(
        this.action,
        this.method,
        formData,
        this.setLoading
      );

      this.$emit('onResponse', response, error);
    },
  },
};
</script>

<style>
.form {
}

.form__control {
}
</style>
