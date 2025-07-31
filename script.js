const trainTimes = {
  岡崎: [
    "05:53",
    "06:18",
    "06:43",
    "06:59",
    "07:15",
    "07:31",
    "07:47",
    "08:03",
    "08:19",
    "08:35",
    "08:51",
    "09:07",
    "09:23",
    "09:39",
    "09:55",
    "10:11",
    "10:32",
    "10:49",
    "11:05",
    "11:21",
    "11:37",
    "11:53",
    "12:09",
    "12:25",
    "12:41",
    "12:57",
    "13:13",
    "13:29",
    "13:45",
    "14:01",
    "14:17",
    "14:33",
    "14:49",
    "15:05",
    "15:21",
    "15:37",
    "15:53",
    "16:09",
    "16:25",
    "16:41",
    "16:57",
    "17:13",
    "17:29",
    "17:45",
    "18:01",
    "18:17",
    "18:33",
    "18:49",
    "19:05",
    "19:21",
    "19:37",
    "19:53",
    "20:09",
    "20:25",
    "20:41",
    "20:57",
    "21:14",
    "21:30",
    "21:47",
    "22:06",
    "22:24",
    "22:43",
    "22:56",
    "23:20",
    "23:38",
    "00:03",
    "00:22",
  ],
  高蔵寺: [
    "05:31",
    "05:59",
    "06:13",
    "06:24",
    "06:43",
    "07:00",
    "07:22",
    "07:27",
    "07:38",
    "07:43",
    "07:54",
    "07:59",
    "08:10",
    "08:15",
    "08:26",
    "08:31",
    "08:42",
    "08:47",
    "08:58",
    "09:03",
    "09:14",
    "09:26",
    "09:30",
    "09:46",
    "10:02",
    "10:19",
    "10:40",
    "10:56",
    "11:12",
    "11:28",
    "11:44",
    "12:00",
    "12:16",
    "12:32",
    "12:48",
    "13:04",
    "13:20",
    "13:36",
    "13:52",
    "14:08",
    "14:24",
    "14:40",
    "15:12",
    "15:28",
    "15:44",
    "16:01",
    "16:17",
    "16:33",
    "16:49",
    "17:04",
    "17:20",
    "17:36",
    "17:52",
    "18:08",
    "18:24",
    "18:40",
    "18:56",
    "19:12",
    "19:28",
    "19:44",
    "20:00",
    "20:17",
    "20:33",
    "20:49",
    "21:05",
    "21:24",
    "21:37",
    "21:54",
    "22:13",
    "22:30",
    "22:49",
    "23:14",
    "23:59",
  ],
};

let Direction = "岡崎";

function updateTimeTable() {
  let list = document.getElementById("timeTableList");
  list.innerHTML = "";

  let times = trainTimes[Direction];

  for (let i = 0; i < times.length; i++) {
    let div = document.createElement("div");
    div.className = "time-item";
    div.textContent = times[i];
    list.appendChild(div);
  }
}

function NextTrain() {
  let now = new Date();
  let nowMinutes = now.getHours() * 60 + now.getMinutes();

  let times = trainTimes[Direction];
  let nextTrain = null;

  for (let i = 0; i < times.length; i++) {
    let parts = times[i].split(":");
    let trainMinutes = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);

    if (trainMinutes > nowMinutes) {
      nextTrain = times[i];
      break;
    }
  }

  let nextTimeText = document.getElementById("nextTrainTime");
  let countdownText = document.getElementById("nextCountdown");
  let alertBox = document.getElementById("nextAlert");

  if (nextTrain === null) {
    nextTimeText.textContent = "--:--";
    countdownText.textContent = "--:--";
    alertBox.style.display = "none";
    return;
  }

  let parts = nextTrain.split(":");
  let nextTrainDate = new Date();
  nextTrainDate.setHours(parseInt(parts[0], 10));
  nextTrainDate.setMinutes(parseInt(parts[1], 10));
  nextTrainDate.setSeconds(0);

  let diffMs = nextTrainDate.getTime() - now.getTime();
  let diffMin = Math.floor(diffMs / 1000 / 60);
  let diffSec = Math.floor((diffMs / 1000) % 60);

  nextTimeText.textContent = nextTrain;
  countdownText.textContent =
    (diffMin < 10 ? "0" : "") + diffMin + ":" + (diffSec < 10 ? "0" : "") + diffSec;

  if (diffMin <= 10 && diffSec >= 0) {
    alertBox.style.display = "block";
  } else {
    alertBox.style.display = "none";
  }
}

let buttons = document.querySelectorAll(".direction-btn");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    for (let j = 0; j < buttons.length; j++) {
      buttons[j].classList.remove("active");
    }
    this.classList.add("active");
    Direction = this.getAttribute("data-direction");

    updateTimeTable();
    NextTrain();
  });
}

updateTimeTable();
NextTrain();

setInterval(function () {
  NextTrain();
}, 1000);

