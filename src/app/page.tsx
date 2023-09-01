"use client"
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import data from "./variables.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Commit } from "@/types";
import CommitList from "@/components/CommitList";

export default function Home() {
 
  const [commits, setCommits] = useState<Commit[]>([]);

  useEffect(() => {
    async function getCommits() {
      try {
        const response = await axios.get<Commit[]>(data.thisRepoURL);
        setCommits(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    getCommits();
  }, []);

  return (
    <>
      <Header />
      <div className="container p-2 mx-auto">
        <h1>Commit History</h1>
        <CommitList commits={commits} />
      </div>
      <Footer />
    </>
  );
}
