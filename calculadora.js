'use strict';

const display = document.getElementById('display');

//selecionar qualquer elemento que tenha como parte do atributo 'bt-num-'.
const numeros = document.querySelectorAll('[id*=bt-num]');

//selecionar qualquer elemento que tenha como parte do atributo 'bt-op-'.
const operadores = document.querySelectorAll('[id*=bt-op-]');

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador !== undefined;

const calcular = () => {
    if(operacaoPendente()){
        const numeroAtual = parseFloat(display.textContent);
        novoNumero = true;
        switch(operador){
            case '+':
                atualizarDisplay(numeroAnterior + numeroAtual);
            break;
            case '-':
                atualizarDisplay(numeroAnterior - numeroAtual);
            break;
            case '*':
                atualizarDisplay(numeroAnterior * numeroAtual);
            break;
            case '/':
                atualizarDisplay(numeroAnterior / numeroAtual);
            break; 
            case 'x^':
                atualizarDisplay(numeroAnterior*numeroAnterior);
            break;
            case 'sqrt()':
                atualizarDisplay(Math.sqrt(numeroAnterior));
            break;
        }
    }
};

const atualizarDisplay = (texto) => {
    if(novoNumero){
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    } else {
        display.textContent += texto.toLocaleString('BR');
    }
};

//Manda para o atualizar display, o texto que está dentro de cada botão.
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);

//forEach é usado para varrer todos os elementos do array
numeros.forEach (numero => numero.addEventListener('click',inserirNumero)); //Criando o evento click, para cada um dos números.

const selcionarOperador = (evento) => {
    if(!novoNumero){
        calcular();
        novoNumero = true;

        //Guardar na memória o número e operador.
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent);
    }
    
};

operadores.forEach (operador => operador.addEventListener('click',selcionarOperador));

const ativarIgual = () => {
    calcular();
    operador = undefined;
};

document.getElementById('bt-op-equal').addEventListener('click', ativarIgual);

const limparDisplay = () => (display.textContent = '0');
document.getElementById('bt-op-ce').addEventListener('click', limparDisplay);

const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
};
document
    .getElementById('bt-op-ce')
    .addEventListener('click', limparCalculo);

const removerUltimoNumero = () =>
    (display.textContent = display.textContent.slice(0, -1));
document
    .getElementById('bt-op-c')
    .addEventListener('click', removerUltimoNumero);


const existeDecimal = () => display.textContent.indexOf('.') !== -1;
const existeValor = () => display.textContent.length > 0;
const inserirDecimal = () => {
    if (!existeDecimal()) {
        if (novoNumero) {
            atualizarDisplay('0.');
        } else {
            atualizarDisplay('.');
        }
    }
};
document.getElementById('bt-num-ponto').addEventListener('click', inserirDecimal);

console.log (numeros);
console.log (operadores);
