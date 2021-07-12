var openDb = require('../db/sqlite')
var db;
var createTable = async () => {
    db = await openDb()
    db.exec("CREATE TABLE IF NOT EXISTS Users(userid INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, phone TEXT NOT NULL UNIQUE, address TEXT, deleted BOOLEAN DEFAULT (0) NOT NULL CHECK (deleted IN (0, 1)))")
}

var insertData = async (name, email, phone, address) => {
    try {
        await createTable()
        var insertQuery = "INSERT INTO Users (name, email, phone, address) VALUES (?, ?, ?, ?)"
        var params = [name, email, phone, address]
        var result = await db.run(insertQuery, params)
        return result
    } catch (e) {
        return new Error(e)
    }

}

var fetchData = async (searchParameter) => {
    try {
        db = await openDb()
        var selectQuery = "SELECT userid, name, email, phone, address FROM Users WHERE " + searchParameter.type + " = ? AND deleted = ?"
        var params = [searchParameter.value, 0]
        var rows = await db.all(selectQuery, params)
        return rows
    } catch (e) {
        return new Error(e)
    }

}

var updateData = async (userid, updateParams) => {
    try {
        db = await openDb()
        var params = []
        var columnQuery = ""
        for (i of updateParams) {
            columnQuery += i.type + " = ?, "
            params.push(i.value)
        }
        var pos = columnQuery.length - 1
        columnQuery = columnQuery.substring(0, pos - 1) + columnQuery.substring(pos, columnQuery.length)
        var updateQuery = "UPDATE Users SET " + columnQuery + "where userid = ?"
        params.push(userid)
        var result = await db.run(updateQuery, params)
        return (result)
    } catch (e) {
        return new Error(e)
    }
}

var deleteData = async (userid) => {
    try {
        db = await openDb()
        var deleteQuery = "UPDATE Users SET deleted = ? where userid = ?"
        var params = [1, userid]
        var result = await db.run(deleteQuery, params)
        return (result)
    } catch (e) {
        return new Error(e)
    }

}

var fetchAllUsers = async () => {
    try {
        db = await openDb()
        var result = db.all("SELECT userid, name, email, phone, address FROM Users where deleted = 0")
        return result
    } catch (e) {
        return new Error(e)
    }
}

module.exports = {
    insertData: insertData,
    fetchData: fetchData,
    updateData: updateData,
    deleteData: deleteData,
    fetchAllUsers: fetchAllUsers
}