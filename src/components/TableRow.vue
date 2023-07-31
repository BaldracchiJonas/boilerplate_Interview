<template>
    <tr>
      <td v-for="column in props.columns" :key="column.name">
        {{ getCellValue(props.row, column.keyName) }}
      </td>
    </tr>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
    row: {
        type: Object,
        required: true
    },
    columns: {
        type: Array,
        required: true
    }
});

function getCellValue(row, keyName) {
    const keys = keyName.split(".");
    let value = row;
    for (const key of keys) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
        value = value[key];
        } else {
        value = "";
        break;
        }
    }

    // Check if the value is an object and convert its values to an array
    if (typeof value === "object" && !Array.isArray(value)) {
        value = Object.values(value);
        return value.join(" - ");
    }

    return value || "";
}
</script>
  