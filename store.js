module.exports = {
    createUser ({plantName, datePlanted}) {
        console.log(`Plant added with name: ${plantName} on date: ${datePlanted}`);
        return Promise.resolve();
    }
};