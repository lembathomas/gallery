var config = {}

// Update to have your correct username and password
config.mongoURI = {
    production: 'mongodb+srv://thomas:Uiek1St4911EcQeO@gallery.wc344.mongodb.net/darkroom?retryWrites=true&w=majority',
    development: 'mongodb+srv://thomas:Uiek1St4911EcQeO@gallery.wc344.mongodb.net/darkroom-dev?retryWrites=true&w=majority',
    test: 'mongodb+srv://thomas:Uiek1St4911EcQeO@gallery.wc344.mongodb.net/darkroom-test?retryWrites=true&w=majority',
}
module.exports = config;
