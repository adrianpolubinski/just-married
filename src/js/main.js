import Hamburger from "./modules/hamburger";
const burger = new Hamburger();
burger.init();

const imageArr = [
  "../img/slider/1.jpg",
  "../img/slider/2.jpg",
  "../img/slider/3.jpg",
  "../img/slider/4.jpg",
];

import Slider from "./modules/slider";
const slider = new Slider(imageArr);
import Calendar from "./modules/calendar";
const calendar = new Calendar();
calendar.init();
slider.init();

import Cookie from "./modules/cookie";
const cookie = new Cookie();
cookie.init();
