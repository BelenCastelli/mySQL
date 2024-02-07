const mysql = require ('mysql2/promise')

async function main (){
    let connection;
    try{
        connection = await mysql.createConnection(
            {
                host:'localhost',
                user: 'root',
                password: '%M92WYMQ',
                database: 'museo'
            }
        )
        console.log('Conexión correcta');
        museo1(connection);
        museo2(connection);
    }

    catch(error) {
        console.log(error);
        await connection.end();
    }
}

main();

async function museo1(connection){
    let param = ['Préstamo']
    let sql = `SELECT piezas.nombre,  ubicacion.tipo_exposicion, ubicacion.lugar_exposicion, estado.fecha_devolucion,
    dueño.nombre, dueño.apellido, dueño.email
    FROM museo.piezas
    JOIN dueño ON (piezas.dueño_id = dueño.dueño_id)
    JOIN estado ON (piezas.pieza_id = estado.pieza_id)
    JOIN ubicacion ON (piezas.pieza_id = ubicacion.pieza_id)
    JOIN colecciones ON (piezas.coleccion_id = colecciones.coleccion_id)
    WHERE estado.estado = ? `

    let [result] = await connection.query(sql,param)
    console.log(result);
}

async function museo2(connection){

    let sql = `SELECT COUNT(*) AS piezas_museo, ubicacion.tipo_exposicion FROM museo.piezas
    JOIN ubicacion ON (piezas.pieza_id = ubicacion.pieza_id)
    group by ubicacion.tipo_exposicion
    ORDER BY piezas_museo DESC `

    let [result] = await connection.query(sql)
    console.log(result);
}