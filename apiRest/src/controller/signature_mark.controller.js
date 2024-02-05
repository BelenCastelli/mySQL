const {pool} = require('../database')

const notaMedia = async (req, res) =>{
    try
    {
        let params = [req.params.student_id]
        let sql = `SELECT AVG(mark) AS nota_Media FROM dia1.students
        JOIN marks ON (students.student_id = marks.student_id)
        WHERE students.student_id = ?`

        console.log(sql);

        let [result] = await pool.query(sql, params)
        res.send(result)
    }

    catch(err)
    {
        console.log(err);
    }
}

const asignaturas = async (req, res) => {
    try
    {
        let params = [req.params.student_id]
        let sql = `SELECT subjects.title FROM dia1.students
        JOIN marks ON (students.student_id = marks.student_id)
        JOIN subjects ON (marks.subject_id = subjects.subject_id)
        WHERE students.student_id = ?`

        console.log(sql);

        let [result] = await pool.query(sql, params)
        res.send(result)
    }

    catch(err)
    {
        console.log(err);
    }
}

const listaAsignaturas = async (req, res) => {
    try
    {
        let sql = `SELECT students.first_name, students.first_name, subjects.title FROM dia1.students
        JOIN marks ON (students.student_id = marks.student_id)
        JOIN subjects ON (marks.subject_id = subjects.subject_id)`

        console.log(sql);

        let [result] = await pool.query(sql)
        res.send(result)
    }

    catch(err)
    {
        console.log(err);
    }
}

const listaAsignaturas2 = async (req, res) => {
    try
    {
        // let sql = `SELECT subjects.title, GROUP_CONCAT(CONCAT(first_name, ' ', last_name) SEPARATOR ', ') AS student_names 
        // FROM dia1.students
        // INNER JOIN grupos ON (students.group_id = grupos.group_id)
        // INNER JOIN subject_teacher ON (grupos.group_id = subject_teacher.group_id)
        // INNER JOIN subjects ON (subject_teacher.subject_id = subjects.subject_id)
        // GROUP BY subjects.title`

        let sql= `SELECT CONCAT(first_name, ' ', last_name) AS student_name, GROUP_CONCAT(subjects.title SEPARATOR ', ') AS subject_titles
        FROM dia1.students
        INNER JOIN grupos ON (students.group_id = grupos.group_id)
        INNER JOIN subject_teacher ON (grupos.group_id = subject_teacher.group_id)
        INNER JOIN subjects ON (subject_teacher.subject_id = subjects.subject_id)
        GROUP BY student_name`

        console.log(sql);

        let [result] = await pool.query(sql)
        res.send(result)
    }

    catch(err)
    {
        console.log(err);
    }
}

const impartidas = async (req, res) => {
    try
    {
        let params = [req.params.teachers_id]
        let sql = `SELECT subjects.title FROM dia1.teachers
        JOIN subject_teacher ON (teachers.teacher_id = subject_teacher.teacher_id)
        JOIN subjects ON (subject_teacher.subject_id = subjects.subject_id)
        WHERE teachers.teacher_id = ?`

        console.log(sql);

        let [result] = await pool.query(sql,params)
        res.send(result)
    }

    catch(err)
    {
        console.log(err);
    }
}

const listaImpartidas= async (req, res) => {
    try
    {
        let sql = `SELECT CONCAT(first_name, ' ', last_name) AS teacher_name, GROUP_CONCAT(subjects.title SEPARATOR ', ') AS subject_titles
        FROM dia1.teachers
        JOIN subject_teacher ON (teachers.teacher_id = subject_teacher.teacher_id)
        JOIN subjects ON (subject_teacher.subject_id = subjects.subject_id)
        GROUP BY teacher_name;`

        console.log(sql);

        let [result] = await pool.query(sql)
        res.send(result)
    }

    catch(err)
    {
        console.log(err);
   
    }
}
module.exports = {notaMedia, asignaturas, listaAsignaturas, listaAsignaturas2, impartidas, listaImpartidas}