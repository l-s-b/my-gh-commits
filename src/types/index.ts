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
    bio: string;
    public_repos: number;
    html_url: string; // Direct link
    followers_url: string; // API endpoint
    following_url: string; // API endpoint
    repos_url: string; // API endpoint
}

export type Repository = {
    name: string;
    description: string;
    html_url: string;
    created_at: string; // ISO timestamp
    updated_at: string;
    size: number // Megabytes
}

export type Branch = {
    name: string;
    commit: {
        sha: string;
        url: string;
    }
}

export class EntityIndex {
    constructor(public userProps: EntityProps) {}
}

export interface ResultMessages {
    ok: string;
    notFound: string;
    otherError: string;
    clear: string;
}

export class Menus {
    constructor(
        public Repositories: Repository[],
        public Branches: Branch[],
        public Commits: Commit[],
    ) {}
}

export type ValidMenuKey = keyof Menus

export class EntityProps {
    constructor(
        public entityName: string,
        public menuName: ValidMenuKey,
        public childName: string,
        public child: EntityProps | null,
        public getUrl: string,
        public menuUrl: string
    ) {}
}
    