import {useMemo} from "react";
import { Commit } from "@/types";
import GitHubThrobber from "../assets/GitHubThrobber"

export default function CommitList({ commits }: { commits: Commit[] }) {
  const CommitsUnorderedList = useMemo(() => (
    <ul>
        {commits.map((commit: Commit) => (
          <li
            key={commit.node_id}
            className="bg-slate-950 rounded-md p-2 mb-3 break-words"
          >
            <h2>{commit.commit.message}</h2>
            <p className="text-slate-600">
              by
              <a href={commit.author?.html_url || commit.committer?.html_url || "#"}>
                <b> {commit.commit.author.name}</b>
              </a>
              {` (${commit.author?.login || 'Committed by ' + commit.committer?.login})`}
            </p>
            <p>SHA: {commit.sha}</p>
          </li>
        ))}
      </ul>
    ), [commits]);

  return (
    <section className="absolute z-10 right-0 w-3/5 h-screen pr-20 py-40 flex flex-col gap-6 overflow-y-auto">
      <h1 className="text-xl font-bold">Commit History</h1>
      {commits.length > 0 ? CommitsUnorderedList : <GitHubThrobber />}
    </section>
  )
}
