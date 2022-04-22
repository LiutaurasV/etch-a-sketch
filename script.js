const gridspace = document.querySelector('.gridspace');
const settings = document.querySelector('.settings')
const colorPicker = document.getElementById('colorPicker');
const slider = document.querySelector('#slider');
const sliderInfo = document.querySelector(".sliderLabel");
const rainbowButton = document.getElementById('rainbow');
const clearButton = document.getElementById('clear');

let blockColor = colorPicker.value;
let rainbow = false;

function createGrid(n) {
    const grid = document.createElement('div')
    grid.classList.add('grid')

    for (let i = 1; i <= n; i++) {
        let line = document.createElement('div');
        line.classList.add('line');
        grid.appendChild(line);

        for (let j = 1; j <= n; j++) {
            let block = document.createElement('div');
            block.classList.add('block');
            line.appendChild(block);
        }
    }
    gridspace.appendChild(grid);
    getBlocks();
}

function getBlocks() {
    const blocks = document.querySelectorAll('.block');
    blocks.forEach((block => {
        block.addEventListener('mouseover', () => {
            if (!rainbow) {
                block.style.backgroundColor = blockColor;
            }
            else {
                block.style.backgroundColor = "rgb(" + Math.floor(Math.random() * 255) +
                ", " + Math.floor(Math.random() * 255) + ", " + 
                Math.floor(Math.random() * 255) + ')'
            }
        })
    }))
}

function clear() {
    let grid =  document.querySelector('.grid');
    grid.remove();
    createGrid(slider.value);
}


rainbowButton.addEventListener('click', () => {
    rainbow = !rainbow;
    if (rainbow) {
        rainbowButton.classList.add('pressed');
        rainbowButton.style.backgroundColor = '#72317e';
    }
    else {
        rainbowButton.classList.remove('pressed');
        rainbowButton.style.backgroundColor = '';
    }
})

colorPicker.addEventListener('change', () => {
    blockColor = colorPicker.value;
})

slider.addEventListener('input', () => {
    sliderInfo.textContent = "Grid size: " + slider.value + " x " + slider.value;
})

slider.addEventListener('change', () => {
    clear();
})

clearButton.addEventListener('click', () => {
    clear();
})


// Center the grid
gridspace.style.marginRight = settings.offsetWidth+ 'px';

createGrid(16);
slider.value = 16;