import { useState, useEffect } from "react";
import { GetSystemStats } from "../wailsjs/go/main/App";

export default function App() {
  const [originalText, setOriginalText] = useState("");
  const [reversedText, setReversedText] = useState("");
  const [stats, setStats] = useState<any | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      GetSystemStats().then(setStats);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleReverse = () => {
    function reverseWordsOfString(str: string) {
      return str
        .split("\n")
        .map((line) =>
          line
            .split(" ")
            .map((word) => word.split("").reverse().join(""))
            .join(" ")
        )
        .join("\n");
    }

    setReversedText(reverseWordsOfString(originalText));
  };

  return (
    <div id="App">
      <header
        className={`px-16 py-32 bg-[url(/bg.jpg)] mask-r-from-30% mask-l-from-30% mask-b-from-90% bg-center bg-cover`}
      />
      <main className="mx-8 my-8">
        <h1 className="text-4xl font-medium border-l-4 border-primary ps-4 mb-8">
          Word Reverser
        </h1>
        <div className="flex gap-2 justify-between">
          <label htmlFor="original" className="sr-only">
            Original Text
          </label>
          <textarea
            id="original"
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            style={{ height: "27ch" }}
            className="border border-foreground/12 rounded-md p-3 resize-none w-full"
            placeholder="Enter your original text here."
          />
          <button
            onClick={handleReverse}
            className="bg-primary/30 rounded-md text-primary px-2 hover:bg-primary/40 transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M11 4l3 8l-3 8" />
            </svg>
          </button>
          <label htmlFor="reversed" className="sr-only">
            Reversed Text
          </label>
          <textarea
            value={reversedText}
            id="reversed"
            style={{ height: "27ch" }}
            disabled
            className="border border-foreground/12 rounded-md p-3 resize-none w-full"
            placeholder="Your reversed text will appear here."
          />
        </div>
      </main>
      <footer className="flex flex-wrap justify-end gap-1 mx-8">
        {stats ? (
          <>
            <span className="bg-primary/10 px-2 py-0.5 text-xs rounded-full text-primary">
              RAM {stats.ramUsedMB}MiB / {stats.ramTotalMB}MiB
            </span>
            <span className="bg-primary/10 px-2 py-0.5 text-xs rounded-full text-primary">
              CPU {stats.cpuUsagePercent.toFixed(1)}%
            </span>
            <span className="bg-primary/10 px-2 py-0.5 text-xs rounded-full text-primary">
              Disk {stats.diskUsedGB}GB / {stats.diskTotalGB}GB
            </span>
            <span className="bg-primary/10 px-2 py-0.5 text-xs rounded-full text-primary">
              Uptime {Math.floor(stats.uptime / 3600)}h
            </span>
            <span className="bg-primary/10 px-2 py-0.5 text-xs rounded-full text-primary">
              Proc {stats.numProcesses}
            </span>
            <span className="bg-primary/10 px-2 py-0.5 text-xs rounded-full text-primary">
              {stats.hostname} · {stats.platform}
            </span>
          </>
        ) : (
          <span className="text-xs text-primary">Loading stats...</span>
        )}
      </footer>
    </div>
  );
}
