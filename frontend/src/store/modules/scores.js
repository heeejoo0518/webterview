// import router from '@/router'
import drf from '@/api/drf'
import axios from 'axios'



export default {
  state: {
    commentR: '',
    evaluations: [],
  },
  getters: {
    commentR: state => state.commentR,
    evaluations: state => state.evaluations

  },
  mutations: {
    ADD_COMMENTR: (state,commentR) => state.commentR += commentR,
    SET_COMMENTR: (state,commentR) => state.commentR = commentR,
    ADD_RATER_EVALUATION: (state,evaluations) => state.evaluations.push(evaluations),
    SET_RATER_EVALUATION: (state,evaluations) => state.evaluations = evaluations,
  },
  actions: {
    addComment({ commit }, commentR) {
      commit('ADD_COMMENTR', commentR+'/')
      localStorage.setItem('commentR', commentR+'/')
    },
    removeComment({ commit }) {
      commit('SET_COMMNETR', "")
      localStorage.setItem('rater', "")
    },
    addRaterEval({ commit }, raterEvaluations ) {
      commit('ADD_RATER_EVALUATION', raterEvaluations)
    },
    removeRaterEval({ commit } ) {
      commit('SET_RATER_EVALUATION', "")
      localStorage.setItem('evaluations', '')
    },
    // saveScore({ dispatch }, credentials ) {
    //   dispatch("addComment", credentials.comment)
    //   dispatch("addRaterEval", credentials.raterEvaluations)
    // },
    uploadScoreSheet({getters}, credentials){
      axios({
        url: drf.applicants.saveScore(),
        // url: '/score'+'/save',
        method: 'post',
        data: credentials,
        headers: getters.authHeader,
    })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.error(err)
      })
    }
  }
}
