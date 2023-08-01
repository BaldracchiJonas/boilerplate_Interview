import { createStore } from 'vuex';
import AthleteData from "@/assets/data.json";

const store = createStore({
  state() {
    return {
      athleteData: AthleteData.data[0],
    };
  },
  mutations: {
    updateAthleteName(state, newName) {
      state.athleteData.name = newName;
    },
  },
  getters: {
    getAthleteData(state) {
      return state.athleteData;
    },
  },
});

export default store;