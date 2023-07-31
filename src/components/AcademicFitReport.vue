<template>
    <div>
      <div class="info">

        <ProfileImage/>
        
        <input v-model="athleteNameInput" @blur="updateAthleteName" @keyup.enter="updateAthleteName" />

        <ul>
          <li>
            <label>Sport:</label>
            {{athleteData.sport}}
          </li>
          <li>
            <label>Class:</label>
            {{athleteData.grad_year}}
          </li>
          <li>
            <label>Club:</label>
            {{athleteData.club.name}}
          </li>
          <li>
            <label>High School:</label>
            {{athleteData.high_school.name}}
          </li>
          <li>
            <label>GPA:</label>
            {{athleteData.gpa}}
          </li>
          <li>
            <label>Desired Major:</label>
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