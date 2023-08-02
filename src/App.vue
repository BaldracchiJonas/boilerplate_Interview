<template>
  <div class="flex justify-center">
    <div class="container">
      <TableLineHeader/>
      <AcademicFitReport/>
      <TableReport :columns="columns"/>
      <TableFooter/>
      <TableLineHeader class="mb-10"/>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AcademicFitReport from "@/components/AcademicFitReport.vue";
import TableReport from "@/components/TableReport.vue";
import TableFooter from "@/components/TableFooter.vue";
import TableLineHeader from "./components/TableLineHeader.vue";
import columnsName from "@/assets/columnsName.json";

const columns = ref(columnsName.data);
</script>
