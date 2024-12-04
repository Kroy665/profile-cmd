import Image from "next/image";
import localFont from "next/font/local";
import TerminalUI from "../components/TerminalUI";
import React from "react";
import TabType from "../types/TabType";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const terminal = localFont({
  src: "./fonts/Terminal.woff",
  variable: "--font-terminal",
  weight: "100 900",
});

const macFont = localFont({
  src: "./fonts/SFMono-Regular.otf",
  variable: "--font-mac",
});

export default function Home() {

  const [tabs, setTabs] = React.useState<TabType[]>([
    { 
      id: 1, 
      name: "Koushik -- zsh ",
      active: true,
      content: [{
        "text": "Welcome to Koushik's Portfolio",
        "type": "text",
        "color": "white"
      },{
        "text": "Type 'help' to get started",
        "type": "text",
        "color": "white"
      }],
      initialPosition: { x: 50, y: 100 },
      initialSize: { width: 650, height: 400 }
    }
  ])

  return (
    // <React.StrictMode>
    <div
      className={`${geistSans.variable} ${geistMono.variable} ${terminal.variable} ${macFont.variable} font-[family-name:var(--font-mac)]`}
    >

      <div
        className="p-4 "
      >
        {/* <TerminalUI />

        <TerminalUI 
          initialPosition={{ x: 200, y: 300 }}
          initialSize={{ width: 500, height: 200 }}
        /> */}

        {tabs.map(tab => (
          <TerminalUI 
            key={tab.id}
            id={tab.id}
            name={tab.name}
            active={tab.active}
            content={tab.content}
            initialPosition={tab.initialPosition}
            initialSize={tab.initialSize}
            setTabs={setTabs}
          />
        ))}
      </div>
    </div>
    // </React.StrictMode>
  );
}
