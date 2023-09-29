import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import Konva from 'konva'
export default function App() {

    const [menu, setMenu] = useState(null)
    const [layerState, setLayerState] = useState(1)
    const [mouseDetails, setMouseDetails] = useState({
        startX: null,
        startY: null,
        endX: null,
        endY: null
    })
    const stage = useRef(null)
    const layer = useRef(null)
    const transformer = useRef(new Konva.Transformer())
    const container = useRef(null)
    const [currentTool, setCurrentTool] = useState('rectangle')
    const currentToolRef = useRef(currentTool)
    const [rightPanel, setRightPanel] = useState('colors')
    const [currentColor, setCurrentColor] = useState('black')
    const colors = [
        'black',
        'white',
        'gray',
        'red',
        'green',
        'yellow',
        'blue',
        'orange',
        'purple',
        'pink',
        'brown',
        'silver',
        'teal',
        'cyan',
        'gold',
        'maroon',
        'navy',
        'indigo',
        'turquoise',
        'lavender',
        'magenta',
        'olive',
        'salmon',
        'lime',
        'beige',
        'violet',
        'taupe',
    ]

    useEffect(() => {
        stage.current = new Konva.Stage({
            container: 'container',
            width: 1024,
            height: 768
        })

        const background = new Konva.Rect({
            width: 1024,
            height: 768,
            fill: 'white',
            attrs: {
                isBackgroud: true
            }
        })

        layer.current = new Konva.Layer({
            name: 'Background'
        })
        layer.current.add(background)
        layer.current.add(transformer.current)
        stage.current.add(layer.current)
        setLayerState(layerState + 1)

    }, [])

    const menuClicked = (name, isHover) => {
        if (name === 'full-screen') {
            if (isHover)
                return

            document.getElementById('root').requestFullscreen();
            setMenu(null)
            return
        }

        if (menu === null && isHover)
            return
        if (menu !== name || isHover)
            setMenu(name)
        else
            setMenu(null)
    }

    const handleMouseMove = e => {
        const containerRect = container.current.getBoundingClientRect();
        const relativeX = e.clientX - containerRect.left;
        const relativeY = e.clientY - containerRect.top;

        setMouseDetails({ ...mouseDetails, endX: relativeX, endY: relativeY })
    }

    const addElementToLayer = (element, layer) => {
        element.on('click', () => {
            if (transformer.current.nodes()[0] === element) {
                transformer.current.nodes([])
                return
            }

            // Set current element on click
            // Not Working
            // console.log(currentToolRef.current)
            // if (currentTool !== 'move')
            //     return

            transformer.current.nodes([element])
            layer.current.draw()
        })

        layer.current.add(element)
    }

    const handleMouseClick = (e) => {
        if (e.type === 'mousedown') {
            // start drawing
            const containerRect = container.current.getBoundingClientRect();
            const relativeX = e.clientX - containerRect.left;
            const relativeY = e.clientY - containerRect.top;

            setMouseDetails({ ...mouseDetails, startX: relativeX, startY: relativeY })
        }
        else if (e.type === 'mouseup') {
            if (currentTool === 'rectangle') {
                var rect = new Konva.Rect({
                    x: mouseDetails.startX,
                    y: mouseDetails.startY,
                    width: mouseDetails.endX - mouseDetails.startX,
                    height: mouseDetails.endY - mouseDetails.startY,
                    fill: currentColor,
                    draggable: false
                })


                addElementToLayer(rect, layer)
            }
            else if (currentTool === 'circle') {
                // const deltaX = mouseDetails.endX - mouseDetails.startX;
                // const deltaY = mouseDetails.endY - mouseDetails.startY;

                // const radius = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                const diffX = (mouseDetails.endX - mouseDetails.startX)
                const diffY = (mouseDetails.endY - mouseDetails.startY)
                const radius = Math.abs(diffX > diffY ? diffY : diffX)

                var circle = new Konva.Circle({
                    x: mouseDetails.startX,
                    y: mouseDetails.startY,
                    radius: radius,
                    fill: currentColor,
                    draggable: false
                })

                addElementToLayer(circle, layer)
            }
            else if (currentTool === 'text') {
                var text = new Konva.Text({
                    x: mouseDetails.startX,
                    y: mouseDetails.startY,
                    text: prompt('Enter Text', ''),
                    fontSize: 24,
                    fill: currentColor,
                    draggable: false
                })

                addElementToLayer(text, layer)
            }
        }
    }

    currentTool && stage.current?.children.forEach((layer, index) => {
        layer.children.forEach((children, index) => {
            children.setDraggable(currentTool === 'move' && !children.attrs.isBackgroud)
        })
    })

    const handleKeyPress = (e) => {
        if (e.key === 'Escape') {
            setMenu(null)
        }
    }

    const data = [
        {
            'fname': 'Abhay',
            'lname': 'Vachhani',
            'age': 22
        },
        {
            'fname': 'Umesh',
            'lname': 'Sahijwani',
            'age': 21
        },
        {
            'fname': 'Dimple',
            'lname': 'Bhanushali',
            'age': 22
        },
    ]
    const exportTo = (exportType) => {
        data.forEach((info, i) => {
            // Set Text
            const block = document.createElement('div')
            block.id = 'backup-block'
            block.classList.add('backup-block')
            document.body.appendChild(block)
            const stg = Konva.Node.create(stage.current.toJSON(), block.id)

            stg.children.forEach((layer, index) => {
                layer.children.filter(node => node instanceof Konva.Text).forEach((node, index) => {
                    if (node.text().startsWith('{{') && node.text().endsWith('}}')) {
                        const variable = node.text().slice(2, -2)
                        node.text(info[variable])
                    }
                })
            })

            // Export to png
            if (exportType === 'png') {
                const dataURL = stg.toDataURL({
                    pixelRatio: 2
                })

                const downloadLink = document.createElement('a')
                downloadLink.download = 'Certificate.png'
                downloadLink.href = dataURL
                document.body.appendChild(downloadLink)
                downloadLink.click()
                document.body.removeChild(downloadLink)
            }
        })
    }




    if (currentTool !== 'move') {
        transformer.current.nodes([])
    }

    document.addEventListener("keydown", handleKeyPress);

    return (
        <>
            <section className='main-menu'>
                <span>
                    <button onClick={() => menuClicked('file', false)} onMouseOver={() => { menuClicked('file', true) }}>File</button>
                    <button onClick={() => menuClicked('edit', false)} onMouseOver={() => { menuClicked('edit', true) }}>Edit</button>
                    <button onClick={() => menuClicked('full-screen', false)} onMouseOver={() => { menuClicked('full-screen', true) }} className='filter-color'>
                        <svg className='full-screen' version="1.1" width="25" height="25" viewBox="8 8 20 20">
                            <path d="m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z"></path>
                            <path d="m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z"></path>
                            <path d="m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z"></path>
                            <path d="M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z"></path>
                        </svg>
                    </button>
                </span>

                <span className='right-menu'>
                    <button onClick={() => menuClicked('export', false)} onMouseOver={() => { menuClicked('export', true) }}>Export</button>
                </span>

                {menu === 'file' &&
                    <div className='menu' style={{ marginLeft: 2 }}>
                        <ul>
                            <li>New</li>
                            <li>Open</li>
                            <li>Save</li>
                        </ul>
                    </div>
                }
                {menu === 'edit' &&
                    <div className='menu' style={{ marginLeft: 38 }}>
                        <ul>
                            <li>Undo</li>
                            <li>Redo</li>
                        </ul>
                    </div>
                }
                {menu === 'export' &&
                    <div className='menu' style={{ right: 25 }}>
                        <ul>
                            <li>JSON</li>
                            <li onClick={() => exportTo('png')}>PNG</li>
                            <li>PDF</li>
                        </ul>
                    </div>
                }
            </section>
            <section className='secondary-menu'>
                <img src={`/images/tools/${currentTool}.png`} width={25} className='filter-color current-tool-icon' alt='Tool Logo' />
                ...
            </section>

            <div className='main'>
                <section className='toolbar'>
                    <button className={'' + currentTool === 'move' ? 'active' : ''} onClick={() => { setCurrentTool('move') }}>
                        <img src={`/images/tools/move.png`} width={25} className='filter-color' alt='Move Tool' />
                    </button>
                    <button className={'' + currentTool === 'text' ? 'active' : ''} onClick={() => { setCurrentTool('text') }}>
                        <img src={`/images/tools/text.png`} width={25} className='filter-color' alt='Text Tool' />
                    </button>
                    <button className={'' + currentTool === 'rectangle' ? 'active' : ''} onClick={() => { setCurrentTool('rectangle') }}>
                        <img src={`/images/tools/rectangle.png`} width={25} className='filter-color' alt='Rectangle Tool' />
                    </button>
                    <button className={'' + currentTool === 'circle' ? 'active' : ''} onClick={() => { setCurrentTool('circle') }}>
                        <img src={`/images/tools/circle.png`} width={25} className='filter-color' alt='Circle Tool' />
                    </button>
                </section>
                <section className='block'>
                    <div id='container' ref={container} onMouseMove={handleMouseMove} onMouseDown={handleMouseClick} onMouseUp={handleMouseClick}></div>
                </section>
                <section className='right-side-bar'>
                    <div className='properties-window'>
                        <div className='header'>
                            <span className={'' + rightPanel === 'info' ? 'active' : ''} onClick={() => { setRightPanel('info') }}>Info</span>
                            <span className={'' + rightPanel === 'properties' ? 'active' : ''} onClick={() => { setRightPanel('properties') }}>Properties</span>
                            <span className={'' + rightPanel === 'colors' ? 'active' : ''} onClick={() => { setRightPanel('colors') }}>Colors</span>
                        </div>
                        <div className='content'>
                            {
                                rightPanel === 'info' && transformer.current.nodes().length === 1 && <>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>X:</td>
                                                <td><input type='number' defaultValue={transformer.current.nodes()[0].x().toFixed(0)} onChange={(e) => { transformer.current.nodes()[0].x(parseFloat(e.target.value)) }} /></td>
                                            </tr>
                                            <tr>
                                                <td>Y:</td>
                                                <td><input type='number' defaultValue={transformer.current.nodes()[0].y().toFixed(0)} onChange={(e) => { transformer.current.nodes()[0].y(parseFloat(e.target.value)) }} /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </>
                            }
                            {
                                rightPanel === 'colors' &&
                                <>
                                    <div className='colors'>
                                        {colors.map((color, index) => {
                                            return <button key={index} className={'' + color === currentColor ? 'active' : ''} onClick={() => { setCurrentColor(color) }} style={{ backgroundColor: color }} />
                                        })}
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                    <div className='layers-window'>
                        <div className='header'><span>Layers</span></div>
                        <div className='content'>
                            {
                                layerState && stage.current?.children.filter(node => node instanceof Konva.Layer).map((layer, index) => {
                                    return <div className='layer active' key={index}>
                                        <div className='eye'><img src='/images/tools/eye.png' width={20} className='filter-color' alt='Eye' /></div>
                                        <canvas />
                                        <div className='name'>{layer.attrs.name}</div>
                                    </div>
                                })
                            }

                            {/* <div className='layer active'>
                                <div className='eye'><img src='/images/tools/eye.png' width={20} className='filter-color' alt='Eye' /></div>
                                <canvas />
                                <div className='name'>Background</div>
                            </div>
                            <div className='layer'>
                                <div className='eye'><img src='/images/tools/eye.png' width={20} className='filter-color' alt='Eye' /></div>
                                <canvas />
                                <div className='name'>Background</div>
                            </div>
                            <div className='layer'>
                                <div className='eye'><img src='/images/tools/eye.png' width={20} className='filter-color' alt='Eye' /></div>
                                <canvas />
                                <div className='name'>Background</div>
                            </div> */}
                        </div>
                    </div>
                    <div className='bottom-bar'>
                        <button>
                            <img src='/images/tools/folder.png' width={18} className='filter-color' alt='New Folder' />
                        </button>
                        <button>
                            <img src='/images/tools/new-layer.png' width={18} className='filter-color' alt='New Layer' />
                        </button>
                        <button>
                            <img src='/images/tools/delete.png' width={18} className='filter-color' alt='Delete' />
                        </button>
                    </div>
                </section>
            </div>
        </>
    )
}
