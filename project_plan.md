구현할 것

전체 프로젝트

1. Docker

- [x] docker-compose 사용해 백엔드, 프론트엔드, 데이터베이스 연결
  - [x] 네트워크 설정
- [x] docker-compose 환경변수 설정

프론트 엔드

1. 화면 구현

- [x] 게시글 리스트 화면
- [x] 게시글 상세 조회 화면
  - [x] 게시글 상세 조회시 본문 줄바꿈 무시되는 것 고치기
- [x] 게시글 쓰기 화면
- [x] 게시글 수정 화면

2. 도커 설정

- [x] 도커에서 프론트엔드 서버 설정 및 실행

2. 화면 리팩토링

- [x] html 파일 내 script 태그 js 파일로 분리
- [x] script 내 util 함수들 js 파일로 분리
- [x] html 파일 내 style 태그 css 파일로 분리

백 엔드

1. api 구현

- [x] 게시글 생성 기능: post(board)
- [x] 게시글 전체 조회 기능: get()
  - 삭제한 게시글 조회 안되게 처리
- [x] 게시글 상세 조회 기능: get(number)
  - 삭제한 게시글 조회 안되게 처리
- [x] 게시글 수정 기능: patch(board)
  - [x] 게시글 수정 실패시 에러 상태코드 수정
- [x] 게시글 삭제 기능: delete(number)
  - deletedAt 필드 생성

2. 도커 설정

- [x] 도커 기본 설정
- [x] 도커에서 백엔드 서버 실행

3. DB 연결

- [x] 도커에서 MongoDB 서버 실행
- [x] Mongoose 기본 설정
- [x] 게시글 전체 조회 기능에 DB 적용
- [x] 게시글 상세 조회 기능에 DB 적용
- [x] 게시글 등록 기능에 DB 적용
- [x] 게시글 수정 기능에 DB 적용
- [x] 게시글 삭제 기능에 DB 적용
- [x] try-catch로 DB 사용 코드 에러 핸들링
- [x] Mongoose 디버그 모드 설정

4. 리펙토링

- [x] 백엔드 코드 분리
- [x] 게시글 등록시 글 번호 할당을 백엔드 로직으로 처리하지 않고 DB 내에서 관리하도록 수정
- [x] 환경 변수 분리

5. api docs with swagger

- [x] swagger 사용해 api docs 생성
- [x] 게시글 전체 조회 기능 api docs 생성
- [x] 게시글 상세 조회 기능 api docs 생성
- [x] 게시글 등록 기능 api docs 생성
- [x] 게시글 수정 기능 api docs 생성
- [x] 게시글 삭제 기능 api docs 생성

6. TypeScript 사용?

- [x] tsconfig.json 설정 추가
- [x] 파일 확장자 변경
- [x] 타입스크립트 관련 모듈 설치
- [x] 타입스크립트 타입 명시
- [x] input DTO 적용
- [x] output DTO 적용
- [x] 입력값 검증
- [x] 도커에서 서버 실행하기

7. 수정

- [x] 게시판 조회 화면의 URL 설계 방식을 query parameter에서 path parameter로 바꾸기

배포

1. AWS 배포 사전 세팅

- [x] AWS 계정 준비
- [x] EC2 키 페어(.pem 파일) 다운로드
- [x] EC2 인스턴스 생성 (Amazon Linux 2 / Ubuntu)
- [x] 보안그룹 인바운드 설정 (SSH, HTTP, 필요한 포트)
- [x] 로컬 프로젝트 폴더 준비 (지금 상태면 OK)
- [x] .env 파일 서버용 버전 준비

2. AWS EC2 배포

- [x] AWS EC2 인스턴스 생성
- [x] SSH 접속
- [x] Docker, Docker Compose 설치
- [x] 프로젝트 파일 EC2로 전송
- [x] EC2에서 환경변수 파일(.env) 수정
- [x] docker-compose up
- [ ] Nginx reverse proxy (선택)
