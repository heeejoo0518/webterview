<template>
  <form @submit.prevent="createComment(credentials)" class="comment-list-form">
    <!-- <label for="comment">comment: </label> -->
    <hr>
    <div class="d-flex">
      <input class="comment-input" type="text" id="comment" v-model="credentials.commentAnswer" required placeholder="댓글을 작성해주세요">
      <button class="comment-button">댓글</button>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CommentListForm',
  data() {
    return {
      credentials: {
        boardNo: "",
        commentUserNo: "",
        commentAnswer: "",
        },
    }
  },
  computed: {
    ...mapGetters(['board', 'profile', 'currentBoardNo']),
  },
  methods: {
    ...mapActions(['createComment']),
  },
  created() {
    this.credentials.commentUserNo = this.profile.userNo
    this.credentials.boardNo = this.currentBoardNo
  }
}
</script>

<style>
.comment-list-form {
  /* border: 1px solid rgb(233, 14, 14); */
  margin: 1rem;
  padding: 1rem;
  border-radius: 10px;
}

.comment-input {
  /* border: none; */
  display: block;
  width: 700px;
  height: 35px;

  border: 1px solid #e3e7eb;
  vertical-align: middle;
  padding: 5px 18px;
  
  font-family: Poppins-Medium;
  font-size: 15px;
  line-height: 1.5;
}

.comment-button {
  color: #111;
  background-color: #f5f5f5;
  border: 1px solid #e3e7eb;
  width: auto;
  height: 35px; 
}
</style>