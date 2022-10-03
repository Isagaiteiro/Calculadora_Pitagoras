'use strict';

const display = document.getElementById('display');

//selecionar qualquer elemento que tenha como parte do atributo 'bt'.
const numeros = document.querySelectorAll('[id*=bt-num]');

const operadores = document.querySelectorAll('[id*=bt-op-]');

const limpar = document.querySelectorAll('bt-op-ac');

let novoNumero = true;
let operador;
let numeroAnterior;
let h;

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
            /*case 'sqrt()':
                h = Math.pow(numeroAnterior, 2) + Math.pow(numeroAtual, 2);
                atualizarDisplay(Math.sqrt(h));
            break;*/
        }
    }
}

const atualizarDisplay = (texto) => {
    if(novoNumero){
        display.textContent = texto;
        novoNumero = false;
    } else {
        display.textContent += texto;
    }
    
}
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
    
}

operadores.forEach (operador => operador.addEventListener('click',selcionarOperador));



console.log (numeros);
console.log (operadores);
