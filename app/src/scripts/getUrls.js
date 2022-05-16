import {autoScrolling} from "../utils/autoScrolling"
import { $$ } from "../utils/selectors"
import {waitForElement} from "../utils/waitForElement"
import {SELECTORS} from "./selectors.js"

waitForElement("h1")
    .then(()=>{
        autoScrolling(30).then(()=>{
            const urlsProfiles = $$(SELECTORS.search.urlsProfiles).map(element=>element.href.split("?")[0])
            
            let port = chrome.runtime.connect({name:"safePortUrls"})
            port.postMessage({urlsProfiles})

        })
    })
    .catch(()=>{console.log("intentelo mas tarde")})