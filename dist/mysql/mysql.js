"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.conectado = false;
        console.log('Clase Inicializada');
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'fly',
            password: 'Escudero#1',
            database: 'node_db'
        });
        this.conectarDB();
    }
    /**
     * Configuracion del Singleton
     */
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    /**
     * Configuracion para mandar a llamar un query desde las rutas!
     */
    static ejecutarQuery(query, callback) {
        this.instance.cnn.query(query, (err, results, fields) => {
            if (err) {
                console.log('Error Query');
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('Sin resultados');
            }
            else {
                callback(null, results);
            }
        });
    }
    conectarDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log('Base de datos Online');
        });
    }
}
exports.default = MySQL;
