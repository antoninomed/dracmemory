const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const spanMusica = document.querySelector('.musica-atual');

const audioPlayer = document.getElementById('audioPlayer');

audioPlayer.src = 'musica-galinha.mp3';

let tentativas = 0;

const notificacaoPlay = document.getElementById('notificacaoPlay');
//const txtNotificacao = notificacaoPlay.querySelector('h3');
audioPlayer.loop = true;
audioPlayer.style.display = 'block';
audioPlayer.play();

const timer = document.querySelector('.timer')
const characters = [
    'dracarys(1)',
    'dracarys(2)',
    'dracarys(3)',
    'dracarys(4)',
    'dracarys(5)',
    'dracarys(6)',
    'dracarys(7)',
    'dracarys(8)',
    'dracarys(9)',
    'dracarys(10)',
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

    if(disabledCards.length == characters.length*2) {
        //==characters.length*2
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

    tentativas++;

    document.getElementById('tentativas').innerText = `${tentativas}`;

    //const txtTentativas = document.querySelector('.tentativas')


    textoNotificacao =  document.getElementById('texto-acerto');


    if (firstCharacter == secondCharacter) {
        document.getElementById('segundaCartaImg').style.display = 'none';

        textoNotificacao.style.color ="green";   
        textoNotificacao.innerText = "Você acertou, parabéns!";
        
        //pauseGif(firstCard.querySelector('primeiraCartaImg'));
        //pauseGif(secondCard.querySelector('segundaCartaImg'));
        //pausarGif(firstCharacter);
        //pausarGif(secondCharacter);

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');



        firstCard =  '';
        secondCard =  '';

        checkEndGame();

    } else {
        document.getElementById('segundaCartaImg').style.display = 'inline';

        textoNotificacao.style.color ="red"; 
        textoNotificacao.innerText = "Você errou, tente novamente!";
      
        setTimeout(() => {
        //txtNotificacao.innetText = 'Errado';
        firstCard.classList.remove('reveal-card');
        secondCard.classList.remove('reveal-card');

        firstCard =  '';
        secondCard =  '';

        }, 1000 ); 

       //delay de giro das cartas
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
    spanMusica.innerHTML = 'Chicken Dance';
    startTime();
    loadGame();
}



/*
function pausarGif(carta) {
    var img = carta.querySelector(firstCharacter);

    // Substituir o GIF pela imagem estática
    img.src = img.getAttribute('imagens/teste.jpg');

}

*/
