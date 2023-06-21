const input = [
  [
    [1, 3],
    [6, 7],
  ],
  [[2, 4]],
  [
    [2, 5],
    [9, 12],
  ],
];

const findFreeTime = (schedule) => {
  const mergedIntervals = schedule.reduce(
    (acc, items) => [...acc, ...items],
    []
  );
  let result = [];
  mergedIntervals.sort((a, b) => a[0] - b[0]);

  for (let i = 1; i < mergedIntervals.length; i++) {
    const prev = mergedIntervals[i - 1];
    const current = mergedIntervals[i];
    if (prev[1] < current[0]) {
      result.push([prev[1], current[0]]);
    }
  }

  return result;
};

console.log(findFreeTime(input));
