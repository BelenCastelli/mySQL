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
        // avg(connection);
        // count(connection);
        // all(connection);
        // deleteMark(connection);
        // addColumn(connection);
        // current(connection);
        // groupBy(connection);
        between(connection);
        avgGroup(connection);

    }

    catch(error) {
        console.log(error);
        await connection.end();
    }
}

async function avg(connection){
    let avg = "SELECT AVG(mark) AS media FROM marks"
    let [result] = await connection.query(avg)
    console.log(result);
}

async function count(connection){
    let count = "SELECT COUNT(students_id) AS numeroAlumnos FROM students"
    let [result] = await connection.query(count)
    console.log(result);
}

async function all(connection){
    let all = "SELECT * FROM dia1.groups;"
    let [result] = await connection.query(all)
    console.log(result);
}

async function deleteMark(connection){
    let deleteMark = "DELETE FROM marks WHERE mark > 5 AND date = '2023-01-18'"
    let[result] = await connection.query(deleteMark)
    console.log(result);
}

async function addColumn(connection){


    let column = "ALTER TABLE `students` ADD COLUMN yearAdmission year"
    let [result] = await connection.query(column);
    console.log(result);
}

async function current(connection){
    let students = "SELECT * from students WHERE yearAdmission = 2024"
    let [result] = await connection.query(students);
    console.log(result);
}

async function groupBy(connection){
    let group = "SELECT subject_id, COUNT(teacher_id) FROM dia1.`subject teacher` GROUP BY subject_id"
    let [result] = await connection.query(group)
    console.log(result);
}

async function between(connection){
    let between = "SELECT student_id, mark FROM marks WHERE student_id BETWEEN 1 AND 20 OR mark > 8 AND date = '2023-05-10'"
    let [result] = await connection.query(between)
    console.log(result);
}

async function avgGroup(connection){
    let subject = "SELECT subject_id, AVG(mark) FROM marks WHERE date = '2024-05-10' GROUP BY subject_id"
    let subject2 = "SELECT student_id, AVG(mark) FROM marks WHERE date = '2024-05-10' GROUP BY student_id"
    let [result] = await connection.query(subject)
    let [result2] = await connection.query(subject2)
    console.log(result);
    console.log(result2);
}
main()
