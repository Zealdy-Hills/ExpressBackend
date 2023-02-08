const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getAdmin(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT id, Nama_Admin, Status, Create_Date, Create_User, Update_Date, Update_User
        FROM 
            Admin
        LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta,
    }
}

async function insertAdmin(Admin) {
    const result = await db.query(
        `INSERT INTO Admin 
        (Nama_Admin, Status, Create_Date, Create_User, Update_Date, Update_User) 
        VALUES 
        (   
            "${Admin.Nama_Admin}", 
            "${Admin.Status}", 
            "${Admin.Create_Date}", 
            "${Admin.Create_User}", 
            "${Admin.Update_Date}", 
            "${Admin.Update_User}")`
    );
    let message = "Error on creating Admin";

    if (result.affectedRows) {
        message = "Admin created successfully";
    }

    return message;
}

async function updateAdmin(id, Admin) {
    const result = await db.query(
        `UPDATE Admin 
        SET 
            Nama_Admin="${Admin.Nama_Admin}",
            Status="${Admin.Status}",
            Create_Date="${Admin.Create_date}",
            Create_User="${Admin.Create_Admin_User}",
            Update_Date="${Admin.Update_date}",
            Update_User="${Admin.Update_Admin_User}"
        WHERE id=${id}`
    );

    let message = "Error in updating Admin";

    if (result.affectedRows) {
        message = "Admin updated successfully"
    }

    return {message};
}

async function removeAdmin(id) {
    const result = await db.query(
        `UPDATE Admin 
        SET 
        Status=-1
        WHERE id = ${id}`
    );

    let message = "Error in deleting Admin";

    if (result.affectedRows) {
        message = "Admin deleted Successfully";
    }
    return {message};
}

module.exports = {
    getAdmin,
    insertAdmin,
    updateAdmin,
    removeAdmin,
}