export function countdownTimer(expirationTime: number) {
  const timeRemaining = ref<string>('5:00');
  let intervalId: NodeJS.Timeout | null = null;

  const updateCountdown = () => {
    const currentTime = new Date().getTime();
    const timeDifference = expirationTime - currentTime;

    if (timeDifference <= 0) {
      clearInterval(intervalId as NodeJS.Timeout);
      timeRemaining.value = '0:00';
    } else {
      const minutes = Math.floor(timeDifference / (60 * 1000));
      const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);
      timeRemaining.value = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  };

  onMounted(() => {
    updateCountdown();
    intervalId = setInterval(updateCountdown, 1000);
  });

  onBeforeUnmount(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });

  return { timeRemaining, updateCountdown };
}