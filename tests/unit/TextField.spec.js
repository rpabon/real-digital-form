import { shallowMount } from '@vue/test-utils';
import TextField from '@/components/TextField';

function factory(props = {}, data = {}) {
  return shallowMount(TextField, {
    propsData: props,
    data: () => ({ ...data }),
  });
}

describe('Text input field', () => {
  it('should render component properly', () => {
    const name = 'phone';
    const wrapper = factory({ name });

    expect(wrapper.find('label').text()).toMatch(name);
    expect(wrapper.find('input').attributes().name).toBe(name);
    expect(wrapper.find('input').classes()).toContain('form__control__input');
    expect(wrapper.find('.form__control__error').exists()).toBe(false);
  });

  it('should validate input entry', async () => {
    const validation = '[a-z]+';
    const wrapper = factory(
      { name: 'name', validation },
      { inputValue: 'Morn' }
    );

    expect(wrapper.find('.form__control__error').exists()).toBe(false);
    expect(wrapper.find('input').classes()).not.toContain(
      'form__control__input--invalid'
    );

    await wrapper.setData({ inputValue: 1234 });
    expect(wrapper.find('.form__control__error').exists()).toBe(true);
    expect(wrapper.find('input').classes()).toContain(
      'form__control__input--invalid'
    );
  });
});
