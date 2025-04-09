export function handleAxiosErrorSideEffect(status, message, onStatus) {
  alert(message);

  if (onStatus) {
    onStatus(status, message);
  }
}
