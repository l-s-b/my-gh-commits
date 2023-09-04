import axios, { AxiosError } from "axios";
import data from "../app/variables.json";
import { ChangeEvent, useState, ReactNode } from "react";
import { Repository } from "@/types";

export default function DataInputs() {
  // STATES
  const [user, setUser] = useState("l-s-b");
  const [repo, setRepo] = useState("my-gh-commits");
  const [branch, setBranch] = useState("main");
  const [userResultMessage, setUserResultMessage] = useState("");
  const [repoMenu, setRepoMenu] = useState([]);
  // URL CONSTANTS
  const GITHUB_API_BASE_URL = "https://api.github.com";
  const USER_FULL_URL = `${GITHUB_API_BASE_URL}/users/${user}`;
  const REPOS_FULL_URL = `${USER_FULL_URL}/repos`;
  const REPO_FULL_URL = `${GITHUB_API_BASE_URL}/repos/${user}/${repo}`;
  const BRANCHES_FULL_URL = `${REPO_FULL_URL}/branches`
  // HANDLERS
  const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  const handleRepoListSearch = async (axiosGetURL: string) => {
    try {
      const response = await axios.get(axiosGetURL);
      setRepoMenu(response.data);
    } catch (error: any) {
      setRepoMenu([]);
      throw error;
    }
  };

  const populateRepoMenu = (repoList: Repository[]) => (
    repoList.length === 0 ? <></> :
    repoList.map(repo =>
      <option key={repoList.indexOf(repo) + 1}>{repo.name}</option>
    )
  )

  const handleUserSearch = async (entity: string, axiosGetURL: string) => {
    try {
      const response = await axios.get(axiosGetURL);
      setUserResultMessage(entity + " OK");
      handleRepoListSearch(REPOS_FULL_URL);
    } catch (error: any) {
      setRepoMenu([]);
      if (error.response?.status === 404) {
        setUserResultMessage(entity + " not found.")
      } else throw error;
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
              value={user}
              className="w-3/4 bg-black"
            />
            <button type="button" onClick={() => handleUserSearch("User", USER_FULL_URL)}>
              Go
            </button>
          </div>
          <span>{userResultMessage}</span>
        </label>
        <label className="m-auto">
          Repository
          <div className="flex flex-row gap-2">
            <select id="repoList" className="w-3/4 bg-black">
              <option key="0" disabled>Select...</option>
              {repoMenu.length > 0 && populateRepoMenu(repoMenu)}
            </select>
            <button type="button">Go</button>
          </div>
        </label>
        <label className="m-auto">
          Branch
          <div className="flex flex-row gap-2">
            <input type="text" className="w-3/4 bg-black" />
            <button type="button">Go</button>
          </div>
        </label>
      </div>
    </section>
  );
}
