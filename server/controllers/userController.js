const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Configuración de mysql2/promise

// Registro de usuario
const registerUser = async (req, res) => {
    const { username, password, email, id_area ,full_name} = req.body;

    if (!username || !password || !email || !id_area || !full_name) {
        console.log("Faltan campos en la solicitud");
        return res.status(400).json({ message: 'Por favor, completa todos los campos.' });
    }

    try {
        // Verificar si el usuario ya existe
        const [existingUser] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);

        if (existingUser.length > 0) {
            console.log("El usuario ya existe");
            return res.status(400).json({ message: 'El usuario ya existe.' });
        }

        // Hashear la contraseña
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Insertar el usuario en la base de datos
        const [result] = await db.execute(
            'INSERT INTO users (username, password, email, id_area,full_name) VALUES (?, ?, ?, ? ,?)',
            [username, hashedPassword, email, id_area,full_name]
        );

        console.log("Usuario registrado con éxito:", result);

        // Crear token JWT
        const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({
            message: 'Usuario registrado con éxito.',
            token,
            userId: result.insertId,
        });
    } catch (err) {
        console.error("Error al registrar el usuario:", err);
        res.status(500).json({ message: 'Error al registrar el usuario.' });
    }
};
// Inicio de sesión de usuario
const os = require('os');
const dns = require('dns');

const loginUser = async (req, res) => {
    const { username, password, hostname } = req.body; // Asegúrate de recibir el hostname del frontend

    if (!username || !password) {
        return res.status(400).json({ message: 'Por favor, completa todos los campos.' });
    }

    try {
        // Buscar al usuario en la base de datos
        const [results] = await db.execute(
            'SELECT users.id, users.username, users.email, users.role, users.full_name, users.password, areas.name AS area_name FROM users JOIN areas ON users.id_area = areas.id WHERE users.username = ?',
            [username]
        );

        if (results.length === 0) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const user = results[0];
        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Capturar la IP y el dispositivo
        const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const deviceInfo = req.headers['user-agent'];

        // Intentar obtener el hostname desde la IP si no se recibió desde el frontend
        let computerName = hostname || 'Desconocido';
        if (!hostname) {
            dns.reverse(ipAddress, (err, hostnames) => {
                if (!err && hostnames.length > 0) {
                    computerName = hostnames[0];
                }
            });
        }

        // Guardar los datos en la base de datos
        await db.execute(
            'INSERT INTO login_logs (user_id,user_name, ip_address, device_info, computer_name, login_time) VALUES (?, ? , ?, ?, ?, DATE_SUB(NOW(), INTERVAL 3 HOUR))',
            [user.id,user.username,ipAddress, deviceInfo, computerName]
        );

        // Crear el token JWT
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role, email: user.email, full_name: user.full_name, id_area: user.area_name },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Inicio de sesión exitoso',
            token,
            userId: user.id,
            username: user.username,
            role: user.role,
            email: user.email,
            full_name: user.full_name,
            id_area: user.area_name,
            ip_address: ipAddress,
            device_info: deviceInfo,
            computer_name: computerName,
        });
    } catch (err) {
        console.error("Error al iniciar sesión:", err);
        res.status(500).json({ message: 'Error al iniciar sesión.' });
    }
};

// Obtener lista de usuarios
const getUsers = async (req, res) => {
    try {
        // Hacer JOIN para obtener el nombre del área
        const [results] = await db.execute(`
            SELECT users.id, users.username, users.role, users.full_name, 
                   areas.name AS area_name
            FROM users 
            JOIN areas ON users.id_area = areas.id
        `);

        res.status(200).json(results);
    } catch (err) {
        console.error("Error al obtener usuarios:", err);
        res.status(500).json({ message: 'Error al obtener usuarios.' });
    }
};

module.exports = { registerUser, loginUser, getUsers };
