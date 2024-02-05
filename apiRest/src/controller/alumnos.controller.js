const {pool} = require('../database')

const getStudents = async (req, res) =>{
    try 
    {
        let students_id = req.params.students_id
        let sql; 
        if(students_id == null)
            sql = `SELECT * FROM students`
        else 
            sql = `SELECT * FROM students WHERE students_id=${students_id}`
        
        let [result] = await pool.query(sql)

        res.send(result)
    }  
    catch(err)
    {
        console.log(err);
    } 
} 

const postStudent = async (req, res) => {
    try {

        let sql = "INSERT INTO students (first_name, last_name, group_id, yearAdmission)" +
        "VALUES ('" + req.body.first_name + "', '" + 
                    req.body.last_name + "', '" +
                    req.body.group_id + "', '" +
                    req.body.yearAdmission + "')" 

        let [result] = await pool.query(sql);

        if (result.insertId) 
            res.send(String(result.insertId)); 
        else 
            res.send('-1')
        
    } catch (err) {
        console.log(err);
    }
};

const putStudent = async (req,res) => {
    try
    {
        let respuesta;
        let params = [req.body.first_name,
                      req.body.last_name,
                      req.body.group_id,
                      req.body.yearAdmission, 
                      req.body.students_id]
        let sql = "UPDATE students SET first_name = COALESCE(?, first_name), " +
                    "last_name = COALESCE(?, last_name), " +
                    "group_id = COALESCE(?, group_id)," +
                    "yearAdmission = COALESCE(?, yearAdmission) WHERE students_id = ?"

        let [result] = await pool.query(sql, params);
        
        if (result.affectedRows > 0) {
            respuesta = `Estudiante con students_id ${req.body.students_id} modificado correctamente`;
        } else {
            respuesta = `No se encontró un estudiante con students_id ${req.body.students_id}`;
        }
        res.send(respuesta)
    }

    catch(err)
    {
        console.log(err);
    }
}

const deleteStudent = async (req, res) => {
    try
    {
        let params = [req.body.students_id]
        let sql = `DELETE FROM students WHERE students_id = ?`
        let respuesta;
        let[result] = await pool.query(sql,params)
        if (result.affectedRows > 0) {
            respuesta = `Estudiante con students_id ${req.body.students_id} eliminado correctamente`;
        } else {
            respuesta = `No se encontró un estudiante con students_id ${req.body.students_id}`;
        }
        res.send(respuesta)
    }

    catch(err)
    {
        console.log(err);
    }
}

module.exports = {getStudents, postStudent, putStudent, deleteStudent}