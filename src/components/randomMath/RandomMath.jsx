import React, { useState, useRef } from 'react';
import './randomMath.css';

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const RandomMath = () => {
  const [numbers, setNumbers] = useState([null, null]);
  const [operator, setOperator] = useState(null);
  const [input, setInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const inputRef = useRef(null);

  const generateNumbers = () => {
    const num1 = getRandomInt(1, 99);
    const num2 = getRandomInt(1, 99);
    let op = '+';
    if (num2 < num1 && Math.random() < 0.5) {
      op = '-';
    }
    setNumbers([num1, num2]);
    setOperator(op);
    setInput('');
    setShowResult(false);
    setIsCorrect(null);

    // Помещаем курсор в поле ввода после генерации чисел
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value.replace(/[^0-9\-]/g, ''));
  };

  const checkResult = () => {
    let correct = null;
    if (operator && numbers[0] !== null && numbers[1] !== null) {
      let expected =
        operator === '+'
          ? numbers[0] + numbers[1]
          : numbers[0] - numbers[1];
      correct = Number(input) === expected;
    }
    setIsCorrect(correct);
    setShowResult(true);
  };

  return (
    <div className="math-wrapper">
      <div className="math-square" onClick={generateNumbers}>
        {numbers[0] !== null && numbers[1] !== null && operator ? (
          <div className="math-problem">
            <span className="math-number">{numbers[0]}</span>
            <span className="math-operator big">{operator}</span>
            <span className="math-number">{numbers[1]}</span>
          </div>
        ) : (
          <div className="math-placeholder">Нажмите</div>
        )}
      </div>
      <div style={{ height: 24 }}>
        {showResult && (
          <div className={`math-result ${isCorrect ? 'yes' : 'no'}`}>
            {isCorrect ? 'Yes!' : 'No..'}
          </div>
        )}
      </div>
      <input
        className="math-input"
        type="number"
        value={input}
        onChange={handleInputChange}
        placeholder="Ваш ответ"
        ref={inputRef}
      />
      <button
        className="math-button"
        onClick={checkResult}
        disabled={
          numbers[0] === null ||
          numbers[1] === null ||
          operator === null ||
          input === ''
        }
      >
        Проверь
      </button>
    </div>
  );
};

export default RandomMath;