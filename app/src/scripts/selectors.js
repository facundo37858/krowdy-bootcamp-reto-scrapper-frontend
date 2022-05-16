
export const SELECTORS={

    profile:{
        css:{
            fullName:'h1'

        },
        xpath:{
            educationItems:"(//section[.//span[contains(text(),'Educación')]]//ul)[1]/li",
            experienceItems:"(//section[.//span[contains(text(),'Experiencia')]]//ul)[1]/li",
           

        }
    },
    search:{
        urlsProfiles:".search-results-container .ph0 ul.reusable-search__entity-result-list > li span.entity-result__title-text a"
    }

}

// $x("(//section[.//span[contains(text(),'Educación')]]//ul)[1]//div//span[@aria-hidden='true']")
// $x("(//section[.//span[contains(text(),'Educación')]]//ul)[1]//div//span[@aria-hidden='true']").map(span=>span.innerText)