import esbuild from 'esbuild'

esbuild.build({
    entryPoints:[ 'src/background.js','src/scripts/scrapper.js','src/scripts/getUrls.js'],
    outdir:'build',
    bundle:true,
    watch:true,
    
}).then(resul=>{
    console.log('waching...')
    console.log(resul)
}).catch(err=>console.log(err))