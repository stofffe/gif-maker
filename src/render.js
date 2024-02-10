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
let scale_input = document.getElementById('scale_input')
scale_input.value = 1

let scroll_opts = document.getElementById('scroll_opts')
let scroll_direction = document.getElementById('scroll_dir')

let animation_input = document.getElementById('animations')

let input_type_input = document.getElementById('input_type')

let image_input_opts = document.getElementById('image_input_opts')
let image_input = document.getElementById('image_input')

let text_input_opts = document.getElementById('text_input_opts')
let text_input = document.getElementById('text_input')

let frameRateInput = document.getElementById('frame_rate')
frameRateInput.value = 60

let saveInput = document.getElementById('save_gif')

let image_source = null
let default_img = null
let text_source = null
let font = null

let dim_x = 200
let dim_y = 200

// P5.js

function preload() {
    default_img = loadImage('https://pixijs.com/assets/bunny.png')

    font = loadFont('assets/font.ttf')
}

function setup() {
    let canvas = createCanvas(dim_x, dim_y, WEBGL)
    canvas.parent('render_window')
}

function draw() {
    background(255)

    load_input()
    animate()

    let s = Number(scale_input.value)
    scale(s, s)

    noStroke()
    plane(dim_x, dim_y)
}

// Animations

function animate() {
    let animation = animation_input.value
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
        case 'scroll':
            scroll_animation()
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
    let angle = animation_speed * frameCount
    rotate(angle)
}

function scroll_animation() {
    let start_offset = -width
    let end_offset = width
    let framerate = Number(frameRateInput.value)
    let animation_speed = (end_offset - start_offset) / framerate
    let direction = scroll_direction.value
    let dist = (frameCount * animation_speed) % (end_offset - start_offset)
    switch (direction) {
        case 'left':
            let a = end_offset - dist
            translate(a, 0)
            break
        case 'right':
            let b = start_offset + dist
            translate(b, 0)
            break
        case 'up':
            let c = end_offset - dist
            translate(0, c)
            break
        case 'down':
            let d = start_offset + dist
            translate(0, d)
            break
    }
}

// Choose animation

animation_input.addEventListener('change', (e) => {
    animation = e.target.value

    in_out_opts.setAttribute('hidden', true)
    up_down_opts.setAttribute('hidden', true)
    spin_opts.setAttribute('hidden', true)
    scroll_opts.setAttribute('hidden', true)
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
        case 'scroll':
            scroll_opts.removeAttribute('hidden')
            break
        default:
            console.error('invalid animation')
    }
})

// Input

function load_input() {
    let input_type = input_type_input.value
    switch (input_type) {
        case 'image':
            texture(image_source ?? default_img)
            break
        case 'text':
            texture(text_source ?? default_img)
            break
        default:
            console.error('invalid input type')
    }
}

function load_text(txt) {
    let t = createGraphics(dim_x, dim_y)
    let fs = 52
    t.textFont(font)
    t.textSize(fs)
    t.textAlign(CENTER)
    t.text(txt, dim_x / 2, dim_y / 2 + fs / 4)
    text_source = t
}
text_input.addEventListener('change', (e) => {
    let txt = e.target.value
    load_text(txt)
})

function load_image(file) {
    let reader = new FileReader()
    reader.onload = () => {
        image_source = loadImage(reader.result)
    }
    reader.readAsDataURL(file)
}
image_input.addEventListener('change', (e) => {
    let files = e.target.files
    if (files.length == 0) {
        image_source = null
        return
    }
    load_image(files[0])
})

input_type_input.addEventListener('change', (e) => {
    let input_type = e.target.value
    image_input_opts.setAttribute('hidden', true)
    text_input_opts.setAttribute('hidden', true)

    switch (input_type) {
        case 'image':
            image_input_opts.removeAttribute('hidden')
            break
        case 'text':
            text_input_opts.removeAttribute('hidden')
            break
        default:
            console.error('invalid input type')
    }
})

// Record Gif
saveInput.addEventListener('click', () => {
    frameCount = 0
    let frames = Number(frameRateInput.value)
    let options = {
        units: 'frames',
        delay: 0,
    }
    saveGif('test', frames, options)
})
