let canv = document.querySelector('#canvas')
let ctx = canv.getContext('2d')
let coordsOfTheCurve = []
let isMouseDown = false

canv.width = window.innerWidth
canv.height = window.innerHeight
ctx.lineWidth = 6

canv.addEventListener('mousedown', () => {
    isMouseDown = true
    ctx.clearRect(0, 0, canv.width, canv.height);
    
})

canv.addEventListener('mouseup', () => {
    isMouseDown = false
    coordsOfTheCurve.push('mouseup')

    save()
    coordsOfTheCurve = JSON.parse(localStorage.getItem('coordsOfTheCurve'))
    clear()
    replay()
}) 

canv.addEventListener('mousemove', (e) => {
    if(isMouseDown) {
        coordsOfTheCurve.push([e.clientX, e.clientY])
        ctx.lineTo(e.clientX, e.clientY)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(e.clientX, e.clientY, 3, 0,  Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.moveTo(e.clientX, e.clientY)
    }
})

const save = () => localStorage.setItem('coordsOfTheCurve', JSON.stringify(coordsOfTheCurve))

const clear = () => {
    ctx.clearRect(0, 0, canv.width, canv.height) 
    ctx.beginPath()
    ctx.fillStyle = 'black'
}

const replay = () => {    
    let centerX = 0
    let centerY = 0
    let radius = 0
    let sumOfDistToCurve = 0
    let sumOfCoordX = 0
    let sumOfCoordY = 0

    for(let i = 1; i < coordsOfTheCurve.length - 1; i++) {
        if(typeof i === 'number') {
            sumOfCoordX += coordsOfTheCurve[i][0]
            sumOfCoordY += coordsOfTheCurve[i][1]
        }
    }

    centerX = sumOfCoordX / coordsOfTheCurve.length
    centerY = sumOfCoordY / coordsOfTheCurve.length
    
    for(let i = 1; i < coordsOfTheCurve.length - 1; i++) {
        sumOfDistToCurve += Math.sqrt(Math.pow((centerX - coordsOfTheCurve[i][0]), 2) + Math.pow((centerY - coordsOfTheCurve[i][1]), 2))
    }
    
    radius = sumOfDistToCurve / coordsOfTheCurve.length

    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.stroke()

    ctx.beginPath()
    coordsOfTheCurve = []
}