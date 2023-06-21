const input = [
  [0, 30],
  [5, 10],
  [15, 20],
];
const canAttendAllMeetings = (schedule) => {
  schedule.sort((a, b) => a[0] - b[0]);

  for (let i = 1; i < schedule.length; i++) {
    if (schedule[i][0] < schedule[i - 1][1]) {
      return false;
    }
  }

  return true;
};

console.log(canAttendAllMeetings(input));
