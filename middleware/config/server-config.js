/**
 * This file contains few configurations of the current application.
 * The 'db' key holds the Database configurations.
 * The 'server' key holds the application specific configurations.
 */
var appConfig = {
    db: {
        url: "mongodb://localhost:27017/fsects",
        name: "fsects",
    },
    server: {
        host: "localhost",
        port: "5252",
        clienturi: "http://localhost:4200"
    }
}
module.exports = appConfig;