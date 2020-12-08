<template>
  <div class="form__control">
    <button
      type="submit"
      class="form__control__button"
      :disabled="!formIsValid || pristine"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'real-digital-button',
  computed: mapState(['formIsValid', 'pristine']),
};
</script>

<style>
.form__control__button {
  display: block;
  height: 40px;
  padding: 4px 24px;
  font-size: 1.125rem;
  border-radius: 4px;
  color: #fff;
  background-color: #3298dc;
  border-color: transparent;
  appearance: none;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  border: 1px solid transparent;
}

.form__control__button:disabled {
  background-color: #f5f5f5;
  border-color: #dbdbdb;
  color: #7a7a7a;
  box-shadow: none;
  pointer-events: none;
  cursor: not-allowed;
}
</style>
