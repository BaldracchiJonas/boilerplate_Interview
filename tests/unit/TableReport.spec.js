import { mount } from '@vue/test-utils';
import TableReport from '@/components/TableReport.vue';
import columnsName from '@/assets/columnsName.json';
import store from '@/store/index.js';
import { DOMParser } from 'xmldom';

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

function parseHTMLText(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.documentElement.textContent;
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
        expect(tableHeaders.length).toBe(columnsTitles.length);
        columnsTitles.forEach((title, index) => {
            expect(tableHeaders[index].text()).toBe(parseHTMLText(title));
        });
    });
});
