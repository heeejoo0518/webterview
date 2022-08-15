import axios from 'axios'
import drf from '@/api/drf'
import router from '@/router'

import _ from 'lodash'
// import accounts from './accounts'

export default {
  // namespaced: true,
  state: {
    notices: [],
    boards: [],
    board: {},
    comments: [],
    comment: {},
    currentBoardNo: "",
  },

  getters: {
    notices: state => state.notices,
    boards: state => state.boards,
    board: state => state.board,
    isAuthor: (state, getters) => {
      return state.board.user?.username === getters.currentUser.username
    },
    isBoard: state => !_.isEmpty(state.board),
    comments: state => state.comments,
    comment: state => state.comment,
    currentBoardNo: state => state.currentBoardNo,
  },

  mutations: {
    SET_NOTICES: (state, notices) => state.notices = notices,
    SET_BOARDS: (state, boards) => state.boards = boards,
    SET_BOARD: (state, board) => state.board = board,
    SET_BOARD_COMMENTS: (state, comments) => (state.board.comments.push(comments)),
    SET_COMMENTS: (state, comments) => state.comments = comments,
    SET_COMMENT: (state, comment) => state.comment = comment,
    SET_CURRENT_BOARDNO: (state, currentBoardNo) => state.currentBoardNo = currentBoardNo,
  },

  actions: {
    async fetchBoards({ commit, getters }, params) {
      await axios({
        url: drf.boards.boards(), 
        // url: '/board',
        method: 'get',
        //headers: getters.authHeader,
        params: params,
        headers: { 'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset = utf-8',
        'access-token': getters.authHeader['access-token']},
      })
        .then(res => {
          console.log('success fetch notice, boardList')
          console.log(res.data)
          commit('SET_NOTICES', res.data.noticeList)
          commit('SET_BOARDS', res.data.boardList)
        })
        .catch(err => 
            console.error(err))
    },

    fetchBoard({ commit, getters }, boardNo) {
      axios({
        url: drf.boards.board(boardNo),
        // url: '/board' + '/' + boardNo,
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          console.log(res.data.board)
          console.log(res.data.board.comments)
          commit('SET_BOARD', res.data.board)
          commit('SET_COMMENTS', res.data.board.comments)
        })
        .catch(err => {
          console.error(err.response)
          if (err.response.status === 404) {
            router.push({ name: 'NotFound404' })
          }
        })
    },

    createBoard({ getters }, board) {
      axios({
        url: drf.boards.boards(),
        // url: '/board',
        method: 'post',
        headers: getters.authHeader,
        data: board,
      })
        .then(res => {
          console.log('create?')
          console.log(res.data)
          //commit('SET_BOARD', res.data.board)
          router.push({ name: 'boards' })
        })
    },

    updateBoard({getters }, payload) {
      console.log(payload)
      axios({
        url: drf.boards.modify(),
        // url: '/board' + '/modify',
        method: 'put',
        data: payload,
        headers: getters.authHeader,
      })
        .then(res => {
          console.log(res.data)
          router.push({ name: 'boards'})
        })
    },

    deleteBoard({ commit, getters }, boardNo) {
      if (confirm('정말 삭제하시겠습니까?')) {
        axios({
          url: drf.boards.board(boardNo),
          // url: '/board' + '/' + boardNo,
          method: 'delete',
          headers: getters.authHeader,
        })
          .then(() => {
            commit('SET_BOARD', {})
            router.push({ name: 'boards' })
          })
          .catch(err => console.error(err.response))
      }
    },

    createComment({ commit, getters }, credentials) {
      axios({
        url: drf.boards.comments(),
        // url: '/board' + '/comment',
        method: 'post',
        data: credentials,
        headers: getters.authHeader,
      })
        .then(res => {
          console.log(res.data.comment)
          commit('SET_BOARD_COMMENTS', res.data.comment)
          console.log(getters.comments)
          //router.push({ name: 'board', params: {boardNo: credentials.boardNo}})
        })
        .catch(err => console.error(err.response))
    },

    deleteComment({ getters, dispatch }, comment) {
        if (confirm('정말 삭제하시겠습니까?')) {
          axios({
            url: drf.boards.comment(comment.commentNo),
            // url: '/board' + '/comment' + '/' + comment.commentNo,
            method: 'delete',
            data: {},
            headers: getters.authHeader,
          })
            .then(res => {
              console.log(res.data)
              console.log(comment.boardNo)
              if (res.data === "success") {
                console.log('if?')
                dispatch('fetchBoard', comment.boardNo)
              }
              
            })
            .catch(err => console.error(err.response))
        }
    },
    fetchBoardNo({commit}, boardNo ) {
      commit('SET_CURRENT_BOARDNO', boardNo)
    }

  },
}
