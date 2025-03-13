const db = require('../config/db'); // Configuración de mysql2/promise


// Obtener todas las contenidos
const getContenidos = async (req, res) => {
    try {
        // Realizamos la consulta con promesas
        const [results] = await db.execute('SELECT * FROM contenidos ORDER BY id desc');
        res.status(200).json(results);
    } catch (err) {
        console.error("Error al obtener los contenidos:", err);
        return res.status(500).json({ message: 'Error al obtener las categorías.' });
    }
};
const addContenido = async(req, res) => {
    const id = req.params.id;
    const { titulo, descripcion, clase, fecha } = req.body;
    const file = req.file;
    let filePath = null;
    if (file) {
        filePath = file.path.replace(/\\/g, '/');
    }

    if (!titulo || !descripcion || !clase || !fecha) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const query = 'INSERT INTO contenidos (titulo, descripcion,fecha, clase) VALUES (?, ?, ?, ?)';
  
    try {

        // Ejecuta la consulta usando el pool de promesas
        const [result] = await db.execute(query, [titulo, descripcion,fecha,clase]);
        console.log('Resultado de la inserción:', result);

        const ContenidoId = result.insertId; // Obtiene el ID del contenido creado
        if (!ContenidoId) {
            return res.status(500).json({ message: 'No se pudo crear el contenido.' });
        }
   

        res.status(201).json({ message: 'contenido creado con éxito.', ContenidoId });
    } catch (error) {
        console.error('Error al crear el contenido:', error);
        res.status(500).json({ message: 'Error al crear el contenido', error: error.message });
    }




/*    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error al actualizar contenido:', err);
            return res.status(500).json({ message: 'Error al actualizar contenido', error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Contenido no encontrado' });
        }
        res.json({ message: 'Contenido actualizado correctamente' });
    });*/
};
// 📌 Editar un contenido
const editContenido = (req, res) => {
   /* const { id } = req.params;
    const { titulo, descripcion, clase, fecha } = req.body;
    const archivo = req.file ? req.file.filename : null;
    
    console.log(id);
    if (!titulo || !descripcion || !clase || !fecha) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    db.query('SELECT * FROM contenidos WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error al buscar contenido' });
        if (results.length === 0) return res.status(404).json({ message: 'Contenido no encontrado' });

        // Eliminar archivo anterior si hay un nuevo archivo
        if (archivo && results[0].archivo) {
            const oldFilePath = path.join(__dirname, '../uploads', results[0].archivo);
            fs.unlink(oldFilePath, (err) => {
                if (err && err.code !== 'ENOENT') console.error('Error al eliminar archivo anterior:', err);
            });
        }

        const query = 'UPDATE contenidos SET titulo = ?, descripcion = ?, clase = ?, fecha = ?, archivo = ? WHERE id = ?';
        db.query(query, [titulo, descripcion, clase, fecha, archivo || results[0].archivo, id], (err) => {
            if (err) return res.status(500).json({ message: 'Error al actualizar contenido' });
            res.status(200).json({ message: 'Contenido actualizado' });
        });
    });*/
};
// 📌 Eliminar un contenido
const deleteContenido = (req, res) => {
    const { id } = req.params.id;

    db.query('SELECT archivo FROM contenidos WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error en el servidor' });
        if (results.length === 0) return res.status(404).json({ message: 'Contenido no encontrado' });

        const archivo = results[0].archivo;
        console.log(`ID por eliminar: ${id}`); 

        db.query('DELETE FROM contenidos WHERE id = ?', [id], (err) => {
            if (err) return res.status(500).json({ message: 'Error en el servidor' });

            // Eliminar archivo si existe
            if (archivo) {
                const filePath = path.join(__dirname, '../uploads', archivo);
                fs.unlink(filePath, (err) => {
                    if (err && err.code !== 'ENOENT') console.error('Error al eliminar archivo:', err);
                });
            }

            res.json({ message: 'Contenido eliminado correctamente' });
        });
    })
};
const getContenidoById = async (req, res) => {
    const id = req.params.id;
    console.log(`ID recibido: ${id}`);  // Agrega esta línea para ver el ID recibido

    try {
        const [rows] = await db.execute('SELECT * FROM contenidos WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'contenidos no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener el contenidos:', error);
        res.status(500).json({ message: 'Error al obtener el contenidos', error: error.message });
    }



   /* if (!id || isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' });
    }

    db.query('SELECT * FROM contenidos WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener el contenido:', err);
            return res.status(500).json({ message: 'Error al obtener el contenido', error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Contenido no encontrado' });
        }

        res.json(results[0]); // Devuelve el contenido encontrado
    });*/
};

module.exports = { getContenidos ,addContenido,editContenido,deleteContenido,getContenidoById};
