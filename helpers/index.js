exports.query = ( sql, connection ) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows);
            }
        });
    });
};
