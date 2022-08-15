import { createRouter, createWebHistory } from "vue-router";

// views
import MainView from "../views/main/MainView.vue";
import HomeView from "../views/login/HomeView.vue";
import SignupView from "../views/user/SignupView.vue";
import ProfileView from "../views/main/sidebar/ProfileView.vue";
import ModifyView from "../views/user/ModifyView.vue";
import FindIdView from "../views/user/FindIdView.vue";
import FindPasswordView from "../views/user/FindPasswordView.vue";
import WebterviewView from "../views/main/WebterviewView.vue";
import NotFound404 from "../views/NotFound404.vue";
import LoadingView from "../views/LoadingView.vue";

// components(sidebar 안에 있는 애들)
import QnaSide from "../views/main/sidebar/QnaSide.vue";
import MeetingRoomMan from "../views/main/sidebar/MeetingRoomMan.vue";
import ApplicantMan from "../views/main/sidebar/ApplicantMan.vue";
import ConferenceDetail from "../components/ConferenceDetail.vue";
import RankingView from "../views/main/sidebar/RankingView.vue";
import EvaluationMan from "../views/main/sidebar/EvaluationMan.vue";
import RaterMan from "../views/main/sidebar/RaterMan.vue";
import ApplicantDetail from "../views/applicant/applicantDetailView.vue";
import RaterDetail from "../views/rater/raterDetailView.vue";
import ApplicantScoreDetail from "../views/applicant/applicantScoreDetail.vue";

//board
import BoardWriteView from "../views/BoardWriteView.vue";
import BoardDetailView from "../views/BoardDetailView.vue";
import BoardEditView from "../views/BoardEditView.vue";
//interview
import InterviewView from "../views/interview/InterviewView.vue";
import EntryPageView from "../views/interview/EntryPageView.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: MainView,
  },
  {
    path: "/login",
    name: "home",
    component: HomeView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
    // component: () => import(/* webpackChunkName: "about" */ '../views/SignupView.vue')
  },
  {
    path: "/findid",
    name: "findid",
    component: FindIdView,
  },
  {
    path: "/findpw",
    name: "findpw",
    component: FindPasswordView,
  },
  // 페이지 내에 components들만 변환시키기 위해 children을 시용
  {
    path: "/webterview",
    name: "webterview",
    component: WebterviewView,
    children: [
      {
        path: "/webterview/meetingroom_man",
        name: "meetingroom_man",
        component: MeetingRoomMan,
      },
      {
        path: "/webterview/applicant_man",
        name: "applicant_man",
        component: ApplicantMan,
      },
      {
        path: "/webterview/boards",
        name: "boards",
        component: QnaSide,
      },
      {
        path: "/webterview/boards/write",
        name: "BoardWrite",
        component: BoardWriteView,
      },
      {
        path: "/webterview/boards/:boardNo",
        name: "board",
        component: BoardDetailView,
      },
      {
        path: "/webterview/boards/:boardNo/edit",
        name: "boardEdit",
        component: BoardEditView,
      },
      {
        path: "/webterview/ranking",
        name: "ranking",
        component: RankingView,
      },
      {
        path: "/webterview/evaluationMan",
        name: "evaluationMan",
        component: EvaluationMan,
      },
      {
        path: "/webterview/raterMan",
        name: "raterMan",
        component: RaterMan,
      },
      {
        path: "/webterview/applicant/:applicantEmail",
        name: "applicant",
        component: ApplicantDetail,
      },
      {
        path: "/webterview/applicantScore/:applicantEmail",
        name: "applicantScore",
        component: ApplicantScoreDetail,
      },
      {
        path: "/webterview/rater/:raterNo",
        name: "rater",
        component: RaterDetail,
      },
      {
        path: "/profile/:useremail",
        name: "profile",
        component: ProfileView,
      },
      {
        path: "/modify",
        name: "modify",
        component: ModifyView,
      },
    ],
  },
  {
    path: "/webterview/meetingroom_man/detailnumber",
    name: "ConferenceDetail",
    component: ConferenceDetail,
  },
  {
    path: "/404",
    name: "NotFound404",
    component: NotFound404,
  },
  {
    path: "/loading",
    name: "Loading",
    component: LoadingView,
  },
  // {
  //   path: '*',
  //   redirect: '/404'
  // },
  //webrtc
  {
    path: "/webterview/:roomCode",
    component: InterviewView,
    name: "InterviewView",
  },
  {
    // path: "/webterview/meetingroom_man/interview/confirm",
    path: "/webterview/:roomCode/main",
    component: EntryPageView,
    name: "EntryPageView",
    /**
    children: [
      {
        path: "/interview/confirm",
        name: "waitingroom",
        component: WaitingRoom,
      },
    ],
     */
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

/*
Navigation Guard 설정
  (이전 페이지에서 있던 에러 메시지 삭제)

  로그인(Authentication)이 필요 없는 route 이름들 저장(/login, /signup)

  0. router 에서 이동 감지

  1. 현재 이동하고자 하는 페이지가 로그인이 필요한지 확인
  
  2. 로그인이 필요한 페이지인데 로그인이 되어있지 않다면
    로그인 페이지(/login)로 이동

  3. 로그인이 되어 있다면
    원래 이동할 곳으로 이동
  
  4. 로그인이 되어있는데 /login, /signup 페이지로 이동한다면
    메인 페이지(/)로 이동
    

*/

// router.beforeEach((to, from, next) => {
//   // 이전 페이지에서 발생한 에러메시지 삭제
//   store.commit('SET_AUTH_ERROR', null)

//   const { isLoggedIn } = store.getters

//   const noAuthPages = ['login', 'signup', 'movies']

//   const isAuthRequired = !noAuthPages.includes(to.name)

//   if (isAuthRequired && !isLoggedIn) {
//     alert('Require Login. Redirecting..')
//     next({ name: 'login' })
//   } else {
//     next()
//   }

//   if (!isAuthRequired && isLoggedIn) {
//     next({ name: 'movies' })
//   }
// })
