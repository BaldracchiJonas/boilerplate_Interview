import { createStore } from 'vuex';
import AthleteData from "@/assets/data.json";

const store = createStore({
  state() {
    return {
      AthleteData: AthleteData.data[0],
    };
  },
  mutations: {
    updateAthleteName(state, newName) {
      state.AthleteData.name = newName;
    },
  },
  getters: {
    getAthleteData(state) {
      return state.AthleteData;
    },
  },
});

export default store;