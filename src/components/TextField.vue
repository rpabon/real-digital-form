<template>
  <div class="form__control">
    <label class="form__control__label">{{ name }}</label>
    <input
      type="text"
      ref="input"
      v-model="inputValue"
      :name="name"
      :class="{
        form__control__input: true,
        'form__control__input--invalid': !isValid,
      }"
    />
    <p class="form__control__error" v-if="!isValid">
      The content of the <strong>{{ name }}</strong> field is invalid.
    </p>
  </div>
</template>

<script>
import isValidExpression from '@/utils/isValidExpression';

export default {
  name: 'real-digital-textfield',
  props: {
    name: { type: String, required: true },
    validation: String,
  },
  data: () => ({ inputValue: '' }),
  computed: {
    isValid() {
      return isValidExpression(this.inputValue, this.validation);
    },
  },
};
</script>

<style>
.form__control__label {
  text-transform: capitalize;
  font-weight: bold;
}

.form__control__input {
}

.form__control__input--invalid {
}

.form__control__error {
}
</style>
