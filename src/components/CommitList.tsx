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
          <p>SHA: {commit.sha}</p>
          <p>NODE ID: {commit.node_id}</p>
        </li>
      ))}
    </ul>
  );
}
