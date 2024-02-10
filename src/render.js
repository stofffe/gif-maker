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

let scroll_opts = document.getElementById('scroll_opts')
let scroll_direction = document.getElementById('scroll_dir')

let global_scale_x = document.getElementById('global_scale_x')
let global_scale_y = document.getElementById('global_scale_y')
global_scale_x.value = 1
global_scale_y.value = 1

let animation_input = document.getElementById('animations')

let input_type_input = document.getElementById('input_type')

let image_input_opts = document.getElementById('image_input_opts')
let image_input = document.getElementById('image_input')

let text_input_opts = document.getElementById('text_input_opts')
let text_input = document.getElementById('text_input')
text_input.value = 'hello'

let frameRateInput = document.getElementById('frame_rate')
frameRateInput.value = 60

let saveInput = document.getElementById('save_gif')

let tex
let tex_w
let tex_h
let default_tex
let font

let canvas
let dim_x = 200
let dim_y = 200

// P5.js

function preload() {
    default_tex = loadImage('https://pixijs.com/assets/bunny.png')
    load_default()

    font = loadFont('assets/font.ttf')
}

function setup() {
    canvas = createCanvas(dim_x, dim_y, WEBGL)
    canvas.parent('render_window')
}

function draw() {
    background(255)

    animate()
    scale(Number(global_scale_x.value), Number(global_scale_y.value))

    noStroke()
    texture(tex)
    plane(tex_w, tex_h)
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
    let direction = scroll_direction.value
    let framerate = Number(frameRateInput.value)

    if ((direction == 'left') | (direction == 'right')) {
        let left = -width / 2 - (tex_w * Number(global_scale_x.value)) / 2
        let right = width / 2 + (tex_w * Number(global_scale_x.value)) / 2
        let animation_speed = (right - left) / framerate
        let dist = (frameCount * animation_speed) % (right - left)

        if (direction == 'left') {
            translate(right - dist, 0)
        } else {
            translate(left + dist, 0)
        }
    }

    if ((direction == 'up') | (direction == 'down')) {
        let top = -height / 2 - (tex_h * Number(global_scale_y.value)) / 2
        let bottom = height / 2 + (tex_h * Number(global_scale_y.value)) / 2
        let animation_speed = (bottom - top) / framerate
        let dist = (frameCount * animation_speed) % (bottom - top)

        if (direction == 'up') {
            translate(0, bottom - dist)
        } else {
            translate(0, top + dist)
        }
    }
}

function load_default() {
    tex = default_tex
    tex_w = 200
    tex_h = 200
}

function load_text(txt) {
    let fs = 52
    // Get dimensions
    textFont(font)
    textSize(fs)
    textAlign(CENTER)
    let text_w = textWidth(txt)
    let text_h = textAscent()

    // Create text texture
    let t = createGraphics(text_w, text_h)
    t.textFont(font)
    t.textSize(fs)
    t.textAlign(CENTER)
    t.text(txt, text_w / 2, text_h)

    // Update state
    tex = t
    tex_w = text_w
    tex_h = text_h
}

function load_image(file) {
    let reader = new FileReader()
    reader.onload = function() {
        let img = new Image()
        img.src = reader.result
        img.onload = function() {
            tex = loadImage(img.src)
            tex_w = img.width
            tex_h = img.height
        }
    }
    reader.readAsDataURL(file)
}

function save_gif() {
    frameCount = 0
    let frames = Number(frameRateInput.value)
    let options = {
        units: 'frames',
        delay: 0,
    }
    saveGif('test', frames, options)
}

// Callbacks

text_input.addEventListener('keyup', (e) => {
    let txt = e.target.value
    load_text(txt)
})
image_input.addEventListener('change', (e) => {
    let files = e.target.files
    if (files.length == 0) {
        tex = null
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
            let files = image_input.files
            if (files.length > 0) {
                load_image(files[0])
            } else {
                load_default()
            }
            break
        case 'text':
            text_input_opts.removeAttribute('hidden')
            let txt = text_input.value
            load_text(txt)
            break
        default:
            console.error('invalid input type')
    }
})

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

// Record Gif
saveInput.addEventListener('click', () => {
    save_gif()
})
