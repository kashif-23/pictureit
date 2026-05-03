import { useState } from 'react';

const steps = [
  {
    title: 'Create suspended process',
    description: 'A legitimate process starts in a suspended state so it can be tampered with safely.',
    log: 'Creating suspended process...',
  },
  {
    title: 'Unmap original image',
    description: 'The original executable memory pages are removed before injecting new code.',
    log: 'Unmapping original image...',
  },
  {
    title: 'Write malicious payload',
    description: 'Injected payload replaces the original process image in memory.',
    log: 'Writing malicious code...',
  },
  {
    title: 'Resume thread',
    description: 'The process resumes with a hijacked instruction stream.',
    log: 'Resuming thread...',
  },
];

function ProcessHollowingDemo() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="demo-card hollowing-demo">
      <div className="demo-header">
        <h3>Process Hollowing Visualizer</h3>
        <p>Follow the lifecycle of a hijacked process with animated state changes.</p>
      </div>

      <div className="process-visual">
        <div className={`process-card ${activeStep >= 0 ? 'active' : ''}`}>
          <span className="process-label">Legitimate Process</span>
          <strong>notepad.exe</strong>
          <p>Suspended state, ready for memory replacement.</p>
        </div>
        <div className="process-transition">
          <div className={`transition-line ${activeStep >= 1 ? 'filled' : ''}`} />
          <div className={`transition-badge ${activeStep >= 1 ? 'filled' : ''}`}>replace</div>
        </div>
        <div className={`process-card ${activeStep >= 2 ? 'active' : ''} injected`}>
          <span className="process-label">Injected Payload</span>
          <strong>malware.bin</strong>
          <p>Memory region replaced with hostile code.</p>
        </div>
      </div>

      <div className="stepper-row">
        {steps.map((step, index) => (
          <button
            key={step.title}
            className={`step-button ${index === activeStep ? 'selected' : ''}`}
            onClick={() => setActiveStep(index)}
            type="button"
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="step-details">
        <h4>{steps[activeStep].title}</h4>
        <p>{steps[activeStep].description}</p>
      </div>

      <div className="demo-log-panel">
        <div className="log-title">Process log</div>
        {steps.slice(0, activeStep + 1).map((step) => (
          <div key={step.title} className="log-entry">
            {step.log}
          </div>
        ))}
      </div>

      <div className="visual-status">
        <span>Execution Hijacked</span>
      </div>
    </div>
  );
}

export default ProcessHollowingDemo;
