const Promise = require('bluebird');
const { Specialist, List } = require('./schemas');
const [ _0, _1, email, password, ...others ] = process.argv
const args = { email, password };

others.forEach((arg) => {
    if (!arg.match(/--/)) {
        return;
    }

    const [key, value] = arg.replace('--', '').split('=');
    args[key] = value;
});

List.find().then((allLists) => {
    const rand = parseInt(Math.random() * allLists.length);

    const specialist = new Specialist({
        ...args,
        analyzing: {
            index: 0,
            list_id: allLists[rand]._id
        }
    });

    specialist.save().then(() => {
        process.exit(1);
    });
});
