import router from '@/router'
import axios from 'axios'
import drf from '@/api/drf'

export default {
    state: {
      token: localStorage.getItem('token') || '' ,
      //백엔드 확인
      email: localStorage.getItem('email') || '' ,
      //
      currentUser: {},
      profile: {},
      authError: null,
      code: "",
      password: "",
      isEmail: 0,
      check: "fail",
      isOverlap: false,
      userNo: '',
    },

    getters: {
      isLoggedIn: state => !!state.token,
      currentUser: state => state.currentUser,
      profile: state => state.profile,
      authError: state => state.authError,
      email: state => state.email,
      //authHeader: state => ({ Authorization: `Token ${state.token}` }),
      authHeader: state => ({ 'access-token': `${state.token}`}),
      token: state => state.token,
      password: state => state.password,
      code: state => state.code,
      isEmail: state => state.isEmail,
      check: state => state.check,
      isOverlap: state => state.isOverlap,
      userNo: state => state.userNo,

    },

    mutations: {
      SET_TOKEN: (state, token) => state.token = token,
      SET_EMAIL: (state, email) => state.email = email,
      SET_CURRENT_USER: (state, user) => state.currnetUser = user,
      SET_PROFILE: (state, profile) => state.profile = profile,
      SET_AUTH_ERROR: (state, error) => state.authError = error,
      SET_PASSWORD: (state, password) => state.password = password,
      SET_CODE: (state, code) => state.code = code,
      ADD_ISEMAIL: (state) => state.isEmail += 1,
      SET_ISEMAIL: (state, isEmail) => state.isEmail = isEmail,
      SET_CHECK: (state, check) => state.check = check,
      SET_OVERLAP: (state,isOverlap) => state.isOverlap = isOverlap,
      SET_USERNO: (state,userNo) => state.userNo = userNo
      

    },

    actions: {
        saveToken({ commit }, token) {
            commit('SET_TOKEN', token)
            localStorage.setItem('token', token)
        },
        removeToken({ commit }) {
            commit('SET_TOKEN', '')
            localStorage.setItem('token', '')
        },
        saveEmail({ commit },email) {
            commit('SET_EMAIL',email)
            localStorage.setItem('email', email)
        },
        removeEmail({ commit }) {
          commit('SET_EMAIL', '')
          localStorage.setItem('email', '')
        },
        savePassword({ commit }, password) {
          commit('SET_PASSWORD', password)
          // localStorage.setItem('password', password)
        },
        removePassword({ commit }) {
          commit('SET_PASSWORD', '')
          // localStorage.setItem('password', '')
        },
        /////////////////////
        saveCode({ commit }, code) {
          commit('SET_CODE', code)
          localStorage.setItem('code', code)
        },
        removeCode({ commit }) {
          commit('SET_CODE', '')
          localStorage.setItem('code', '')
        },
        saveProfile({ commit }, profile) {
          commit('SET_PROFILE', profile)
          localStorage.setItem('profile', profile)
        },
        removeProfile({ commit }) {
          commit('SET_PROFILE', '')
          localStorage.setItem('profile', '')
        },
        removeisEmail({ commit }) {
          commit('SET_ISEMAIL', 0)
          localStorage.setItem('isEmail', 0)
        },
        saveCheck({commit}, check) {
          commit('SET_CHECK', check)
          localStorage.setItem('check', check)
        },
        checkEmail({commit}, isOverlap) {
          commit('SET_OVERLAP', isOverlap)
          localStorage.setItem('isOverlap', isOverlap)
        },
        saveUserNo({commit}, userNo) {
          commit('SET_USERNO', userNo)
          localStorage.setItem('userNo', userNo)
        },

        async fetchProfile({ dispatch, getters }, { useremail }) {
          await axios({
            url: drf.accounts.profile(useremail),
            method: 'get',
            headers: getters.authHeader,
          })
            .then(res => {
                console.log(res.data["userInfo"])
                dispatch('saveProfile', res.data["userInfo"])
                dispatch('saveUserNo', res.data["userInfo"].userNo)
            })
        },


        async login ({ commit, dispatch, getters}, credentials) {
            console.log(credentials)
            
            // POST: 사용자 입력정보를 login url로 보내기
            // 성공시
            // 응답 토큰 저장, 현재 사용자 정보 받기, 메인페이지(방만들기 페이지) 이동
            // 실패시
            //  에러메세지 표시
            await axios({
                url: drf.accounts.login(),
                // url: "/user/login",
                method: 'post',
                data: credentials
            })
              .then(res => {
                
                if (res.data.message === 'success') {
                  console.log(res.data)
                  const token = res.data["access-token"]
                  const email = credentials.userEmail
                  const password = credentials.userPw
                  // const userNo = credentials.userNo
                  dispatch('saveEmail', email)
                  dispatch('saveToken', token)
                  dispatch('savePassword', password)
                  // dispatch('fetchProfile', credentials.userEmail)
                  // dispatch('fetchCurrentUser')
                  // dispatch('fetchProfile', email)
                  // dispatch('saveProfile', res.data["userInfo"])
                  router.push({name: 'meetingroom_man'})
                } 
                else {
                  console.log(res.data)
                  alert('회원 정보가 일치하지 않습니다.')
                }
                // ##########################################
              })
              .catch(err => {
                console.error(err)
                commit('SET_AUTH_ERROR', err)
              })
            await axios({
              url: drf.accounts.profile(credentials.userEmail),
              // url: '/user/info/' + credentials.userEmail,
              method: 'get',
              headers: getters.authHeader,
            })
              .then(res => {
                  console.log(res.data["userInfo"])
                  dispatch('saveProfile', res.data["userInfo"])
                  dispatch('saveUserNo', res.data["userInfo"].userNo)
              })
              .catch(err => [
                console.log(err)
              ])
            await axios({
              url: drf.admins.readGroup(getters.userNo),
              // url: '/admin'+'/group/' + getters.userNo,
              method: 'get',
              headers: getters.authHeader,
            })
              .then(res => {
                console.log(res.data.group)
                commit('SET_GROUPNO', res.data.group.groupNo)
                commit('SET_RANKGROUPNO', res.data.group.rankGroupNo)
              })
              .catch(err => {
                console.error(err)
              })
            await axios({
              url: drf.admins.listRoom(getters.groupNo),
              // url: '/admin'+'/roomList/' + getters.groupNo,
              method: 'get',
              headers: getters.authHeader,
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

        signup({ commit, dispatch }, credentials) {
          console.log(credentials)
            /* 
            POST: 사용자 입력정보를 signup URL로 보내기
            성공하면
                응답 토큰 저장
                현재 사용자 정보 받기
                메인 페이지(방만들기 페이지)로 이동
            실패하면
                에러 메시지 표시
      */
            axios({
                url:drf.accounts.signup(),
                method: 'post',
                data: credentials
            })
              .then(res => {
                console.log(res.data)
                dispatch('fetchCurrentUser')
                //####################################### 이름 맞춰봐야함
                router.push({ name: 'home' })
                // ##########################################
                console.log("success")
              })
              .catch(err => {
                //console.error(err.response.data)
                console.error(err)
                commit('SET_AUTH_ERROR', err)
              })
        },
        // 프로필 정보 수정
        modify({ dispatch, getters }, credentials) {
            console.log(credentials)
            /* 
            POST: 사용자 입력정보를 signup URL로 보내기
            성공하면
                응답 토큰 저장
                현재 사용자 정보 받기
                메인 페이지(방만들기 페이지)로 이동
            실패하면
                에러 메시지 표시
      */
            axios({
                url:drf.accounts.modify(),
                method: 'put',
                data: credentials,
                headers: getters.authHeader,
                //headers: 'eyJ0eXAiOiJKV1QiLCJyZWdEYXRlIjoxNjU4MTk1MDk0MTU4LCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTgxOTg2OTQsInN1YiI6ImFjY2Vzcy10b2tlbiIsInVzZXJlbWFpbCI6InRlc3RAdGVzdC5jby5rciJ9.Bt-fXjR4Fb6tUWGE9kOGdqdU7yfIOP1C_xs6sz9a5EY',
            })
              .then(res => {
                //const email = credentials.useremail
                console.log(res.data)
                dispatch('fetchCurrentUser')
                dispatch('removeisEmail')
                console.log("success")
                router.push({ name: 'profile', params: { useremail: credentials.userEmail } })
              })
              .catch(err => {
                console.error(err)
                //commit('SET_AUTH_ERROR', err)
              })
        },
        // 이메일 인증코드 보내기
        sendmail({ commit, dispatch }, credentials) {
            axios({
              url:drf.accounts.sendmail(),
              method: 'post',
              data: credentials
            })
              .then(res => {
                dispatch('saveCode', res.data.code)
                commit('ADD_ISEMAIL')
                // ##########################################
                console.log(res.data)
                console.log(res.data.code)
                console.log("send email success")
              })
              .catch(err => {
                console.error(err.response.data)
              })
        },
        deleteisEmail({dispatch}) {
          dispatch('removeisEmail')
        },

        logout({ dispatch }) {
          dispatch('removeToken')
          dispatch('removeEmail')
          dispatch('removeProfile')
          dispatch('removeCode')
          dispatch('removePassword')
          alert('성공적으로 logout!')
          router.push({ name: 'home' })
        },

        // fetchCurrentUser({ commit, getters, dispatch }) {
        //    if (getters.isLoggedIn) {
        //     axios({
        //         url: drf.accounts.currentUserInfo(),
        //         method: 'get',
        //         headers: getters.authHeader,
        //     })
        //       .then(res => commit('SET_CURRENT_USER', res.data))
        //       .catch(err => {
        //         if (err.response.status ===401) {
        //             dispatch('removeToken')
        //             router.push({ name: 'home' })
        //         }
        //       })
        //    }
        // },
      deleteUser({ dispatch, getters }, useremail ) {
        console.log(useremail)        
        if (confirm('정말 탈퇴 하시겠습니까?')) {
          axios({
            url: drf.accounts.delete(useremail),
            method: 'delete',
            headers: getters.authHeader,
          })
            .then(() => {
              dispatch('removeToken')
              dispatch('removeEmail')
              dispatch('removeProfile')
              dispatch('removeCode')
              dispatch('removePassword')
              router.push({ name: 'home' })
            })
            .catch(err => console.error(err.response))
        }
      },
      findmail({ commit,dispatch }, credentials) {
        axios({
          url:drf.accounts.findMail(),
          method: 'post',
          data: credentials
        })
          .then(res => {
            const email = res.data
            console.log(res.data)
            dispatch('saveEmail', email)
          })
          .catch(err => {
            console.log(err)
            commit('SET_AUTH_ERROR', err)
          })
      },
      saveNewPw( {commit} ,credentials ) {
        console.log(credentials)
        axios({
          url: drf.accounts.saveNewPw(),
          method: 'put',
          data: credentials,
        })
          .then(res => {
            console.log(res.data)
            alert("비밀번호 변경완료")
            router.push({ name: 'home' })
            console.log("success")
          })
          .catch(err => {
            console.error(err)
            commit('SET_AUTH_ERROR', err)
          })
       },

      overlapEmail ({ commit, dispatch }, credentials) {
        console.log(credentials)
        if ( credentials.userEmail ==="") {
          // dispatch('checkEmail', false)
          alert("비어있어요")
          return
        }
        axios({
            // url: drf.accounts.login(),
            url: drf.accounts.overlap(),
            method: 'post',
            data: credentials
        })
          .then(res => {
            if (res.data.message === '이메일 중복 x') {
              // console.log(res.data)
              const email = credentials.userEmail
              console.log(res.data)
              dispatch('saveEmail', email)
              dispatch('checkEmail', true)
              console.log(true)
            } 
            else {
              console.log(res.data)
              console.log(false)
              dispatch('checkEmail', false)
            }
          })
          .catch(err => {
            console.error(err)
            commit('SET_AUTH_ERROR', err)
          })
    },

       matchPw( {commit, dispatch} ,credentials ) {
        console.log(credentials)
        axios({
          url: drf.accounts.matchPw(),
          method: 'post',
          data: credentials,
        })
          .then(res => {
            console.log(res.data)
            alert("비밀번호 확인")
            dispatch('saveCheck', res.data.message)
          })
          .catch(err => {
            console.error(err)
            commit('SET_AUTH_ERROR', err)
          })
       },
      
    }
}
