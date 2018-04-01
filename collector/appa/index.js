class Appa {
    sendJson(json) {
        process.stdout.write(JSON.stringify(json));
    }

    registerEntity(entity, schema) {
        this[entity] = {
            send: d => this.sendJson(schema(d))
        }
    }
}

module.exports = Appa;