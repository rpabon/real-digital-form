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
        'form__control__input--empty': !inputValue,
        'form__control__input--invalid': !isValid,
      }"
    />
    <p class="form__control__error" v-if="!isValid">
      The content of the <strong>{{ name }}</strong> field is invalid.
    </p>
  </div>
</template>

<script>
import { isValidExpression } from './utils';

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
  display: block;
  width: 100%;
  margin-bottom: 8px;
  text-transform: capitalize;
  font-weight: bold;
  text-align: left;
}

.form__control__input {
  position: relative;
  display: block;
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #3298dc;
}

.form__control__input--invalid {
}

.form__control__error {
  width: 100%;
  margin: 8px 0 0;
  padding: 4px 16px;
  font-size: 0.925rem;
  color: #f14668;
  border: 1px solid #f14668;
  text-align: left;
  border-radius: 4px;
}
</style>
