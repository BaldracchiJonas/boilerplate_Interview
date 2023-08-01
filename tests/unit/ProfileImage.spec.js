import { mount } from '@vue/test-utils';
import ProfileImage from '@/components/ProfileImage.vue';
import AcademicFitReport from '@/components/AcademicFitReport.vue';
import store from '@/store/index.js';

describe('ProfileImage.vue', () => {
    it('renders profile image when available', () => {
        const wrapper = mount(ProfileImage, {
            global: {
            plugins: [store],
            },
        });

        const athleteData = store.getters.getAthleteData;

        // Test if the image element exists when there is a profile_image
        expect(wrapper.find('img').exists()).toBe(true);
        expect(wrapper.find('img').attributes('src')).toBe(athleteData.profile_image);
    });

    it('renders initials when profile image is not available', () => {

        // Modify the athleteData in the store to simulate no profile_image
        store.state.athleteData.profile_image = null;

        const wrapper = mount(ProfileImage, {
            global: {
            plugins: [store],
            },
        });

        expect(wrapper.find('span').exists()).toBe(true);
    });

    it('renders initials correctly', () => {
        const wrapper = mount(ProfileImage, {
        global: {
            plugins: [store],
        },
        });

        const athleteData = store.getters.getAthleteData;

        // Test if the initials are rendered correctly
        expect(wrapper.find('span').text()).toBe(athleteData.name.split(' ').map((n) => n[0]).join(''));
    });

    it('renders initials correctly when there is no last name', () => {
            
        // Modify the athleteData in the store to simulate no last name
        store.state.athleteData.name = 'Jonas';

        const wrapper = mount(ProfileImage, {
            global: {
            plugins: [store],
            },
        });

        // Test if the initials are rendered correctly
        expect(wrapper.find('span').text()).toBe('J');
    });

    it('renders avatarColor correctly', () => {
        const wrapper = mount(ProfileImage, {
            global: {
            plugins: [store],
            },
        });

        const athleteData = store.getters.getAthleteData;

        const lastName = athleteData.name ? athleteData.name.trim().split(' ').pop() : '';
        const initial = lastName.charAt(0).toUpperCase().charCodeAt(0);
    
        // Range of ASCII values for each color
        const colorRanges = [
          { range: [65, 69], color: 'bg-red-500' },     // A to E
          { range: [70, 74], color: 'bg-blue-500' },    // F to J
          { range: [75, 79], color: 'bg-purple-500' },  // K to O
          { range: [80, 84], color: 'bg-teal-500' },    // P to T
          { range: [85, 89], color: 'bg-yellow-500' },  // U to Y
          { range: [90, 90], color: 'bg-orange-500' },  // Z
        ];
    
        const defaultColor = 'bg-gray-500';
    
        // Find the matching range and return the corresponding color
        const matchedRange = colorRanges.find(range => initial >= range.range[0] && initial <= range.range[1]);
        const avatarColorClass = matchedRange ? matchedRange.color : defaultColor;

        expect(wrapper.find('[data-test="avatarColor-class"]').classes()).toContain(avatarColorClass);
    });

    it('renders avatarColor correctly when name is changed', () => {
        // Simulate changing the athlete name
        store.state.athleteData.name = 'Jonas Baldracchi';

        const wrapper = mount(ProfileImage, {
            global: {
            plugins: [store],
            },
        });
        
        // Test if the avatarColor is rendered correctly whit the class bg-red-500 because the last name is Baldracchi
        expect(wrapper.find('[data-test="avatarColor-class"]').classes()).toContain('bg-red-500');
    });

    it('updates athlete name when input is changed in AcademicFitReport component', async () => {
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
    
        const wrapper2 = mount(ProfileImage, {
            global: {
                plugins: [store],
            },
        });

        // Test if the avatarColor is rendered correctly whit the class bg-red-500 because the last name is Baldracchi
        expect(wrapper2.find('[data-test="avatarColor-class"]').classes()).toContain('bg-red-500');
      });
});
