<template>
  <div class="limiter">
    <div class="container-login100 shadow-lg" >
      <div class="wrap-login100" style="margin-left: 20%; margin-right: 10%;">
        <div class="headLine2 mb-4">회원 정보</div>
        <dl class="row" style="text-align: left; padding-left: 15%;">

          <div class="form-group row">
            <label class="col-lg-4 col-form-label">이름 </label>
            <div class="col-lg-6">
              <div class="inputNew d-flex flex-col align-item-center justify-content-center" >
                <p style="color: black;">{{ profile.userName }}</p>
              </div>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-lg-4 col-form-label">소속 </label>
            <div class="col-lg-6">
              <div class="inputNew d-flex flex-col align-item-center justify-content-center" >
                <p style="color: black;">{{ profile.userDept }}</p>
              </div>
            </div>
          </div>

          <!-- <div class="form-group row">
            <label class="col-lg-4 col-form-label">UserRole</label>
            <div class="col-lg-6">
              <div class="inputNew d-flex flex-col align-item-center justify-content-center" >
                <p style="color: black;">{{ profile.userRole }}</p>
              </div>
            </div>
          </div> -->

          <div class="form-group row">
            <label class="col-lg-4 col-form-label">이메일 </label>
            <div class="col-lg-6">
              <div class="inputNew d-flex flex-col align-item-center justify-content-center" >
                <p style="color: black;">{{ profile.userEmail }}</p>
              </div>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-lg-4 col-form-label">비밀번호 </label>
            <div class="col-lg-6">
              <div class="inputNew d-flex flex-col align-item-center justify-content-center" >
                <p style="color: black;">********</p>
              </div>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-lg-4 col-form-label">전화번호 (kr)</label>
            <div class="col-lg-6">
              <div class="inputNew d-flex flex-col align-item-center justify-content-center" >
                <p style="color: black;">{{ profile.userPhone }}</p>
              </div>
            </div>
          </div>

        </dl>

        <div class="d-flex flex-row justify-content-center">
          <button @click="toModify" class="btn btn" style="margin-top: 10px;  background-color: green; color: white; border-radius: 25px;">수정하기</button>
          <!-- <router-link :to="{ name: 'modify' }"><p>수정하기</p></router-link> -->
          <!-- <button @click="deleteUser(email)" class="btn btn mx-2" style="margin-top: 10px;  background-color: red; color: white; border-radius: 25px;">탈퇴하기</button> -->
          <!-- <p class="mx-2" @click="deleteUser(email)" >회원탈퇴</p> -->
        </div>
        <!-- <router-link class="return my-2" to="/webterview" >이전</router-link> -->
        <div class="text-center p-t-33">
          <p class="txt2" @click="wantdelete">계정을 삭제하고 싶으신가요? Click</p>
          <form v-if="deleteForm" @submit.prevent="matchPw(credentials)">
            <input class="rounded border" type="password" id="pw" v-model="credentials.pw" placeholder="Enter password..">
            <button type="submit">비밀번호 확인</button>
          </form>
          <span v-if="check==='success'" @click="deleteUser(email)">회원탈퇴하기</span>
          
        </div>
        &nbsp;
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import router from '@/router'

export default {
  name: 'ProfileView',
  data() {
    return {
      isMatch: false,
      deleteForm: false,
      credentials: {
        email: "", 
        pw: ""
      }
    }
  },
  computed: {
    ...mapGetters(['profile', 'password', 'email', 'check']),
  },
  methods: {
    ...mapActions(['fetchProfile', 'deleteUser', 'matchPw', 'saveCheck']),
    wantdelete() {
      this.deleteForm = true
    },
    logo() {
      router.push({ name: 'meetingroom_man' })
    },
    toModify() {
      router.push({ name: 'modify' })
    }
  },
  created() {
    const payload = { useremail: this.$route.params.useremail }
    this.fetchProfile(payload)
    this.credentials.email = this.$route.params.useremail
    this.saveCheck("fail")
  },
}
</script>

<style scoped>
  .return{
  text-decoration: none;
  color: crimson;
  }

  p {
    padding-left: 20px;
  }
</style>