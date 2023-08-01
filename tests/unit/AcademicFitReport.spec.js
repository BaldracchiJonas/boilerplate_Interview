import { mount } from '@vue/test-utils';
import AcademicFitReport from '@/components/AcademicFitReport.vue';
import store from '@/store/index.js';

describe('AcademicFitReport.vue', () => {
  it('renders profile info correctly', () => {
    const wrapper = mount(AcademicFitReport, {
      global: {
        plugins: [store],
      },
    });
    
    const athleteData = store.getters.getAthleteData;

    // Test if the profile info is rendered correctly
    expect(wrapper.find('[data-test="sport-label"]').text()).toBe('Sport:');
    expect(wrapper.find('[data-test="class-label"]').text()).toBe('Class:');
    expect(wrapper.find('[data-test="club-label"]').text()).toBe('Club:');
    expect(wrapper.find('[data-test="high-school-label"]').text()).toBe('High School:');
    expect(wrapper.find('[data-test="gpa-label"]').text()).toBe('GPA:');
    expect(wrapper.find('[data-test="desired-major-label"]').text()).toBe('Desired Major:');

    expect(wrapper.find('[data-test="sport-text"]').text()).toContain(athleteData.sport);
    expect(wrapper.find('[data-test="class-text"]').text()).toContain(String(athleteData.grad_year));
    expect(wrapper.find('[data-test="club-text"]').text()).toContain(athleteData.club.name);
    expect(wrapper.find('[data-test="high-school-text"]').text()).toContain(athleteData.high_school.name);
    expect(wrapper.find('[data-test="gpa-text"]').text()).toContain(String(athleteData.gpa));
    expect(wrapper.find('[data-test="desired-major-text"]').text()).toContain(athleteData.major);
  });

  it('updates athlete name when input is changed', async () => {
    const wrapper = mount(AcademicFitReport, {
      global: {
        plugins: [store],
      },
    });

    const input = wrapper.find('input');
    const newName = 'Jonas Baldracchi';

    // Simulate typing in the input field and wait for the input event
    await input.setValue(newName);

    // Simulate the blur event
    await input.trigger('blur');

    // Assert that the athlete name is updated in the store
    expect(store.state.athleteData.name).toBe(newName);
  });
});
