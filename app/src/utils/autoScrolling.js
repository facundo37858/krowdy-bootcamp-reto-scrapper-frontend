import {$} from './selectors'

//desplazamiento por la pagina web 

export const autoScrolling= pixels=>new Promise((resolve,reject)=>{
    let pixelsScroll= pixels

    const idInterval= setInterval(()=>{

        window.scrollTo(0,pixelsScroll)
        pixelsScroll+=30
        if(pixelsScroll >document.body.scrollHeight)

        clearInterval(idInterval)

        resolve('true')

    },100)
})
