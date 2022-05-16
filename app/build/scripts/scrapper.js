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
  var autoscrolling = (pixels) => new Promise((resolve, reject) => {
    let pixelstoScroll = pixels;
    console.log(pixelstoScroll);
    const idInterval = setInterval(() => {
      window.scrollTo(0, pixelstoScroll);
      pixelstoScroll += pixels;
      if (pixelstoScroll > document.body.scrollHeight) {
        clearInterval(idInterval);
        resolve(true);
      }
    }, 100);
  });
  var autoScrolling_default = autoscrolling;

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
  var waitForElement_default = waitForElement;

  // app/src/scripts/selectors.js
  var SELECTORS = {
    profile: {
      css: {
        fullname: "h1"
      },
      xpath: {
        educationItems: "(//section[.//span[contains(text(),'Educaci\xF3n')]]//ul)[1]/li",
        experiencieItems: "(//section[.//span[contains(text(),'Experiencia')]]//ul)[1]/li"
      }
    },
    education: "(//section[.//span[contains(text(),'Educaci\xF3n')]]//ul)[3]//div//span[@aria-hidden='true']",
    experiencie: "(//section[.//span[contains(text(),'Experiencia')]]//ul)[1]/li//div[2]/div[1]/div[1]//span[@aria-hidden='true']",
    search: {
      urlsProfiles: ".search-results-container .ph0 ul.reusable-search__entity-result-list > li span.entity-result__title-text a"
    }
  };
  var selectors_default = SELECTORS;

  // app/src/scripts/scrapper.js
  waitForElement_default("h1").then(() => {
    autoScrolling_default(30).then(() => {
      const fullName = $(selectors_default.profile.css.fullname).textContent;
      const experienceItems = $x(selectors_default.profile.xpath.experiencieItems);
      const educationItems = $x(selectors_default.profile.xpath.educationItems);
      const experience = $x(selectors_default.experiencie);
      const education = $x(selectors_default.education);
      const experienceArr = experience.map((e) => e.textContent);
      const educationArr = education.map((e) => e.textContent);
      const pruebaExperience = experienceItems.map((element) => $('span[aria-hidden="true"]', element)?.textContent);
      const pruebaEducation = educationItems.map((element) => $('span[aria-hidden="true"]', element)?.textContent);
      let port = chrome.runtime.connect({ name: "safePort" });
      let profile = {
        fullName,
        pruebaEducation,
        pruebaExperience
      };
      let arrAuxExp = [];
      for (let i = 0; i < experienceArr.length; i++) {
        let experienceDb = {};
        experienceDb["role"] = experienceArr.shift();
        experienceDb["place"] = experienceArr.shift();
        experienceDb["period"] = experienceArr.shift();
        experienceDb["country"] = experienceArr.shift();
        arrAuxExp.push(experienceDb);
      }
      let arrAuxEdu = [];
      for (let i = 0; i < experienceArr.length; i++) {
        let educationDb = {};
        educationDb["place"] = educationArr.shift();
        educationDb["role"] = educationArr.shift();
        educationDb["period"].educationArr.shift();
        educationDb["country"].educationArr.shift();
        arrAuxEdu.push(educationDb);
      }
      port.postMessage({ profile, arrAuxEdu, arrAuxExp });
    });
  }).catch(() => {
    console.log("intentelo mas tarde");
  });
})();
