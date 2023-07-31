<template>
    <div class="table-report">
      <table>
        <thead>
          <tr>
            <template v-for="column in props.columns">
              <th :key="column.name" v-if="!column.columns" v-html="column.name"></th>
              <template v-else>
                <table :key="column.name">
                  <thead>
                    <tr><th v-html="column.name"></th></tr>
                    <tr>
                      <th v-for="nestedColumn in column.columns" :key="nestedColumn.name" v-html="nestedColumn.name"></th>
                    </tr>
                  </thead>
                </table>
              </template>
            </template>
          </tr>
        </thead>
  
        <tbody>
          <TableRow v-for="row in props.athlete.report" :key="row.school" :row="row" :columns="flattenedColumns"/>
        </tbody>
      </table>
    </div>
</template>
  
<script setup>
import TableRow from "@/components/TableRow.vue";
import { defineProps, computed } from "vue";

const props = defineProps({
    athlete: {
        type: Object,
        required: true
    },
    columns: {
        type: Array,
        required: true
    }
});

const flattenedColumns = computed(() => {
    let flattenedColumns = [];
    props.columns.forEach((column) => {
        if (!column.columns) {
        flattenedColumns.push(column);
        } else {
        column.columns.forEach((nestedColumn) => {
            flattenedColumns.push(nestedColumn);
        });
        }
    });
    return flattenedColumns;
});
</script>
  