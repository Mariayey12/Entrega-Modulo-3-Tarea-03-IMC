import { usuariosimc } from "../data/im.js";
//Declaracion de Variables para capturar datos
let btn = document.getElementById("btn-calcular");
let clasif = document.getElementById("categoria");
let rang = document.getElementById("rango");
let lect = document.getElementById("lectura");
let i = 0;
let bPeso = 0;
let saludable = 0;
let CSobrepeso = 0;
let obeso = 0;
let obesidadE = 0;

//capturar eventos 
document.addEventListener('DOMContentLoaded', () => {})
btn.addEventListener("click", capturarDatos);

function capturarDatos() {
    let genero = document.getElementById("Masculino").checked;
    let años = document.getElementById("edad").value;
    let peso = document.getElementById("peso").value;
    let estatura = document.getElementById("altura").value;
    calcularIMC(genero, años, peso, estatura);
    validarDatos(genero, años, peso, estatura)
}

function validarDatos(genero, años, peso, estatura) {
    if (años == 0 || años == "" || /^\s+$/.test.años) {
        alert('Debes escribir su edad');
        return false;
    } else if (isNaN(años)) {
        alert('La edad no es un numero');
        return false;
    }
    if (estatura == 0 || estatura == "" || /^\s+$/.test.estatura) {
        alert('Debes escribir su estatura');
        return false;
    } else if (isNaN(estatura)) {
        alert('La estatura  no es un numero');
        return false;
    }
    if (peso == 0 || peso == "" || /^\s+$/.test.peso) {
        alert('Debes escribir su peso');
        return false;
    } else if (isNaN(peso)) {
        alert('El peso no es un numero');
        return false;
    } else {
        alert('gracias por completar tu formulario')
    }

}

function calcularIMC(genero, años, peso, estatura) {
    let imc = ((peso / Math.pow(estatura / 100, 2)).toFixed(1));
    let estado = 0;
    if (imc < 18.5) {
        lect.innerHTML = `<h3  style="color:rgba(70, 119,252,100);"> Su masa Corporal es:${imc}</h3> `;
        clasif.innerHTML = `<h4  style="color:rgba(70,119,252,100);">Por debajo del peso</h4>`;
        rang.setAttribute("value", imc);
        estado = 1;

    } else if (imc >= 18.5 && imc <= 24.9) {
        lect.innerHTML = `<h3 style="color:rgba(0, 240,244,100);">Su masa Corporal es: ${imc}</h3> `;
        clasif.innerHTML = `<h4 style="color:rgba(0, 240,244,100);"> Saludable </h4>`;
        rang.setAttribute("value", imc);
        estado = 2;

    } else if (imc >= 25 && imc <= 29.9) {
        lect.innerHTML = `<h3 style="color:rgba(189,255,0,100);"> Su masa Corporal es: ${imc}</h3> `;
        clasif.innerHTML = `<h4 style="color:rgba(189, 255,0,100);"> Con sobrepeso </h4>`;
        rang.setAttribute("value", imc);
        estado = 3;

    } else if (imc >= 30 && imc <= 39.9) {
        lect.innerHTML = `<h3 style="color:rgba(255, 111,0,100);"> Su masa Corporal es: ${imc}</h3> `;
        clasif.innerHTML = `<h4 style="color:rgba(255, 111,0,100);">Obeso</h4>`;

        rang.setAttribute("value", imc);
        estado = 4;

    } else if (imc < 40) {
        lect.innerHTML = `<h3 style="color:rgb(142, 255, 127);">Su masa Corporal es:${imc}</h3> `;
        clasif.innerHTML = `<h4 style="color:rgb(142, 255, 127);"> Obesidad extrema o de alto riesgo</h4>`;
        rang.setAttribute("value", imc);
        estado = 5;
        agregarUsuario(genero, años, peso, estatura, imc, clasif, estado);

        mostrar();
    }

    function agregarUsuario(genero, edad, peso, estatura, imc, clasif, estado) {
        usuariosimc.push({
            "Sexo": genero,
            "Edad": edad,
            "Peso": peso,
            "Estatura": estatura,
            "MasaCorporal": imc,
            "Categoria": clasif,
            "Estado": estado,

        });
        guardarDatos();
    }
    //Almacenamos y enviamos los datos al localstorage (setItem)

    function guardarDatos() {
        localStorage.setItem("Agregar", JSON.stringify(usuariosimc));
    }

    function mostrar() {

        for (let x = i; x < usuariosimc.length; x++) {
            if (usuariosimc[x].Estado == 1) {
                bPeso++;
            } else if (usuariosimc[x].Estado == 2) {
                saludable++;
            } else if (usuariosimc[x].Estado == 3) {
                CSobrepeso++;
            } else if (usuariosimc[x].Estado == 4) {
                obeso++;
            } else {
                obesidadE++;

            }
            i++;

        }

    }
}