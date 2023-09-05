import axios, { AxiosError } from "axios";
import { ChangeEvent, useState } from "react";
import { Repository, Branch, EntityProps, EntityIndex, ResultMessages, Menus, ValidMenuKey } from "@/types";

export default function DataInputs() {
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

const entityIndex = new EntityIndex(
  new EntityProps("User", "Repositories", "Repository", null, USER_FULL_URL, REPOS_FULL_URL),
);

entityIndex.userProps.child = new EntityProps(
  "Repository", "Branches", "Branch", null, REPO_FULL_URL, BRANCHES_FULL_URL
)

// HANDLERS
  const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
    setActiveUser(e.target.value);
    setActiveRepo("");
  };
  const handleRepoChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setActiveRepo(e.target.value);
  };

  const refreshMenu = (whichEntity: keyof Menus, menu: [] | null ) => {
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

  const handleSearch = async (entityProps: EntityProps) => {
    try {
      const response = await axios.get(entityProps.getUrl);
      response.data && refreshResultMessage(entityProps, "clear");
      response.data && refreshResultMessage(entityProps, "ok")
      entityProps.menuUrl && getMenu(entityProps);
    } catch (error: any) {
      refreshResultMessage(
        entityProps,
        error.response?.status === 404 ? "notFound" : "otherError"
      );
    }
  };

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
              onChange={handleUserChange}
              value={activeUser}
              className="w-3/4 bg-black"
            />
            <button onClick={() => { handleSearch(entityIndex.userProps) }}>Go</button>
          </div>
          <span>{resultMessages.User}</span>
        </label>

        <label className="m-auto">
          Repository
          <div className="flex flex-row gap-2">
            <select
              onChange={handleRepoChange}
              id="repoList"
              className="w-3/4 bg-black"
              value={activeRepo}
            >
              <option key="0" value="placeholder" disabled>Select...</option>
              {menus.Repositories.length > 0 && populateRepoMenu(menus.Repositories)}
            </select>
            <button onClick={() => {
              entityIndex.userProps.child && handleSearch(entityIndex.userProps.child)
            }}>Go</button>
          </div>
          <span>{resultMessages.Repository}</span>
        </label>

      </div>
    </section>
  );
}
