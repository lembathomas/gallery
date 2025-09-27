var config = {}

// Update to have your correct username and password
config.mongoURI = {
    production: 'mongodb+srv://thomas:Uiek1St4911EcQeO@projectdevops.lyuwnqd.mongodb.net/darkroom?retryWrites=true&w=majority&appName=ProjectDevops',
    development: 'mongodb+srv://thomas:Uiek1St4911EcQeO@projectdevops.lyuwnqd.mongodb.net/darkroom-dev?retryWrites=true&w=majority&appName=ProjectDevops',
    test: 'mongodb+srv://thomas:Uiek1St4911EcQeO@projectdevops.lyuwnqd.mongodb.net/darkroom-test?retryWrites=true&w=majority&appName=ProjectDevops'
}

module.exports = config
