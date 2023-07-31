<template>
  <div class="container">
    <AcademicFitReport :athlete="athlete_info"/>
    <TableReport :athlete="athlete_info" :columns="columns"/>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AcademicFitReport from "@/components/AcademicFitReport.vue";
import TableReport from "@/components/TableReport.vue";
import AthleteData from "@/assets/data.json";
import columnsName from "@/assets/columnsName.json";

const athlete_info = ref(AthleteData.data[0]);
const columns = ref(columnsName.data);
</script>
