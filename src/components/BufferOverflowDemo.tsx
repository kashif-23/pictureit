import { ChangeEvent, useMemo, useState } from 'react';

const MAX_BUFFER = 16;
const MAX_INPUT = 32;

function BufferOverflowDemo() {
  const [inputValue, setInputValue] = useState('HELLO');
  const length = inputValue.length;

  const overflow = Math.max(0, length - MAX_BUFFER);
  const ebpFilled = Math.min(Math.max(length - MAX_BUFFER, 0), 4);
  const eipFilled = Math.max(0, overflow - 4);
  const isOverflow = length > MAX_BUFFER;
  const message = useMemo(() => {
    if (eipFilled > 0) return 'EIP overwritten. Crash imminent.';
    if (isOverflow) return 'Buffer overflow detected. EBP corrupted.';
    return 'Writing input to buffer...';
  }, [eipFilled, isOverflow]);

  const bufferCells = Array.from({ length: MAX_BUFFER }, (_, index) => ({
    index,
    filled: index < length,
  }));

  return (
    <div className="demo-card overflow-demo">
      <div className="demo-header">
        <h3>Buffer Overflow Visualizer</h3>
        <p>Adjust the input to watch the stack frame shift and the return address get overwritten.</p>
      </div>

      <div className="overflow-controls">
        <label>
          Input payload
          <input
            type="text"
            value={inputValue}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value)}
            maxLength={MAX_INPUT}
            placeholder="Type payload..."
            aria-label="Buffer overflow input"
          />
        </label>
        <div className="range-row">
          <span>{length} bytes</span>
          <input
            type="range"
            min="0"
            max={MAX_INPUT}
            value={length}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setInputValue('A'.repeat(Number(event.target.value)))}
            aria-label="Payload length slider"
          />
        </div>
      </div>

      <div className="stack-visual">
        <div className="stack-label">Stack layout</div>
        <div className="stack-box">
          <div className="stack-row label-row">Buffer (16 bytes)</div>
          <div className="buffer-grid">
            {bufferCells.map((cell) => (
              <div
                key={cell.index}
                className={`buffer-cell ${cell.filled ? 'filled' : ''}`}
              >
                {cell.filled ? 'A' : ''}
              </div>
            ))}
          </div>
          <div className={`stack-row saved-ebp ${overflow > 0 ? 'overflow' : ''}`}>
            <span>Saved EBP</span>
            <span>{overflow > 0 ? '0x41414141' : '0x7ffdead0'}</span>
          </div>
          <div className={`stack-row return-eip ${eipFilled > 0 ? 'overwritten' : ''}`}>
            <span>Return Address (EIP)</span>
            <span>{eipFilled > 0 ? '0x41414141' : '0x00401520'}</span>
          </div>
        </div>

        <div className="pointer-bar">
          <div className="pointer-item">
            <span>ESP</span>
            <strong>0x7ffdead8</strong>
          </div>
          <div className="pointer-item">
            <span>EBP</span>
            <strong>0x7ffdeadc</strong>
          </div>
          <div className="pointer-item">
            <span>EIP</span>
            <strong>0x00401520</strong>
          </div>
        </div>
      </div>

      <div className="demo-log-panel">
        <div className="log-title">Execution log</div>
        <div className="log-entry">Writing input to buffer...</div>
        {isOverflow && <div className="log-entry warning">Buffer overflow detected.</div>}
        {eipFilled > 0 && <div className="log-entry danger">EIP overwritten.</div>}
      </div>

      {eipFilled > 0 && <div className="crash-banner">Crash detected: control flow hijacked.</div>}
    </div>
  );
}

export default BufferOverflowDemo;
