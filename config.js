var path = require("path");

module.exports = {
    gitlab: {
        url: "http://gitlab.cs.smu.ca"
    },
    deploy: {
        sshPublicKey: path.resolve("./keys/id_rsa.pub"),
        sshPrivateKey: path.resolve("./keys/id_rsa")
    },
    server: {
        publicPages: path.resolve('./pages'),
        publicUrl: "http://glavin001.ddns.net:8081"
    }
};
