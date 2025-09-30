var config = {}

// Update to have your correct username and password
config.mongoURI = {
    production: `mongodb+srv://lembathomas:KnoxXA4OsBVZMGZG@thomascluster.b77fvyc.mongodb.net/darkroom?retryWrites=true&w=majority&appName=thomascluster`,
    development: `mongodb+srv://lembathomas:KnoxXA4OsBVZMGZG@thomascluster.b77fvyc.mongodb.net/darkroom-dev?retryWrites=true&w=majority&appName=thomascluster`,
    test:        `mongodb+srv://lembathomas:KnoxXA4OsBVZMGZG@thomascluster.b77fvyc.mongodb.net/darkroom-test?retryWrites=true&w=majority&appName=thomascluster`,
}
                //mongodb+srv://lembathomas:<db_password>@thomascluster.b77fvyc.mongodb.net/?retryWrites=true&w=majority&appName=thomascluster
module.exports = config


