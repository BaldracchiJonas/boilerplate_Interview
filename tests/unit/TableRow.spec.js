import { mount } from '@vue/test-utils';
import TableRow from '@/components/TableRow.vue';
import columnsName from '@/assets/columnsName.json';
import store from '@/store/index.js';

describe('TableRow.vue', () => {

    it('function getCellValue', () => {
        const athleteData = store.getters.getAthleteData;
        const row = athleteData.report[0];
        const gpa = athleteData.gpa;

        const wrapper = mount(TableRow, {
            props: {
                row: row,  
                columns: columnsName.data,
                gpa: gpa,
            },
            global: {
                plugins: [store],
            },
        });

        const getCellValue = wrapper.vm.getCellValue(columnsName.data[0].keyName); // keyName = 'school'

        expect(getCellValue).toBe(row['school']);
    });

    it('function getCellValue number', () => {
        const athleteData = store.getters.getAthleteData;
        const row = athleteData.report[0];
        const gpa = athleteData.gpa;

        const wrapper = mount(TableRow, {
            props: {
                row: row,  
                columns: columnsName.data,
                gpa: gpa,
            },
            global: {
                plugins: [store],
            },
        });

        const getCellValue = wrapper.vm.getCellValue(columnsName.data[3].keyName); // keyName = 'ranking' and columnsName.data[3].keyName = 151

        expect(getCellValue).toBe("151.00");
    });

    it('render correctly with the correct number of columns', () => {
        const athleteData = store.getters.getAthleteData;
        const row = athleteData.report[0];
        const gpa = athleteData.gpa;
        const columnsTitles = columnsName.data;

        const wrapper = mount(TableRow, {
            props: {
                row: row,  
                columns: columnsName.data,
                gpa: gpa,
            },
            global: {
                plugins: [store],
            },
        });

        const tableCells = wrapper.findAll('[data-test="td-TableRow"]').map((cell) => cell.text());
        expect(tableCells.length).toBe(columnsTitles.length);
    });

});
