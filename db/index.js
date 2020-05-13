/**
 * @param {any} connection 
 * test connection with database
 * sync with database
 */
const authenticateAndSyncDb = (connection) => {
    connection.authenticate()
        .then(() => console.log("Database connection success"))
        .catch(error => console.log(`Error: ${error}`))

    connection.sync({ force: false })
}

module.exports = {
    authenticateAndSyncDb
}