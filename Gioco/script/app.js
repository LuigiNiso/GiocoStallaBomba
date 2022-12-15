var errors = 0;

var imgCorrect = []

var bomba = document.querySelector('.bomb');

var ordini = [
    ["ZAZZA", "BLUR", "RAGNAR", "GIANKO", "MANUXO", "TITTI", "ZW"],
    ["ROCCIA", "LEGGE", "HASBULLA", "HAMBURGERONA", "FIUS", "SOFIA", "MOCCIA"],
    ["MARZA", "FAZZONE", "CICCIO", "SIUM", "ANNARITA", "MOLLU", "DELUX"],
    ["ZANO", "NEZAK", "MASSEO", "JK", "SOLOMOTORE", "FRENEZY", "HASBULLA"],
    ["BLUR", "SOFIA", "CICCIO", "MOLLU", "FRENEZY", "TITTI", "GIANKO"],
    ["ROCCIA", "FAZZONE", "ZAZZA", "MARZA", "ZANO", "LEGGE", "JK"]
]
var user_ordine = [];
var ordine = [];

const right = new Audio('./sounds/right.mp3');
const wrong = new Audio('./sounds/wrong.mp3');
const click = new Audio('./sounds/click.mp3');
const bomb_audio = new Audio('./sounds/bomb.mp3');
const explosion = new Audio('./sounds/explosion.mp3');
const musicLevel = new Audio('./sounds/musicLevel.mp3');
var symbols;

let id;

function generaSimboli() {
    let modulo_div = document.createElement('div');
    let simboli_div = document.createElement('div')
    let led_div = document.createElement('div');

    modulo_div.classList.add("modulo");
    simboli_div.classList.add("simboli");
    led_div.classList.add("led");

    for (let i = 0; i < 4; i++) {
        let button_main = document.createElement('div');
        let button_inside = document.createElement('div');

        button_main.classList.add("button-main");
        button_inside.classList.add("button-inside");

        button_main.appendChild(button_inside);
        simboli_div.appendChild(button_main);
    }

    simboli_div.appendChild(led_div);
    modulo_div.appendChild(simboli_div);
    bomba.append(modulo_div);

    var bottoni = document.querySelectorAll('.button-inside');

    id = Math.floor(Math.random() * 6);

    var random_numbers = [];

    for (var i = 0; i < 4; i++) {
        var rng = Math.floor(Math.random() * 7);
        while (random_numbers.indexOf(rng) != -1) {
            rng = Math.floor(Math.random() * 7);
        }
        random_numbers.push(rng);
    }

    random_numbers.sort(function (a, b) {
        return a - b;
    });



    for (let i = 0; i < 4; i++) {
        let simbolo = document.createElement('img');
        simbolo.src = "images/" + ordini[id][random_numbers[i]] + '.jpg';

        simbolo.setAttribute("onclick", "check_simboli('" + ordini[id][random_numbers[i]] + "', ");
        imgCorrect.push(simbolo);
        ordine.push(ordini[id][random_numbers[i]]);
        shuffle(imgCorrect);
    }
    for (let i = 0; i < 4; i++) {
        bottoni[i].appendChild(imgCorrect[i]);
        imgCorrect[i].setAttribute("onclick", imgCorrect[i].getAttribute("onclick") + i + ")");
    }
    symbols = document.querySelectorAll('.simboli img');
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function check_simboli(l, n) {
    var led = document.querySelector('.simboli .led');
    if (!user_ordine.includes(l)) {
        user_ordine.push(l);
        click.play();
    }
    symbols[n].style.filter = 'brightness(0.5)';

    if (user_ordine.length == 4) {
        if (equalArray(ordine, user_ordine)) {
            led.style.backgroundColor = "greenyellow";
            right.play();
        } else {
            user_ordine = [];
            setTimeout(() => {
                symbols.forEach(symbol => {
                    symbol.style.filter = 'brightness(1)';
                });
            }, 500);
            led.style.backgroundColor = "red";
            error();
        }
    }
}

function equalArray(a, b) {
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}

var clock;
let errors_div;
function generaTimer() {
    let modulo_div = document.createElement('div');
    errors_div = document.createElement('p');
    var timer = document.createElement('div');
    timer.classList.add('timer');
    errors_div.classList.add('errors')

    timer.innerHTML = "05:00";
    let downtext = document.createElement('p');
    downtext.innerHTML = "88:88";
    downtext.classList.add('downtext');
    modulo_div.appendChild(downtext);
    modulo_div.classList.add('modulo-timer');
    modulo_div.appendChild(errors_div);

    var min = 5;
    var sec = 0;

    clock = setInterval(() => {

        if (sec == 0) {
            sec = 60
            min--;
        }

        sec--;
        if (sec < 10) {
            timer.innerHTML = "0" + min + ":" + "0" + sec;
        } else {
            timer.innerHTML = "0" + min + ":" + sec;
        }
    }, 1000);

    modulo_div.appendChild(timer);
    bomba.append(modulo_div)
}

var lettere = [
    [],
    [],
    [],
    [],
    []
]
var parole = ["ARINA", "BARBA", "BISTE", "BOOBS", "CACCA", "CAZZO", "CIRCO", "CIOLA", "CIUCO", "CLOWN", "DAJE!", "DARIO", "FAZZO", "FRODE", "GGGGG", "GIAMO", "GOBLI", "LEGGE", "MARZA", "MAZZO", "MUORI", "MUTUO", "NAPLE", "NEGO!", "NERO?", "NOOBS", "RICCO", "SIUUM", "SOCIO", "SORCA", "TASSE", "TOTTI", "ZANO?", "ZAZZO", "ZOZZO"];

var c = [0, 0, 0, 0, 0];

var parola;


function generaPassword() {
    let led_div = document.createElement('div');
    led_div.classList.add("led");
    let modulo_div = document.createElement('div');
    modulo_div.classList.add('modulo-password');
    var alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ?!";
    var count = 0;
    modulo_div.appendChild(led_div);
    parola = parole[Math.floor(Math.random() * parole.length)];
    for (let i = 0; i < lettere.length; i++) {
        lettere[i].push(parola.charAt(count));
        lettere[i].push(alfabeto[Math.floor(Math.random() * alfabeto.length)]);
        lettere[i].push(alfabeto[Math.floor(Math.random() * alfabeto.length)]);
        lettere[i].push(alfabeto[Math.floor(Math.random() * alfabeto.length)]);
        lettere[i].push(alfabeto[Math.floor(Math.random() * alfabeto.length)]);
        shuffle(lettere[i]);
        count++;
    }

    let display = document.createElement('div');
    display.classList.add('display');

    for (let i = 0; i < 5; i++) {
        var cifra = document.createElement('div');
        cifra.classList.add('cifra');

        let p_cifra = document.createElement('p');

        p_cifra.innerHTML = lettere[i][c[i]];

        let button_back = document.createElement('div');
        let button_back_img = document.createElement('img');
        button_back_img.src = './images/arrow.png';
        button_back.appendChild(button_back_img)
        button_back.classList.add('button-back');
        button_back.setAttribute('onclick', 'changeDOWN(' + i + ')');
        let button_front = document.createElement('button-front')
        let button_front_img = document.createElement('img');
        button_front.classList.add('button-front');
        button_front_img.src = './images/arrow.png'
        button_front.appendChild(button_front_img)
        button_front.setAttribute('onclick', 'changeUP(' + i + ')');

        cifra.appendChild(button_back);
        cifra.appendChild(p_cifra);
        cifra.appendChild(button_front)
        display.appendChild(cifra);
    }
    button_submit = document.createElement('button');
    button_submit.classList.add('button-submit');
    button_submit.innerHTML = "INVIA";
    button_submit.setAttribute("onclick", "checkPassword()")
    modulo_div.appendChild(display);
    bomba.append(modulo_div);
    modulo_div.appendChild(button_submit);


}

function changeUP(n) {
    c[n]++;
    if (c[n] == 5) {
        c[n] = 0;
    }
    var p_cifra = document.querySelectorAll('.cifra p');

    p_cifra[n].innerHTML = lettere[n][c[n]];

    console.log(c[n]);
}

function changeDOWN(n) {
    c[n]--;
    if (c[n] == -1) {
        c[n] = 4;
    }
    var p_cifra = document.querySelectorAll('.cifra p');

    p_cifra[n].innerHTML = lettere[n][c[n]];

    console.log(c[n]);
}

function checkPassword() {
    var led = document.querySelector('.modulo-password .led');
    var word = "";

    for (let i = 0; i < 5; i++) {
        word += lettere[i][c[i]];
    }

    if (word == parola) {
        console.log("RIGHT!");
        led.style.backgroundColor = "greenyellow";
        right.play();
    } else {
        led.style.backgroundColor = "red";
        error();
    }
}

function explode() {
    console.log("BOOM!");
    clearInterval(clock);
    bomb_audio.pause();
    explosion.play();
    musicLevel.pause();
}

function error() {
    wrong.play();
    errors++;
    console.log(errors);
    switch (errors) {
        case 1:
            errors_div.innerHTML = "X";

            break;
        case 2: {
            errors_div.innerHTML = "XX";
            break;
        }
        case 3:
            explode();
            break;
        default:
            break;
    }
}

function start() {
    bomb_audio.play();
    musicLevel.play();
    generaTimer()
    generaSimboli()
    generaPassword()
}

start();