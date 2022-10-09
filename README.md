# WEBTERVIEW

## 목차

1. [프로젝트 소개](#프로젝트-소개)
2. [팀 소개](#팀-소개)
3. [프로젝트 기술 스택](#프로젝트-기술-스택)
4. [프로젝트 상세 기능 설명](#프로젝트-상세-기능-설명)
5. [실제 화면 gif](#실제화면-gif)

</br>


## 프로젝트 소개

면접 진행 시 평가표와 카메라 등으로 시선을 계속 움직여야 하는 불편함을 해소하기 위한 웹 프로젝트



### UCC

클릭하면 영상으로 이동됩니다.

<a href="https://youtu.be/MpBbX2B9bbQ"><img src="https://i.ibb.co/x6zVg2Q/image.png" alt="UCC" border="0"></a>



### 주요 기능

- 회원 관리
- 화상 미팅룸
- 면접관 관리
- 지원자 관리
- 게시판



### 주요 기술

- WebRTC
- WebSocket
- JWT Authentication
- JPA
- REST API



### 참조 리소스

* Vuetify: 디자인 전반 적용
* OpenVidu: webRTC 구현을 위한 데모코드와 라이브러리 활용
* Animation.css: CSS 애니메이션 지원 라이브러리. 메인 페이지 진입 애니메이션에 활용



### 배포 환경

- URL: https://i7c205.p.ssafy.io (서비스 중지)
- 테스트 계정 
    - ID: webterview@gmail.com 
    - PW: test





## 팀 소개
* 이주영: 팀장, 백엔드 개발, Swagger API 문서 관리
* 김희주: 백엔드 개발, Swagger API 문서 관리, HTTPS 구성, Docker 구성, 프로젝트 배포
* 이성찬: 프론트엔드 개발, 와이어 프레임 구성
* 홍성준: 프론트엔드 개발, 와이어 프레임 구성
* 전윤희: 프론트엔드 개발, 백엔드 개발, WebRTC 기능 담당
* 허은지: 프론트엔드 개발, WebRTC 기능 담당, 화면 디자인 구성



## 프로젝트 기술 스택

### 개발 환경

- Intellij, Spring Tool Suite, VS Code, Github Desktop, Postman, JIRA, MobaXterm, Notion



### 기술 스택 

- 프론트 : Vue 3, OpenVidu 2.22.0, Javascript, HTML/CSS, Bootstrap 5
- 백엔드 :  JAVA zulu 8, , MySQL 8.0.30, SpringBoot 2.7.1
- 서버 : Docker 20.10.17, Jenkins 2.346.3, Nginx 1.18.0



### 시스템 구성도

<img src="https://i.ibb.co/xY1qHk3/image.png" alt="시스템구성도" border="0">





### ERD

<img src="https://i.ibb.co/W0Hq3C5/erd.png" alt="erd" border="0">







## 프로젝트 상세 기능 설명

서비스의 직접적인 사용자는 관리자, 즉 회사의 인사담당자입니다. 

관리자 이외에 면접관, 지원자들은 회원가입 하지 않고도 면접을 진행할 수 있도록 하기 위해서 관리자가 가지고 있는 이메일 정보로 면접장 URL을 보내는 방식을 사용하였습니다. 

해당 URL을 들어가 본인인증을 진행하여 성공하면, 회원가입을 하지 않고도 면접을 진행할 수 있습니다.



### 관리자

각각의 방에서 면접이 진행되고, 면접이 끝나면 면접관이 채점한 점수를 취합하여 각 지원자들의 점수 순위표가 자동으로 생성됩니다. 관리자는 해당 순위표를 열람할 수 있으며, 이 순위표와 저장된 평가표 등을 보며 누구를 채용할 건지 결정할 수 있습니다.

<img src="https://i.ibb.co/cL7TFY9/image.png" alt="image" border="0">

<img src="https://i.ibb.co/tZHdSP6/image.png" alt="image" border="0">



- 회원가입, 로그인

- 날짜를 정하여 면접장 생성

- 엑셀 파일을 통한 면접관 추가

- 엑셀 파일을 통한 지원자 추가

- 면접관/지원자 관리 (추가, 수정, 삭제 등)

- 엑셀 파일을 통한 평가표 업로드

- 지원자의 면접 영상 다운로드

- 점수에 따른 지원자의 순위 열람

- 면접관이 작성한 평가표 다운로드





### 면접관

<img src="https://i.ibb.co/KD8xH3H/image.png" alt="image" border="0">

- 엑셀 파일에 작성된 이메일로 면접장 URL을 받을 수 있음

- 해당 URL을 누르면 휴대폰을 통한 본인인증 진행

- 본인인증 성공 시 면접장 입장하여, 한 화면에 지원자의 이력서/자기소개서, 지원자의 카메라, 평가표를 동시에 볼 수 있음

- 평가표에 지원자에 대한 점수, 특이사항 입력 가능





### 지원자

<img src="https://i.ibb.co/Bqqcrf1/image.png" alt="image" border="0">

- 엑셀 파일에 작성된 이메일로 면접장 URL을 받을 수 있음
- 해당 URL을 누르면 휴대폰을 통한 본인인증 진행
- 본인인증 성공 시 면접장 입장하여, 면접 참여 가능    
- 면접 후 해당 면접 영상 다운로드 

</br>


## 실제화면 gif

### 1. 회원가입

 <img src="https://i.ibb.co/mv2C6wf/3.gif" alt="3" border="0">

### 2. 로그인

<img src="https://i.ibb.co/Zmw0cH7/4.gif" alt="4" border="0">

### 3. 면접장 생성

<img src="https://i.ibb.co/6rjN9Ls/5.gif" alt="5" border="0">

### 4. 면접에 대한 정보 exel파일 업로드

- 면접관 정보, 지원자 정보, 면접질문, 점수표 등 업로드 하여 면접관 화면에 띄워줄 수 있음

<img src="https://i.ibb.co/02tLMn2/6-1.gif" alt="6-1" border="0">

- 면접관, 지원자, 면접질문 정보를 수정 가능

<img src="https://i.ibb.co/0M9cX27/6-2.gif" alt="6-2" border="0">



<img src="https://i.ibb.co/D4GmxbX/6-3.gif" alt="6-3" border="0">

<img src="https://i.ibb.co/ByXQrBP/6-4.gif" alt="6-4" border="0">

- 면접관, 지원자의 email로 url전송

<img src="https://i.ibb.co/vQTTGBQ/6-5.gif" alt="6-5" border="0">

- url을 눌러 본인인증 진행

<img src="https://i.ibb.co/d4kvxZ0/image.gif" alt="image" border="0">

- 지원자의 상세 정보 확인 가능

<img src="https://i.ibb.co/GcF6gRB/7-2.gif" alt="7-2" border="0">

- q&a를 통해 관리자에게 질문 가능

<img src="https://i.ibb.co/5s3vQ4t/9.gif" alt="9" border="0">

<img src="https://i.ibb.co/cbVPFzy/9.gif" alt="9" border="0">

### 5.면접관 화면

- 고객들에게 편리하게 자유자제로 컴포넌트를 이동 , 확대 축소, 삭제 생성 가능

<img src="https://i.ibb.co/wp5Bztc/13.gif" alt="13" border="0">

### 6. 지원자화면

- 입장 전 본인의 음성과 화면을 체크 할 수 있음.

<img src="https://i.ibb.co/2Fqt5D6/16.gif" alt="16" border="0">



### 7. 관리자 화면

- 실시간으로 지원자의 점수를 확인 가능하며, 점수표를 exel로 다운로드 가능

<img src="https://i.ibb.co/6wHH6tS/14.gif" alt="14" border="0">

- 관리자는 지원자의 상세정보, 점수, 특이사항을 확인할 수 있으며, 지원자의 영상도 다운로드 받아 확인 가능.

<img src="https://i.ibb.co/LxyZ138/15.gif" alt="15" border="0">

### 8.로그아웃

<img src="https://i.ibb.co/zZGDHWv/12.gif" alt="12" border="0">
