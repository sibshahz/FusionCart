const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TodoApp API',
      version: '1.0.0',
      description: 'Simple API for managing todos',
    },
    servers: [
      {
        url: 'http://localhost:8080/v1/', // Update with your server URL
        description: 'Development server',
      },
    ],
  },
  apis: ['src/routes/**/*.js'], // Update with the path to your route files
};

const specs = swaggerJsdoc(options);

module.exports = specs;
