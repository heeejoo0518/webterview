<template>
  <div id="main-page">
    <div id="main-header">
      <h1>
        <a href="#" class="logo"
          ><img src="@/../public/resources/images/logo.png" width="240"
        /></a>
      </h1>
      <nav>
        <ul>
          <li>
            <router-link to="/signup"> 
              <input
                class="btn btn-large"
                type="button"
                id="signup-button"
                value="회원가입"
              />
            </router-link>
          </li>
          <li>
            <router-link to="/login"> 
              <input
                class="btn btn-large"
                type="button"
                id="login-button"
                value="로그인"
              />
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
    <div id="banner">
      <div id="banner-slogan">
        <h1>평가 시스템이 결합된 면접 서비스</h1>
        <h4>번거로움 없이 면접에 꼭 필요한 기능들을 한번에</h4>
      </div>
      <div id="banner-gif">
        <img src="@/../public/resources/images/mainbanner.gif" />
      </div>
      <div id="banner-input">
        <router-link to="/signup"> 
        <span><input class="input100" type="email" name="이메일" placeholder="Enter your UserEmail" required></span>
        <span><input
          class="login100-form-btn"
          type="button"
          id="join-button"
          value="시작하기"
        /></span>
        </router-link>
      </div>
    </div>

    <div class="main-line">
      <a href="#manual-start" id="manual-start">
        <h6>Webterview 기능 바로 알아보기</h6>
        <div>▼</div>
      </a>
    </div>
    <div id="manual-summary">
      <h1>Webterview는 이렇습니다!</h1>
      <div id="manual-summary-item">
        <div class="manual-summary-items">
          <h3>내 마음대로 커스텀</h3>
          <br />
          <h6>불필요한 종이 대신 모니터 하나로 면접과 평가를 동시에 진행해 보세요.</h6>
          <br />
          <img src="@/../public/resources/images/custom.png" style="width: 30%; float:right;"/>
        </div>
        <div class="manual-summary-items">
          <h3>면접을 복기하세요</h3>
          <br />
          <h6>면접 영상을 복기하는 것은 면접관과 지원자 모두에게 도움이
            될 것입니다.</h6>
          <br />
          <img src="@/../public/resources/images/recording.png" style="width: 30%; float:right;"/>
        </div>
        <div class="manual-summary-items">
          <h3>보다 빠른 평가</h3>
          <br />
          <h6>면접 종료와 동시에 지원자들의 순위와 평균 점수를 얻을 수 있습니다.</h6>
          <br />
          <img src="@/../public/resources/images/grading.png" style="width: 30%; float:right;"/>
        </div>
      </div>
      <div>
        <router-link to="/login"> 
          <input
            class="btn btn-large"
            type="button"
            id="start-button"
            value="지금 바로 시작하기"
          />
        </router-link>
      </div>
    </div>
    <div class="manual-dark" style="padding: 100px 0 70px 0">
      <h1>아직 헷갈리시나요?</h1>
      <div id="manual-box">
        <div @click="customModal = !customModal" class="manual-items">
          <div style="display: flex; justify-content: space-between;">
            <h5>내 마음대로 커스텀</h5>
            <div v-if="!customModal" style="float:right">▶</div>
            <div v-if="customModal" style="float:right">▼</div>
          </div>
          <h6 v-if="customModal" class="manual-text">
            Webterview는 지원자 정보, 자기소개서, 면접 화면, 평가표 등을 사용자의 편의에 따라
            임의로 배치할 수 있습니다. 아이콘을 클릭해 불필요한 창을 없앨 수도 있으며, 오른쪽 하단의 크기 조정 버튼을 드래그해 크기를 조절할 수도 있습니다.
          </h6>
        </div>
        <div @click="recordingModal = !recordingModal" class="manual-items">
          <div style="display: flex; justify-content: space-between;">
            <h5>면접을 복기하세요</h5>
            <div v-if="!recordingModal" style="float:right">▶</div>
            <div v-if="recordingModal" style="float:right">▼</div>
          </div>
          <h6 v-if="recordingModal" class="manual-text">
            Webterview는 지원자의 화면을 자동으로 녹화해 서버에 저장합니다. 면접관은 지원자 채용 전 면접 상황을 다시 살필 수 있고, 지원자는 면접관의 동의 하에 본인의 면접 당시 모습을 복기할 수 있습니다.
          </h6>
        </div>
        <div @click="gradingModal = !gradingModal" class="manual-items">
          <div style="display: flex; justify-content: space-between;">
            <h5>보다 빠른 평가</h5>
            <div v-if="!gradingModal" style="float:right">▶</div>
            <div v-if="gradingModal" style="float:right">▼</div>
          </div>
          <h6 v-if="gradingModal" class="manual-text">
            면접이 종료되면 Webterview는 자동으로 면접에 참가한 지원자들의 평균 점수를 계산해 순위를 매깁니다. 순위 게시판에서는 전체적인 순위뿐만 아니라 해당 지원자들의 세부 정보를 볼 수 있습니다.
          </h6>
        </div>
      </div>
    </div>
    <!-- <div class="manual">
      <div>
        <h1>무료로 서비스 이용하기</h1>
        <div>
          면접 종료와 동시에 지원자들의 순위와 평균 점수를 살필 수 있습니다.
        </div>
      </div>
    </div> -->
    <footer>
      <div>
        <div style="color:#f5f5f5; font-size:large">Webterview</div>
        <b>C205 공중분해</b>
        <br />
        대표자: 이주영 | BE: 김희주, 이주영 | FE: 이성찬, 홍성준 | WebRTC: 전윤희, 허은지
        <br />
        광주광역시 광산구 하남산단 6번로 107 SSAFY 222호
        <br />
        고객센터  02-3429-5100  |  평일 상담시간  09:00 ~ 18:00 | 주말∙공휴일 휴무
        <br />
        이메일 webterview@gmail.com
      </div>
      <div style="color:#94a6b7">Copyright ©2022 Webterview All rights reserved.</div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customModal: false,
      recordingModal: false,
      gradingModal: false,
    };
  },
};
</script>

<style>
* {
  scroll-behavior: smooth;
}

#main-page {
  background: #fff;
}

#main-header {
  width: 100%;
  text-align: center;
  position: absolute;
  height: 80px;
  background-color: #fff;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

#main-header h1 {
  display: inline-block;
  vertical-align: middle;
  padding: 10px;
  margin: 10px;
  margin-bottom: 15px;
}

#login-button {
  display: inline-block;
  vertical-align: middle;
  padding: 10px;
  margin: 10px;
  background-color: #f05454;
  color: white;
}

ul {
  display: flex;
}

#signup-button {
  /* position: absolute;
  top: 10px;
  right: 10px; */
  padding: 10px;
  margin: 10px;
  /* background-color: #f05454; */
  color: #f05454;
}

#banner {
  /* position: relative; */

  min-height: 20rem;
  height: 100%;
  /* overflow: hidden; */
  padding-top: 70px;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: #121212;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 50px 10px;
  /* justify-content: space-evenly;
  flex-wrap: nowrap;
  flex-direction: column; */
}

#banner-slogan {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
}

#banner-input {
  display: flex;
  /* flex-direction: column; */
  align-items: flex-start;
  justify-content: flex-end;
}

#banner-gif {
  grid-row: span 2;
  padding: 5px;
  display: flex;
  justify-content: flex-start;
}

#banner-gif img {
  object-fit: contain;
}

#main-email { 
  font-family: Poppins-Medium;
  font-size: 15px;
  line-height: 1.5;
  color: #666666;
  margin: 10px;

  background: #e6e6e6;
  height: 50px;
  border-radius: 25px;
  padding: 0 30px 0 68px;
}

#join-button {
  padding: 10px;
  margin: 10px 0;
  background-color: #f05454;
  color: white;
}

.main-line {
  margin: 10px 100px;
  padding: 50px;
  border-top: 2px solid #f5f5f5;
}

#start-button {
  padding: 10px;
  margin: 10px 0;
  background-color: #30475E;
  color: white;
}

.manual {
  height: 50rem;
  padding: 100px 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.manual-dark {
  background-color: #f5f5f5
}

#manual-summary {
  padding: 70px 100px;
}

#manual-summary-item {
  margin: 70px;
  display: flex;
}

.manual-summary-items {
  background-color: #f5f5f5;
  width: 100%;
  height: auto;
  margin: 10px;
  padding: 2rem;
  border-radius: 1rem;
  text-align: left;
}

#manual-box {
  margin: 70px;
  padding: 0 100px;
  display: flex;
  flex-direction: column;
  /* margin-top: 50px; */
  /* padding:10px; */
  text-align: left;
  justify-content: space-between;
}

.manual-items {
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  margin: 10px;
  padding: 2rem;
  border-radius: 1rem;
  
}

.manual-text {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

footer {
  padding: 30px;
  background: #30475E;
  text-align: left;
  color: #4b647c;
  font-weight: lighter;
}

</style>
