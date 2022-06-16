"use strict"

/* Setting Timer [By using IntersectionObserver()]*/
// 以下IntersectionObserve API 參考資料...
// https://www.letswrite.tw/intersection-oserver-basic
// https://mini-ghost.dev/blog/api-intersection-oserver/ 

const TIMERHMS = document.querySelectorAll('.timer-hms div')
const boxes = document.querySelectorAll('.box')
const timerContainer = document.querySelector('.timer-container')
const countDownContainer = document.querySelector('.countdown-container')
const timerCheckedBtn = document.querySelector('[data-mode="checked"]')
// const hms = document.querySelectorAll('.box.show.checked')

let timerChecked = {
  hours: 0,
  minutes: 0,
  seconds: 0
}

// Practice IntersectionObserve API 
/* Scroll On Hours */
const hoursOptions = {
  root: document.querySelector('.timer-hours'),
  threshold: 0.8, //臨界點
}
const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      entry.target.classList.remove('checked')
      return
    } else {
      entry.target.classList.add('show')
      entry.target.classList.add('checked')
      FIXME:
      timerChecked['hours'] = Number(entry.target.innerText)
      console.log(timerChecked)
      // appearOnScroll.unobserve(entry.target)
    }
  })
}, hoursOptions)

FIXME:
console.log(timerChecked)

boxes.forEach(box => {
  appearOnScroll.observe(box)
})

/* Countdown Timer */
let startHours = document.getElementById('hours')
let startMinutes = document.getElementById('minutes')
let startSeconds = document.getElementById('seconds')
let settingTimer = (Number(startHours.innerHTML) * 3600) + (Number(startMinutes.innerHTML) * 60) + Number(startSeconds.innerHTML)

// let settingTimer = (Number(timerChecked['hours']) * 3600) + (Number(timerChecked['minutes']) * 60) + Number(timerChecked['seconds'])
let TIMER = setInterval(countDownTimer, 1000)

function countDownTimer() {
  let seconds = settingTimer % 60
  let minutes = Math.floor(settingTimer / 60)
  if (minutes >= 60) {
    minutes = minutes % 60
  }
  let hours = Math.floor(settingTimer / 3600)

  seconds = seconds < 10 ? "0" + seconds : seconds
  minutes = minutes < 10 ? "0" + minutes : minutes
  hours = hours < 1 ? "00" : "0" + hours
  startMinutes.innerHTML = minutes
  startSeconds.innerHTML = seconds
  startHours.innerHTML = hours

  if (settingTimer !== 0) {
    --settingTimer
    console.log(`times:`, settingTimer)
  } else {
    clearInterval(TIMER)
  }
}

/* Countdwon timer settings */
const countDownSettings = document.querySelector('.countdown-settings')
countDownSettings.addEventListener('click', countDownSetting)
timerContainer.addEventListener('click', startTimer)

// countDownSetting Function
function countDownSetting(e) {
  let target = e.target
  if (target.tagName !== 'BUTTON') return

  if (target.dataset.mode === "stop") {
    console.log(`stop click`)
    clearInterval(TIMER)
    target.classList.remove('fa-solid', 'fa-stop')
    target.classList.add('fa-solid', 'fa-play')
    target.dataset.mode = 'play'
  } else if (target.dataset.mode === "play") {
    console.log(`play click`)
    TIMER = setInterval(countDownTimer, 1000)
    target.classList.remove('fa-solid', 'fa-play')
    target.classList.add('fa-solid', 'fa-stop')
    target.dataset.mode = 'stop'
  } else if (target.dataset.mode === "reset") {
    console.log(`reset click & back to TIMER index.`)
    timerContainer.style.visibility = 'visible'
    countDownContainer.style.visibility = 'hidden'
    timerReset()
  }
}

// startTimer Function
function startTimer(e) {
  let target = e.target
  if (target.tagName !== 'BUTTON') return

  if (target.dataset.mode === 'start') {
    console.log(`Timer Start`)

    timerContainer.style.visibility = 'hidden'
    countDownContainer.style.visibility = 'visible'
  }
}

/* Timer Reset Function */
function timerReset() {
  console.log(`Timer Reset`)
}

/* Color Mode Transfer */
const paletteToggle = document.querySelector('.color-mode')
const color = ["pink", "blue", "brown"]

function colorMode(e) {
  let target = e.target
  let RandomColor = Math.floor(Math.random() * color.length)
  console.log(`RandomColor:`, RandomColor);
  if (target.checked) {
    // setAttritube("string","string")
    document.documentElement.setAttribute('data-theme', color[RandomColor])
  } else {
    document.documentElement.setAttribute('data-theme', "dark")
  }
}
paletteToggle.addEventListener('change', colorMode)



