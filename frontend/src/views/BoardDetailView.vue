<template>
  <div class="limiter">
    <div class="container-login100 shadow-lg">
      <div class="wrap-login100" style="margin-left: 20%; margin-right: 10%;">
        <!-- <div class="headLine2 mb-2">{{ board }}</div> -->
        <div class="board-wrap" style="width: 100%">
          <div class="d-flex justify-content-end">
            <button class="login100-form-btn button-list mx-2" style="width: 12vh; background-color: #3c90e2; margin-right: 0;" @click="goBoards()">목록</button>
          </div>
          <br>
          <div class="detail-head ty02" style="text-align: left;">
            <div class="line-set">
              <div class="d-flex">
                <span v-if="board.boardType == 1" class="text-group">[공지]</span>
                <span v-if="board.boardType == 2" class="text-group">[질문]</span>
                <span class="title headLine2">{{ board.boardTitle }}</span>
                <div class="d-flex">
                  <button type="button" class="modify-button mx-1" @click="goBoardEdit"> 수정</button>
                  <button type="button" class="delete-button mx-1" @click="deleteBoard(boardNo)">삭제</button>
                </div>
              </div>
            </div>
              <div class="status tal">
                <div class="d-flex">
                  <div class="manager">작성자{{ board.userNo }}</div>
                  <!-- <div class="d-flex">
                    <button type="button" class="modify-button mx-1" @click="goBoardEdit"> 수정</button>
                    <button type="button" class="delete-button mx-1" @click="deleteBoard(boardNo)">삭제</button>
                  </div> -->
                </div>
              </div>
              <span class="date"> 
                <div>
                  <div>등록 시간: {{ changeDate(board.boardRegdate) }} </div>
                  <div>최근 수정: {{ changeDate(board.boardUpdate) }} </div>
                </div>
              </span>
          </div>
          <div class="datail-content mb20 headLine2" style="line-height: 2; text-align: left; font-size: 16px; min-height: 300px; letter-spacing: 2px; word-spacing: 2px;">{{ board.boardContent }}</div>
        </div>
        <br>

        <div v-if="board.boardType == 2" style="width: 100%">
          <!-- Comment UI -->
          <comment-list :boardNo="board.boardNo"></comment-list>
        </div>
        <br>
         
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import CommentList from '@/components/CommentList.vue'
  import router from '@/router'

  export default {
    name: 'BoardDetail',
    components: { CommentList },
    data() {
      return {
        boardNo: "",
      }
    },
    computed: {
      ...mapGetters(['isAuthor', 'board']),
    },
    methods: {
      ...mapActions([
        'fetchBoard',
        'deleteBoard',
        'fetchBoardNo',
      ]),
      goBoardEdit() {
        router.push({ name: 'boardEdit', params: { boardNo: this.boardNo } })
      },
      goBoards() {
        router.push({name: 'boards'})
      },
      changeDate(date) {
        const moment = require('moment-timezone')
        const time = moment(date).tz("Asia/Seoul").format('YYYY-MM-DD HH:mm');
        return time
      }
    },
    created() {
      this.boardNo = this.$route.params.boardNo
      console.log(this.boardNo)
      this.fetchBoardNo(this.boardNo)
      if (this.boardNo) {
        this.fetchBoard(this.boardNo)
      }
    }
  }
</script>

<style scoped>
  .button-edit {
    background-color: green;
  }
  .button-delete {
    background-color: crimson;
  }

  .modify-button {
    display: inline-block;
    /* border: 1px solid #afb8c0; */
    background: #fff;
    color: #4f5a66;
    font-weight: 500;
    text-align: center;
    height: 30px;
    min-width: 30px;
    font-size: 12px;
    line-height: 1.4;
  }

  .delete-button {
    display: inline-block;
    /* border: 1px solid #afb8c0; */
    background: #fff;
    color: #4f5a66;
    font-weight: 500;
    text-align: center;
    height: 30px;
    min-width: 30px;
    font-size: 12px;
    line-height: 1.4;
  }
</style>


