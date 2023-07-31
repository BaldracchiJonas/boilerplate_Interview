<template>
    <div>
      <div class="info">

        <ProfileImage :image="props.athlete.profile_image" :name="props.athlete.name"></ProfileImage>
        
        <input v-model="athleteNameInput" @blur="updateAthleteName" @keyup.enter="updateAthleteName" />

        <ul>
          <li>
            <label>Sport:</label>
            {{props.athlete.sport}}
          </li>
          <li>
            <label>Class:</label>
            {{props.athlete.grad_year}}
          </li>
          <li>
            <label>Club:</label>
            {{props.athlete.club.name}}
          </li>
          <li>
            <label>High School:</label>
            {{props.athlete.high_school.name}}
          </li>
          <li>
            <label>GPA:</label>
            {{props.athlete.gpa}}
          </li>
          <li>
            <label>Desired Major:</label>
            {{props.athlete.major}}
          </li>
        </ul>
      </div>
    </div>
</template>
  
<script setup>
  import { defineProps, computed, ref, onMounted } from 'vue';
  import ProfileImage from '@/components/ProfileImage.vue';
  import { useStore } from 'vuex';

  const store = useStore();
  const athleteNameInput = ref('');
  const AthleteData = computed(() => store.getters.getAthleteData);

  function updateAthleteName() {
    store.commit('updateAthleteName', athleteNameInput.value);
  }

  const props = defineProps({
    athlete: {
      type: Object,
      required: false,
    },
  });

  onMounted(() => {
    // Initialize the input value with the current AthleteData.name when the component is mounted.
    athleteNameInput.value = AthleteData.value.name;
  });
</script>