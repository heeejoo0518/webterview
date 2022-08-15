<template>
  <div class="limiter">
    <div class="container-login100 shadow-lg">
      <div class="wrap-login100" style="margin-left: 20%; margin-right: 10%;">
        <input class="writeBtn dohyeon" type="button" value="글쓰기" @click="boardwrite"/>

        <div class="headLine2 mb-2">QnA</div>
        <br>
        <table class="noto table" style="font-size: 16px">
          <thead style="background-color: #f5f5f5; color: #111">
            <tr>
              <th >번호</th>
              <th>제목</th>
              <th >등록날짜</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="notice in notices" @click="goBoardDetail(notice.boardNo)" :key="notice.boardNo">
              <td><div style="height: 60%; width: 60%; background-color: #f05454; color: #fff; border-radius: 15%; margin: auto;">공지</div> </td>
              <td>{{ notice.boardTitle }}</td>
              <td>{{ changeDate(notice.boardRegdate) }}</td>
            </tr>
            <tr v-for="board in boards.content" @click="goBoardDetail(board.boardNo)" :key="board.boardNo" >
              <td>{{ board.boardNo }}</td>
              <td >{{ board.boardTitle }} <small>({{ board.commentCnt}})</small></td>
              <td>{{ changeDate(board.boardRegdate) }}</td>
            </tr>
          </tbody>
        </table>
        {{ boards.content }}
        <nav aria-label="...">
          <ul class="pagination pagination-sm">
            <li v-for="page in pages" class="page-item" :id="page" :key="page"><a class="page-link" href="#" @click="goPage(page), changeActive(page)" >{{page+1}}</a></li>
          </ul>
        </nav>

      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import router from '@/router'
  

  export default {
    name: 'BoardList',
    data() {
      return {
        params: {
          page: 0,
          size: 5,
          userNo: '',
          sort: 'boardRegdate,desc',
        },
      }
    },
    computed: {
      ...mapGetters(['boards','notices', 'profile', 'userNo']),
      pages() {
        const lst = []
        for(let i=0; i<this.boards.totalPages; i++) {
          lst.push(i)
        }
        return lst;
      }
    },
    methods: {
      ...mapActions(['fetchBoards']),
      boardwrite() {
        router.push({ name: 'BoardWrite' })
      },
       goBoardDetail(boardNo) {
        this.$router.push({ name: 'board', params: {boardNo: boardNo }})
      },
      goPage(n) {
        this.params.page = n
        this.fetchBoards(this.params)
      },
      changeDate(date) {
        const moment = require('moment-timezone')
        const time = moment(date).tz("Asia/Seoul").format('YYYY-MM-DD');
        return time
      },
      changeActive(page) {
        for(let i=0; i<this.boards.totalPages; i++) {
          if (i == page) {
            document.getElementById(page).classList.add('active')
          } else {
            document.getElementById(i).classList.remove('active')
          }
        }
      }
    },
    async created() {
      this.params.userNo = this.userNo
      await this.fetchBoards(this.params)
      document.getElementById("0").classList.add('active')
    },
  }
</script>

<style scoped>
  .board {
    width: 600px;
    background-color: #f5f5f5;
    border: 1px solid #151515;
    margin: 2px;
  }

  .writeBtn {
    position: relative;
    left: 40%;
    border: none;
    padding: 8px 16px;
    border-radius: 15px;
    font-family: "paybooc-Light", sans-serif;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    text-decoration: none;
    font-weight: 600;
    transition: 0.25s;
    background-color: #3c90e2;
    /* background-color: #f05454; */
    color: #fff;
  }

  .writeBtn:hover {
  letter-spacing: 0px;
  transform: scale(1.2);
  cursor: pointer;
}

th {
    text-align: center;
  }

</style>