export type Commit = {
    sha: string;
    node_id: string;
    commit: {
        author: Publisher;
        committer: Publisher;
        message: string;
    }
    html_url: string;
    author: GHUser;
  };

export type Publisher = {
    name: string;
    email: string;
    date: string;
}

export type GHUser = {
    login: string;
    avatar_url: string; //Image source
    html_url: string; // Direct link
    followers_url: string; // API endpoint
    following_url: string; // API endpoint
    repos_url: string; // API endpoint
}