const HOST = 'https://i7c205.p.ssafy.io/api/'
// const HOST = "http://localhost:3000/api/";

const ACCOUNTS = "user/";
const BOARD = "board/";
const ADMIN = "admin/";
const INTERVIEW = "interview/";
const APPLICANT = "applicant/";
const NAVERAPI = "naverapi/";
const COMMENT = 'comment/'
const SCORE = "score/"

export default {
  accounts: {
    //login: () => HOST + ACCOUNTS + 'login/',
    login: () => HOST + ACCOUNTS + "login/",
    //logout: () => HOST + ACCOUNTS + 'logout/',
    signup: () => HOST + ACCOUNTS + "register/",
    sendmail: () => HOST + ACCOUNTS + "sendmail/",
    // Token 으로 현재 user 판단
    currentUserInfo: () => HOST + ACCOUNTS + "info/",
    // username으로 프로필 제공
    profile: (useremail) => HOST + ACCOUNTS + "info/" + useremail,
    // profile 수정
    modify: () => HOST + ACCOUNTS + "modify/",
    // 아이디(이메일 찾기)
    findMail: () => HOST + ACCOUNTS + "findMail/",
    // 회원탈퇴
    delete: (useremail) => HOST + ACCOUNTS + "delete/" + useremail,
    // 비밀번호 재설정
    saveNewPw: () => HOST + ACCOUNTS + "saveNewPw/",

    // 이메일 중복확인
    overlap: () => HOST + ACCOUNTS + "overlap/",

    // 비밀번호 확인 -> 탈퇴
    matchPw: () => HOST + ACCOUNTS + "matchPw/",
  },
  boards: {
    boards: () => HOST + BOARD,
    board: (boardNo) => HOST + BOARD + `${boardNo}/`,
    modify: () => HOST + BOARD + "modify/",
    comments: () => HOST + BOARD + COMMENT,
    comment: (commentNo) => HOST + BOARD + COMMENT + `${commentNo}/`,
    
  },
  applicants: {
    saveApplicants: () => HOST + INTERVIEW + APPLICANT + 'save/',
    saveResumes: () => HOST + INTERVIEW + 'resume/' + 'save/',
    saveEval: () => HOST + SCORE + 'eval/' + 'save/',
    saveRaters: () => HOST + INTERVIEW + 'raterAll/',
    saveRater: () => HOST + INTERVIEW + 'raterOne/',
    roomApplicants: () => HOST + INTERVIEW + APPLICANT + '/room',

    deleteApplicants: () => HOST + INTERVIEW + APPLICANT + 'delete/',
    applicants: () => HOST + INTERVIEW + APPLICANT + 'group/',
    applicant: () => HOST + INTERVIEW + APPLICANT + 'info/',
    modifyApplicant: () => HOST + INTERVIEW + APPLICANT + 'modify/',
    raters: (userNo) => HOST + INTERVIEW +'raterList/' + `${userNo}/` ,
    rater: (raterNo) => HOST + INTERVIEW +'detailRater/' + `${raterNo}/`,
    deleteRaters: (userNo) => HOST + INTERVIEW + 'alldelete/' + `${userNo}/` ,
    deleteRater: (raterNo) => HOST + INTERVIEW +'delete/' + `${raterNo}/`,
    modifyRater: (raterNo) => HOST + INTERVIEW + 'rater/' + `${raterNo}/`,
    removeEval: () => HOST + SCORE + 'eval/'+ 'delete/',
    eval: () => HOST + SCORE + 'eval/',
    grades: () => HOST + SCORE + 'ranking/',
    scores: () => HOST + SCORE + 'detail/',
    download: () => HOST + SCORE + 'download/',
    saveScore: () => HOST + SCORE + 'save/'
  },
  admins: {
    // 면접생성
    createGroup: () => HOST + ADMIN + "createGroup/",

    // 면접수정
    modifyGroup: () => HOST + ADMIN + "modifyGroup/",

    //면접방 생성
    createRoom: () => HOST + ADMIN + "createRoom/",

    // 면접끝내기
    deleteGroup: (groupNo) => HOST + ADMIN + `${groupNo}/`,

    //면접방 삭제
    deleteRoom: (roomNo) => HOST + ADMIN + "room/" +`${roomNo}/`,

    //면접방 조회
    listRoom: (groupNo) => HOST + ADMIN + "roomList/" + `${groupNo}`,

    //해당유저가 생성시킨 면접이 있는지 조회
    readGroup: (userNo) => HOST + ADMIN + "group/" + `${userNo}`,

    // 면접방 디테일
    roomDetail: (roomNo) => HOST + ADMIN + "roomDetail" + `${roomNo}`

  },

  interviews: {
    // FORM 관련 주석처리
    sendInfo: () => HOST + INTERVIEW + "confirm/",
  },

  naverapis: {
    // 인증 문자 번호 보내기
    sendsms: () => HOST + NAVERAPI + "sms/",
  },
};
