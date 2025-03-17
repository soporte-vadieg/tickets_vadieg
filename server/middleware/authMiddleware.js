const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del header Authorization
    
    if (!token) {
        return res.status(403).json({ message: 'No autorizado. Faltan credenciales.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'No autorizado. El token es inválido.' });
        }
        req.user = decoded; // Guardar los datos decodificados del usuario
        next();
    });
};



module.exports = { verifyToken };