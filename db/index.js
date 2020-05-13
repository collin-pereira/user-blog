const authenticateAndSyncDb = (connection) => {
    //test if database is connected
    connection.authenticate()
        .then(() => console.log("Database connection success"))
        .catch(error => console.log(`Error: ${error}`))

    //synchronize database
    connection.sync({ force: false })
}

module.exports= {
    authenticateAndSyncDb
}