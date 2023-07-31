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
          v-for="row in athleteData.report"
          :key="row.school"
          :row="row"
          :columns="props.columns"
          :gpa="athleteData.gpa"
        />
      </tbody>
      
    </table>
  </div>
</template>
  
<script setup>
import { defineProps, computed } from "vue";
import { useStore } from 'vuex';
import TableRow from "@/components/TableRow.vue";

const props = defineProps({
    columns: {
        type: Array,
        required: true
    }
});

const store = useStore();
const athleteData = computed(() => store.getters.getAthleteData);

</script>
  