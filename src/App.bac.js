import React, { useEffect, useRef, useState } from 'react'

export default function App() {
    const canvasRef = useRef(null)
    const [drawing, setDrawing] = useState(false)
    const [startX, setStartX] = useState(0)
    const [startY, setStartY] = useState(0)
    const [endX, setEndX] = useState(0)
    const [endY, setEndY] = useState(0)

    const handleMouseMove = e => {
        const containerRect = canvasRef.current.getBoundingClientRect();
        const relativeX = e.clientX - containerRect.left;
        const relativeY = e.clientY - containerRect.top;

        setEndX(relativeX)
        setEndY(relativeY)
    }

    const handleMouseClick = e => {
        if (e.type === 'mousedown') {
            setDrawing(true)
            const containerRect = canvasRef.current.getBoundingClientRect();
            const relativeX = e.clientX - containerRect.left;
            const relativeY = e.clientY - containerRect.top;

            setStartX(relativeX)
            setStartY(relativeY)
        }
        else if (e.type === 'mouseup') {
            setDrawing(false)
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')

            ctx.fillStyle = 'blue'

        }
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        ctx.fillStyle = 'blue'
        ctx.fillRect(10, 20, 20, 20);

    }, [])

    return (
        <>
            <div className="flex h-screen">
                <div className="bg-gray-300 p-4 flex flex-col items-center gap-2">
                    <button className="p-2 rounded-lg bg-gray-50 flex" title="Rectangle Tool">
                        <span className="inline-flex items-center rounded-md text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="20.000000pt" height="20.000000pt" viewBox="0 0 20.000000 20.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,20.000000) scale(0.015625,-0.015625)" fill="#000000" stroke="none"><path d="M100 1060 c-27 -27 -27 -93 0 -120 11 -11 25 -20 30 -20 6 0 10 -100 10 -280 0 -180 -4 -280 -10 -280 -24 0 -50 -41 -50 -80 0 -53 27 -80 80 -80 39 0 80 26 80 50 0 6 140 10 400 10 260 0 400 -4 400 -10 0 -24 41 -50 80 -50 53 0 80 27 80 80 0 39 -26 80 -50 80 -6 0 -10 100 -10 280 0 180 4 280 10 280 24 0 50 41 50 80 0 53 -27 80 -80 80 -39 0 -80 -26 -80 -50 0 -6 -140 -10 -400 -10 -260 0 -400 4 -400 10 0 24 -41 50 -80 50 -27 0 -47 -7 -60 -20z m945 -101 c4 -11 18 -25 31 -31 l24 -11 0 -278 c0 -272 0 -278 -21 -284 -11 -4 -25 -18 -31 -31 l-11 -24 -397 0 -397 0 -11 24 c-6 13 -20 27 -31 31 -21 6 -21 12 -21 285 0 273 0 279 21 285 11 4 25 18 31 31 l11 24 398 0 c393 0 398 0 404 -21z" /></g></svg>
                        </span>
                    </button>
                </div >

                <div className="flex-grow bg-gray-100 p-4 flex justify-center items-center">
                    <canvas ref={canvasRef} onMouseDown={handleMouseClick} onMouseUp={handleMouseClick} onMouseMove={handleMouseMove} className='border bg-white border-gray-500 min-h-[80%]'></canvas>
                </div>

                <div className="bg-gray-300 p-4">
                    Property Menu
                    <div>drawing: {drawing ? '1' : '0'}</div>
                    <div>startX: {startX.toFixed(0)}</div>
                    <div>startY: {startY.toFixed(0)}</div>
                    <div>endX: {endX.toFixed(0)}</div>
                    <div>endY: {endY.toFixed(0)}</div>
                </div>
            </div >
        </>
    )
}
