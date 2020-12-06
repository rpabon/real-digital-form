<template>
  <div>
    <label>{{ name }}</label>
    <input type="text" v-model="inputValue" :name="name" />
    <p v-if="!isValid">The content of the {{ name }} field is invalid.</p>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { SET_FORM_DATA, SET_FORM_IS_VALID } from '@/store/constants';
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
  methods: mapMutations([SET_FORM_DATA, SET_FORM_IS_VALID]),
  watch: {
    inputValue(value) {
      this.SET_FORM_DATA({ [this.name]: value });
    },
    isValid(value) {
      this.SET_FORM_IS_VALID(value);
    },
  },
};
</script>

<style></style>
