const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const startbtn = document.querySelector('.backdrop-start');
const resetbtn = document.querySelector('.backdrop-reset');

resetbtn.style.display = 'none';

//função que faz a contagem do time 
const tempo = () => {
    let second = 0;
    let millisecond = 0;

    let cron;

    document.form_main.start.onclick = () => start();
    document.form_main.reset.onclick = () => reset();

    function start() {
        cron = setInterval(() => {
            timer();
        }, 10);
    }

    function reset() {
        second = 0;
        millisecond = 0;
        document.getElementById('second').innerText = '00';
    }

    function timer() {
        if ((millisecond += 100) == 1400) {
            millisecond = 0;
            second++;
        }
        if (second == 100) {
            //emitir som
        }
        document.getElementById('second').innerText = returnData(second);
    }

    function returnData(input) {
        return input >= 10 ? input : `0${input}`
    }
}

//função que faz o mario pular
const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

//função que faz o mario bater no objeto e parar o jogo
const strike = () => {
    const loop = setInterval(() => {

        const pipePosition = pipe.offsetLeft;
        const marioPositon = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 120 && pipePosition > 0 && marioPositon < 88) {

            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            pipe.style.animation = 'none';
            pipe.style.bottom = `${marioPositon}px`;

            mario.src = './img/game-over.png';
            mario.style.width = '75px'
            mario.style.marginLeft = '50px'

            clearInterval(loop);

            resetbtn.style.display = 'block';
        }

    }, 10);
}

//inicia as funções quando clica no butao start
function iniciar() {
    tempo()
    strike()
    document.addEventListener('keydown', jump);
}