export default class Hamburger {
  constructor() {
    this.hamburger = null;
    this.header = null;

    this.Selector = {
      hamburger: ".js-hamburger",
      header: ".js-header",
    };

    this.State = {
      isOpen: "is-open",
    };
  }

  init() {
    this.hamburger = document.querySelector(this.Selector.hamburger);
    this.header = document.querySelector(this.Selector.header);
    const shouldContinue = !!this.hamburger && !!this.header;
    if (!shouldContinue) return;
    this.addListeners();
  }

  addListeners() {
    this.hamburger.addEventListener("click", () => {
      this.header.classList.toggle(this.State.isOpen);
    });
  }
}
