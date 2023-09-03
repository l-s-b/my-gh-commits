import React from "react";
import { Commit } from "@/types";

export default function CommitList({ commits }: { commits: Commit[] }) {
  return (
    <section className="absolute z-10 right-0 w-3/5 h-screen pr-20 py-40 flex flex-col gap-6 overflow-y-auto">
      <h1 className="text-xl font-bold">Commit History</h1>
      <ul>
        {commits.map((commit: Commit) => (
          <li
            key={commit.node_id}
            className="border-slate-950 border-4 break-words"
          >
            <h2>{commit.commit.message}</h2>
            <p>
              by
              <a href={commit.author.html_url}>
                {` ${commit.commit.author.name} (${commit.author.login})`}
              </a>
            </p>
            <p>SHA: {commit.sha}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
