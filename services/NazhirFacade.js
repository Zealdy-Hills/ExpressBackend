const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getNazhir(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT 
            id, 
            No_SK, 
            Nama_Nazhir, 
            ID_Tipe, 
            tgl_sk, 
            Keterangan, 
            Koordinat, 
            Status, 
            Create_date, 
            Create_Admin_User, 
            Update_date, 
            Update_Admin_User 
        FROM 
            nazhir
        LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta,
    }
}

async function insertNazhir(nazhir) {
    const result = await db.query(
        `INSERT INTO nazhir 
        (No_SK, Nama_Nazhir, ID_Tipe, tgl_sk, Keterangan, Koordinat, Status, Create_date, Create_Admin_User, Update_date, Update_Admin_User) 
        VALUES 
        (   
            "${nazhir.No_SK}", 
            "${nazhir.Nama_Nazhir}", 
            "${nazhir.ID_Tipe}", 
            "${nazhir.tgl_sk}", 
            "${nazhir.Keterangan}", 
            "${nazhir.Koordinat}", 
            "${nazhir.Status}", 
            "${nazhir.Create_date}", 
            "${nazhir.Create_Admin_User}", 
            "${nazhir.Update_date}", 
            "${nazhir.Update_Admin_User}")`
    );
    let message = "Error on creating Nazhir";

    if (result.affectedRows) {
        message = "Nazhir created successfully";
    }

    return message;
}

async function updateNazhir(id, nazhir) {
    const result = await db.query(
        `UPDATE nazhir 
        SET 
            No_SK="${nazhir.No_SK}",
            Nama_Nazhir="${nazhir.Nama_Nazhir}",
            ID_Tipe="${nazhir.ID_Tipe}",
            tgl_sk="${nazhir.tgl_sk}",
            Keterangan="${nazhir.Keterangan}",
            Koordinat="${nazhir.Koordinat}",
            Status="${nazhir.Status}",
            Create_date="${nazhir.Create_date}",
            Create_Admin_User="${nazhir.Create_Admin_User}",
            Update_date="${nazhir.Update_date}",
            Update_Admin_User="${nazhir.Update_Admin_User}"
        WHERE id=${id}`
    );

    let message = "Error in updating Nazhir";

    if (result.affectedRows) {
        message = "Nazhir updated successfully"
    }

    return {message};
}

async function removeNazhir(id) {
    const result = await db.query(
        `UPDATE nazhir 
        SET 
        Status=-1
        WHERE id = ${id}`
    );

    let message = "Error in deleting Nazhir";

    if (result.affectedRows) {
        message = "Nazhir deleted Successfully";
    }
    return {message};
}

module.exports = {
    getNazhir,
    insertNazhir,
    updateNazhir,
    removeNazhir,
}