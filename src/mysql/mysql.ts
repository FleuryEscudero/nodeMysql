

import mysql = require('mysql');

export default class MySQL {
    private static _instance: MySQL;

    cnn: mysql.Connection;
    conectado: boolean = false;

    constructor() {
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

    public static get instance() {
        return this._instance || (this._instance = new this());
    }
    /**
     * Configuracion para mandar a llamar un query desde las rutas!
     */

    static ejecutarQuery(query: string, callback: Function) {
        this.instance.cnn.query(query, (err, results: Object[], fields) => {
            if (err) {
                console.log('Error Query');
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('Sin resultados')
            } else {

                callback(null, results);
            }
        });
    }

    private conectarDB() {
        this.cnn.connect((err: mysql.MysqlError) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log('Base de datos Online');
        });
    }
}


