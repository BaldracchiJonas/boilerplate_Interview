<template>
  <div class="flex justify-center">
    <div class="container">
      <AcademicFitReport/>
      <TableReport :columns="columns"/>
      <TableFooter/>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AcademicFitReport from "@/components/AcademicFitReport.vue";
import TableReport from "@/components/TableReport.vue";
import TableFooter from "@/components/TableFooter.vue";
import columnsName from "@/assets/columnsName.json";

const columns = ref(columnsName.data);
</script>
