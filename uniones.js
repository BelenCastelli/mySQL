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
        // join(connection);
        // join2(connection);
        // join3(connection);
        opcional1(connection);
        opcional2(connection);
    }

    catch(error) {
        console.log(error);
        await connection.end();
    }
}



async function join(connection){
    let join = `SELECT first_name, last_name, subjects.title FROM dia1.students
    INNER JOIN grupos ON (students.group_id = grupos.group_id)
    INNER JOIN subject_teacher ON (grupos.group_id = subject_teacher.group_id)
    INNER JOIN subjects ON (subject_teacher.subject_id = subjects.subject_id)`

    let join2 = `SELECT subjects.title, GROUP_CONCAT(CONCAT(first_name, ' ', last_name) SEPARATOR ', ') AS student_names 
    FROM dia1.students
    INNER JOIN grupos ON (students.group_id = grupos.group_id)
    INNER JOIN subject_teacher ON (grupos.group_id = subject_teacher.group_id)
    INNER JOIN subjects ON (subject_teacher.subject_id = subjects.subject_id)
    GROUP BY subjects.title`

    let [result] = await connection.query(join)
    let [result2] = await connection.query(join2)

    console.log(result);
    console.log(result2);
}

async function join2(connection){
    let join = `SELECT first_name, last_name, subjects.title FROM dia1.teachers
    JOIN subject_teacher ON (teachers.teachers_id = subject_teacher.teacher_id)
    JOIN subjects ON (subject_teacher.subject_id = subjects.subject_id)`

    let join2 = `SELECT subjects.title, GROUP_CONCAT(CONCAT(first_name,' ',last_name)SEPARATOR', ') AS teacher_name FROM dia1.teachers
    JOIN subject_teacher ON (teachers.teachers_id = subject_teacher.teacher_id)
    JOIN subjects ON (subject_teacher.subject_id = subjects.subject_id)
    GROUP BY subjects.title;`

    let [result] = await connection.query(join)
    let [result2] = await connection.query(join2)

    console.log(result);
    console.log(result2);
}

async function join3(connection){
    let join = `SELECT COUNT(*) AS studentCount, subjects.title, teachers.first_name, teachers.last_name 
    FROM dia1.students
    INNER JOIN grupos ON (students.group_id = grupos.group_id)
    INNER JOIN subject_teacher ON (grupos.group_id = subject_teacher.group_id)
    INNER JOIN subjects ON (subject_teacher.subject_id = subjects.subject_id)
    INNER JOIN teachers ON (subject_teacher.teacher_id = teachers.teachers_id)
    GROUP BY subjects.title, teachers.first_name, teachers.last_name `

    let [result] = await connection.query(join)
    console.log(result);
}

async function opcional1(connection){
    let join = `SELECT AVG(marks.mark) AS media_asignatura, teachers.first_name, teachers.last_name, subjects.title
    FROM dia1.teachers
    JOIN subject_teacher ON (teachers.teachers_id = subject_teacher.subject_id)
    JOIN subjects ON (subject_teacher.subject_id = subjects.subject_id)
    JOIN marks ON (subjects.subject_id = marks.subject_id)
    GROUP BY subjects.title, teachers.first_name, teachers.last_name
    ORDER BY AVG(marks.mark) DESC`

    let [result] = await connection.query(join)
    console.log(result);
}

async function opcional2(connection){
    let join = `SELECT students.first_name, students.last_name, COUNT(subjects.subject_id) AS num_subjects, 
    AVG(marks.mark) AS nota_media,  MAX(marks.mark) AS nota_alta, MIN(marks.mark) AS nota_baja
    FROM dia1.students
    JOIN marks ON (students.students_id = marks.student_id)
    JOIN subjects ON (marks.subject_id = subjects.subject_id)
    GROUP BY students.first_name, students.last_name`

    let [result] = await connection.query(join)
    console.log(result);
}
main()