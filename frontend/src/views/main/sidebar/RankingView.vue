<template>
<div style="margin-left: 20%; margin-right: 10%;">
  <div>
    <h2 class="headLine2 my-5">지원자 순위표</h2>
    <div class="download">
      <input class="download" type="button" value="다운로드" @click="download(groupNo)" style="background-color: palegoldenrod;">
      <div class="text txt1">지원자들의 문항별 점수표입니다.</div>
    </div>
  </div>
  <br>
  <div class="d-flex flex-col justify-content-center align-items-center">
    <div style="width:60vh; background-color: #fff; height: 80vh; border: 1px solid #111;">
      <table class="table">
        <thead style="background-color: #f5f5f5; color: #111">
          <tr>
            <th scope="col">순위</th>
            <th scope="col">이름</th>
            <th scope="col">일반점수</th>
            <th scope="col">종합점수</th>
            <th scope="col">총 점수</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="grade in grades" :key="grade.applicantNo" @click="goScoreDetail(grade.email, rankGroupNo, grade.applicantNo)">
            <td>{{ grade.rank + 1 }}</td>
            <td>{{grade.name }}</td>
            <td>{{ grade.score1 }}</td>
            <td>{{ grade.score2 }}</td>
            <td>{{ grade.score1 + grade.score2 }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
      <!-- <div class="grade-card mx-2 my-2" style="width:250px;" v-for="grade in grades" :key="grade.id">
        <div @click="goDetail(grade.id, grade.title)" class="grade-information">
          <div class="title"><strong>{{ grade.title }}</strong></div>
          <p class="grade-release-date"><small>{{ grade.release_date }}</small></p>
        </div>
      </div> -->
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'RankList',
    computed: {
      ...mapGetters(['grades', 'rankGroupNo', 'groupNo'])
    },
    methods: {
      ...mapActions(['fetchGrades','download']),
      goScoreDetail(email, groupNo, applicantNo){
        this.$router.push({ name: 'applicantScore', params: {applicantEmail: email, groupNo: groupNo, applicantNo: applicantNo } })
      },
    },
    created() {
      //this.fetchGrades(this.groupNo)
      this.fetchGrades(this.groupNo)
    },
  }
</script>

<style scoped>
  th {
    text-align: center;
  }

  .text{
    color: #f5f5f5;
  }

  .download:hover .text {
    color: #999999;
  }
</style>