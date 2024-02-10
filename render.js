let fileInput = document.getElementById('input')

let in_out_opts = document.getElementById('in_out_opts')
let in_out_min = document.getElementById('in_out_min')
let in_out_max = document.getElementById('in_out_max')
in_out_min.value = 0.2
in_out_max.value = 1.0

let up_down_opts = document.getElementById('up_down_opts')
let up_down_min = document.getElementById('up_down_min')
let up_down_max = document.getElementById('up_down_max')
up_down_min.value = 0.2
up_down_max.value = 1.0

let spin_opts = document.getElementById('spin_opts')
let spin_scale = document.getElementById('spin_scale')
spin_scale.value = 1.0

let animationInput = document.getElementById('animations')

let frameRateInput = document.getElementById('frame_rate')
frameRateInput.value = 60

let saveInput = document.getElementById('save_gif')

let img = null
// P5.js

function preload() {
    img = loadImage('https://pixijs.com/assets/bunny.png')
}

function setup() {
    let canvas = createCanvas(200, 200, WEBGL)
    canvas.parent('render_window')
}

function draw() {
    background(0)

    if (!img) {
        return
    }

    texture(img)
    animate()
    quad(
        -width / 2,
        -height / 2,
        width / 2,
        -height / 2,
        width / 2,
        height / 2,
        -width / 2,
        width / 2,
    )
}

function animate() {
    let animation = animationInput.value
    switch (animation) {
        case 'in_out':
            scale_animation()
            break
        case 'up_down':
            jump_animation()
            break
        case 'spin':
            spin_animation()
            break
        default:
            console.error('invalid animation')
    }
}

function scale_animation() {
    let framerate = Number(frameRateInput.value)
    let animation_speed = (2 * PI) / framerate
    let min_size = Number(in_out_min.value)
    let max_size = Number(in_out_max.value)
    let diff = (max_size - min_size) / 2
    let s = diff + diff * cos(animation_speed * frameCount) + min_size
    scale(s, s)
}

function jump_animation() {
    let framerate = Number(frameRateInput.value)
    let animation_speed = (2 * PI) / framerate
    let min_size = Number(up_down_min.value)
    let max_size = Number(up_down_max.value)
    let diff = (max_size - min_size) / 2
    let s = diff + diff * cos(animation_speed * frameCount) + min_size
    translate(0, height / 2)
    scale(1, s)
    translate(0, -height / 2)
}

function spin_animation() {
    let framerate = Number(frameRateInput.value)
    let animation_speed = (2 * PI) / framerate
    let s = Number(spin_scale.value)
    let angle = animation_speed * frameCount
    scale(s, s)
    rotate(angle)
}

// Choose texture

fileInput.addEventListener('change', (e) => {
    let files = e.target.files
    if (files.length == 0) {
        img = null
        return
    }

    let reader = new FileReader()
    reader.onload = () => {
        img = loadImage(reader.result)
    }
    reader.readAsDataURL(files[0])
})

// Choose animation
animationInput.addEventListener('change', (e) => {
    animation = e.target.value

    in_out_opts.setAttribute('hidden', true)
    up_down_opts.setAttribute('hidden', true)
    spin_opts.setAttribute('hidden', true)
    switch (animation) {
        case 'in_out':
            in_out_opts.removeAttribute('hidden')
            break
        case 'up_down':
            up_down_opts.removeAttribute('hidden')
            break
        case 'spin':
            spin_opts.removeAttribute('hidden')
            break
        default:
            console.error('invalid animation')
    }
})

// Record Gif
frameRateInput.addEventListener('change', (e) => {
    framerate = Number(e.target.value)
})
saveInput.addEventListener('click', () => {
    frameCount = 0
    let frames = framerate
    let options = {
        units: 'frames',
        delay: 0,
    }
    saveGif('test', frames, options)
})
