import { mount } from '@vue/test-utils';
import App from '@/App.vue';
import columnsName from '@/assets/columnsName.json';
import store from '@/store/index.js';

describe('App.vue', () => {
  it('renders AcademicFitReport and TableReport components', () => {
    
    const wrapper = mount(App, {
        global: {
          plugins: [store], // Provide the mock Vuex store to the components
        },
    });

    expect(wrapper.findComponent({ name: 'AcademicFitReport' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'TableReport' }).exists()).toBe(true);
  });

  it('has the correct "columns" prop', () => {
    const wrapper = mount(App, {
        global: {
          plugins: [store], // Provide the mock Vuex store to the components
        },
    });
    expect(wrapper.findComponent({ name: 'TableReport' }).props('columns')).toEqual(columnsName.data);
  });
});
