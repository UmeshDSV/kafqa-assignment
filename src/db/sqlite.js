const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

var openDb = async () => {
    new sqlite3.Database('./kafqadb.sqlite3');
    return open({
        filename: './kafqadb.sqlite3',
        driver: sqlite3.cached.Database
    })
}

module.exports = openDb