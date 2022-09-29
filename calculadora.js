'use strict';

const display = document.getElementById('display');

//selecionar qualquer elemento que tenha como parte do atributo 'bt'.
const numeros = document.querySelectorAll('[id*=bt-num]');

const operadores = document.querySelectorAll('[id*=bt-op]');

let novoNumero = true;

const atualizarDisplay = (texto) => {
    if(novoNumero){
        display.textContent = texto;
    } else {
        display.textContent += texto;
    }
    
}
//Manda para o atualizar display, o texto que está dentro de cada botão.
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);

//forEach é usado para varrer todos os elementos do array
numeros.forEach (numero => numero.addEventListener('click',inserirNumero)); //Criando o evento click, para cada um dos números.

operadores.forEach (operador => operador.addEventListener('click',selcionarOperador));

console.log (numeros);
