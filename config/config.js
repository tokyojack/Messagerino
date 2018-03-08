module.exports = {
    db: {
        connectionLimit: 100,
        host: '',
        port: '',
        user: '',
        password: '',
        database: '',
        debug: false,
        multipleStatements: true,
        typeCast: function castField(field, useDefaultTypeCasting) {
            
            if (field.type === "BIT" && field.length === 1) 
                return field.buffer()[0] === 1;
            

            return useDefaultTypeCasting();
        }
    }
};
