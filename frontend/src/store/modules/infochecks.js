// import router from "@/router";
import axios from "axios";
import drf from "@/api/drf";

export default {
  state: {
    // 일단 Error관련 코드 없으니까 지워도 되는데 유예
    infoError: null,
    isValid: false,
    // contentNum: "",
    rightCode: "",
    raterCode: "",
    applicantEmail: "",
    applicantNo: "",
    newApplicant: "",
    isApplicantCheck: false,
  },
  getters: {
    infoError: (state) => state.infoError,
    isValid: (state) => state.isValid,
    // contentNum: (state) => state.contentNum,
    rightCode: (state) => state.rightCode,
    raterCode: (state) => state.raterCode,
    applicantNo: (state) => state.applicantNo,
    applicantEmail: (state) => state.applicantEmail,
    newApplicant: (state) => state.newApplicant,
    isApplicantCheck: (state) => state.isApplicantCheck,
  },
  mutations: {
    SET_INFO_ERROR: (state, error) => (state.infoError = error),
    SET_VALID: (state, isValid) => (state.isValid = isValid),
    SET_CODE: (state, rightCode) => (state.rightCode = rightCode),
    SET_RATER: (state, raterCode) => (state.raterCode = raterCode),
    SET_EMAIL: (state, applicantEmail) =>
      (state.applicantEmail = applicantEmail),
    SET_NO: (state, applicantNo) => (state.applicantNo = applicantNo),
    SET_NEW: (state, newApplicant) => (state.newApplicant = newApplicant),
    SET_CHECK: (state, isApplicantCheck) =>
      (state.isApplicantCheck = isApplicantCheck),
  },
  actions: {
    // FORM
    sendInfo({ dispatch, commit }, certified) {
      console.log(certified);
      axios({
        url: drf.interviews.sendInfo(),
        // url: "/api/interview/confirm",
        // url: "/interview/confirm",
        //url: "/api/interview/confirm",
        method: "post",
        data: certified,
      })
        .then((res) => {
          // {message : success / fail}
          // 성공 : 정보가 DB에 존재한다.
          // 중복 검사할때
          if (res.data.message === "success") {
            console.log(res.data);
            dispatch("checkInfo", true);

            if (certified.type === "rater") {
              console.log(res.data.rater.raterNo, "raterCode에 저장");
              commit("SET_RATER", res.data.rater.raterNo);
              // console.log("면접자 번호: " + res.data.rater.raterNo);
            } else {
              console.log();
              commit("SET_EMAIL", res.data.applicant.applicantEmail);
              commit("SET_A_NO", res.data.applicant.applicantNo);
              // console.log("지원자 이메일: " + res.data.applicant.applicantEmail);
              // console.log("지원자 번호: " + res.data.applicant.applicantNo);
            }
          } else {
            console.log("유효한 면접관/지원자가 없습니다");
            dispatch("checkInfo", false);
          }
        })
        .catch((err) => {
          console.error(err.response.data);
        });
    },
    checkInfo({ commit }, isValid) {
      commit("SET_VALID", isValid);
      localStorage.setItem("isValid", isValid);
    },
    sendsms({ dispatch }, certified) {
      console.log(certified.phone);
      console.log(certified.codeNum);
      axios({
        // url: drf.interviews.sendInfo(),
        // url: "http://localhost:8080/api/sms",
        // url: "https://sens.apigw.ntruss.com/sms/v2/services/ncp:sms:kr:290257082169:webterview/messages",
        // url: "/naverapi/sms",
        url: drf.naverapis.sendsms(),
        // url: "/api/naverapi/sms",
        // url: "/api/naverapi/sms",
        // url: drf.naverapis.sendsms(),
        method: "post",
        data: {
          // title: "[webterview]",
          recipientPhoneNumber: certified.phone,
          content: certified.codeNum, // 5자리 랜덤 숫자
          // content: Math.floor(Math.random() * (99999 - 10000 + 1) + 10000), // 5자리 랜덤 숫자
        },
        headers: {
          "Content-Type": "application/json",
          "access-token": localStorage.getItem("token"),
        },
      })
        .then((res) => {
          console.log("성공했다");
          console.log(res.data);
          // this.rightCode = res.data;
          dispatch("showcode", "test");
        })
        .catch((err) => {
          console.log("실패했다");
          console.error(err.response.data);
        });
    },
    showcode({ commit }, rightCode) {
      commit("SET_CODE", rightCode);
      localStorage.setItem("rightCode", rightCode);
      // console.log(rightCode); // content 가 찍힌다 (숫자가 아닌 content literally)
    },
    async setEmail({ commit, dispatch }, applicantEmail) {
      await console.log("setEmail: " + applicantEmail);
      await commit("SET_EMAIL", applicantEmail);
      // 이메일로 지원자 정보 가져오기(홍)
      console.log("참가한 지원자 정보 가져오는 중...");
      await dispatch("fetchApplicant", applicantEmail);
    },
    async setCheck({ commit }, isApplicantCheck) {
      await console.log("setCheck: " + isApplicantCheck);
      await commit("SET_CHECK", isApplicantCheck);
    },
    async setNo({ commit }, applicantNo) {
      await console.log("setNo: " + applicantNo);
      await commit("SET_NO", applicantNo);
    },
    setNew({ commit }, newApplicant) {
      commit("SET_NEW", newApplicant);
      console.log("setNew: " + this.newApplicant);
      localStorage.setItem("roomList", newApplicant);
    },
  },
};
