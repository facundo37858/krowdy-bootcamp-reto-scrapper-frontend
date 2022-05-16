import URLS from "../config/url/config"
import { db } from "../../server/db"

let tabId;

// chrome.action.onClicked.addListener(tab=>{

   

//     chrome.tabs.create({


//         url: URLS.base
//     }, tab =>{
//         tabId = tab.id
//         chrome.scripting.executeScript({
//             target:{tabId: tab.id},
//             files:["./scripts/getUrls.js"]
//         })
//     })
   
// })

let guardian = 0
let urls;

chrome.runtime.onConnect.addListener(port=>{

    console.log(port)

    if(port.name==='safePortInput'){

        port.onMessage.addListener(message=>{
            
            

            chrome.tabs.create({


                url: URLS.base+message.input
            }, tab =>{
                tabId = tab.id
                chrome.scripting.executeScript({
                    target:{tabId: tab.id},
                    files:["./scripts/getUrls.js"]
                })
            })

        })

    }else if(port.name==="safePort"){

        port.onMessage.addListener(async message=>{

            await db.profiles.add(message.profiles)

            for(let i=0; i < message.arrAuxEdu; i++){

                await db.education.add(message.arrAuxEdu[i])
            }

            for(let i=0; i < message.arrAuxExp; i++){

                await db.experience.add(message.arrAuxExp[i])
            }



            console.log("datos guardados en indexdb")

            console.log(guardian)
            

            
            if(guardian < urls?.length){

                await chrome.tabs.update(tabId,{url:urls[guardian]})
    
    
                setTimeout(()=>{
                    console.log('SET TIME OUT')
                    chrome.scripting.executeScript({
                        target: {tabId},
                        files: ['./scripts/scrapper.js']    
                    }) 
                },5000)
    
                guardian++

            }
            /* fetch("http://localhost:3000/profiles",{
                method: "POST",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify(message)
            }).then(response=>response.json())
                .then(data=>console.log(data))
                .catch(error=>console.log(error)) */
        })

    }else if(port.name === "safePortUrls"){

        port.onMessage.addListener(async message=>{
            
            urls = message.urlsProfiles 

            console.log('safePortUrls', urls)
            
            const [url] = urls

            

            await chrome.tabs.update(tabId,{url})
            


            setTimeout(()=>{
                console.log('SET time out')
                chrome.scripting.executeScript({
                    target: {tabId},
                    files: ['./scripts/scrapper.js']    
                }) 
            },5000)
            guardian++
                
            
                

        
        })
    }
})
