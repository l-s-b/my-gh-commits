import React from 'react';

export default function Footer() {
  return (
    <footer className="flex justify-end p-4 bg-slate-200 text-slate-800 absolute bottom-0 w-full">
        <p className="text-lg">
            by&nbsp;
            <a
                href="https://github.com/l-s-b"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer hover:text-black hover:font-bold duration-500"
            >
                l-s-b
            </a>
        </p>
    </footer>
  )
}
