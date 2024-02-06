const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');

const audioPlayer = document.getElementById('audioPlayer');

audioPlayer.src = 'olha-onda.mp3';


const notificacaoPlay = document.getElementById('notificacaoPlay');
//const txtNotificacao = notificacaoPlay.querySelector('h3');
audioPlayer.loop = true;
audioPlayer.style.display = 'block';



audioPlayer.play();



const timer = document.querySelector('.timer')
const characters = [
    'drac (1)', 
    'drac (2)', 
    'drac (3)', 
    'drac (4)', 
    'drac (5)', 
    'drac (6)', 
    'drac (7)', 
    'drac (8)', 
    'drac (9)', 
    'drac (10)', 
];

const createElement = (tag,className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard =  '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if(disabledCards.length == 20) {
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML} segundos`);
    }
}



const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    document.getElementById('primeiraCartaImg').src = 'imagens/'+firstCharacter+'.gif';
    document.getElementById('segundaCartaImg').src = 'imagens/'+secondCharacter+'.gif';
    notificacaoPlay.style.display = 'block';

    textoNotificacao =  document.getElementById('texto-acerto');

    if (firstCharacter == secondCharacter) {
        textoNotificacao.style.color ="green";   
        textoNotificacao.innerText = "Você acertou, parabéns!" 

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard =  '';
        secondCard =  '';

        checkEndGame();


    } else {
        textoNotificacao.style.color ="red"; 
        textoNotificacao.innerText = "Você errou, parabéns!" 
      
        setTimeout(() => {
        //txtNotificacao.innetText = 'Errado';
        firstCard.classList.remove('reveal-card');
        secondCard.classList.remove('reveal-card');

        firstCard =  '';
        secondCard =  '';

        }, 1000 ); 

       //delay de giro das carats
    }
}

const revealCard = ({ target }) => {

    if(target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if(firstCard == '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    } else if(secondCard == '') {
        target.parentNode.classList.add('reveal-card')
        secondCard = target.parentNode;


        checkCards();
    }

}

const createrCard = (character) => {
 
    const card = createElement('div','card');
    const front = createElement('div','face Frente');
    const back = createElement('div','face Costa');

    //front.style.backgroundImage = `url('imagens/${character}.jpg.jpeg')`;
    front.innerHTML = `<img class="gif-card" src="imagens/${character}.gif" alt="${character}" />`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character)

    return card;    
}

const loadGame = () => {

    const duplicateCharacter = [ ...characters, ...characters ];

    const shuffledArrray = duplicateCharacter.sort(() => Math.random() -0.5);

    shuffledArrray.forEach((character) => {

        const card = createrCard(character);
        grid.appendChild(card);

    });
}

const startTime = () => {

    this.loop = setInterval (() => {
        const curreTime = +timer.innerHTML;
        timer.innerHTML = curreTime + 1;
    }, 1000);

}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTime();
    loadGame();
}


