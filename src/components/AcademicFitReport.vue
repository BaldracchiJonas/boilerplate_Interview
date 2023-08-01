<template>
    <div>
      <div class="info">

        <ProfileImage/>
        
        <input v-model="athleteNameInput" @blur="updateAthleteName" @keyup.enter="updateAthleteName" />

        <ul>
          <li data-test="sport-text">
            <label data-test="sport-label">Sport:</label>
            {{athleteData.sport}}
          </li>
          <li data-test="class-text">
            <label data-test="class-label">Class:</label>
            {{athleteData.grad_year}}
          </li>
          <li data-test="club-text">
            <label data-test="club-label">Club:</label>
            {{athleteData.club.name}}
          </li>
          <li data-test="high-school-text">
            <label data-test="high-school-label">High School:</label>
            {{athleteData.high_school.name}}
          </li>
          <li data-test="gpa-text">
            <label data-test="gpa-label">GPA:</label>
            {{athleteData.gpa}}
          </li>
          <li data-test="desired-major-text">
            <label data-test="desired-major-label">Desired Major:</label>
            {{athleteData.major}}
          </li>
        </ul>
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