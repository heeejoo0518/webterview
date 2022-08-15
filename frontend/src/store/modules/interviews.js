import router from '@/router'
import axios from 'axios'
import drf from '@/api/drf'


// import _ from 'lodash'

export default {
  state: {
    groupStart: '',
    groupEnd: '',
    groupBlind: '',
    userNo: '',
    groupNo: localStorage.getItem('groupNo') || '',
    // groupNo: '',
    ranking: {},
    roomList: [],
    // 면접 종료후 순위 확인위한 변수
    rankGroupNo: localStorage.getItem('groupNo') || '',
    inProgress: false,
  },
  getters: {
    groupNo: state => state.groupNo,
    roomList: state => state.roomList,
    rankGroupNo: state => state.rankGroupNo,
    groupBlind: state => state.groupBlind,
    inProgress: state => state.inProgress,
  },
  mutations: {
    SET_START_TIME: (state,groupStart) => state.groupStart = groupStart,
    SET_END_TIME: (state,groupEnd) => state.groupEnd = groupEnd,
    SET_BLINDYN: (state, groupBlind) => state.groupBlind = groupBlind,
    SET_USERNO: (state,userNo) => state.userNo = userNo,
    SET_GROUPNO: (state,groupNo) => state.groupNo = groupNo,
    SET_ROOMLIST: (state,roomList) => state.roomList = roomList,
    SET_RANKGROUPNO: (state,rankGroupNo) => state.rankGroupNo = rankGroupNo,
    SET_INPROGRESS: (state,inProgress) => state.inProgress = inProgress,
  },
  
  actions: {
    saveRoomList({ commit }, roomList) {
      commit('SET_ROOMLIST', roomList)
      localStorage.setItem('roomList', roomList)
    },
    async fetchRoomList({dispatch, getters}, groupNo) {
      console.log(groupNo)
      await axios({
          url: drf.admins.listRoom(groupNo),
          // url: '/admin'+'/roomList/' + groupNo,
          method: 'get',
          headers: {
            'access-token': getters.authHeader['access-token'],
          }
      })
        .then(res => {
          console.log(res.data.roomList)
          if (res.data.message === 'success') {
            console.log(res.data)
            dispatch('saveRoomList', res.data.roomList)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    async deleteGroupNo({commit}, groupNo) {
      console.log("delete Group", groupNo)
      console.log(groupNo)
      await commit('SET_GROUPNO', '')
      localStorage.setItem('groupNo', '')
    },

    async createdInterview ({ commit, getters }, credentials) {
      credentials.groupStart += ':00'
      credentials.groupEnd += ':00'
      // console.log(credentials)
      
      await axios({
        url: drf.admins.createGroup(),
        // url: '/admin/createGroup',
        method: 'post',
        headers: getters.authHeader,
        data: credentials,
        
      })
        .then(res => {
          console.log('미팅생성완료')
          console.log(res.data.group)
          console.log(res.data.group.groupNo)
          commit('SET_START_TIME', res.data.group.groupStart)
          commit('SET_END_TIME', res.data.group.groupEnd)
          commit('SET_BLINDYN', res.data.group.groupBlind)
          commit('SET_USERNO', res.data.group.userNo)
          commit('SET_GROUPNO', res.data.group.groupNo)
          commit('SET_RANKGROUPNO', res.data.group.groupNo)
          // createRoom
        })
        .catch(err => 
          console.error(err))
    },

    ////////////////////순위표를 백에 요청하는 함수를 짜야하지만 api가 아직////////////////
    async finishInterview({ dispatch,getters}, groupNo) {
      // console.log(groupNo)
       await axios({
        url: drf.admins.deleteGroup(groupNo),
        // url: `/admin/${groupNo}`,
        method: 'delete',
        headers: getters.authHeader,
        
      })
        .then(res => {
          dispatch("deleteGroupNo",groupNo)
          console.log(res)
          console.log('finish interview')
          alert('면접이 종료되었습니다. 순위표를 확인하세요!')
          router.push({name: 'ranking'})
        })
    },
    
    async createRooms( { getters }, room ) {
      console.log(room)
      await axios({
        url:drf.admins.createRoom(),
        // url:'/admin/createRoom',
        method: 'post',
        headers: getters.authHeader,
        data: room,
      })
        .then(res => {
          console.log(res.data)
        })
    },
    // 방 한개 추가하기
    async addRoom({ dispatch, getters }, ) {
      await axios({
        url:drf.admins.createRoom(),
        // url:'/admin/createRoom',
        method: 'post',
        headers: getters.authHeader,
        data: {"num": 1, "groupNo": getters.groupNo},
      })
        .then(res => {
          console.log(res.data)
          dispatch("fetchRoomList", getters.groupNo)
        })
    },
    // 방 한개 삭제하기
    deleteRoom({ dispatch, getters }, roomNo) {
      axios({
        url:drf.admins.deleteRoom(roomNo),
        // url:`/admin/room/` + roomNo,
        method: 'delete',
        headers: getters.authHeader,
      })
        .then(res => {
          console.log(res.data)
          dispatch("fetchRoomList", getters.groupNo)
        })
    },
    
    async readGroup({getters}, userNo) {
      await axios({
          url: drf.admins.readGroup(userNo),
          // url: '/admin'+'/group/' + userNo,
          method: 'get',
          headers: {
            'access-token': getters.authHeader,
          }
      })
        .then(res => {
          console.log(res.data.group)
          this.groupNo = res.data.group.groupNo
        })
        .catch(err => {
          console.error(err)
        })
    },
    setInProgress({commit}, inProgress) {
      commit("SET_INPROGRESS", inProgress);
    }
  },
}
