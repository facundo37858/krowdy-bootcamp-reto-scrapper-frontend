export const $=(selector,node=document)=>node.querySelector(selector)

export const $$=(selector,node=document)=>[...node.querySelectorAll(selector)]

export const $x=(xpath, node=document)=>{
    //node nodo desde donde expensar
    const collection = document.evaluate(xpath, node, null, XPathResult.ANY_TYPE, null)

    let resul=collection.iterateNext()
    let elements=[]
    
    while(resul){

        elements.push(resul)

        resul=collection.iterateNext()

    }

    return elements

}