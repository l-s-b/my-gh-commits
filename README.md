# my-gh-commits
Simple web app to monitor GitHub commit history within this very repository, using GitHub API. Built with Next.js.

## HOW TO RUN THE APP
1. Run it online <a href="https://l-s-b.github.io/my-gh-commits/">here.</a>
2. Enjoy! No need to clone repositories, install dependencies, or run containers.

### If you insist on running it locally:

#### REQUIREMENTS
- A working version of Git
- The latest working version of Node.js. This app has been developed with Node v19.9.0.

#### STEPS
```
    $ cd (your preferred folder)
    $ git clone https://github.com/l-s-b/my-gh-commits.git
    $ cd my-gh-commits
    $ npm install
    $ npm run dev
```

## USAGE INSTRUCTIONS

By default, and as outlined, I have predefined this same repository to show its default branch (main) commit history.

However, the app lets you search for any GitHub user, and sneak a peek into their public repositories, and their commit chains.

To explore any public repo from any user:

1. Type the exact username of the desired GitHub author. When done, click "Go".
2. The list of public repositories (created or forked) by this user will load instantly within the select element below. Unfurl said list by clicking on the selector element, and select an option by also clicking it.
3. The Commit history for the default branch of such repository will update and be shown to the right side.

![That's all, folks!](https://lifepointministries.net/wp-content/uploads/2021/09/Thats-All-Folks-Facebook.png)

Thank you for coming by!
