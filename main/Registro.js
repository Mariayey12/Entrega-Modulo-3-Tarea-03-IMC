import { usuariosimc } from "../data/im.js";

let formulario = document.querySelector('form')
let listar = document.getElementById('listarAqui');
let buscar = document.getElementById('btnBuscar');
let busqueda = document.getElementById('busqueda');


const capturaDatos = () => {
    let nombre = document.getElementById('nombre').value;
    let genero = document.getElementById('sexo').value;
    let años = document.getElementById('edad').value;
    let kg = document.getElementById('peso').value;
    let talla = document.getElementById("estaura").value;
    let masaC = document.getElementById('masa corporal').value;
    let categ = document.getElementById('categoria').value;
    validarDatos(nombre, genero, años, kg, talla, masaC, categ);

    let registro = {
        "nombre": nombre,
        "Sexo": genero,
        "Edad": años,
        "Peso": kg,
        "Estatura": talla,
        "MasaCorporal": masaC,
        "Categoria": categ
    }
    usuariosimc.unshift(registro);
    localStorage.setItem('Agregar', JSON.stringify(usuariosimc));
    getLocalStorage();
}

formulario.addEventListener('submit', e => {
    e.preventDefault();
    capturaDatos()

})

function validarDatos(nombre, genero, años, kg, talla, masaC, categ) {
    //validar  nombre
    if (nombre == 0 || nombre == "" || /^\s+$/.test.nombre) {
        alert('Debes escribir tu  nombre');
        return false;
    }
    //validar  genero
    if (genero == 0 || genero == "" || /^\s+$/.test.genero) {
        alert('Debes escribir el Gender');
        return false;
    }
    //validar  Edad
    if (años == 0 || años == "" || /^\s+$/.test.años) {
        alert('Debes escribir la Age');
        return false;
    } else if (isNaN(años)) {
        alert('La edad no es un numero');
        return false;
    }
    //validar   Peso
    if (kg == 0 || kg == "" || /^\s+$/.test.kg) {
        alert('Debes escribir el Wt');
        return false;
    } else if (isNaN(kg)) {
        alert('El peso no es un numero');
        return false;
    }
    //validar  Estatura
    if (talla == 0 || talla == "" || /^\s+$/.test.talla) {
        alert('Debes escribir la Estatura');
        return false;
    } else if (isNaN(talla)) {
        alert('La estatura  no es un numero');
        return false;
    }
    //validar  Masa Corporal
    if (masaC == 0 || masaC == "" || /^\s+$/.test.masaC) {
        alert('Debes escribir el IMC');
        return false;
    } else if (isNaN(masaC)) {
        alert('La masa Corporal no es numero');
        return false;
    }
    //validar  Categoria
    if (categ == 0 || categ == "" || /^\s+$/.test.categ) {
        alert('Debes escribir la Categoria');
        return false;
    } else {
        alert('gracias por completar tu formulario')
    }
}


const getLocalStorage = () => {
    listar.innerHTML = '';
    let agregar = JSON.parse(localStorage.getItem('Agregar'));
    agregar.map(agregarUsu => {
        const { nombre, Sexo, Edad, Peso, Estatura, MasaCorporal, Categoria } = agregarUsu;
        listar.innerHTML += `
                       <td>${nombre}</td>
                      <td>${Sexo}</td>
                        <td>${Edad}</td>
                        <td>${Peso}</td>
                        <td>${Estatura}</td>
                        <td>${MasaCorporal}</td>
                        <td>${Categoria}</td>                  
    `
    })
}

document.addEventListener('DOMContentLoaded', getLocalStorage);
/**Buscador */
buscar.addEventListener('click', e => {
    e.preventDefault();
    let input = document.getElementById('inputBuscar').value;
    let data = JSON.parse(localStorage.getItem('Agregar'));
    let filtro = data.filter(usuario => usuario.nombre.toLowerCase() === input.toLowerCase())
    busqueda.innerHTML = '';
    filtro.length === 0 ?
        busqueda.innerHTML += `<div style="color:white;">El nombre ${input} no existe</div>` :
        (filtro.map(usuario => {
            const { nombre, sexo, años, kg, talla, masaC, categ } = usuario;
            busqueda.innerHTML += `
                                    <div style="color:white;">${'Usuario:',nombre}</div>
                                      <div style="color:white;">${'Sexo:',genero}</div>
                                    <div style="color:white;">${'Edad:',años}</div>
                                    <div style="color:white;">${'Peso:',kg}</div>
                                    <div style="color:white;">${'Estaura:',talla}</div>
                                    <div style="color:white;">${'Masa Corporal:',masaC}</div>
                                    <div style="color:white;">${'Estaura:',categ}</div>
                                                  
                `
        }))
})