import React from 'react'
import Image from 'next/image'
import { Dot } from 'lucide-react'
import { TermStateType } from '../types/TermStateType'

function BottomMenu({
    setTermState,
    termState,
}:{
    setTermState: React.Dispatch<React.SetStateAction<TermStateType>>,
    termState: TermStateType
}) {
    const [onClickHold, setOnClickHold] = React.useState<"terminal" | "action" | "bin" | null>(null)
    return (
        <div
            className="fixed -bottom-3 w-full h-24 bg-transparent flex items-center justify-center"
        >

            <div
                className="flex items-center gap-2"
                style={{
                    border: '1px solid #333',
                    borderRadius: '12px',
                    padding: '5px',
                    paddingBottom: '8px',
                    background: 'rgba(0, 0, 0, 0.8)',
                }}
            >
                <div
                    className="relative flex items-center flex-col"
                    onMouseDown={() => setOnClickHold("terminal")}
                    onMouseUp={() => setOnClickHold(null)}
                    onClick={() => {
                        if (termState === "open") {
                            setTermState("fullscreen")
                        } else if(termState !== "fullscreen") {
                            setTermState("open")
                        }
                    }}
                >
                    <div
                        className="absolute top-0 left-0 w-full h-full"
                        style={{
                            background: onClickHold === "terminal" ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                        }}
                    ></div>
                    <Image
                        src="/Terminalicon.png"
                        width={42}
                        height={42}
                        alt="Terminal"
                    />
                    {termState !== "closed" && (
                        <Dot
                            size={24}
                            color="white"
                            className="absolute -bottom-4 right-1/2 transform translate-x-1/2"
                        />
                    )}
                </div>

                {/* divider */}
                <div
                    className="h-11 bg-gray-500"
                    style={{
                        width: '1px',
                    }}
                ></div>

                <div
                    className={"relative flex items-center flex-col " + ((termState !== "minimized") ? "hidden" : "")}
                    onMouseDown={() => setOnClickHold("action")}
                    onMouseUp={() => setOnClickHold(null)}
                    onClick={() => setTermState("open")}
                >
                    <div
                        className="absolute top-0 left-0 w-full h-full"
                        style={{
                            background: onClickHold === "action" ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                        }}
                    ></div>
                    <Image
                        src="/Terminalactionicon.png"
                        width={48}
                        height={48}
                        alt="Terminalactionicon"
                    />

                </div>

                <div
                    className="relative flex items-center flex-col"
                    onMouseDown={() => setOnClickHold("bin")}
                    onMouseUp={() => setOnClickHold(null)}
                >
                    <div
                        className="absolute top-0 left-0 w-full h-full"
                        style={{
                            background: onClickHold === "bin" ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                        }}
                    ></div>
                    <Image
                        src="/bin-removebg-preview.png"
                        width={34}
                        height={34}
                        alt="binicon"
                    />
                </div>
            </div>
        </div>
    )
}

export default BottomMenu