const SELECTORS = {
    profile:{
        css:{
            fullname: "h1"

        },
        xpath:{
            educationItems: "(//section[.//span[contains(text(),'Educación')]]//ul)[1]/li",
            experiencieItems: "(//section[.//span[contains(text(),'Experiencia')]]//ul)[1]/li"
        }
    },
    education:"(//section[.//span[contains(text(),'Educación')]]//ul)[3]//div//span[@aria-hidden='true']",
    experiencie:"(//section[.//span[contains(text(),'Experiencia')]]//ul)[1]/li//div[2]/div[1]/div[1]//span[@aria-hidden='true']",
    search:{
        urlsProfiles:".search-results-container .ph0 ul.reusable-search__entity-result-list > li span.entity-result__title-text a"
    }

}

export default SELECTORS

// $x("(//section[.//span[contains(text(),'Educación')]]//ul)[1]//div//span[@aria-hidden='true']")
// $x("(//section[.//span[contains(text(),'Educación')]]//ul)[1]//div//span[@aria-hidden='true']").map(span=>span.innerText)
//https://www.linkedin.com/in/facundo-omar-garcia/overlay/contact-info/
// https://www.linkedin.com/in/roxana-stephanie-rodriguez-b2a8ab83

// /html/body/div[5]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]/div[2]/span[2]/a