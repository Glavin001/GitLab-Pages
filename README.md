GitLab Pages
============

GitHub Pages, for GitLab. 

-----

## How It Works

1. User logs into Web UI, which authenticates against GitLab with **node-gitlab** and retrieves a private key for subsequent requests.
2. Select the Project to add **GitLab Pages** support to. Available Projects list is pulled from GitLab with **node-gitlab**.
3. The selected project will setup a *Deploy Key* and *Webhook* for **GitLab Pages**.
4. When the user [pushes](https://www.kernel.org/pub/software/scm/git/docs/git-push.html) to **GitLab**, a webhook event is sent to **GitLab Pages** server.
5. The Webhook is handled by **gitlab-webhook** and the project is [pulled](http://git-scm.com/docs/git-pull) (or [cloned](http://git-scm.com/docs/git-clone)) with **nodegit** to the **GitLab Pages** configured clones install directory.
6. The `gl-pages` branch is [checked out](https://www.kernel.org/pub/software/scm/git/docs/git-checkout.html) with **nodegit**. (This can optionally be configured to be `gh-pages` branch to work on both GitHub and GitLab).
7. The public content, a *GitLab Page*, is served using [Expressjs](http://expressjs.com/). Each project will be served from a different port number, which can be configured and associated in the Web UI Console for **GitLab Pages**.

## Libraries & Tools
- [Node.js](http://nodejs.org/)
- [Express](http://expressjs.com/)
- [NodeGit](https://github.com/nodegit/nodegit)
- [Node-GitLab](https://github.com/moul/node-gitlab)
- [GitLab-Webhook](https://npmjs.org/package/gitlab-webhook)
