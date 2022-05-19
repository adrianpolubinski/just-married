export default class Slider {
  constructor(images) {
    this.images = images;
    this.slides = null;
    this.dotsList = null;
    this.dotsArr = [];
    this.currentSlide = 0;
    this.slideArr = [];
    this.nextBtn = null;
    this.prevBtn = null;
    this.sliderTimeout = null;
    this.loopTimeout = null;
    this.keyword = null;

    this.Selector = {
      slides: ".js-slides",
      dotsList: ".js-dots-list",
      nextBtn: ".js-button-right",
      prevBtn: ".js-button-left",
      slider: ".js-slider",
    };
  }

  init() {
    this.slides = document.querySelector(this.Selector.slides);
    this.dotsList = document.querySelector(this.Selector.dotsList);
    this.prevBtn = document.querySelector(this.Selector.prevBtn);
    this.nextBtn = document.querySelector(this.Selector.nextBtn);
    this.slider = document.querySelector(this.Selector.slider);

    const shouldContinue = !!this.slides && !!this.dotsList;
    if (!shouldContinue) return;

    for (let i = 0; i < this.images.length; i++) {
      const dot = document.createElement("li");
      dot.classList.add("c-slider__dot");
      // console.log(this.dotsList);
      this.dotsList.appendChild(dot);
      this.dotsArr.push(dot);

      const slide = document.createElement("div");
      slide.classList.add("c-slider__slide");
      slide.style.backgroundImage = `url('../img/${this.images[i]}')`;
      // console.log(slide);
      this.slides.appendChild(slide);
      this.slideArr.push(slide);
    }

    this.slideArr[0].classList.toggle("is-active");
    this.dotsArr[0].classList.toggle("is-active");
    this.addListeners();
    // this.autoPlay(this);
    this.startAutoPlay();
    this.keyword = this;
  }
  addListeners() {
    this.prevBtn.addEventListener("click", () => {
      this.changeState(this.currentSlide);

      if (this.currentSlide === 0) {
        this.currentSlide = this.slideArr.length - 1;
        this.changeState(this.currentSlide);
      } else {
        this.currentSlide--;
        this.changeState(this.currentSlide);
      }
    });
    this.nextBtn.addEventListener("click", () => {
      this.changeState(this.currentSlide);
      if (this.currentSlide < this.slideArr.length - 1) {
        this.currentSlide++;
        this.changeState(this.currentSlide);
      } else {
        this.currentSlide = 0;
        this.changeState(this.currentSlide);
      }
    });
    this.slider.addEventListener("mouseenter", this.stopAutoPlay.bind(this));
    this.slider.addEventListener("mouseleave", this.startAutoPlay.bind(this));
  }
  changeState(currentSlide) {
    this.slideArr[currentSlide].classList.toggle("is-active");
    this.dotsArr[currentSlide].classList.toggle("is-active");
  }
  stopAutoPlay() {
    clearInterval(this.sliderTimeout);
    // clearTimeout(this.loopTimeout);
  }
  startAutoPlay() {
    // console.log(this);

    this.sliderTimeout = setInterval(this.slideChange.bind(this), 3000);
  }
  slideChange() {
    // console.log(this);
    this.keyword.changeState(this.keyword.currentSlide);
    if (this.keyword.currentSlide < this.keyword.slideArr.length - 1) {
      this.keyword.currentSlide++;
    } else {
      this.keyword.currentSlide = 0;
    }

    this.keyword.changeState(this.keyword.currentSlide);
  }
}
