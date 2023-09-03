import axios, { AxiosError } from "axios";
import data from "../app/variables.json";
import { ChangeEvent, useState } from "react";

export default function DataInputs() {
  const [user, setUser] = useState("l-s-b");
  const [repo, setRepo] = useState("my-gh-commits");
  const [branch, setBranch] = useState("main");
  const [userResult, setUserResult] = useState("");

  const GITHUB_API_BASE_URL = "https://api.github.com";
  const USER_FULL_URL = `${GITHUB_API_BASE_URL}/users/${user}`;
  const REPOS_FULL_URL = `${USER_FULL_URL}/repos`;
  const REPO_FULL_URL = `${GITHUB_API_BASE_URL}/repos/${user}/${repo}`;
  const BRANCHES_FULL_URL = `${REPO_FULL_URL}/branches`

  const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  const handleSearch = async (entity: string, axiosGetURL: string) => {
    try {
      const response = await axios.get(axiosGetURL);
      setUserResult(entity + " OK");
    } catch (error: any) {
      if (error.response?.status === 404) {
        setUserResult(entity + " not found.")
      } else {
        throw error;
      }
    }
  };

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
            <button type="button" onClick={() => handleSearch("User", USER_FULL_URL)}>
              Go
            </button>
          </div>
          <span>{userResult}</span>
        </label>
        <label className="m-auto">
          Repository
          <div className="flex flex-row gap-2">
            <input type="text" className="w-3/4 bg-black" />
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
