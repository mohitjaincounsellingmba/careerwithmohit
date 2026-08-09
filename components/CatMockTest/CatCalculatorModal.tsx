'use client';

import React, { useState } from 'react';
import { X, Calculator as CalcIcon, Delete } from 'lucide-react';

interface CatCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CatCalculatorModal({ isOpen, onClose }: CatCalculatorModalProps) {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(0);
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  if (!isOpen) return null;

  const handleDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleToggleSign = () => {
    const val = parseFloat(display);
    setDisplay(String(-val));
  };

  const handleSqrt = () => {
    const val = parseFloat(display);
    if (val < 0) {
      setDisplay('Error');
    } else {
      setDisplay(String(Math.sqrt(val)));
    }
    setWaitingForOperand(true);
  };

  const handleReciprocal = () => {
    const val = parseFloat(display);
    if (val === 0) {
      setDisplay('Error');
    } else {
      setDisplay(String(1 / val));
    }
    setWaitingForOperand(true);
  };

  const handleSquare = () => {
    const val = parseFloat(display);
    setDisplay(String(val * val));
    setWaitingForOperand(true);
  };

  const performOperation = (nextOp: string) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operation) {
      const currentVal = prevValue || 0;
      let result = 0;
      switch (operation) {
        case '+':
          result = currentVal + inputValue;
          break;
        case '-':
          result = currentVal - inputValue;
          break;
        case '×':
          result = currentVal * inputValue;
          break;
        case '÷':
          result = inputValue === 0 ? 0 : currentVal / inputValue;
          break;
        case '%':
          result = (currentVal * inputValue) / 100;
          break;
        default:
          result = inputValue;
      }
      setPrevValue(result);
      setDisplay(String(result));
    }

    setWaitingForOperand(true);
    setOperation(nextOp === '=' ? null : nextOp);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#1e293b] text-white rounded-3xl w-full max-w-sm shadow-2xl border-4 border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 px-5 py-4 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2">
            <CalcIcon className="w-5 h-5 text-amber-400" />
            <span className="font-black text-sm tracking-wider uppercase text-slate-200">CAT On-Screen Calculator</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Display */}
        <div className="p-5 bg-[#0f172a]">
          <div className="text-[10px] uppercase font-bold text-slate-400 h-4 text-right">
            {operation && prevValue !== null ? `${prevValue} ${operation}` : ''}
          </div>
          <div className="text-3xl font-mono font-bold text-right text-amber-400 truncate mt-1">
            {display}
          </div>
        </div>

        {/* Keypad */}
        <div className="p-4 grid grid-cols-4 gap-2 bg-slate-800 text-sm font-bold">
          {/* Row 1: Memory */}
          <button onClick={() => setMemory(0)} className="p-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs text-amber-300">MC</button>
          <button onClick={() => setDisplay(String(memory))} className="p-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs text-amber-300">MR</button>
          <button onClick={() => setMemory(memory + parseFloat(display))} className="p-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs text-amber-300">M+</button>
          <button onClick={() => setMemory(memory - parseFloat(display))} className="p-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs text-amber-300">M-</button>

          {/* Row 2: Functions */}
          <button onClick={handleSqrt} className="p-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200">√x</button>
          <button onClick={handleSquare} className="p-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200">x²</button>
          <button onClick={handleReciprocal} className="p-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200">1/x</button>
          <button onClick={handleClear} className="p-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white">C</button>

          {/* Row 3: Numbers 7,8,9 and Div */}
          <button onClick={() => handleDigit('7')} className="p-3 rounded-xl bg-slate-900 hover:bg-slate-950 text-white text-lg">7</button>
          <button onClick={() => handleDigit('8')} className="p-3 rounded-xl bg-slate-900 hover:bg-slate-950 text-white text-lg">8</button>
          <button onClick={() => handleDigit('9')} className="p-3 rounded-xl bg-slate-900 hover:bg-slate-950 text-white text-lg">9</button>
          <button onClick={() => performOperation('÷')} className="p-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-lg">÷</button>

          {/* Row 4: Numbers 4,5,6 and Mul */}
          <button onClick={() => handleDigit('4')} className="p-3 rounded-xl bg-slate-900 hover:bg-slate-950 text-white text-lg">4</button>
          <button onClick={() => handleDigit('5')} className="p-3 rounded-xl bg-slate-900 hover:bg-slate-950 text-white text-lg">5</button>
          <button onClick={() => handleDigit('6')} className="p-3 rounded-xl bg-slate-900 hover:bg-slate-950 text-white text-lg">6</button>
          <button onClick={() => performOperation('×')} className="p-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-lg">×</button>

          {/* Row 5: Numbers 1,2,3 and Sub */}
          <button onClick={() => handleDigit('1')} className="p-3 rounded-xl bg-slate-900 hover:bg-slate-950 text-white text-lg">1</button>
          <button onClick={() => handleDigit('2')} className="p-3 rounded-xl bg-slate-900 hover:bg-slate-950 text-white text-lg">2</button>
          <button onClick={() => handleDigit('3')} className="p-3 rounded-xl bg-slate-900 hover:bg-slate-950 text-white text-lg">3</button>
          <button onClick={() => performOperation('-')} className="p-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-lg">−</button>

          {/* Row 6: 0, Dot, Equal, Add */}
          <button onClick={() => handleDigit('0')} className="p-3 rounded-xl bg-slate-900 hover:bg-slate-950 text-white text-lg">0</button>
          <button onClick={handleDecimal} className="p-3 rounded-xl bg-slate-900 hover:bg-slate-950 text-white text-lg">.</button>
          <button onClick={handleBackspace} className="p-3 rounded-xl bg-slate-700 hover:bg-slate-600 flex items-center justify-center"><Delete className="w-5 h-5 text-slate-300" /></button>
          <button onClick={() => performOperation('+')} className="p-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-lg">+</button>

          {/* Row 7: Full width equal */}
          <button 
            onClick={() => performOperation('=')} 
            className="col-span-4 p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xl tracking-wider uppercase mt-1 shadow-lg shadow-emerald-900/30"
          >
            = (Calculate)
          </button>
        </div>
      </div>
    </div>
  );
}
