"use client"
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import data from "./variables.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Commit } from "@/types";
import CommitList from "@/components/CommitList";
import DataInput from "@/components/DataInput";


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
      <main>
        <section
          className="flex fixed z-30 left-0 w-2/5 m-auto h-screen"
          style={{display: "flex", alignItems: "center"}}
        >
          <DataInput />
        </section>
        <section className="absolute z-10 right-0 w-3/5 h-screen pr-20 py-40 flex flex-col gap-6 overflow-y-auto">
          <h1 className="text-xl font-bold">Commit History</h1>
          <CommitList commits={commits} />
        </section>
      </main>
      <Footer />
    </>
  );

}
