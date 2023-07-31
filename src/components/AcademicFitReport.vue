<template>
    <div>
      <div class="info">

        <ProfileImage :image="props.athlete.profile_image" :name="props.athlete.name"></ProfileImage>
        
        <h2>{{props.athlete.name}}</h2>
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
  import { defineProps } from 'vue';
  import ProfileImage from "@/components/ProfileImage.vue";

    const props = defineProps({
      athlete: {
        type: Object,
        required: false
      }
    });

</script>