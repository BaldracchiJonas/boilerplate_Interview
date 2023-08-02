<template>
  <div class="table-report">
    <table class="w-full border border-collapse border-gray-300">
      <thead class="text-sm text-white bg-gray-900">
        <tr>

          <!-- Loop through the columns -->
            <th v-for="column in props.columns" :key="column.name" class="px-4 py-0 text-center" :style="{ width: column.width }">

              <!-- If the column doesn't have nested sub-columns -->
              <div v-if="!column.columns" v-html="column.name"></div>

              <!-- If the column have nested sub-columns -->
              <template v-else>
                <div v-html="column.name"></div>
                <tr class="flex justify-between">
                  <!-- Loop through the sub-columns -->
                  <th class="text-xs" v-for="nestedColumn in column.columns" :key="nestedColumn.name" v-html="nestedColumn.name"></th>
                </tr>
              </template>

            </th>
        </tr>
      </thead>

      <tbody class="text-sm">
        <TableRow
          v-for="(row, index) in athleteData.report"
          :key="row.school"
          :row="row"
          :columns="props.columns"
          :gpa="athleteData.gpa"
          :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-200'"
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
  