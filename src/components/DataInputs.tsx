import axios, { AxiosError } from "axios";
import data from "../app/variables.json";
import { ChangeEvent, useState, ReactNode } from "react";
import { Repository, Branch, EntityHandler } from "@/types";

export default function DataInputs() {
  // STATES
  const [activeUser, setActiveUser] = useState("l-s-b");
  const [activeRepo, setActiveRepo] = useState("my-gh-commits");
  const [activeBranchSHA, setActiveBranchSHA] = useState("99e05bdcd3c9ee55f2d03d697003a92ab2f3b5cb");
  const [resultMessages, setResultMessages] = useState({
    User: "",
    Repository: "",
    Branch: ""
  });
  const [menus, setMenus] = useState({
    Repositories: [],
    Branches: [],
    Commits: []
  });
  // URL CONSTANTS
  const GITHUB_API_BASE_URL = "https://api.github.com";
  const USER_FULL_URL = `${GITHUB_API_BASE_URL}/users/${activeUser}`;
  const REPOS_FULL_URL = `${USER_FULL_URL}/repos`;
  const REPO_FULL_URL = `${GITHUB_API_BASE_URL}/repos/${activeUser}/${activeRepo}`;
  const BRANCHES_FULL_URL = `${REPO_FULL_URL}/branches`;
  const BRANCH_FULL_URL = `${REPO_FULL_URL}/branches/${activeBranchSHA}`;
  const COMMITS_FULL_URL = ``;
  const COMMIT_FULL_URL = ``;

  // HANDLERS
  const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
    setActiveUser(e.target.value);
  };
  const handleRepoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setActiveRepo(e.target.value);
  };

  const refreshMenu = (whichEntity: string, menu: Repository[] | Branch[] | null ) => {
    setMenus({
      ...menus,
      [whichEntity]: JSON.parse(JSON.stringify(menu)) || []
    });
    console.log(menus)
  }

  const handleMenuSearch = async (whichMenu: string, axiosGetURL: string) => {
    try {
      const response = await axios.get(axiosGetURL);
      refreshMenu(whichMenu, response.data)
    } catch (error: any) {
      refreshMenu(whichMenu, null)
      throw error;
    }
  };

  const populateRepoMenu = (repoMenu: Repository[]) => (
    repoMenu.length === 0 ? <></> :
    repoMenu.map(repo =>
      <option key={repoMenu.indexOf(repo) + 1}>{repo.name}</option>
    )
  )

  const populateBranchMenu = (branchMenu: Branch[]) => (
    branchMenu.length === 0 ? <></> :
    branchMenu.map(branch =>
      <option key={branchMenu.indexOf(branch) + 1}>{branch.name}</option>
    )
  )

  const handleSearch = async (entity: string, menu: string, axiosGetURL: string, getMenuURL: string) => {
    try {
      const response = await axios.get(axiosGetURL);
      setResultMessages({
        ...resultMessages,
        [entity]: entity + " OK"
      });
      console.log(`\nENTITY: ${entity}\nGET_URL: ${axiosGetURL}\nMENU_URL: ${getMenuURL}`)
      getMenuURL && handleMenuSearch(menu, getMenuURL);
    } catch (error: any) {
      refreshMenu(entity, null)
      if (error.response?.status === 404) {
        setResultMessages({
          ...resultMessages,
          [entity]: entity + " not found."
        });
      } else throw error;
    }
  };

  const GoButton = ({entity, menu, getUrl, menuUrl}: EntityHandler) => (
  <button
    onClick={() => handleSearch(entity, menu, getUrl, menuUrl)}
  >
    Go
  </button>
  );

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
            <GoButton entity="User" menu="Repositories" getUrl={USER_FULL_URL} menuUrl={REPOS_FULL_URL} />
          </div>
          <span>{resultMessages.User}</span>
        </label>
        <label className="m-auto">
          Repository
          <div className="flex flex-row gap-2">
            <select onChange={handleRepoChange} id="repoList" className="w-3/4 bg-black">
              <option key="0" disabled>Select...</option>
              {menus.Repositories.length > 0 && populateRepoMenu(menus.Repositories)}
            </select>
            <GoButton entity="Repository" menu="Branches" getUrl={REPO_FULL_URL} menuUrl={BRANCHES_FULL_URL} />
          </div>
          <span>{resultMessages.Repository}</span>
        </label>
        <label className="m-auto">
          Branch
          <div className="flex flex-row gap-2">
          <select id="branchList" className="w-3/4 bg-black">
              <option key="0" disabled>Select...</option>
              {menus.Branches.length > 0 && populateBranchMenu(menus.Branches)}
            </select>
            <GoButton entity="Branch" menu="Commits" getUrl={BRANCH_FULL_URL} menuUrl={COMMITS_FULL_URL} />
          </div>
        </label>
      </div>
    </section>
  );
}
