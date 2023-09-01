import React from 'react';
import { Commit } from '@/types';

export default function CommitList({ commits }: { commits: Commit[] }) {
  return (
    <ul>
      {commits.map((commit: Commit) => (
        <li
          key={commit.node_id}
          className="border-slate-950 border-4 break-words"
        >
            <h2>{commit.commit.message}</h2>
            <p>by
                <a href={commit.author.html_url}>
                    {` ${commit.commit.author.name} (${commit.author.login})`}
                </a>
            </p>
            <p>SHA: {commit.sha}</p>
        </li>
      ))}
    </ul>
  );
}
