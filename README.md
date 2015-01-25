GitLab Pages
============

> GitHub Pages, for GitLab.

-----

![gitlab-pages](https://cloud.githubusercontent.com/assets/1885333/5892805/9ac6f59e-a4a2-11e4-8238-2c25584e1a60.gif)

## Installation

### Step 1) Create your deploy key pair

Create a SSH key pair for GitLab to use as deploy keys.

```bash
ssh-keygen -t rsa -C "example@email.com" -f "$(pwd)/keys/id_rsa"
```

They should be in path `keys/id_rsa` and `keys/id_rsa.pub`.

### Step 2) Configure GitLab Pages server

Clone this repo and install it's necessary dependencies:

```bash
# Already cloned repo
npm install
bower install
```

Edit `config.js`.

### Step 3) Start your GitLab Pages server

And start the server!

```bash
npm start
```

### Profit!

Login using your GitLab User Token at [http://localhost:1337](http://localhost:1337).

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
