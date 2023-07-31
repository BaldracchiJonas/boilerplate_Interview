<template>
  <div class="table-report">
    <table>
      <thead>
        <tr>

          <!-- Loop through the columns -->
            <th v-for="column in props.columns" :key="column.name">

              <!-- If the column doesn't have nested sub-columns -->
              <div v-if="!column.columns" v-html="column.name"></div>

              <!-- If the column have nested sub-columns -->
              <template v-else>
                <div v-html="column.name"></div>
                <tr>
                  <!-- Loop through the sub-columns -->
                  <th v-for="nestedColumn in column.columns" :key="nestedColumn.name" v-html="nestedColumn.name"></th>
                </tr>
              </template>

            </th>
        </tr>
      </thead>

      <tbody>
        <TableRow
          v-for="row in props.athlete.report"
          :key="row.school"
          :row="row"
          :columns="props.columns"
          :gpa="props.athlete.gpa"
        />
      </tbody>
      
    </table>
  </div>
</template>
  
<script setup>
import TableRow from "@/components/TableRow.vue";
import { defineProps } from "vue";

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

</script>
  