(() => {
  // app/src/utils/selectors.js
  var $ = (selector, node = document) => node.querySelector(selector);
  var $x = (xpath, node = document) => {
    const collection = document.evaluate(xpath, node, null, XPathResult.ANY_TYPE, null);
    let resul = collection.iterateNext();
    let elements = [];
    while (resul) {
      elements.push(resul);
      resul = collection.iterateNext();
    }
    return elements;
  };

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

  // app/src/scripts/scrapper.js
  waitForElement("h1").then(() => {
    autoScrolling(30).then(() => {
      let fullName = $(SELECTORS.profile.css.fullName).textContent;
      let experienceItems = $x(SELECTORS.profile.xpath.experienceItems);
      let educationsItems = $x(SELECTORS.profile.xpath.educationItems);
      experienceItems.forEach((element) => {
        console.log("experience: ", $('span[aria-hidden="true"]', element)?.textContent);
        console.log("experience: ", $("span", element));
        console.log(element);
      });
      educationsItems.forEach((element) => {
        console.log("educacion: ", $('span[aria-hidden="true"]', element)?.textContent);
      });
      const pruebaExperience = experienceItems.map((element) => $('span[aria-hidden="true"]', element)?.textContent);
      const pruebaEducation = educationsItems.map((element) => $('span[aria-hidden="true"]', element)?.textContent);
      let port = chrome.runtime.connect({ name: "safePort" });
      port.postMessage({ fullName, pruebaExperience, pruebaEducation });
    });
  }).catch(() => {
    console.log("intentelo mas tarde");
  });
})();
