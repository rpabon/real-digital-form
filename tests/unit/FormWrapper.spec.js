import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import store from '@/store';
import FormWrapper from '@/components/FormWrapper';
import TextField from '@/components/TextField';
import SubmitButton from '@/components/SubmitButton';

function factory(
  formData = {},
  props = { action: 'https://httpbin.org', method: 'post' }
) {
  return shallowMount(FormWrapper, {
    store: {
      ...store,
      state: {
        ...store.state,
        formData: {
          ...store.state.formData,
          ...formData,
        },
      },
    },
    propsData: props,
    slots: {
      default: [
        Vue.component('text-field-name', {
          template: '<TextField name="name" validation="[a-z]+" />',
          components: { TextField },
        }),
        Vue.component('text-field-phone', {
          template: '<TextField name="phone" validation="[0-9]+" />',
          components: { TextField },
        }),
        Vue.component('text-field-subject', {
          template: '<TextField name="subject" />',
          components: { TextField },
        }),
        Vue.component('submit-button', {
          template: '<SubmitButton>Send</SubmitButton>',
          components: { SubmitButton },
        }),
      ],
    },
  });
}

describe('From wrapper', () => {
  it('should submit a valid form', async () => {
    const formData = { name: 'Morn' };
    const wrapper = factory(formData);

    const form = wrapper.find('form');
    form.trigger('submit.prevent');

    expect(wrapper.emitted('onSubmit')).toMatchObject([[formData]]);
  });

  it('should prevent submit if fields are empty', async () => {
    const wrapper = factory();

    const button = wrapper.find('.form__control__button');
    expect(button.attributes().disabled).toBeTruthy();
  });
});
