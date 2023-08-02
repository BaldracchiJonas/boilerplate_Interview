<template>

  <tr class="h-12">

    <!-- Loop through the columns -->
    <td v-for="column in props.columns" :key="column.name" class="h-4 px-4 py-0" data-test="td-TableRow">

      <!-- If the column doesn't have nested sub-columns -->
      <tr class="flex" :class="getColumnClasses(column)" v-if="!column.columns">

        <td 
        class="w-full h-full px-1" 
        :style="{ backgroundColor: 
        gpaColor(column, props.gpa) }" 
        >
          {{ getCellValue (column.keyName) }}
        </td>

      </tr>

      <!-- If the column have nested sub-columns -->
      <table v-else class="h-full">
        
        <tr style="display: contents;" class="flex justify-between w-full h-full">
          <td 
          v-for="nestedColumn in column.columns" 
          :key="nestedColumn.name" 
          class="w-full h-full" 
          :style="{ backgroundColor: gpaColor(nestedColumn, props.gpa) }"  
          >
            {{ getCellValue (nestedColumn.keyName) }}
          </td>
        </tr>

      </table>
    </td>

  </tr>
</template>

  
<script setup>
import { defineProps, ref } from "vue";

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

const alignmentData = ref(['school', 'conference']);

const getColumnClasses = ({keyName}) => {
  const alignmentClass = alignmentData.value.includes(keyName) ? 'justify-left' : 'justify-center';
  return alignmentClass
};

const gpaColor = (column, total) => {
  if(!column.colorColumn) return ''

  const value = getCellValue (column.keyName)
  const difference = total - value;
  if (difference > 0.1) {
    return "#75ace5";
  } else if (difference > 0 && difference <= 0.1) {
    return "#a6a8da";
  } else if (difference === 0) {
    return "#b4a7d6";
  } else if (difference < 0 && difference >= -0.1) {
    return "#c194b5";
  } else {
    return "#d7737d";
  }
}

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

<style>
  .fixed-column {
    position: sticky;
    left: 0px;
    z-index: 1000;
  }
</style>
  