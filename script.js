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
    document.body.appendChild(grid)
}

createGrid(16);

const blocks = document.querySelectorAll('.block');
console.log(blocks);
blocks.forEach((block => {
    block.addEventListener('mouseover', (e) => {
        block.style.backgroundColor = 'black'
    })
}))