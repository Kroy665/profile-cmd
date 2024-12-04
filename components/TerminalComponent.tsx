import { FitAddon } from '@xterm/addon-fit'
import { useEffect, useRef } from 'react'
import { Terminal } from '@xterm/xterm';

const TerminalComponent = ({
  lastLogin,
  content,
  size,
}: {
  lastLogin: string;
  content: {
    text: string;
    type: string;
    color: string;
  }[];
  size: {
    width: number;
    height: number;
  };
}) => {

  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalInstanceRef = useRef<Terminal | null>(null); // Store terminal instance
  const fitAddonRef = useRef<FitAddon | null>(null); // Store fitAddon instance

  const term = new Terminal({
    cursorBlink: true,
    cursorStyle: 'bar',
    cursorWidth: 8,
    fontFamily: 'var(--font-mac)',
    fontSize: 14,
    lineHeight: 1.7,
    fontWeight: 'bold',
    theme: {
      background: '#000',
      foreground: '#fff',
    },
  });
  
  useEffect(() => {
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    if (terminalRef.current) {
      term.open(terminalRef.current)
    };
    fitAddon.fit();
    
    
    
    // Store your terminal instance and fitAddon in refs
    terminalInstanceRef.current = term;
    fitAddonRef.current = fitAddon;
  }, [])
  
  term.write(`Last login: ${lastLogin} on ttys000 \r\n`);
  content.forEach(({ text }) => {
    term.write(`${text}  \r\n`);
  });
  term.write(`Koushik@Koushiks-MacBook-Pro ~ % `);


  // Handle key inputs
  term.onKey(e => {
    const { domEvent, key } = e;
    const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

    switch (domEvent.key) {
      case 'Enter':
        // Handle the command here

        const numberOfLines = term.buffer.active.baseY + term.buffer.active.cursorY;
        const commandStr = term.buffer.active.getLine(numberOfLines)?.translateToString().trim();
        // Koushik@Koushiks-MacBook-Pro ~ % echo hello
        const command = commandStr?.replace('Koushik@Koushiks-MacBook-Pro ~ %', '').trim();
        console.log("command", command);
        if (command === 'help') {
          term.write('\r\n');
          term.write('Available commands: \r\n');
          term.write('help - Show available commands \r\n');
          term.write('clear - Clear the terminal \r\n');
          term.write('profile - Show my profile \r\n');
          term.write('\r\nKoushik@Koushiks-MacBook-Pro ~ % ');
        } else if (command === 'clear') {
          term.clear();
          term.write('\r\nKoushik@Koushiks-MacBook-Pro ~ % ');

        } else if (command === "profile" || command === "whoareyou" || command === "p") {
          term.write('\r\n');
          term.write('Name: Koushik \r\n');
          term.write('Role: Software Engineer \r\n');
          term.write('Location: Bangalore, India \r\n');
          term.write('Email: kroy963@gmail.com');
          term.write('\r\nKoushik@Koushiks-MacBook-Pro ~ % ');
        } else {
          term.write('\r\n');
          term.write(`zsh: command not found: ${command}`);
          term.write('\r\nKoushik@Koushiks-MacBook-Pro ~ % ');
        }

        break;
      case 'Backspace':
        // Do not delete the prompt
        if (term.buffer.active.cursorX > 33) {
          term.write('\b \b');
        }
        break;
      default:
        if (printable) {
          term.write(key);
        }
        break;
    }
  });

  useEffect(() => {
    // Resize the terminal whenever the size prop changes
    if (fitAddonRef.current && terminalInstanceRef.current) {
      fitAddonRef.current.fit();
      terminalInstanceRef.current.refresh(0, terminalInstanceRef.current.rows - 1);
    }
  }, [size]);



  return <div
    ref={terminalRef}
    style={{
      padding: '5px',
      width: '100%',   // Ensure it occupies full space to be responsive
      height: '100%',  // Ensure it occupies full space to be responsive
      borderRadius: '10px',
    }}
    className='font-[family-name:var(--font-mac)] overflow-auto scrollbar-none'
  />
}

export default TerminalComponent