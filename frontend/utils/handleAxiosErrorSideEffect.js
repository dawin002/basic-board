export const handleAxiosErrorSideEffect = function (status, message, onStatus) {
  alert(message);

  if (onStatus) {
    onStatus(status, message);
  }
};
