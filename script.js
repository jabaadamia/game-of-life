const board = document.getElementById('bigdiv')
const gens = document.getElementById('gens')
var objlist = []
var isToggling = false
var isereasing = false
var cellstokill = []
var cellstoborn = []

class Node {
    id = undefined
    isdead = true

    display(id){
        const div = document.createElement('div')
        div.id = id
        div.style = 'width: 18px; height: 18px; border: solid 1px gray;'
        board.append(div)
    }
}
for (i = 1; i <= 900; i++){
    let cell = new Node(i)
    cell.display(i - 1)
    cell.id = i - 1
    objlist.push(cell)
}

function enabletoggle (e){
    isToggling = true
}
function disableToggle() {
    isToggling = false;
}
function toggle(element) {
    if (isereasing){
        element.style.backgroundColor = 'white'
        objlist[element.id].isdead = true
    }else{
        element.style.backgroundColor = 'black'
        //livecells.push(element)
        objlist[element.id].isdead = false
    }
}
function clickfunc(e){
    isToggling = true
    if (e.target != board){
        toggle(e.target)
    }
    isToggling = false
}
function hover(e){
    if (e.target == board){ console.log(e.target)}
    
    board.onmousedown = enabletoggle
    
    board.onmouseup = disableToggle
    if (isToggling){
        toggle(e.target)
    }
    else{
        return
    }
}
function erease(){
    isereasing = true
}
function stopereasing(){
    isereasing = false
}
function clearboard(){
    objlist.forEach(cell => {
        kill(cell)
    });
    gens.value = 0
    cellstoborn = []
    cellstokill = []
}

var i = 1
function startgame(){
    cellstokill.forEach(cell => {
        kill(cell)
    });
    cellstoborn.forEach(cell => {
        born(cell)
    });
    cellstokill = []
    cellstoborn = []
    //if (isclear){gens.value = 0}
    setTimeout(() => {
        objlist.forEach(cell => {
            liveneigbours(cell)
        });
    
        i ++
        if (i - 2 < gens.value){
            startgame()
        }
    }, 100);
    
}
   


function liveneigbours(cell){
    var ln = 0
    const cellx = cell.id % 30 + 1
    const celly = Math.round((cell.id - cellx) / 30 + 1)
    const cellid = parseInt(cell.id)
    var neighbours = [cellid - 29, cellid - 30, cellid - 31, cellid - 1, cellid + 29, cellid + 30, cellid + 31, cellid + 1]

    // corners
    let no_corner = true
    if (cellx == 1 && celly == 1){
        neighbours = [cellid + 1, cellid + 30, cellid + 31]
        no_corner = false
    }
    if (cellx == 30 && celly == 1){
        neighbours = [cellid - 1, cellid + 29, cellid + 30]
        no_corner = false
    }
    if (cellx == 30 && celly == 30){
        neighbours = [cellid - 1, cellid - 29, cellid - 30]
        no_corner = false
    }
    if (cellx == 1 && celly == 30){
        neighbours = [cellid + 1, cellid - 30, cellid - 29]
        no_corner = false
    }
    //
    if(cellx == 1 && no_corner){
        neighbours = [cellid - 30, cellid - 29, cellid + 1, cellid + 30, cellid + 31]
    }
    if(cellx == 30 && no_corner){
        neighbours = [cellid - 31, cellid - 30, cellid -1, cellid + 29, cellid + 30]
    }
    if(celly == 1 && no_corner){
        neighbours = [cellid - 1, cellid + 1, cellid + 29, cellid + 30, cellid + 31]
    }
    if(celly == 30 && no_corner){
        neighbours = [cellid - 31, cellid - 30, cellid - 29, cellid - 1, cellid + 1]
    }


    neighbours.forEach(neighbour => {
        if (!objlist[neighbour].isdead){
            ln = ln + 1 
        }
    });
    
    if (!cell.isdead && ln < 2){cellstokill.push(cell)}
    if (!cell.isdead && ln > 3){cellstokill.push(cell)}
    if (cell.isdead && ln == 3){cellstoborn.push(cell)}
}


function kill(cell){
    cell.isdead = true
    document.getElementById(cell.id).style.backgroundColor = 'white'
}
function born(cell){
    cell.isdead = false
    document.getElementById(cell.id).style.backgroundColor = 'black'
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}
