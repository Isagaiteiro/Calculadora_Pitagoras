'use strict';

const $form = document.querySelector('form');

const $ladoc = document.querySelector('#ladoc');

const $ladob = document.querySelector('#ladob');

const $hipotenusa = document.querySelector('#hipotenusa');

const display = document.getElementById('display');

//selecionar qualquer elemento que tenha como parte do atributo 'bt-num-'.
const numeros = document.querySelectorAll('[id*=bt-num]');

//selecionar qualquer elemento que tenha como parte do atributo 'bt-op-'.
const operadores = document.querySelectorAll('[id*=bt-op-]');

let novoNumero = true;
let operador;
let numeroAnterior;

function calcularHipotenusa (){
    const c=$ladoc.value
    const b=$ladob.value

    if (!b) {
        createAlert('Insira o valor do cateto oposto');
      } else if (!c) {
        createAlert('Insira o valor do cateto adjacente');
      } else if (c <= 0 || b <= 0) {
        createAlert('Entre com valores maiores que 0');
      } else {
        $hipotenusa.value = Math.hypot(c, b).toFixed(2);
      }
}

function createAlert(msg) {
    document
      .querySelector('body')
      .insertAdjacentHTML('beforebegin', `<div class='alert'>${msg}</div>`);
  
    setTimeout(function () {
      deleteAlert();
    }, 3000);
  }
  
function deleteAlert() {
    const list = document.querySelectorAll('.alert');
    for (const item of list) {
      item.remove();
    }
}
  
$form.addEventListener('submit', function (event) {
    event.preventDefault();
    calcularHipotenusa();
});



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



