export default class Cookie {
  constructor() {
    this.cookiesBar = null;
    this.acceptCookiesBtn = null;

    this.selector = {
      cookiesBar: ".js-cookies-bar",
      acceptCookiesBtn: ".js-accept-cookies",
    };

    this.state = {
      isVisible: "is-visible",
      isCookiesAccepted: "isCookiesAccepted",
    };
  }

  init() {
    this.cookiesBar = document.querySelector(this.selector.cookiesBar);
    this.acceptCookiesBtn = document.querySelector(
      this.selector.acceptCookiesBtn
    );

    const shouldContinue = !!this.cookiesBar && !!this.acceptCookiesBtn;

    if (!shouldContinue) return;

    this.addListeners();
    this.handleReadCookies();
  }

  addListeners() {
    this.acceptCookiesBtn.addEventListener("click", this.handleSaveCookies);
  }

  handleReadCookies = () => {
    const isCookiesAccepted = this.handleReadCookie(
      this.state.isCookiesAccepted
    );

    if (!isCookiesAccepted) return;

    this.handleHideCookieBar();
  };

  handleReadCookie(cookieName) {
    const isCookiesAccepted =
      document.cookie
        .match("(^|;)\\s*" + cookieName + "\\s*=\\s*([^;]+)")
        ?.pop() || "";

    return isCookiesAccepted;
  }

  handleSaveCookies = () => {
    document.cookie = `${this.state.isCookiesAccepted}=true`;
    this.handleHideCookieBar();
  };

  handleHideCookieBar = () => {
    this.cookiesBar.classList.remove(this.state.isVisible);
  };
}
