import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//JSX notation to mimick html

const Block = (props) => {
    return (
        <button 
        className='block'
        onClick={props.onClickEvent}
        >
            {props.value}
        </button>
    );
};

const Primary = () => {
    const initialBlocks = Array(9).fill(null);
    const [blocks, setBlocks] = useState(initialBlocks);
    const [xTurn, setXTurn] = useState(true);

    const handleClickEvent = (i) => {
        const newBlocks = [...blocks];

        const winDetermined = Boolean(determineWin(newBlocks));
        const blockFilled = Boolean(newBlocks[i]);
        if (winDetermined || blockFilled) {
            return;
        }

        newBlocks[i] = xTurn ? 'X' : 'O';
        setBlocks(newBlocks);
        setXTurn(!xTurn);
    };
    
    const renderBlock = (i) => {
        return (
            <Block 
            value={blocks[i]} 
            onClickEvent={() => handleClickEvent(i)}
            />
        );
    };

    const winner = determineWin(blocks);
    const status = winner ?
    `Winner: ${winner}` :
    `Current Turn: ${xTurn ? 'X' : 'O'}`;

    return (
        <div>
            <div className='status'>{status}</div>
            <div className='primary-row'>
                {renderBlock(0)}{renderBlock(1)}{renderBlock(2)}
            </div>
            <div className='primary-row'>
                {renderBlock(3)}{renderBlock(4)}{renderBlock(5)}
            </div>
            <div className='primary-row'>
                {renderBlock(6)}{renderBlock(7)}{renderBlock(8)}
            </div>
        </div>
    );
};

const App = () => {
    return (
        <div className='app'>
            X's and O's
            <Primary />
        </div>
    );
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

function determineWin(blocks) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 6], [2, 4, 6],
    ];

    for (let line of lines) {
        const [a, b, c] = line;

        if (blocks[a] && blocks[a] === blocks[b] && blocks[a] === blocks[c]) {
            return blocks[a];
        }
    }

    return null;
}
