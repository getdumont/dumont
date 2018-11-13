const args = process.argv.slice(2);
const twitter = require('./twitter/client');
const Promise = require('bluebird');
const { Config, Tweet, User } = require('./schema');

const STALKER_KEY = 'StalkerProfile';

const addCommand = () => {
    const profileName = args[1];

    if (!profileName) {
        return Promise.reject('Missing second arg (Profile Name)');
    }

    return Config.findOne({
        key: STALKER_KEY,
    }).then((config) => {
        if (~config.value.indexOf(profileName)) {
            return Promise.reject(`Already exists profile ${profileName} in stalker`);
        }

        return twitter.users.byScreenName(profileName).then((data) => {
            const user = new User(data[0]);

            return user.save().then(() => {
                if (!config) {
                    config = new Config({
                        key: STALKER_KEY,
                        value: [ profileName ]
                    });

                    return config.save()
                }

                return Config.update({ _id: config._id }, {
                    '$push': { 'value': profileName }
                });
            });
        });
    });


}

const _getTweetsFromProfile = (screen_name) => {
    return User.findOne({
        'screen_name': {'$regex': screen_name, '$options': 'gi'}
     }).then((profile) => {
        return Tweet.findOne({
            _user: profile._id
        }).sort([['created_at', -1]]).then((tweet) => {
            let opts = {};

            if (tweet) {
                opts.since_id = tweet.id_str
            }

            return twitter.tweets.byUser({
                id: profile.id_str,
                screen_name
            }, opts).then((tweets) => {
                return Promise.map(tweets, (t) => {
                    t.text = t.full_text;
                    const new_tweet = new Tweet({...t, _user: profile._id});
                    return new_tweet.save();
                }, { concurrency: 20 });
            });
        });
    })
}

const execCommand = () => {
    return Config.findOne({
        key: STALKER_KEY,
    }).then(({ value }) => {
        console.log(value)
        return Promise.map(value, _getTweetsFromProfile, { concurrency: 2 })
    });
};

const getCmd = (cmd) => {
    const cmds = {
        'add': addCommand,
        'exec': execCommand,
    }

    cmd = cmds[cmd];

    if (!cmd) {
        return Promise.reject('Command not recognize')
    }

    return cmd();
}

getCmd(args[0]).catch((error) => {
    console.log(error);
}).then(() => {
    process.exit(0);
});