export default class Calendar {
  constructor() {
    this.date = null;
    this.month = null;
    this.monthText = null;
    this.leftArrow = null;
    this.rightArrow = null;
    this.nextMonthDay = null;
    this.months = [
      "Styczeń",
      "Luty",
      "Marzec",
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Sierpień",
      "Wrzesień",
      "Październik",
      "Listopad",
      "Grudzień",
    ];
    this.days = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"];
    this.Selector = {
      nextBtn: ".js-button-next",
      prevBtn: ".js-button-prev",
      currentDay: ".js-current",
      day: ".js-day",
      monthText: ".js-month",
      dateText: ".js-date",
      monthDays: ".js-days",
      nextMonth: ".js-nextMonth",
    };
  }
  init() {
    this.leftArrow = document.querySelector(this.Selector.prevBtn);
    this.rightArrow = document.querySelector(this.Selector.nextBtn);

    this.date = new Date();
    this.initCalendar();
    this.addListeners();
  }
  addListeners() {
    this.leftArrow.addEventListener("click", () => {
      if (this.date.getMonth() > new Date().getMonth()) {
        this.date.setMonth(this.date.getMonth() - 1);
        this.initCalendar();
      }
    });
    this.rightArrow.addEventListener("click", () => {
      this.date.setMonth(this.date.getMonth() + 1);
      this.initCalendar();
    });
  }
  initCalendar() {
    this.month = this.date.getMonth();
    this.monthText = document.querySelector(this.Selector.monthText).innerHTML =
      this.months[this.month];

    // console.log(this.date.getDay());
    let whatDay = this.date.getDay() === 0 ? 6 : this.date.getDay() - 1;
    this.dateText = document.querySelector(this.Selector.dateText).innerHTML =
      this.days[whatDay] +
      " " +
      this.months[this.date.getMonth()] +
      " " +
      this.date.getFullYear();

    let days = "";
    const monthDays = document.querySelector(this.Selector.monthDays);
    const lastDay = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      0
    ).getDate();
    this.date.setDate(1);
    console.log(this.date.getDay());
    const firstDayIndex = this.date.getDay() === 0 ? 7 : this.date.getDay();
    const prevLastDay = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      0
    ).getDate();
    const lastDayCurrentMonth = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      0
    ).getDate();
    console.log(prevLastDay);
    const nextDays = 42 - (firstDayIndex - 1 + lastDayCurrentMonth);
    for (let x = firstDayIndex - 1; x > 0; x--) {
      days += `<div class="c-calendar__previousMonth js-day">${
        prevLastDay - x + 1
      }</div>`;
    }
    for (let i = 1; i <= lastDay; i++) {
      if (
        i === new Date().getDate() &&
        this.date.getMonth() === new Date().getMonth()
      ) {
        days += `<div class="c-calendar__current js-current js-day">${i}</div>`;
      } else {
        days += `<div class="js-day">${i}</div>`;
      }
    }
    for (let f = 1; f <= nextDays; f++) {
      days += `<div class="c-calendar__nextMonth js-day js-nextMonth">${f}</div>`;
      monthDays.innerHTML = days;
    }
  }
}
