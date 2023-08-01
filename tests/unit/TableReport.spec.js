import { mount } from '@vue/test-utils';
import TableReport from '@/components/TableReport.vue';
import columnsName from '@/assets/columnsName.json';
import store from '@/store/index.js';

function extractColumns(data) {
    const columns = [];
    data.forEach((item) => {
      columns.push(item.name);
      if (item.columns) {
        item.columns.forEach((column) => {
          columns.push(column.name);
        });
      }
    });
    return columns;
}

describe('TableReport.vue', () => {
    it('renders table headers correctly', () => {
        const columns = columnsName.data;
        const columnsTitles = extractColumns(columns);

        const wrapper = mount(TableReport, {
            props: { columns },
            global: {
                plugins: [store],
            },
        });

        // Assert that table headers are rendered correctly
        const tableHeaders = wrapper.findAll('th');
        expect(tableHeaders.length).toBe(columnsTitles.length); // 1 header for each column
        columnsTitles.forEach((title, index) => {
            expect(tableHeaders[index].html()).toContain(title);
        });
    });

    it('renders TableRow component', () => {
        const wrapper = mount(TableReport, {
            global: {
                plugins: [store],
            },
        });

        expect(wrapper.findComponent({ name: 'TableRow' }).exists()).toBe(true);
    });

    it('should pass the correct props to TableRow component', () => {
        const wrapper = mount(TableReport, {
            global: {
              plugins: [store],
            },
        });
        expect(wrapper.findComponent({ name: 'TableRow' }).props('row').exists()).toBe(true);
        expect(wrapper.findComponent({ name: 'TableRow' }).props('columns').exists()).toBe(true);
        expect(wrapper.findComponent({ name: 'TableRow' }).props('gpa').exists()).toBe(true);
    });
});
