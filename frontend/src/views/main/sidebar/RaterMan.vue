<template>
<div class="limiter">
    <div class="container-login100 shadow-lg">
      <div class="wrap-login100" style="margin-left: 20%; margin-right: 5%;">
            <div class="headLine2">면접관 관리</div>
            <br>
            <div class="d-flex flex-column justify-content-center align-items-between mt-2">
                <div class="d-flex justify-content-center align-items-between">
                    <div class="container border border-dark mx-2"> 
                        <div>
                            <div class="list-group" style="overflow: scroll; height: 60vh; width: 60vh;">
                                <!-- {{ raters }} -->
                                <div v-for="rater in raters" :key="rater.raterNo">
                                    <router-link :to="{ name: 'rater', params: {raterNo: rater.raterNo} }">
                                        <div class="d-flex justify-content-center">
                                        <div class="my-1" style="width: 100%">
                                            <div class="d-flex justify-content-between">
                                                <h5 class="mb-1">{{ rater.raterName }}</h5>
                                                <small>{{ rater.raterNo }}</small>
                                            </div>
                                            <p class="mb-1">이메일: {{ rater.raterEmail  }}</p>
                                            <p class="mb-1">방번호: {{ rater.roomNo  }}</p>
                                            <small>전화번호 {{ rater.raterPhone }}</small>
                                        </div>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <form  @submit.prevent="uploadRaters">
                <div class="filebox">
                    <label for="file" class="form-label"></label>
                    <input class="form-control form-control-sm" type="file" id="file" accept=".xls,.xlsx" multiple>
                    <div style="margin-top: 15px; justify-content: space-between;">
                    <button type="submit" class="btn btn-primary mx-2 uploadFile" style="float:left;">업로드</button>
                    <button type="button" class="btn btn-danger mx-2 deleteFile" @click="removeRaters(userNo)">삭제</button>
                    <button type="button" class="btn btn-success mx-2 addFile" @click="isModalViewed = true" style="float:right;">개별 추가</button>
                    </div>
                </div>
            </form>
            <form v-if="isWantUpload" @submit.prevent="uploadRater(credentials)" style="width: 60vh; margin-top:30px;">
                <div class="form-group row">
                    <label for="RaterName" class="col-4 col-form-label">이름: </label>
                    <input v-model="credentials.raterName" class="form-control inputNew col-8" id="RaterName" type="text" placeholder="면접관 이름을 입력하세요..." required>
                </div>
                <div class="form-group row">
                    <label for="RaterEmail" class="col-4 col-form-label">이메일: </label>
                    <input v-model="credentials.raterEmail" class="form-control inputNew col-8" id="RaterEmail" type="email" placeholder="이메일을 입력하세요..." required>
                </div>
                <div class="form-group row">
                    <label for="RaterPhone" class="col-4 col-form-label">전화번호: </label>
                    <input v-model="credentials.raterPhone" class="form-control inputNew col-8" id="RaterPhone" type="tel" placeholder="010-0000-0000" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" required>
                </div>
                <div class="form-group row">
                    <label for="RoomNo" class="col-4 col-form-label">방번호(있는 방번호 입력해야)</label>
                    <input v-model="credentials.roomNo" class="form-control inputNew col-8" id="RoomNo" type="text" placeholder="방번호를 입력하세요..." required>
                </div>
                <!-- <div>
                    <label for="">면접자 번호</label>
                    <input v-model="credentials.raterNo" type="text" placeholder="면접자 번호">
                </div> -->
                <div class="form-group row">
                    <label for="userNo" class="col-4 col-form-label">관리자 번호: </label>
                    <input v-model="credentials.userNo" class="form-control inputNew col-8" id="userNo" type="text" placeholder="관리자 번호" required>
                </div>
                <button class="btn btn-primary mx-2 uploadFile" type="submit">개별 업로드</button>
            </form>
            <!-- 개별 추가 모달 -->
            <div id="modal" v-if="isModalViewed">
                <div id="overlay" class="jumbotron vertical-center" @click="isModalViewed = false"/>
                    <div id="modal-card">
                        <!-- <div style="text-align: left">
                            <div style="font-size: x-large"><b>면접을 종료하시겠습니까?</b></div>
                            <div style="color: darkgrey">퇴장 후에는 재입장이 불가능합니다.</div>
                        </div> -->
                        <form @submit.prevent="uploadRater(credentials)" style="width: 60vh; margin-top:30px;">
                            <div class="form-group row">
                                <label for="RaterName" class="col-4 col-form-label">이름: </label>
                                <input v-model="credentials.raterName" class="form-control inputNew col-8" id="RaterName" type="text" placeholder="면접관 이름을 입력하세요..." required>
                            </div>
                            <div class="form-group row">
                                <label for="RaterEmail" class="col-4 col-form-label">이메일: </label>
                                <input v-model="credentials.raterEmail" class="form-control inputNew col-8" id="RaterEmail" type="email" placeholder="이메일을 입력하세요..." required>
                            </div>
                            <div class="form-group row">
                                <label for="RaterPhone" class="col-4 col-form-label">전화번호: </label>
                                <input v-model="credentials.raterPhone" class="form-control inputNew col-8" id="RaterPhone" type="tel" placeholder="010-0000-0000" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" required>
                            </div>
                            <div class="form-group row">
                                <label for="RoomNo" class="col-4 col-form-label">방번호(있는 방번호 입력해야)</label>
                                <input v-model="credentials.roomNo" class="form-control inputNew col-8" id="RoomNo" type="text" placeholder="방번호를 입력하세요..." required>
                            </div>
                            <!-- <div>
                                <label for="">면접자 번호</label>
                                <input v-model="credentials.raterNo" type="text" placeholder="면접자 번호">
                            </div> -->
                            <div class="form-group row">
                                <label for="userNo" class="col-4 col-form-label">관리자 번호: </label>
                                <input v-model="credentials.userNo" class="form-control inputNew col-8" id="userNo" type="text" placeholder="관리자 번호" required>
                            </div>
                            <button class="btn btn-primary mx-2 uploadFile" type="submit">개별 업로드</button>
                        </form>
                        <br />
                        <div style="display: inline-block; float: right">
                            <button type="button" @click="isModalViewed = false" class="btn btn-modal" style="background-color: white; color: black; border-color: darkgrey">
                              취소
                            </button>
                            <button @click="uploadRater(credentials)" class="btn btn-modal" style="background-color: #f05454; color: white">
                              추가
                            </button>
                        </div>
                </div>
            </div>
      </div>
    </div>
</div>
  
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import drf from '@/api/drf'

export default {
    name: 'RaterManView',
    data() {
      return {
        isModalViewed: false,
        isWantUpload: false,
        file: "",
        // groupNo: "270",
        credentials: {       
            "raterEmail": "",
            "raterName": "",
            "raterNo": 0,
            "raterPhone": "",
            "roomNo": 0,
            "userNo": 0,
        }
      }
    },
    computed: {
      ...mapGetters(['token', 'raters', 'userNo', 'groupNo'])
    },
    methods: {
      ...mapActions(['fetchRaters', 'removeRaters']),
      wantUpload() {
        this.isWantUpload = !this.isWantUpload
      },
      uploadRaters() {
        if (this.groupNo === "") {
            alert('면접을 먼저 생성하세요')
            return 
        }
        console.log('Rater upload')
        var formData = new FormData();
        var excelFile = document.getElementById("file");
        formData.append("file", excelFile.files[0]);
        formData.append("groupNo", this.groupNo)
        formData.append("userNo", this.userNo)
        // formData.append("groupNo", "1")
        console.log(excelFile)
        //console.log(formData.getAll())
        axios({
            url: drf.applicants.saveRaters(),
            // url: '/interview/raterAll',
            method: 'post',
            data: formData, 
            headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data',
            'access-token': this.token
            },
        })
        .then((res) => {
            console.log(res.data)
            this.fetchRaters(this.userNo)
        })
        .catch((err) => {
            console.log(err)
        })
      },
      uploadRater(credentials) {
        console.log('One Rater upload')
        axios({
            // url: drf.applicants.saveRater(),
            url: '/interview/raterOne',
            method: 'post',
            data: credentials, 
            headers: {
            'access-token': this.token
            },
        })
        .then((res) => {
            console.log(res.data)
            this.fetchRaters(this.userNo)
        })
        .catch((err) => {
            console.log(err)
        })
      }
    },
    created() {
        this.fetchRaters(this.userNo)
        this.credentials.userNo = this.userNo
    }
    
}
</script>

<style scoped>
    .btn {
        background-color: #30475e;
        color: white;
        font-size: 12px;

        
    }

    .container {
        background-color: #fff;
        padding: 1px;
    }

    .filebox .upload-name {
        display: inline-block;
        vertical-align: middle;
        border: 1px solid #dddddd;
        width: 40%;
        color: #999999;
    }

    .detail {
        background-color: #c4d4e3;
        height: 65vh;
    }

    .deleteFile {
        background-color: crimson;
        border-block-color: crimson;
    }

    .plusRaterBtn{
        background-color: #f05454;
        border-block-color: #f05454;
        color: #fff;
    }

    .addFile{
        background: green;
        /* border-block-color: green; */
    }

    .list-group{
        border-radius:15px;
    }

    /* Modal */
    #modal,
    #overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9997;
    }
    #overlay {
    opacity: 0.5;
    background-color: black;
    }
    #modal-card {
    position: relative;
    max-width: 50%;
    margin: auto;
    margin-top: 200px;
    padding: 3%;
    background-color: white;
    z-index: 9998;
    opacity: 1;
    border-radius: 0.5rem;
    width: auto;
    height: auto;
    overflow: hidden;
    }

    .btn-modal {
    z-index: 9999;
    margin: 0 10px;
    }

    .btn-modal:hover {
    letter-spacing: 0px;
    transform: scale(1.2);
    cursor: pointer;
    }
</style>
