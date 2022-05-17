
import  autoScrolling  from "../utils/autoScrolling";
import { $, $x,$$ } from "../utils/selectors";
import  waitForElement  from "../utils/waitForElement";

import  SELECTORS  from "./selectors";


waitForElement('h1')
   .then(()=>{
    autoScrolling(30).then(()=>{
         const fullname = $(SELECTORS.profile.css.fullname).textContent

         const experienceItems = $x(SELECTORS.profile.xpath.experiencieItems)

         const educationItems = $x(SELECTORS.profile.xpath.educationItems)

         const experience=$x(SELECTORS.experiencie)

         const education=$x(SELECTORS.education)

         const experienceArr=experience.map(e=>e.textContent)
         //['Recuitment Markerting Manager | Talent Acquisition | Inbound Recruiter',
         //  'Darwoft · Jornada completa',
         //  'ago. 2015 - actualidad · 6 años 10 meses',
         //  'Córdoba, Argentina',
         //  'Owner',
         //  'Piruetas',
         //  'may. 2014 - dic. 2018 · 4 años 8 meses',
         //  'Las Varillas',
         //  'Co-creador', 'Servicio Automotor', 'jul. 2016 - jul. 2017 · 1 año 1 mes', 'Argentina', 'Co Founder', 'Drumine', 'dic. 2015 - dic. 2016 · 1 año 1 mes', 'Argentina', 'Marketing - Planificación - Community Manager', 'LiderTech', 'jun. 2012 - jun. 2015 · 3 años 1 mes', 'Sabattini 1581 L.3. Córdoba, Argentina']

         const educationArr=education.map(e=>e.textContent)
         
         const pruebaExperience = experienceItems.map(element => $('span[aria-hidden="true"]',element)?.textContent);
                 
         const pruebaEducation = educationItems.map(element=> $('span[aria-hidden="true"]',element)?.textContent)

         let port = chrome.runtime.connect({name:"safePort"})

         let profile={
            fullname,
            pruebaEducation,
            pruebaExperience
         }

         let arrAuxExp=[]

         for(let i=0; i < experienceArr.length;i++){

            let experienceDb={}

           
            experienceDb['role']=experienceArr.shift()
            experienceDb['place']=experienceArr.shift()
            experienceDb['period']=experienceArr.shift()
            experienceDb['country']=experienceArr.shift()

            arrAuxExp.push(experienceDb)




         }

         
         let arrAuxEdu=[]

         for(let i=0; i < experienceArr.length;i++){
            let educationDb={}

            educationDb['place']=educationArr.shift()
            educationDb['role']=educationArr.shift()
            educationDb['period']=educationArr.shift()
            educationDb['country']=educationArr.shift()

            arrAuxEdu.push(educationDb)




         }

        

         port.postMessage({profile,arrAuxEdu, arrAuxExp})

      })
   })
   .catch(()=>{console.log("intentelo mas tarde")})


