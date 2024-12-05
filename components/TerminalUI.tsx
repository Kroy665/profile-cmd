import React, { useRef, useState, useEffect } from "react";
import { X, Minus, ChevronsUpDown } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { TermStateType } from "../types/TermStateType";

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

const ResizeDirection = {
    NONE: "NONE",
    BOTH: "BOTH",
    RIGHT: "RIGHT",
    BOTTOM: "BOTTOM"
};

export default function TerminalUI({
    name,
    active,
    content,
    initialPosition = { x: 100, y: 100 },
    initialSize = { width: 500, height: 200 },
    setTermState,
    termState,
    setPriviousState,
    priviousState,
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
    setTermState: React.Dispatch<React.SetStateAction<TermStateType>>;
    termState: TermStateType;
    setPriviousState: React.Dispatch<React.SetStateAction<{
        prevPosition: { x: number; y: number };
        prevSize: { width: number; height: number };
    }>>;
    priviousState: {
        prevPosition: { x: number; y: number };
        prevSize: { width: number; height: number };
    };
}) {
    const popupRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState(initialPosition);
    const [size, setSize] = useState(initialSize);
    const [isDragging, setIsDragging] = useState(false);
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
    const [lastLogin, setLastLogin] = useState("");
    const [resizeDirection, setResizeDirection] = useState(ResizeDirection.NONE);
    const [show, setShow] = useState(true);
    useEffect(() => {
        // Update last login date/time on client-side only
        setLastLogin(formatDate());
    }, []);

    useEffect(() => {
        console.log("termState::", termState);
        if (termState === "fullscreen") {
            setShow(true);
            setSize({ 
                width: window.innerWidth, 
                height: (window.innerHeight - 70)
            });
            setPosition({ x: 0, y: 0 });
        } else if (termState === "open") {
            setShow(true);
            setSize(priviousState.prevSize);
            setPosition(priviousState.prevPosition);
        } else if (termState === "minimized") {
            setShow(false);
        } else if (termState === "closed") {
            setShow(false);
            setPriviousState({
                prevPosition: { x: 50, y: 100 },
                prevSize: { width: 650, height: 400 }
            });
        }
    }, [termState]);

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

            setPriviousState({
                prevPosition: {
                    x: e.clientX - clickPosition.x,
                    y: e.clientY - clickPosition.y,
                },
                prevSize: size,
            });


        } else if (resizeDirection !== ResizeDirection.NONE) {
            const newWidth = e.clientX - position.x;
            const newHeight = e.clientY - position.y;

            // Ensure the new dimensions are above the minimum
            const minWidth = 360;
            const minHeight = 150;

            switch (resizeDirection) {
                case ResizeDirection.BOTH:
                    if (newWidth >= minWidth && newHeight >= minHeight) {
                        setSize({ width: newWidth, height: newHeight });
                        setPriviousState({
                            prevPosition: position,
                            prevSize: { width: newWidth, height: newHeight },
                        });
                    }
                    break;

                case ResizeDirection.RIGHT:
                    if (newWidth >= minWidth) {
                        setSize((size) => ({ ...size, width: newWidth }));
                        setPriviousState({
                            prevPosition: position,
                            prevSize: { width: newWidth, height: size.height },
                        });
                    }
                    break;

                case ResizeDirection.BOTTOM:
                    if (newHeight >= minHeight) {
                        setSize((size) => ({ ...size, height: newHeight }));
                        setPriviousState({
                            prevPosition: position,
                            prevSize: { width: size.width, height: newHeight },
                        });
                    }
                    break;

                default:
                    break;
            }
        }
    };

    const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>, direction: string) => {
        e.preventDefault();
        setResizeDirection(direction);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setResizeDirection(ResizeDirection.NONE);
    };
    // Make sure to update your useEffect hook:
    React.useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, resizeDirection]);





    return (
        <div
            ref={popupRef}
            style={{
                left: position.x,
                top: position.y,
                width: size.width,
                height: size.height,
                zIndex: active ? 5 : 1,
                border: '1px solid #555',
                borderTop: '2px solid #555',
            }}
            className={"absolute w-full h-full bg-black text-white flex flex-col rounded-xl shadow-lg" + (!show ? " hidden" : "")}
            onMouseDown={e => e.stopPropagation()}
        >
            <div
                className="relative bg-[color:var(--terminal-bar-dark)] text-[color:var(--bar-text-dark)] font-extrabold"
                onMouseDown={handleMouseDown} // Start dragging on mouse down
                style={{
                    borderRadius: "10px 10px 0 0",
                }}
            >
                <ActionButton 
                    setTermState={setTermState}
                    termState={termState}
                />
                <div
                    className="absolute flex item-center gap-1 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 whitespace-nowrap overflow-hidden max-w-full px-10 pl-16"
                    style={{
                        fontSize: "0.8rem",
                        
                    }}
                >
                    <Image
                        src="/icons8-folder-64.png"
                        width={20}
                        height={20}
                        alt="Terminal"
                        />
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
                onMouseDown={(e) => handleResizeMouseDown(e, ResizeDirection.BOTH)}
            ></div>

            <div
                className="absolute top-0 right-0 w-1 cursor-ew-resize bg-green-500 bg-transparent"
                style={{
                    height: "calc(100% - 10px)",
                }}
                onMouseDown={(e) => handleResizeMouseDown(e, ResizeDirection.RIGHT)}
            ></div>

            <div
                className="absolute bottom-0 left-0 h-1 cursor-ns-resize bg-green-500 bg-transparent"
                style={{
                    width: "calc(100% - 10px)",
                }}
                onMouseDown={(e) => handleResizeMouseDown(e, ResizeDirection.BOTTOM)}
            ></div>


        </div>
    );
}


const ActionButton = ({
    setTermState,
    termState,
}: {
    setTermState: React.Dispatch<React.SetStateAction<TermStateType>>;
    termState: TermStateType;
}) => {
    const [onHover, setOnHover] = React.useState(false);


    return (
        <div className="flex items-center space-x-2 p-2">
            <button
                className="flex items-center w-3 h-3 rounded-full bg-red-500"
                onMouseEnter={() => setOnHover(true)}
                onMouseLeave={() => setOnHover(false)}
                onClick={() => setTermState("closed")}
            >
                {
                    onHover
                        ? <X
                            size={12}
                            color="black"
                            className=""
                        />
                        : null
                }
            </button>
            <button
                className="flex items-center w-3 h-3 rounded-full bg-yellow-500"
                onMouseEnter={() => setOnHover(true)}
                onMouseLeave={() => setOnHover(false)}
                onClick={() => setTermState("minimized")}
            >
                {
                    onHover
                        ?
                        <Minus
                            size={12}
                            color="black"
                            className=""
                        />
                        : null
                }

            </button>
            <button
                className="flex items-center w-3 h-3 rounded-full bg-green-500"
                onMouseEnter={() => setOnHover(true)}
                onMouseLeave={() => setOnHover(false)}
                onClick={() => {
                    if (termState === "open") {
                        setTermState("fullscreen")
                    } else {
                        setTermState("open")
                    }
                }}
            >
                {
                    onHover
                        ?
                        <ChevronsUpDown
                            size={12}
                            color="black"
                            className="transform -rotate-45"
                        />
                        : null
                }
            </button>
        </div>
    )
};
