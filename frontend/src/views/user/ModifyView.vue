<template>
  <div class="limiter">
    <div class="container-login100 shadow-lg">
      <div class="wrap-login100" style="margin-left: 20%; margin-right: 10%;">
        <div class="head mb-4">회원정보 수정</div>
        <form @submit.prevent="modify(credentials)" @reset="onReset">
          <dl class="row" style="text-align: left; padding-left: 15%;">

            <div class="form-group row">
              <label class="col-lg-4 col-form-label" for="val-username">이름 <span class="text-danger">*</span></label>
              <div class="col-lg-6">
                <div class="inputNew d-flex flex-col align-item-center justify-content-center" >
                  <input v-model="credentials.userName" type="text"  class="form-control inputNew" id="val-username" name="val-username" placeholder="Enter a username.." required>
                  <span class="focus-input100"></span>
                </div>
              </div>
            </div>

            <div class="form-group row">
            <label class="col-lg-4 col-form-label">소속 </label>
            <div class="col-lg-6">
              <div class="inputNew d-flex flex-col align-item-center justify-content-center" >
                <p style="color: black;">{{ credentials.userDept }}</p>
              </div>
            </div>
          </div>

            <!-- <div class="form-group row">
            <label class="col-lg-4 col-form-label">UserRole</label>
            <div class="col-lg-6">
              <div class="inputNew d-flex flex-col align-item-center justify-content-center" >
                <p style="color: black;">{{ credentials.userRole }}</p>
              </div>
            </div>
          </div> -->

            <div class="form-group row">
            <label class="col-lg-4 col-form-label">이메일</label>
            <div class="col-lg-6">
              <div class="inputNew d-flex flex-col align-item-center justify-content-center" >
                <p style="color: black;">{{ credentials.userEmail}}</p>
              </div>
            </div>
          </div>

            <div class="form-group row">
              <label class="col-lg-4 col-form-label" for="pw">비밀번호 <span class="text-danger">*</span></label>
              <div class="col-lg-6">
                <div class="inputNew d-flex flex-col align-item-center justify-content-center" >
                  <input v-model="credentials.userPw" type="password"  class="form-control inputNew" id="pw" name="val-username" placeholder="Enter New password" required>
                  <span class="focus-input100"></span>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-lg-4 col-form-label" for="phone">전화번호 (kr) <span class="text-danger">*</span></label>
              <div class="col-lg-6">
                <div class="inputNew d-flex flex-col align-item-center justify-content-center" >
                  <input v-model="credentials.userPhone" type="text"  class="form-control inputNew" id="phone" name="val-username" placeholder="Enter a phone Number" required>
                  <span class="focus-input100"></span>
                </div>
              </div>
            </div>

          </dl>
          <button type="reset" class="btn btn mx-2" style="margin-top: 10px;  background-color: #30475E; color: white; border-radius: 25px;">Reset</button>
          <button type="submit" class="btn btn" style="margin-top: 10px;  background-color: #f05454; color: white; border-radius: 25px;">완료</button>
        </form>
        <router-link class="return my-2" :to="{ name: 'profile', params: { useremail } }">이전</router-link>
        &nbsp;
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import router from '@/router'

export default {
  name: "ModifyView",
  components: {

  },
  data() {
    return {
        credentials: {
          userDept: "",
          userEmail: "",
          userName: "",
          userNo: 0,
          userPhone: "",
          userPw: "",
          userRole: "",
          userYn: true         
        },
    }
  },
  computed: {
    ...mapGetters(['profile', 'password','email']),
    useremail() {
        return this.email
      },
  },
  methods: {
    ...mapActions(['modify']),
    onReset(event) {
        event.preventDefault()
        // Reset our form values
        //this.credentials.userRole = ''
        //this.credentials.userEmail = ''
        this.credentials.userPw = ''
        this.credentials.userName = ''
        //this.credentials.userDept = ''
        this.credentials.userPhone = ''
      },
      logo() {
      router.push({ name: 'meetingroom_man' })
      }
  },
  created() {
    this.credentials.userEmail = this.profile.userEmail
    this.credentials.userName = this.profile.userName
    this.credentials.userPw = this.password
    this.credentials.userDept = this.profile.userDept
    this.credentials.userPhone = this.profile.userPhone
    this.credentials.userRole = this.profile.userRole
  }
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