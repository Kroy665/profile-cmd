import React, { useRef, useState, useEffect } from "react";
import TabType from "../types/TabType";
// import TerminalComponent from "./TerminalComponent";
import dynamic from "next/dynamic";

const TerminalComponent = dynamic(() => import("./TerminalComponent"), { ssr: false });

function formatDate() {
    const date = new Date();
    // Array of weekday names
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // Array of month names
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Get day, month, and time components
    const dayName = weekdays[date.getDay()];
    const monthName = months[date.getMonth()];
    const dayOfMonth = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // Format the date string
    return `${dayName} ${monthName} ${dayOfMonth.toString().padStart(2, ' ')} ${hours}:${minutes}:${seconds}`;
}
export default function TerminalUI({
    id,
    name,
    active,
    content,
    initialPosition = { x: 100, y: 100 },
    initialSize = { width: 500, height: 200 },
    setTabs,
}: {
    id: number;
    name: string;
    active: boolean;
    content: {
        text: string;
        type: string;
        color: string;
    }[];
    initialPosition?: { x: number; y: number };
    initialSize?: { width: number; height: number };
    setTabs: React.Dispatch<React.SetStateAction<TabType[]>>;
}) {
    const popupRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState(initialPosition);
    const [size, setSize] = useState(initialSize);
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
    const [lastLogin, setLastLogin] = useState("");
    useEffect(() => {
        // Update last login date/time on client-side only
        setLastLogin(formatDate());
    }, []); // Only run on mount




    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
        setClickPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - clickPosition.x,
                y: e.clientY - clickPosition.y,
            });
        } else if (isResizing) {
            if (e.clientX - position.x < 360 || e.clientY - position.y < 150) return;

            setSize({
                width: e.clientX - position.x,
                height: e.clientY - position.y,
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
    };

    const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsResizing(true);
    };

    React.useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, isResizing]);

    // when the component is clicked, bring it to the front(making it active)
    const handleClick = () => {
        setTabs((tabs) => {
            return tabs.map((tab) => {
                return {
                    ...tab,
                    active: tab.id === id,
                };
            });
        });
    };




    return (
        <div
            ref={popupRef}
            style={{
                left: position.x,
                top: position.y,
                width: size.width,
                height: size.height,
                zIndex: active ? 5 : 1,
            }}
            className="absolute w-full h-full bg-black text-white flex flex-col border-2 border-[color:var(--terminal-bar-dark)] rounded-xl shadow-lg"
            onMouseDown={e => e.stopPropagation()} // Prevent children elements from triggering drag
            onClick={handleClick} // Bring the terminal to the front
        >
            <div
                className="relative bg-[color:var(--terminal-bar-dark)] text-[color:var(--bar-text-dark)] font-extrabold cursor-move"
                onMouseDown={handleMouseDown} // Start dragging on mouse down
            >
                <div className="flex items-center space-x-2 p-2">
                    <div className="flex items-center w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="flex items-center w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="flex items-center w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 whitespace-nowrap overflow-hidden text-ellipsis max-w-full px-10 pl-16"
                >
                    {name} -- {(size.width / 8).toFixed(0)}x{(size.height / 16).toFixed(0)}
                </div>
            </div>



            {/* <div className="flex flex-col p-2 font-bold">
                <div>
                    Last login: {lastLogin} on ttys000
                </div>
                {content.map((line, index) => (
                    <div key={index} style={{ color: line.color }}>
                        Koushik@Koushiks-MacBook-Pro ~ % {line.text}
                    </div>
                ))}
                <div
                    className="flex"
                >
                    Koushik@Koushiks-MacBook-Pro ~ %
                    <input
                        className="bg-transparent text-white outline-none"
                        style={{ 
                            width: "calc(100% - 350px)", 
                            height: "1.5rem",
                            marginLeft: "0.7rem",
                        }}
                    />
                </div>
            </div> */}

            <TerminalComponent 
                lastLogin={lastLogin}
                content={content}
                size={size}
            />

            <div
                className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-transparent"
                style={{
                    borderRadius: "10px",
                }}
                onMouseDown={handleResizeMouseDown} // Start resizing on mouse down
            ></div>
        </div>
    );
}

