<template>
  <!-- <div class="w3-sidebar w3-bar-block" style="width:25%"> -->
  <div class="icon-bar">
    <br>
    <img @click="logo" class="logo2" src="@/../public/resources/images/logo.png" alt="Logo">
    <router-link :class="{red: a===true, green:  a===false}" @click="aclick" to="/webterview/meetingroom_man" class="sidebar-name">
      <div >
        <i class="fa-solid fa-house-laptop"></i> <span> 면접장</span>
      </div>
    </router-link>
    <router-link :class="{red: b===true, green: b===false}" @click="bclick" to="/webterview/raterMan" class="sidebar-name"> 
      <div>
        <i class="fa-solid fa-users"></i> <span> 면접관관리</span>
      </div>
    </router-link>
    <router-link :class="{red: c===true, green: c==false}" @click="cclick" to="/webterview/applicant_man" class="sidebar-name">
      <div>
        <i class="fa-solid fa-user-tie"></i> <span> 지원자관리</span>
      </div>
    </router-link>
    <router-link :class="{red: d===true, green: d==false}" @click="dclick" to="/webterview/evaluationMan" class="sidebar-name">
      <div>
        <i class="fa-regular fa-file-lines"></i> <span> 평가표관리</span>
      </div>
    </router-link>
    <router-link :class="{red: e===true, green: e==false}" @click="eclick" to="/webterview/boards" class="sidebar-name">
      <div>
        <i class="fa-solid fa-bullhorn"></i> <span> 게시판</span>
      </div>
    </router-link>
    <router-link :class="{red: f===true, green: f===false}" @click="fclick" to="/webterview/ranking" class="sidebar-name">
      <div>
        <i class="fa-solid fa-arrow-up-short-wide"></i> <span> 순위</span>
      </div>
    </router-link>
    <router-link :class="{red: g===true, green: g===false}" @click="gclick" class="profile sidebar-name" :to="{ name: 'profile', params: { useremail } }" >
      <div>
        <i class="fa-regular fa-user"></i> <span> 프로필</span>
      </div> 
    </router-link>
    <div class="sidebar-name">
      <li @click="logout"><a href="">로그아웃</a></li>
    </div>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'WebterviewSidebar',
    computed: {
      ...mapGetters(['email']),
      useremail() {
        return this.email
      },
    },
    data() {
      return {
        a : true,
        b : false,
        c : false,
        d : false,
        e : false,
        f : false,
        g : false
      }
    },
    methods: {
      ...mapActions(['logout']),

      aclick() {
        this.a = true,
        this.b = false,
        this.c = false,
        this.d = false,
        this.e = false,
        this.f = false,
        this.g = false
      },
      bclick() {
        this.a = false,
        this.b = true,
        this.c = false,
        this.d = false,
        this.e = false,
        this.f = false,
        this.g = false
      },
      cclick() {
        this.a = false,
        this.b = false,
        this.c = true,
        this.d = false,
        this.e = false,
        this.f = false,
        this.g = false
      },
      dclick() {
        this.a = false,
        this.b = false,
        this.c = false,
        this.d = true,
        this.e = false,
        this.f = false,
        this.g = false
      },
      eclick() {
        this.a = false,
        this.b = false,
        this.c = false,
        this.d = false,
        this.e = true,
        this.f = false,
        this.g = false
      },
      fclick() {
        this.a = false,
        this.b = false,
        this.c = false,
        this.d = false,
        this.e = false,
        this.f = true,
        this.g = false
      },
      gclick() {
        this.a = false,
        this.b = false,
        this.c = false,
        this.d = false,
        this.e = false,
        this.f = false,
        this.g = true
      },
      



    },
  }
</script>

<style scoped>
.icon-bar {    
  height: 100%;
  width: 17%;
  background-color: #fff;
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */    /*z-index: 1;*/ /* Stay on top */    
  top: 0; /* Stay at the top */    
  left: 0;    
  overflow-x: hidden; /* Disable horizontal scroll */    
  padding-top: 0;  
  }
.icon-bar a {    
  display: block;    
  /* text-align: center;     */
  padding: 16px;    
  transition: all 0.3s ease;    
  color: #0000004a;    
  font-size: 15px;  
  }

.icon-bar a:hover {    
  color: #F05454;
  background-color: #f5f5f5;
  }
.dropdown-menu-end {
  border: none;
}

.profile{
  /* text-align: center; */
}

.sidebar-name {
    border: none;
    margin-top: 18px;
    margin-left: 30px;
    margin-right: 30px;
    text-align: start;
    border-radius: 10px;
    font-family: PretendardSemiBold;
  }

.red {
  color: #F05454 !important;
  background-color: #f5f5f5;
}
</style>