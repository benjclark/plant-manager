# Plant-Manager

To run:

1. `brew services start mysql`
2. using a msql client like Sequel Pro connect using the connection details in your secrets.js and create a db called `plant_manager`
3. `npm run migrate` to setup the db tables using Knex
4. `npm run watch`
5. `node index.js`
6. go to http://localhost:7555
