"use client"
import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommitList from "@/components/CommitList";
import DataInputs from "@/components/DataInputs";
import { useFetchCommits } from "@/components/requests";

export default function Home() {

  const [selectedRoute, setSelectedRoute] = useState("https://api.github.com/repos/l-s-b/my-gh-commits/commits");
  const commits = useFetchCommits(selectedRoute);
  const handleRouteSelect = async (route: string) => {
   setSelectedRoute(route);
   useFetchCommits(route);
  };

  useEffect(() => {
    if (selectedRoute) {
      handleRouteSelect(selectedRoute);
    }
  }, [selectedRoute]);

  return (
    <>
      <Header />
      <main>
        <DataInputs onRouteSelect={handleRouteSelect} selectedRoute={selectedRoute} />
        <CommitList commits={commits} />
      </main>
      <Footer />
    </>
  );
}
