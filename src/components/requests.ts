import { useState, useEffect } from 'react';
import { Commit } from "@/types";
import axios from "axios";
import data from "../app/variables.json";

export function useFetchCommits(selectedRoute: string): Commit[] {
  const [commits, setCommits] = useState<Commit[]>([]);

  useEffect(() => {
    async function getCommitsData() {
      try {
        setCommits([]);
        const response = await axios.get<Commit[]>(selectedRoute);
        setCommits(response.data);
      } catch (error) {
        throw error;
      }
    }

    selectedRoute && getCommitsData();
  }, [selectedRoute]);

  return commits;
}
