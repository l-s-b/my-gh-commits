"use client"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommitList from "@/components/CommitList";
import DataInputs from "@/components/DataInputs";
import { useFetchCommits } from "@/components/requests";

export default function Home() {
 
  const commits = useFetchCommits();

  return (
    <>
      <Header />
      <main>
        <DataInputs />
        <CommitList commits={commits} />
      </main>
      <Footer />
    </>
  );

}
