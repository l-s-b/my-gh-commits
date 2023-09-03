import { useState, useEffect } from 'react';
import { Commit } from "@/types";
import axios from "axios";
import data from "../app/variables.json";

export function useFetchCommits(): Commit[] {
  const [commits, setCommits] = useState<Commit[]>([]);

  useEffect(() => {
    async function getCommitsData() {
      try {
        const response = await axios.get<Commit[]>(data.thisRepoURL);
        setCommits(response.data);
      } catch (error) {
        throw error;
      }
    }

    getCommitsData();
  }, []);

  return commits;
}
