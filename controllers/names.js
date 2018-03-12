var connection = require('../config/mysql-db');

// add query functions
function getAllData(req, res, next) {
    var queryData = 'SELECT * FROM names';

    connection.query(queryData, function(err, rows, fields){
        if (!err && (rows.length > 0)) 
        { 
            res.json({
                data:rows,
                status:true,
                code:200,
                msg:'Data found.'
            });
        } else {
            res.json({
                data:rows,
                status:false,
                code:400,
                msg:'Data not found.'
            });
            console.log(err);
        }
    });
}

function getSingleData(req, res, next) {
    var id=req.body.id;
    queryData='SELECT * FROM names WHERE id=?';

    connection.query(queryData, id, function(err, rows, fields) {
        if (!err && (rows.length === 1)) 
        {
            res.json({
                data:rows,
                status:true,
                code:200,
                msg:'Data found.'
            });
        } else {
            res.json({
                data:rows,
                status:false,
                code:400,
                msg:'Data not found.'
            });
            console.log(err);
        }
    });
}

function createData(req, res, next) {
    var name =  req.body.name; 
    
    var data = {
        name: name
    }

    var queryData = 'INSERT INTO names SET ?';

    connection.query(queryData, data, function(err, rows, fields) {
        if (!err) 
        {
            res.json({
                status:true,
                code:201,
                msg:rows.affectedRows + ' record(s) inserted.'
            });
        } 
        else 
        {
            res.json({
                status:false,
                code:400,
                msg:'Data not inserted.'
            });
            console.log(err);
        }
    });
}

function updateData(req, res, next) {
    var id = parseInt(req.body.id);
    var name = req.body.name;

    var data = {
        name: name
    }

    var queryData = 'UPDATE names SET ? WHERE id = ?';
    
    connection.query(queryData, [data,id], function(err, rows, fields) {
        if (!err) 
        {
            res.json({
                status:true,
                code:201,
                msg:rows.affectedRows + ' record(s) updated.'
            });
        } 
        else 
        {
            res.json({
                status:false,
                code:400,
                msg:'Data not updated.'
            });
            console.log(err);
        }
    });
    
}

function removeData(req, res, next) {
    var id = parseInt(req.body.id_menu);

    var queryData = 'DELETE FROM names WHERE id = ?';

    connection.query(queryData, [id], function(err, rows, fields) {
        if (!err) 
        {
            res.json({
                status:true,
                code:200,
                msg:rows.affectedRows + ' record(s) deleted.'
            });
        } 
        else 
        {
            res.json({
                status:false,
                code:400,
                msg:'Data not deleted.'
            });
            console.log(err);
        }
    });
}

module.exports = {
    getAllData: getAllData,
    getSingleData: getSingleData,
    createData: createData,
    updateData: updateData,
    removeData: removeData
};