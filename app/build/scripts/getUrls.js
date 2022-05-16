(() => {
  // app/src/utils/selectors.js
  var $ = (selector, node = document) => node.querySelector(selector);
  var $$ = (selector, node = document) => [...node.querySelectorAll(selector)];

  // app/src/utils/autoScrolling.js
  var autoScrolling = (pixels) => new Promise((resolve, reject) => {
    let pixelsScroll = pixels;
    const idInterval = setInterval(() => {
      window.scrollTo(0, pixelsScroll);
      pixelsScroll += 30;
      if (pixelsScroll > document.body.scrollHeight)
        clearInterval(idInterval);
      resolve("true");
    }, 100);
  });

  // app/src/utils/waitForElement.js
  var waitForElement = (selector) => new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (!$(selector).element) {
        clearInterval(interval);
        resolve();
      }
    }, 10);
    setTimeout(() => {
      reject();
    }, 1e4);
  });

  // app/src/scripts/selectors.js
  var SELECTORS = {
    profile: {
      css: {
        fullName: "h1"
      },
      xpath: {
        educationItems: "(//section[.//span[contains(text(),'Educaci\xF3n')]]//ul)[1]/li",
        experienceItems: "(//section[.//span[contains(text(),'Experiencia')]]//ul)[1]/li"
      }
    },
    search: {
      urlsProfiles: ".search-results-container .ph0 ul.reusable-search__entity-result-list > li span.entity-result__title-text a"
    }
  };

  // app/src/scripts/getUrls.js
  waitForElement("h1").then(() => {
    autoScrolling(30).then(() => {
      const urlsProfiles = $$(SELECTORS.search.urlsProfiles).map((element) => element.href.split("?")[0]);
      let port = chrome.runtime.connect({ name: "safePortUrls" });
      port.postMessage({ urlsProfiles });
    });
  }).catch(() => {
    console.log("intentelo mas tarde");
  });
})();
