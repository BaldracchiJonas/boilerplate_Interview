<template>
  <div class="flex justify-between">
    <div class="flex justify-start p-8">
      <div class="p-4">
        <ProfileImage class="w-full h-auto min-w-[7rem] max-w-[10rem]"/>
      </div>

      <div class="flex flex-col">

        <div class="max-w-md pl-3">
          <input 
            v-model="athleteNameInput" 
            @blur="updateAthleteName" 
            @keyup.enter="updateAthleteName" 
            class="max-w-md px-1 py-1 text-xl font-bold text-blue-400 rounded w-min focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        <div class="flex flex-col justify-center sm:flex-row">
          <div class="p-4 pt-0">
            <ul class="space-y-2">
              <li data-test="sport-text">
                <label class="font-bold" data-test="sport-label">Sport:</label>
                {{athleteData.sport}}
              </li>
              <li data-test="class-text">
                <label class="font-bold" data-test="class-label">Class:</label>
                {{athleteData.grad_year}}
              </li>
              <li data-test="club-text">
                <label class="font-bold" data-test="club-label">Club:</label>
                {{athleteData.club.name}}
              </li>
            </ul>
            </div>

            <div class="p-4 pt-0">
            <ul class="space-y-2">
              <li data-test="high-school-text">
                <label class="font-bold" data-test="high-school-label">High School:</label>
                {{athleteData.high_school.name}}
              </li>
              <li data-test="gpa-text">
                <label class="font-bold" data-test="gpa-label">GPA:</label>
                {{athleteData.gpa}}
              </li>
              <li data-test="desired-major-text">
                <label class="font-bold" data-test="desired-major-label">Desired Major:</label>
                {{athleteData.major}}
              </li>
            </ul>
            </div>
        </div>
      </div>
    </div>
    <div class="justify-start p-8 ex">
      <img src="../../public/insights.png" alt="Image description" class="h-auto rounded w-52" />
      <span class="flex justify-end text-lg font-semibold text-gray-900">Academic Fit Report</span>
    </div>
  </div>
</template>
  
<script setup>
  import { computed, ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import ProfileImage from '@/components/ProfileImage.vue';

  const store = useStore();
  const athleteNameInput = ref('');
  const athleteData = computed(() => store.getters.getAthleteData);

  function updateAthleteName() {
    store.commit('updateAthleteName', athleteNameInput.value);
  }

  onMounted(() => {
    athleteNameInput.value = athleteData.value.name;
  });
</script>