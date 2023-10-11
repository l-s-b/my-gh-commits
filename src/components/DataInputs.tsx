import axios, { AxiosError } from "axios";
import { ChangeEvent, useState, useEffect } from "react";
import {
  Repository,
  Branch,
  EntityProps,
  EntityIndex,
  ResultMessages,
  Menus,
  DataInputsProps
} from "@/types";

export default function DataInputs({ onRouteSelect, selectedRoute }: DataInputsProps) {
  // STATES
  const [activeUser, setActiveUser] = useState("l-s-b");
  const [activeRepo, setActiveRepo] = useState("my-gh-commits");
  const [resultMessages, setResultMessages] = useState({
    User: "",
    Repository: "",
    Branch: ""
  });
  const [menus, setMenus] = useState<Menus>({ Repositories: [], Branches: [], Commits: [] });
  // URL CONSTANTS
  const GITHUB_API_BASE_URL = "https://api.github.com";
  const USER_FULL_URL = `${GITHUB_API_BASE_URL}/users/${activeUser}`;
  const REPOS_FULL_URL = `${USER_FULL_URL}/repos`;
  const REPO_FULL_URL = `${GITHUB_API_BASE_URL}/repos/${activeUser}/${activeRepo}`;
  const BRANCHES_FULL_URL = `${REPO_FULL_URL}/branches`;
  const DEFAULT_BRANCH_COMMIT_HISTORY = `${GITHUB_API_BASE_URL}/repos/${activeUser}/${activeRepo}/commits`;

const entityIndex = new EntityIndex(
  new EntityProps("User", "Repositories", "Repository", null, USER_FULL_URL, REPOS_FULL_URL),
);

entityIndex.userProps.child = new EntityProps(
  "Repository", "Branches", "Branch", null, REPO_FULL_URL, BRANCHES_FULL_URL
)

// HANDLERS
  const handleUserInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setActiveUser(e.target.value);
  };
  const handleRepoChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedRepo = e.target.value;
    setActiveRepo(selectedRepo);
    const newRoute = `${GITHUB_API_BASE_URL}/repos/${activeUser}/${selectedRepo}/commits`;
    onRouteSelect(newRoute);
  };

  const refreshMenu = (
    whichEntity: keyof Menus,
    menu: [] | null
  ) => {
  const editedMenus: any = { ...menus };
  editedMenus[whichEntity] = menu || [];
  setMenus(editedMenus);
}

  const refreshResultMessage: any = (entity: EntityProps, message: keyof ResultMessages) => {
    const messages: ResultMessages = {
        ok: `${entity.entityName} OK`,
        notFound: `${entity.entityName} not found.`,
        otherError: `Oh, my! ${entity.entityName} search error.`,
        clear: ''
    };
    setResultMessages({
        ...resultMessages,
        [entity.entityName]: messages[message]
    });
    if (entity.child !== null) {return refreshResultMessage(entity.child, "clear")};
}

  const getMenu = async ({menuName, menuUrl}: EntityProps) => {
    try {
      const response = await axios.get(menuUrl);
      refreshMenu(menuName, response.data)
    } catch (error: any) {
      refreshMenu(menuName, null)
      throw error;
    }
  };

  const populateRepoMenu = (repoMenu: Repository[]) => (
    repoMenu.length === 0 ? <></> :
    repoMenu.map(repo =>
      <option key={repoMenu.indexOf(repo) + 1}>{repo.name}</option>
    )
  )

  const handleGHUserSearch = () => {
    setActiveRepo("");
    setMenus({
      ...menus,
      Repositories: []
    })
    handleSearch(entityIndex.userProps)
  }

  const handleSearch = async (entityProps: EntityProps) => {
    try {
      const response = await axios.get(entityProps.getUrl);
      response.data && refreshResultMessage(entityProps, "ok")
      entityProps.menuUrl && getMenu(entityProps);
    } catch (error: any) {
      refreshResultMessage(
        entityProps,
        error.response?.status === 404 ? "notFound" : "otherError"
      );
    }
  };

  useEffect(() => {
    handleSearch(entityIndex.userProps);
    entityIndex.userProps.child && handleSearch(entityIndex.userProps.child)
  }, [])

  // RENDER
  return (
    <section
      className="flex fixed z-30 left-0 w-2/5 m-auto h-screen"
      style={{ display: "flex", alignItems: "center" }}
    >
      <div className="flex flex-col gap-8 w-full m-auto px-4">

        <label className="m-auto">
          GitHub User
          <div className="flex flex-row gap-2">
            <input
              type="text"
              onChange={handleUserInputChange}
              value={activeUser}
              className="w-3/4 px-2 py-1 bg-black"
            />
            <button onClick={handleGHUserSearch}>Go</button>
          </div>
          <span>{resultMessages.User}</span>
        </label>
        {menus.Repositories.length > 0 && 
          <label className="m-auto">
          Repository
          <div className="flex flex-row gap-2">
            <select
              onChange={handleRepoChange}
              id="repoList"
              className="w-3/4 px-2 py-1 bg-black"
              value={activeRepo}
            >
              <option key="0" value="placeholder" disabled>Select...</option>
              { populateRepoMenu(menus.Repositories) }
            </select>
          </div>
          <span>{resultMessages.Repository}</span>
        </label>
        }
      </div>
    </section>
  );
}
