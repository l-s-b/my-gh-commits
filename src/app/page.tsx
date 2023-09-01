"use client"
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import data from "./variables.json";

export default function Home() {

  type Commit = {
    sha: string;
    node_id: string;
  };
  
  const [commits, setCommits] = useState<Commit[]>([]);

  async function getCommitList(): Promise<AxiosResponse<Commit[]>> {
    try {
      const response = await axios.get<Commit[]>(data.thisRepoURL);
      return response;
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    getCommitList()
      .then((response: AxiosResponse<Commit[]>) => {
        setCommits(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Commit List</h1>
      <ul>
        {commits && commits.map((commit: Commit) => (
          <li key={commit.node_id} className="border-slate-950 border-4">
            <p>SHA: {commit.sha}</p>
            <p>NODE ID: {commit.node_id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
