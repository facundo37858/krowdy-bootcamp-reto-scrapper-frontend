import esbuild from 'esbuild'

esbuild.build({
    entryPoints:[ 'app/src/service/background.js','app/src/scripts/scrapper.js','app/src/scripts/getUrls.js'],
    outdir:'app/build',
    bundle:true,
    watch:true,
    
}).then(resul=>{
    console.log('waching...')
    console.log(resul)
}).catch(err=>console.log(err))