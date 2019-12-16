const { argv } = require('./config/yargs');
const tareas = require('./tareas/tareas');
const colors = require('colors')

//console.log(argv);

let comando = argv._[0]; // Obtiene el primer comando

switch (comando) {
    case 'crear':
        console.log('Crea la tarea');
        let tarea = tareas.crear(argv.descripcion);
        console.log(`Tarea creada: ${ tarea.descripcion } Completado: ${ tarea.completado }`);
        break;
    case 'listar':
        console.log('Listado de tareas');
        let listaTareas = tareas.getTareas();
        for (let tr of listaTareas) {
            console.log('============= Tarea =============='.green);
            console.log('Nombre: ', tr.descripcion.blue);
            console.log('Completado: ', tr.completado);
            console.log('=================================='.green);
        }
        break;
    case 'actualizar':
        console.log('Actualiza la tarea');
        let result = tareas.actualizar(argv.descripcion, argv.completado);
        if (result) {
            console.log('Tarea actualizada con exito');
        } else {
            console.log('La tarea no se pudo actualizar, no se realizaron cambios');
        }
        break;
    case 'borrar':
        console.log('Borra la tarea');
        let resultado = tareas.borrar(argv.descripcion);
        if (resultado) {
            console.log('Tarea borrada con exito');
        } else {
            console.log('La tarea no se pudo borrar, no se realizaron cambios');
        }
        break;
    default:
        console.log('No se reconoce el comando');
        break;
}