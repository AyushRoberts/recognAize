const imageUpload = document.getElementById('imageUpload')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.ageGenderNet.loadFromUri('/models')
]).then(start)

async function start() {
  const container = document.createElement('div')
  container.style.position = 'relative'
  container.width=400
  container.height=350
  container.style.marginTop="10px"
  document.getElementById('uploads').append(container)
  
  let image
  let canvas
  //document.getElementById('uploads').append('Loaded')
  imageUpload.addEventListener('change', async () => {
    if (image) image.remove()
    if (canvas) canvas.remove()
    image = await faceapi.bufferToImage(imageUpload.files[0])
    image.width=500
    image.height=500
    container.append(image)
    canvas = faceapi.createCanvasFromMedia(image)
    container.append(canvas)
    const displaySize = { width: image.width, height: image.height }
    faceapi.matchDimensions(canvas, displaySize)
    const detections = await faceapi.detectAllFaces(image, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors().withAgeAndGender()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    var i=0
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date()
    var sec = d.getSeconds()
    var min = d.getMinutes()
    var hrs = d.getHours()
    var date = d.getDate()
    var month = months[d.getMonth()]
    let year = d.getYear()-100+2000
    resizedDetections.forEach(result => {
      i=i+1
        const { age, gender, genderProbability } = result
        var index=document.getElementById('NAME').textContent.indexOf("as")+3
        var dispname=document.getElementById('NAME').textContent.substring(index)
        database.ref(dispname+'/'+date+'-'+month+'-'+year+'/'+hrs+':'+min+':'+sec+'/'+'face'+i+'/age').set(faceapi.round(age, 0))
        database.ref(dispname+'/'+date+'-'+month+'-'+year+'/'+hrs+':'+min+':'+sec+'/'+'face'+i+'/gender').set(gender)
        new faceapi.draw.DrawTextField(
          [
            `Age: ${faceapi.round(age, 0)} years`,
            `Gender: ${gender} (${faceapi.round(genderProbability)})`
          ],
          result.detection.box.bottomLeft
        ).draw(canvas)
      })
    
    
  })
}


