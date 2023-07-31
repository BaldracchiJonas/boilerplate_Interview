<template>
  <tr>

    <!-- Loop through the columns -->
    <td v-for="column in props.columns" :key="column.name">

      <!-- If the column doesn't have nested sub-columns -->
      <tr v-if="!column.columns">
        <div v-if="!column.colorColumn">
          {{ getCellValue (column.keyName) }}
        </div>
        <div v-else>
          <TableCellColor :value="getCellValue (column.keyName)" :total="props.gpa" />
        </div>
      </tr>

      <!-- If the column have nested sub-columns -->
      <tr v-else>
        <td v-for="nestedColumn in column.columns" :key="nestedColumn.name">
          <div v-if="!nestedColumn.colorColumn">
            {{ getCellValue (nestedColumn.keyName) }}
          </div>
          <div v-else>
            <TableCellColor :value="getCellValue (nestedColumn.keyName)" :total="props.gpa" />
          </div>
        </td>
      </tr>

    </td>
  </tr>
</template>
  
<script setup>
import { defineProps } from "vue";
import TableCellColor from "@/components/TableCellColor.vue";

const props = defineProps({
  row: {
    type: Object,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  gpa: {
    type: Number,
    required: true,
  },
});

function getCellValue(keyName) {
  const keys = keyName.split('.');
  let value = props.row;
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(value, key)) { // If the property exists, update the "value" variable with the nested property's value
      value = value[key];
    } else {
      value = '';
      break;
    }
  }

  value = formatCellValue(value);
  return value || '';
}

function formatCellValue(value) {
  // Check if the value is a number and apply toFixed(2) to show two decimal places
  if (typeof value === "number") {
    return value.toFixed(2);
  }

  // Check if the value is an object and convert its values to an array
  if (typeof value === "object" && !Array.isArray(value)) {
    const allNA = Object.values(value).every((val) => val === "N/A");

    if (allNA) {
      // If all the values are "N/A", replace them with "Not Reported"
      value = "Not Reported";
    } else {
      for (const key in value) {
        if (value[key] === "N/A") {
          // If the value is "N/A", replace it with "Not Reported"
          value[key] = "Not Reported";
        }
      }
      value = Object.values(value).join(" - ");
    }
  }

  return value;
}
</script>
  