const gridspace = document.querySelector('.gridspace');
const settings = document.querySelector('.settings')
const colorPicker = document.getElementById('colorPicker');
const slider = document.querySelector('#slider');
const sliderInfo = document.querySelector(".sliderLabel");
const rainbowButton = document.getElementById('rainbow');
const clearButton = document.getElementById('clear');
const modeButtons = document.querySelectorAll('.mode');

let blockColor = colorPicker.value;
let mode;

function createGrid(n) {
    //Create a n x n grid
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
    //Add event listeners to all of the blocks
    const blocks = document.querySelectorAll('.block');
    blocks.forEach((block => {
        block.addEventListener('mouseover', () => {
            if (mode === "regular") {
                block.style.backgroundColor = blockColor;
            }
            else if (mode === "rainbow") {
                block.style.backgroundColor = "rgb(" + Math.floor(Math.random() * 255) +
                ", " + Math.floor(Math.random() * 255) + ", " + 
                Math.floor(Math.random() * 255) + ')';
            }
            else {
                
                if (!block.style.backgroundColor) {
                    block.shade = 200;
                }
                else if (block.shade === 0){
                    return;
                }
                else {
                    block.shade -= 10;
                }
                block.style.backgroundColor = 'rgb(' + block.shade + ', ' + block.shade + 
                ', ' + block.shade + ')';

            }
            console.log(block.style.backgroundColor);
        })
        console.log(block.style.backgroundColor);
    }))
}

function clear() {
    //Clear the grid and create a new one
    let grid =  document.querySelector('.grid');
    grid.remove();
    createGrid(slider.value);
}

modeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        button.classList.add('clicked');
        if (mode !== button.id) clear();
        mode = button.id;

        modeButtons.forEach((button_other) => {
            //Toggle the other buttons off
            if (button_other !== button) {
                button_other.classList.remove('clicked');
            }
            
        })
    })
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
modeButtons[0].click() //Regular mode at start