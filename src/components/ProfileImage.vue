<template>
    
    <div :class="avatarColor" class="w-16 h-16 rounded-full overflow-hidden flex justify-center items-center" data-test="avatarColor-class">

        <template v-if="athleteData.profile_image">
        <img :src="athleteData.profile_image" alt="Athlete Profile Image" class="w-full h-full object-fill" />
        </template>

        <template v-else>
        <span class="text-white text-xl">{{ initials }}</span>
        </template>

    </div>

</template>

<script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();
  const athleteData = computed(() => store.getters.getAthleteData);

  const initials = computed(() => {
    const name = athleteData.value.name || '';
    const nameParts = name.trim().split(' ');
    return nameParts.map((part) => part.charAt(0)).join('').toUpperCase();
  });

  const avatarColor = computed(() => {
    const lastName = athleteData.value.name ? athleteData.value.name.trim().split(' ').pop() : '';
    const initial = lastName.charAt(0).toUpperCase().charCodeAt(0);

    // Range of ASCII values for each color
    const colorRanges = [
      { range: [65, 69], color: 'bg-red-500' },     // A to E
      { range: [70, 74], color: 'bg-blue-500' },    // F to J
      { range: [75, 79], color: 'bg-purple-500' },  // K to O
      { range: [80, 84], color: 'bg-teal-500' },    // P to T
      { range: [85, 89], color: 'bg-yellow-500' },  // U to Y
      { range: [90, 90], color: 'bg-orange-500' },  // Z
    ];

    const defaultColor = 'bg-gray-500';

    // Find the matching range and return the corresponding color
    const matchedRange = colorRanges.find(range => initial >= range.range[0] && initial <= range.range[1]);
    return matchedRange ? matchedRange.color : defaultColor;
  });

</script>