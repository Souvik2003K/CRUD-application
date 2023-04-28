
// localStorage.clear();

let inp = document.getElementById('inp');
let btn = document.getElementById('btn');
let main = document.getElementById('main');
let alerts = document.getElementById('alerts');
let count = document.getElementById('count');

let img = document.getElementById('image');

let error = new Audio("error_sound.mp3");

let id = 'no';

display();
todoCount();

function create(){
    if(inp.value == ''){
        img.style.display = 'inline';
        error.play();
    }
    else{
        if(id == 'no'){
            let arr = JSON.parse(localStorage.getItem('crud'));
            if(arr == null){
                let val = [inp.value]
                localStorage.setItem('crud',JSON.stringify(val));
            }
            else{
                arr.push(inp.value);
                localStorage.setItem('crud',JSON.stringify(arr));
            }
        }
        else{
            let arr = JSON.parse(localStorage.getItem('crud'));
            arr[id] = inp.value;
            localStorage.setItem('crud',JSON.stringify(arr));
        }
    inp.value = '';
    display();
    todoCount();
    added();
    setTimeout(overA,1000);
    }
}

function display(){
    let arr = JSON.parse(localStorage.getItem('crud'));
    let html = '';
    if(arr != null){
        for(let i in arr){
            html = html + 
            `<li value="${i}" id="box${i}">
                ${arr[i]}
                &nbsp;&nbsp;
                <div>
                    <a href="javascript:void(0)" onclick="editData(${i})" id="edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </a>
                    &nbsp;&nbsp;
                    <a href="javascript:void(0)" onclick="done(${i})" id="done">
                        <i class="fa-solid fa-check"></i>
                    </a>
                    &nbsp;&nbsp;
                    <a href="javascript:void(0)" onclick="delData(${i})" id="del">
                        <i class="fa-solid fa-trash"></i>
                    </a>
                </div>
            </li>`;
        }
    }
    document.getElementById('main').innerHTML=html;
    
}

function editData(k){
    id = k;
    let arr = JSON.parse(localStorage.getItem('crud'));
	document.getElementById('inp').value = arr[k];
}

function delData(k){
    let arr = JSON.parse(localStorage.getItem('crud'));
    arr.splice(k,1);
    localStorage.setItem('crud',JSON.stringify(arr));
    display();
    //  mess for displaying msg and gayab for disappearing msg
    del();
    setTimeout(overD,1000);
    todoCount();
}

function done(k){
    let box ="box" + k;
    let txt = document.getElementById(box);
    txt.style.textDecoration = 'line-through';
}

function del(){
    document.getElementById('msg').style.display = "inline-block";
}

function overD(){
    document.getElementById('msg').style.display = "none";
}

function added(){
    document.getElementById('added').style.display = "inline-block";
}

function overA(){
    document.getElementById('added').style.display = "none";
}

inp.addEventListener('click',function(){
    inp.style.boxShadow = 'box-shadow: 0px 0px 5px black';
})

inp.addEventListener('keyup',function(e){    // if enter is pressed
    if(e.keyCode === 13){
        create();
    }
})

// total todo items

// count.innerHTML = k;

function todoCount(){
    let arr = JSON.parse(localStorage.getItem('crud'));
    count.innerHTML = arr.length;
}




img.addEventListener('mousedown', function vanish(){
    img.style.display = 'none';
})