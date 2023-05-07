const crypto = require('crypto');
const MINUTE = 60 * 1000;
function signMessage(str, secret) {
  return crypto.createHmac('sha256', secret).update(str).digest('hex');
}
const getCurrentMinute = () => {
  return getMinuteFromTime(Date.now());
};

const getMinuteFromTime = (time) => {
  return time % MINUTE !== 0 ? time - (time % MINUTE) : time;
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const sleepUntilNextMinute = async () => {
  await sleep(
    getCurrentMinute() + MINUTE - Date.now(),
  );
};

const sleepUntilNextMinuteMinus1Sec = async () => {
  await sleep(
          getCurrentMinute() + MINUTE - Date.now() - 1000,
  );
};

module.exports = {
  signMessage,
  getCurrentMinute,
  sleep,
  sleepUntilNextMinute,
  sleepUntilNextMinuteMinus1Sec
}

