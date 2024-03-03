// Global
let tex
let tex_w
let tex_h
let default_tex

let font
let default_font

let canvas
let canvas_width = 100
let canvas_height = 100

// Animations

// anim inout
let anim_inout_min = 0.2
let anim_inout_max = 1.0
let anim_inout_opts_el = document.getElementById('anim_inout_opts')
let anim_inout_min_el = document.getElementById('anim_inout_min')
let anim_inout_max_el = document.getElementById('anim_inout_max')
anim_inout_min_el.value = anim_inout_min
anim_inout_max_el.value = anim_inout_max
anim_inout_min_el.addEventListener('change', (e) => {
    anim_inout_min = Number(e.target.value)
})
anim_inout_max_el.addEventListener('change', (e) => {
    anim_inout_max = Number(e.target.value)
})

// anim updown
let anim_updown_min = 0.2
let anim_updown_max = 1.0
let anim_updown_opts_el = document.getElementById('anim_updown_opts')
let anim_updown_min_el = document.getElementById('anim_updown_min')
let anim_updown_max_el = document.getElementById('anim_updown_max')
anim_updown_min_el.value = anim_updown_min
anim_updown_max_el.value = anim_updown_max

anim_updown_min_el.addEventListener('change', (e) => {
    anim_updown_min = Number(e.target.value)
})
anim_updown_max_el.addEventListener('change', (e) => {
    anim_updown_max = Number(e.target.value)
})

// anim spin
let anim_spin_dir = 'clockwise'
let anim_spin_opts_el = document.getElementById('anim_spin_opts')
let anim_spin_dir_el = document.getElementById('anim_spin_dir')
anim_spin_dir_el.value = anim_spin_dir
anim_spin_dir_el.addEventListener('change', (e) => {
    anim_spin_dir = e.target.value
})

// anim scroll
let anim_scroll_dir = 'left'
let anim_scroll_opts_el = document.getElementById('anim_scroll_opts')
let anim_scroll_dir_el = document.getElementById('anim_scroll_dir')
anim_scroll_dir_el.value = anim_scroll_dir
anim_scroll_dir_el.addEventListener('change', (e) => {
    anim_scroll_dir = e.target.value
})

// frame count
let frame_count = 50
let frame_count_el = document.getElementById('frame_count')
frame_count_el.value = frame_count
frame_count_el.addEventListener('change', (e) => {
    frame_count = Number(e.target.value)
})

// frame rate
let frame_rate = 50
let frame_rate_el = document.getElementById('frame_rate')
frame_rate_el.value = frame_rate
frame_rate_el.addEventListener('change', (e) => {
    frame_rate = Number(e.target.value)
})

// scale
let scale_x = 1
let scale_y = 1
let scale_x_el = document.getElementById('scale_x')
let scale_y_el = document.getElementById('scale_y')
scale_x_el.value = scale_x
scale_y_el.value = scale_y
scale_x_el.addEventListener('change', (e) => {
    scale_x = Number(e.target.value)
})
scale_y_el.addEventListener('change', (e) => {
    scale_y = Number(e.target.value)
})

// background color
let background_color = '#ffffff'
let background_color_el = document.getElementById('background_color')
background_color_el.value = background_color
background_color_el.addEventListener('change', (e) => {
    background_color = e.target.value
})
let background_color_switch = true
let background_color_switch_el = document.getElementById(
    'background_color_switch',
)
background_color_switch_el.checked = background_color_switch
background_color_switch_el.addEventListener('change', (e) => {
    background_color_switch = e.target.checked
})

// input type
let input_type = 'image'
let input_type_el = document.getElementById('input_type')
let input_image_opts_el = document.getElementById('input_image_opts')
let input_text_opts_el = document.getElementById('input_text_opts')
input_type_el.addEventListener('change', (e) => {
    input_type = e.target.value

    input_image_opts_el.setAttribute('hidden', true)
    input_text_opts_el.setAttribute('hidden', true)

    switch (input_type) {
        case 'image':
            input_image_opts_el.removeAttribute('hidden')
            let files = input_image
            if (files.length > 0) {
                load_image(files[0])
            } else {
                load_default_image()
            }
            break
        case 'text':
            input_text_opts_el.removeAttribute('hidden')
            let txt = input_text
            regenerate_text(txt)
            break
        default:
            console.error('invalid input type')
    }
})

// input image
let input_image_el = document.getElementById('input_image')
input_image_el.addEventListener('change', (e) => {
    let files = e.target.files
    if (files.length == 0) {
        tex = default_tex
        return
    }
    load_image(files[0])
})

// input text
let input_text = 'hello'
let input_text_el = document.getElementById('input_text')
input_text_el.value = input_text
input_text_el.addEventListener('keyup', (e) => {
    input_text = e.target.value
    regenerate_text()
})

// input text font
let input_text_font_el = document.getElementById('input_text_font')
input_text_font_el.addEventListener('change', (e) => {
    let files = e.target.files
    if (files.length == 0) {
        load_default_font()
        regenerate_text()
        return
    }
    load_font(files[0])
})

// input text color
let input_text_color = '#000000'
let input_text_color_el = document.getElementById('input_text_color')
input_text_color_el.addEventListener('change', (e) => {
    input_text_color = e.target.value
    regenerate_text()
})

/* let type_input = document.getElementById('input_type') */
let animation_type = 'static'
let animation_type_el = document.getElementById('anim_type')
animation_type_el.value = animation_type
animation_type_el.addEventListener('change', (e) => {
    animation_type = e.target.value

    anim_inout_opts_el.setAttribute('hidden', true)
    anim_updown_opts_el.setAttribute('hidden', true)
    anim_spin_opts_el.setAttribute('hidden', true)
    anim_scroll_opts_el.setAttribute('hidden', true)
    switch (animation_type) {
        case 'static':
            return
        case 'inout':
            anim_inout_opts_el.removeAttribute('hidden')
            break
        case 'updown':
            anim_updown_opts_el.removeAttribute('hidden')
            break
        case 'spin':
            anim_spin_opts_el.removeAttribute('hidden')
            break
        case 'scroll':
            anim_scroll_opts_el.removeAttribute('hidden')
            break
        default:
            console.error('invalid animation', animation_type)
    }
})

// Gif
let export_gif_el = document.getElementById('export_gif')
export_gif_el.addEventListener('click', () => {
    export_gif()
})

// P5.js

function preload() {
    default_tex = loadImage('assets/default_img.png')
    default_font = loadFont('assets/default_font.ttf')

    load_default_image()
    load_default_font()

    frameRate(frame_rate)
}

function setup() {
    canvas = createCanvas(canvas_width, canvas_height, WEBGL)
    canvas.parent('render_window')
}

function draw() {
    frameRate(frame_rate)

    clear()
    if (background_color_switch) {
        background(background_color)
    }

    animate()
    scale(scale_x, scale_y)

    noStroke()

    texture(tex)
    plane(tex_w, tex_h)
}

// Animations

function animate() {
    switch (animation_type) {
        case 'static':
            return
        case 'inout':
            inout_animation()
            break
        case 'updown':
            updown_animation()
            break
        case 'spin':
            spin_animation()
            break
        case 'scroll':
            scroll_animation()
            break
        default:
            console.error('invalid animation', animation_type)
    }
}

function inout_animation() {
    let animation_speed = (2 * PI) / frame_count

    let min_size = anim_inout_min
    let max_size = anim_inout_max
    let diff = (max_size - min_size) / 2
    let s = diff + diff * cos(animation_speed * frameCount) + min_size
    scale(s, s)
}

function updown_animation() {
    let animation_speed = (2 * PI) / frame_count

    let min_size = anim_updown_min
    let max_size = anim_updown_max

    let diff = (max_size - min_size) / 2
    let h = diff + diff * cos(animation_speed * frameCount) + min_size

    let scaled_y = tex_h * scale_y * h
    let d = (height - scaled_y) / 2

    translate(0, d)
    scale(1, h)
}

function spin_animation() {
    let animation_speed = (2 * PI) / frame_count

    let angle = animation_speed * frameCount
    if (anim_spin_dir == 'counter_clockwise') {
        angle = -angle
    }

    rotate(angle)
}

function scroll_animation() {
    let direction = anim_scroll_dir

    if ((direction == 'left') | (direction == 'right')) {
        let left = -width / 2 - (tex_w * scale_x) / 2
        let right = width / 2 + (tex_w * scale_x) / 2
        let animation_speed = (right - left) / frame_count
        let dist = (frameCount * animation_speed) % (right - left)

        if (direction == 'left') {
            translate(right - dist, 0)
        } else {
            translate(left + dist, 0)
        }
    }

    if ((direction == 'up') | (direction == 'down')) {
        let top = -height / 2 - (tex_h * scale_y) / 2
        let bottom = height / 2 + (tex_h * scale_y) / 2
        let animation_speed = (bottom - top) / frame_count
        let dist = (frameCount * animation_speed) % (bottom - top)

        if (direction == 'up') {
            translate(0, bottom - dist)
        } else {
            translate(0, top + dist)
        }
    }
}

// regenerates text texture
function regenerate_text() {
    let txt = input_text
    let fs = 52

    // Get dimensions
    textFont(font)
    textSize(fs)
    let text_w = textWidth(txt)
    let asc = textAscent()
    let des = textDescent()
    let text_h = asc + des

    // Create text texture
    let t = createGraphics(text_w, text_h)
    t.fill(input_text_color)
    t.textFont(font)
    t.textSize(fs)
    t.textAlign(CENTER)
    t.text(txt, text_w / 2, asc)

    // Update texture
    tex = t
    tex_w = text_w
    tex_h = text_h
}

// load image
function load_default_image() {
    tex = default_tex
    tex_w = canvas_width
    tex_h = canvas_height
}
function load_image(file) {
    let reader = new FileReader()
    reader.onload = function() {
        loadImage(
            reader.result,
            (img) => {
                tex = img
                tex_h = canvas_height
                tex_w = (img.width / img.height) * canvas_width
            },
            (err) => {
                console.log('could not load image', err)
            },
        )
    }
    reader.readAsDataURL(file)
}

// load font
function load_default_font() {
    font = default_font
}
function load_font(file) {
    let reader = new FileReader()
    reader.onload = function() {
        loadFont(
            reader.result,
            (fnt) => {
                font = fnt
                regenerate_text()
            },
            (err) => {
                console.error('could not load font', err)
            },
        )
    }
    reader.readAsDataURL(file)
}

// export gif
function export_gif() {
    frameCount = 0
    let frames = frame_count
    let options = {
        units: 'frames',
    }
    saveGif('test', frames, options)
}
