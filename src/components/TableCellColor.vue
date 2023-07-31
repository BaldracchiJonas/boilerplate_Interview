<template>
    <div :style="{ backgroundColor: gpaColor }">
        {{ value }}
    </div>
</template>
  
<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const gpaColor = computed(() => {
  const difference = props.total - props.value;

  if (difference > 0.1) {
    return "#d7737d";
  } else if (difference > 0 && difference <= 0.1) {
    return "#c194b5";
  } else if (difference === 0) {
    return "#b4a7d6";
  } else if (difference < 0 && difference >= -0.1) {
    return "#a6a8da";
  } else {
    return "#75ace5";
  }
});
</script>
  