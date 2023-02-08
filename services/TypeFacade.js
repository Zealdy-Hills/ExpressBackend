const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getType(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT id, Nama_Type, Status, Create_Date, Create_User, Update_Date, Update_User
        FROM 
            Type
        LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta,
    }
}

async function insertType(Type) {
    const result = await db.query(
        `INSERT INTO Type 
        (Nama_Type, Status, Create_Date, Create_User, Update_Date, Update_User) 
        VALUES 
        (   
            "${Type.Nama_Type}", 
            "${Type.Status}", 
            "${Type.Create_Date}", 
            "${Type.Create_User}", 
            "${Type.Update_Date}", 
            "${Type.Update_User}")`
    );
    let message = "Error on creating Type";

    if (result.affectedRows) {
        message = "Type created successfully";
    }

    return message;
}

async function updateType(id, Type) {
    const result = await db.query(
        `UPDATE Type 
        SET 
            Nama_Type="${Type.Nama_Type}",
            Status="${Type.Status}",
            Create_Date="${Type.Create_date}",
            Create_User="${Type.Create_Type_User}",
            Update_Date="${Type.Update_date}",
            Update_User="${Type.Update_Type_User}"
        WHERE id=${id}`
    );

    let message = "Error in updating Type";

    if (result.affectedRows) {
        message = "Type updated successfully"
    }

    return {message};
}

async function removeType(id) {
    const result = await db.query(
        `UPDATE Type 
        SET 
        Status=-1
        WHERE id = ${id}`
    );

    let message = "Error in deleting Type";

    if (result.affectedRows) {
        message = "Type deleted Successfully";
    }
    return {message};
}

module.exports = {
    getType,
    insertType,
    updateType,
    removeType,
}