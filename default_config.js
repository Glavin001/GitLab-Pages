var path = require("path");

module.exports = {
    gitlab: {
        /**
        Example `url`: "http://gitlab.cs.smu.ca"
        */
        url: null
    },
    deploy: {
        /**
        SSH Public Key for Project Deploy Key
        */
        sshPublicKey: path.resolve("./keys/id_rsa.pub"),
        /**
        SSH Private Key for Project Deploy Key
        */
        sshPrivateKey: path.resolve("./keys/id_rsa"),
        /**
        Specific branch that will be deployed when pushed
        */
        deployBranch: "gl-pages",
        /**
        Final, public directory of GitLab Pages.
        Jekyll builds will go here, or other static files.
        */
        publicPagesDir: path.resolve('./pages'),
        /**
        Repositories are cloned here.
        */
        tmpPagesDir: path.resolve('./.tmp')
    },
    server: {
        /**
        Example `publicUrl`: "http://glavin001.ddns.net:8081"
        */
        publicUrl: null
    }
};
