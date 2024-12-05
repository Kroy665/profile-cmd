import localFont from "next/font/local";
import TerminalUI from "../components/TerminalUI";
import React from "react";
import MatrixBackground from "../components/MatrixBackground";
import BottomMenu from "../components/BottomMenu";
import { TermStateType } from "../types/TermStateType";

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


const tab = {
  id: 1,
  name: "Koushik -- zsh ",
  active: true,
  content: [{
    "text": "Welcome to Koushik's Portfolio",
    "type": "text",
    "color": "white"
  }, {
    "text": "Type 'help' to get started",
    "type": "text",
    "color": "white"
  }],
  initialPosition: { x: 50, y: 100 },
  initialSize: { width: 650, height: 400 }
}

export default function Home() {

  const [termState, setTermState] = React.useState<TermStateType>('open');
  const [priviousState, setPriviousState] = React.useState<{
    prevPosition: { x: number, y: number },
    prevSize: { width: number, height: number }
  }> ({
    prevPosition: { x: 50, y: 100 },
    prevSize: { width: 650, height: 400 }
  });


  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} ${terminal.variable} ${macFont.variable} font-[family-name:var(--font-mac)]`}
    >
      <MatrixBackground />

      <div
        className="p-4 "
      >
        
        <TerminalUI
          key={tab.id}
          id={tab.id}
          name={tab.name}
          active={tab.active}
          content={tab.content}
          initialPosition={tab.initialPosition}
          initialSize={tab.initialSize}
          setTermState={setTermState}
          termState={termState}
          setPriviousState={setPriviousState}
          priviousState={priviousState}
        />

      </div>

      <BottomMenu 
        setTermState={setTermState}
        termState={termState}
      />
    </div>
  );
}
