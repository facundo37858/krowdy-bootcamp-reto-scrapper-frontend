
import { autoScrolling } from "../utils/autoScrolling";
import { $, $x,$$ } from "../utils/selectors";
import { waitForElement } from "../utils/waitForElement";

import { SELECTORS } from "./selectors";


waitForElement('h1').then(()=>{

    autoScrolling(30).then(()=>{

        let fullName=$(SELECTORS.profile.css.fullName).textContent

        let experienceItems=$x(SELECTORS.profile.xpath.experienceItems)

        let educationsItems=$x(SELECTORS.profile.xpath.educationItems)

        experienceItems.forEach(element => {

            console.log('experience: ',$('span[aria-hidden="true"]',element)?.textContent)
            console.log('experience: ',$('span',element))
            console.log(element)
        });
        educationsItems.forEach(element=>{
            console.log('educacion: ',$('span[aria-hidden="true"]',element)?.textContent)
        })

        const pruebaExperience = experienceItems.map(element => $('span[aria-hidden="true"]',element)?.textContent);

        const pruebaEducation = educationsItems.map(element=> $('span[aria-hidden="true"]',element)?.textContent)
        
        let port = chrome.runtime.connect({name:"safePort"})//open port name safePort

        port.postMessage(({fullName,pruebaExperience, pruebaEducation}))//envio el mensaje

    })
}).catch(()=>{console.log("intentelo mas tarde")})

