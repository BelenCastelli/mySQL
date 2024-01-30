const mysql = require ('mysql2/promise')

async function main (){
    let connection;
    try{
        connection = await mysql.createConnection(
            {
                host:'localhost',
                user: 'root',
                password: '%M92WYMQ',
                database: 'dia1'
            }
        )
        console.log('Conexión correcta');

        // createTable(connection)
        // insert(connection)
        // alterTable(connection);
        deleteTable(connection);



    }

    catch(error) {
        console.log(error);
        await connection.end();
    }
}

async function createTable(connection){
            
        let sql = "CREATE TABLE `direccion` (id INT AUTO_INCREMENT PRIMARY KEY, " +
                                            "stret VARCHAR(150), " +
                                            "number INT, " +
                                            "city VARCHAR(60))";

        let [result] = await connection.query(sql);
        console.log("Tabla creada");
        console.log(result);
}

async function insert(connection){
    // let sql = "INSERT INTO `subjects` (title) " +
    //             "VALUES('Psicología Forense y Criminología'), ('Motivación y Emoción'), ('Psicología del Lenguaje'), ('Terapias Psicológicas'),('Psicología de la Salud'), ('Adquisición del Conocimiento'), ('Psicología de los Grupos'),('Psicología de la Educación'), ('Etología'), ('Trastornos del neurodesarrollo') "
                                 
    // let [result] = await connection.query(sql);
    // let groups = "INSERT INTO `groups` (name) " +
    //                 "VALUES('4B'), ('4C'), ('5A'), ('5B'), ('5C'), ('6A'), ('6B'), ('6C'), ('7A'), ('7B'), ('7C')"

    // let [result] = await connection.query(groups);
    // result.insertId = 11

    // let groups = "INSERT INTO `students` (first_name, last_name, group_id) " +
    // "VALUES('Juan', 'Ballesta', 5), ('Cristina', 'Cuevas', 6), ('Angela', 'Rivas', 6)"

    let [result] = await connection.query(groups);
    result.insertId = 8

    console.log("dato insertado");
    console.log(result);

}

async function alterTable(connection){

    // *NOTE - Añadir columna

    // let sql = "ALTER TABLE `direccion` ADD COLUMN cp INT"
    // let [result] = await connection.query(sql);
    // console.log("columna insertada");
    // console.log(result);

    // *NOTE - Borrar columna
    
    let sql = "ALTER TABLE `direccion` DROP COLUMN cp"
    let [result] = await connection.query(sql);
    console.log("columna borrada");
    console.log(result);
}

async function deleteTable(connection){
    let sql = "DROP TABLE direccion";
    let [result] = await connection.query(sql)
    console.log('Tabla borrada');
    console.log(result);
}



main()
