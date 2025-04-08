export function handleAxiosError(error, onStatus) {
  if (error.response) {
    const status = error.response.status;
    const message = (error.response.data && error.response.data.message) || '서버 오류가 발생했습니다.';

    // 상태별 콜백 실행 (선택적으로)
    if (onStatus) {
      onStatus(status, message);
    }

    if (status === 400) {
      console.error('잘못된 요청:', message);
    } else if (status === 404) {
      console.error('데이터를 찾을 수 없음:', message);
    } else if (status === 409) {
      console.error('요청이 서버의 현재 상태와 충돌:', message);
    } else if (status === 500) {
      console.error('서버 내부 오류:', message);
    } else {
      console.error(`에러 (${status}):`, message);
    }

    return message;
  } else if (error.request) {
    console.error('서버 응답 없음');
    return '서버 응답 없음';
  } else {
    console.error('요청 설정 오류:', error.message);
    return '요청 설정 오류';
  }
}
