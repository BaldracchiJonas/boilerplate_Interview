<template>
  <div class="container">
    <AcademicFitReport/>
    <TableReport :columns="columns"/>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AcademicFitReport from "@/components/AcademicFitReport.vue";
import TableReport from "@/components/TableReport.vue";
import columnsName from "@/assets/columnsName.json";

const columns = ref(columnsName.data);
</script>
