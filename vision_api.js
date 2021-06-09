const http = require ('http');
const url = require('url');

// create basic server and implement handling different requests
const app = http.createServer( async (req, res) => {
    // parse the incoming url
    const parsedURL = url.parse(req.url, true)
    
    if (parsedURL.pathname.startsWith('/api/detectText') && req.method === 'GET'){
        var path = parsedURL.query.path
        
        var output = await detectText(path);
        res.end(JSON.stringify(output))
    } 
    else {
        res.statusCode = 400;
        res.end("API Endpoint Not Supported");
    }
});

async function detectText(imageName) {
    const vision = require('@google-cloud/vision')
    const client = new vision.ImageAnnotatorClient()
    const [result] = await client.documentTextDetection(`./cypress/screenshots/mousecontrol.js/${imageName}`)
    const labels = result.textAnnotations
    var res =[]
    labels.forEach(label => 
        res.push({
          'label':label.description,
          'bounds':label.boundingPoly.vertices
        }))
    return res
  }
app.listen(4000)