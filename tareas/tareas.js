const fs = require('fs'); // Import para archivos

let listaTareas = []; // Arreglo vacio

const guardarDB = () => {
    let data = JSON.stringify(listaTareas);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar la tarea', err);
    });
}

const cargarDB = () => {
    try {
        listaTareas = require('../db/data.json'); // Carga el archivo json y lo serializa a objeto js
    } catch (err) {
        listaTareas = [];
    }
}

const crear = (descripcion) => {

    cargarDB();

    let tarea = {
        descripcion,
        completado: false
    };

    listaTareas.push(tarea);

    guardarDB();

    return tarea;
}

const getTareas = () => {
    cargarDB();
    return listaTareas;
}

const actualizar = (descripcion, completado) => {
    cargarDB();
    let index = listaTareas.findIndex(tarea => tarea.descripcion === descripcion); // Busca dentro del arreglo // Si no encuentra regresa -1

    if (index != -1) {
        listaTareas[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let index = listaTareas.findIndex(tarea => tarea.descripcion === descripcion); // Busca dentro del arreglo // Si no encuentra regresa -1

    if (index != -1) {
        listaTareas.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    }

    // Otra manera
    // let nuevoListado = listaTareas.filter(tarea => tarea.descripcion !== descripcion);

    // if(listaTareas.length === nuevoListado.length){
    //     return false;
    // }else{
    //     listaTareas = nuevoListado;
    //     guardarDB();
    //     return true;
    // }
}

module.exports = {
    crear,
    getTareas,
    actualizar,
    borrar
}