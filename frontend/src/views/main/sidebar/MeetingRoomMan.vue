<template>
  <div>
    <!-- 그룹 만들기 폼 -->
    <form @submit.prevent="okGroup(); openGroupBtn()">
      <!-- 그룹 생성하는 버튼 -->
      <div v-if="groupNo===''" class="card shadow-lg mb-5 bg-body rounded" style="height: 40vh; text-align: left; margin-left: 20%; margin-right: 10%; margin-top: 15%; ">
        <div style="margin: auto;">
          <div class="start headLine3" style="margin-top: 15px; margin-bottom:15px;">
            <span class="headLine3">시작 날짜: </span>
            <input id="start_date" type="datetime-local" v-model="credentials.groupStart" required>
            
          </div>
          <div class="end headLine3" style="margin-top: 15px; margin-bottom:15px;">
            <span class="headLine3">끝 날짜:&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <input id="end_date" type="datetime-local" v-model="credentials.groupEnd" required>
            
          </div>
          <div class="d-flex">
            <label class="control control--checkbox headLine3" for="blind" style="margin-bottom: 0px;">
              블라인드 테스트로 진행하시겠습니까? &nbsp;
            </label>
            <div class="d-flex align-items-center">
              <input  v-model="credentials.groupBlind" type="checkbox" id="blind" name="blind" value="true"/>
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <button type="submit" class="w-btn w-btn-green headLine3">면접 생성하기</button>
          </div>
        </div>
      </div>
   </form>

    <!-- 면접(그룹) 만들거나 들어갔을때 열러 있는 면접장(ROOM) 목록들  -->
    <div v-if="groupNo ||openGroup">
      <div class="buttons d-flex">
        <div v-if="groupNo ||openGroup">
          <form @submit.prevent="finishInterview(groupNo); ok(); ">
            <button class="w-btn-delete w-btn-green-delete">면접종료</button>
          </form>
        </div>
        <button class="w-btn-add w-btn-green-add" @click="addSection"><i class="fa-solid fa-plus"></i></button>
      </div>
     <!-- 방 리스트 -->
      <ul class="infinite-list" style="overflow:auto auto;padding-left: 20%; text-align: left;">
            <ConferenceName  class="infinite-list-item" v-for="room in roomList" :roomNo="room.roomNo" :roomCode="room.roomCode" :groupNo="room.groupNo" :key="room.roomNo" />
      </ul>
    </div>
    </div>
  <!-- </div> -->

<!-- 버튼예시 -->

</template>

<script>
import ConferenceName from "../../../components/ConferenceName.vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { mapActions, mapGetters } from "vuex";
import axios from 'axios'


export default {
  name: "MeetingRoomMan",

  components: {
    ConferenceName,
  },
  data() {
    return {
      clickSection: false,
      section: false,
      cardForm: true,
      openGroup: false,
      shit: false,
      credentials: {
        groupStart: '',
        groupEnd: '',
        groupBlind: false,
        userNo: ''
      },
      room: {
        num: this.state.count,
        groupNo: ''
      }
    };
  },
  computed: {
    // ...mapState([])
    ...mapGetters([ 'userNo', 'groupNo', 'roomList', 'token' ])
  },
  methods: {
    ...mapActions(['createdInterview', 'finishInterview', 'createRooms', 'deleteRoom', 'fetchRoomList', 'addRoom']),
    async createRoom() {
      console.log(this.groupNo)
      // console.log(this.userNo)
      this.clickSection = true;
      this.cardForm = false;
      this.room.groupNo = this.groupNo
      await this.createRooms(this.room)
      await this.fetchRoomList(this.groupNo)
    },
    cancleRoom() {
      this.section = false;
      this.clickSection = false;
      this.state.count = 1;
    },
    createSection() {
      this.section = true;
      this.clickSection = false;
      //보내는 함수 만들기 room{num,groupNo}
      // this.createRooms(this.room)
      
    },
    async addSection() {
      console.log(this.state.count);
      await this.addRoom()
      this.state.count += 1;
    },
    openGroupBtn() {
      console.log('group created')
      this.openGroup = true;
    },
    ok() {
      this.section = false
      this.openGroup = false
    },
    async okGroup() {
      this.credentials.userNo= this.userNo
      console.log(this.credentials)
      await this.createdInterview(this.credentials);
   
      console.log(this.groupNo)
      this.room.groupNo = this.groupNo
      await this.createRoom()
    },

    readGroup(userNo) {
      axios({
          // url: drf.applicants.applicants(),
          url: '/admin'+'/group/' + userNo,
          method: 'get',
          headers: {
            'access-token': this.token,
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
  },

  setup() {
    const router = useRouter();

    const state = reactive({
      count: 10,
    });
    

    const load = function () {
      state.count += 4;
    };

    const clickConference = function (id) {
      router.push({
        name: "WaitingRoomView",
        params: {
          conferenceId: id,
        },
      });
    };

    return { state, load, clickConference };
  },
  created() {
    if (this.groupNo !=='') {
      this.fetchRoomList(this.groupNo)
      console.log('했는데..')
    }
    // this.readGroup(this.userNo)
    // console.log(this.groupNo)
    // this.room.groupNo = this.groupNo
    
  }

};
</script>

<style scoped>
.session {
  border: 1px bold #121212;
}
/* card */
.card {
}
.infinite-list {
  padding-left: 0;
  max-height: calc(100% - 35px);
}

@media (min-width: 701px) and (max-width: 1269px) {
  .infinite-list {
    min-width: 700px;
  }
}

@media (min-width: 1270px) {
  .infinite-list {
    min-width: 1021px;
  }
}

.infinite-list .infinite-list-item {
  min-width: 335px;
  max-width: 25%;
  display: inline-block;
  cursor: pointer;
}
/* 버튼 */
.w-btn {
  position: relative;
  border: none;
  display: inline-block;
  padding: 8px 16px;
  border-radius: 15px;
  font-family: "paybooc-Light", sans-serif;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  font-weight: 600;
  transition: 0.25s;
}
.w-btn-green {
  background-color: #f05454;
  color: #f8e3e3;
}

button {
  margin: 20px;
}

.w-btn:hover {
  letter-spacing: 0px;
  transform: scale(1.2);
  cursor: pointer;
}

.w-btn:active {
  transform: scale(1.5);
}

/* 세부세션 추가 버튼 */
.w-btn-add {
  position: fixed;
  /* bottom: 0; */
  right: 5%; 
  border: none;
  display: inline-block;
  padding: 8px 16px;
  border-radius: 15px;
  font-family: "paybooc-Light", sans-serif;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  font-weight: 600;
  transition: 0.25s;
}
.w-btn-green-add {
  background-color: #f05454;
  color: #f8e3e3;
}

button {
  margin: 20px;
}

.w-btn-add:hover {
  letter-spacing: 0px;
  transform: scale(1.2);
  cursor: pointer;
}

.w-btn-add:active {
  transform: scale(1.5);
}
/* 면접종료 버튼 */
.w-btn-delete {
  position: relative;
  border: none;
  display: inline-block;
  padding: 8px 16px;
  border-radius: 15px;
  font-family: "paybooc-Light", sans-serif;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  font-weight: 600;
  font-size:15px;
  transition: 0.25s;
}
.w-btn-green-delete {
  background-color: #f05454;
  color: #f8e3e3;
}

button {
  margin: 20px;
}

.w-btn-delete:hover {
  letter-spacing: 0px;
  transform: scale(1.2);
  cursor: pointer;
}

.w-btn-delete:active {
  transform: scale(1.5);
}

/* input */
input {
  text-align: center;
  border: 1px solid #6c757d;
}

.number-input input[type="number"] {
  -webkit-appearance: textfield !important;
  -moz-appearance: textfield !important;
  appearance: textfield !important;
}

.number-input input[type="number"]::-webkit-inner-spin-button,
.number-input input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

.number-input {
  margin-bottom: 20px;
  padding-top: 20px !important;
}

/* 숫자 input */
.section-number {
  color: #1b3b5b;
  border-color: #1b3b5b;
  border-radius: 15px;
}

.buttons {
  top: 5px;
  margin-left: 18%;
}
/* #blind:checked :before{
  background-color: green;
} */
/* 
input[type="checkbox"] {
    background: #990000;    
} */

/* input[type="checkbox"] {change "blue" browser chrome to yellow 
  filter: invert(100%) hue-rotate(320deg) brightness(1.7);
  
} */

input[type="checkbox"] {
  background: #fff;
  border: 1px solid #111;
  border-radius: 4px;
  cursor: pointer;
  outline: 0;
  width: 30px; /*Desired width*/
  height: 30px; /*Desired height*/
  /* -webkit-appearance: none; */
  /* appearance: none; */
}
/* input[type="checkbox"]::after {
  border: 1px solid #111;
  border-width: 0 2px 2px 0;
  content: '';
  display: none;
  height: 40%;
  left: 40%;
  position: relative;
  top: 20%;
  transform: rotate(45deg);
  width: 15%;
} */
input[type="checkbox"]:checked {
  background: #30475e;
}
input[type="checkbox"]:checked::after {
  display: block;
}


</style>
