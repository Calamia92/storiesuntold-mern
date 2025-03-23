const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Stories Untold API',
            version: '1.0.0',
            description: 'Documentation interactive de l’API MERN stack',
        },
        servers: [{ url: process.env.API_URL || 'http://localhost:5000/api' }],
    },
    apis: ['./routes/*.js', './controllers/*.js'], // chemins vers tes fichiers annotés
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
