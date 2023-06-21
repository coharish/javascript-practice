class PriorityQueue {
  constructor(compare) {
    this.queue = [];
    this.compare = compare;
  }

  push(element) {
    this.queue.push(element);
    this.queue.sort(this.compare);
  }

  poll() {
    return this.queue.shift();
  }

  peek() {
    return this.queue[0];
  }

  size() {
    return this.queue.length;
  }
}

const findMinMeetingRooms = (allSlots) => {
  if (!allSlots.length) {
    return 0;
  }

  if (allSlots.length < 2) {
    return 1;
  }

  allSlots.sort((a, b) => a[0] - b[0]);

  let prevRoomTimes = [allSlots[0][1]]; // 30, 30

  // O(m * n)
  for (let i = 1; i < allSlots.length; i++) {
    let [start, end] = [...allSlots[i]]; // 30, 35
    let earliestTime = Math.min(...prevRoomTimes); // 30
    if (start < earliestTime) {
      prevRoomTimes.push(end);
    } else {
      prevRoomTimes[prevRoomTimes.indexOf(earliestTime)] = end;
    }
  }
  return prevRoomTimes.length;
};

const schedule = [
  [0, 30],
  [5, 20],
  [25, 30],
  [30, 35],
];
// const minMeetings = findMinMeetingRooms(schedule);
// console.log(minMeetings);

// 0 5 10 15 20 25 30 35
// 0---------------30-35
//   5-------20 25-30-35

// O(m logn)
const findMinMeetingRoomsOptimised = (slots) => {
  slots.sort((a, b) => a[0] - b[0]);
  const pq = new PriorityQueue((a, b) => a - b);
  let rooms = 0;
  for (let i = 0; i < slots.length; i++) {
    pq.push(slots[i][1]);
    if (slots[i][0] < pq.peek()) {
      rooms++;
    } else {
      pq.poll();
    }
  }
  return rooms;
};

const findMeetingRooms2 = (slots) => {
  const startTime = slots.sort((a, b) => a[0] - b[0]);
  const endTime = slots.sort((a, b) => a[1] - b[1]);

  let rooms = 0;
  let j = 0;

  for (let i = 0; i < slots.length; i++) {
    if (startTime[i][0] < endTime[j][1]) {
      rooms++;
    } else {
      j++;
    }
  }

  return rooms;
};

const minMeetings = findMeetingRooms2(schedule);
console.log(minMeetings);
