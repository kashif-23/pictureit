const MAX_BUFFER = 16;
const inputEl = document.getElementById('buffer-input');
const sliderEl = document.getElementById('length-slider');
const payloadCount = document.getElementById('payload-count');
const bufferGrid = document.getElementById('buffer-grid');
const savedEbp = document.getElementById('saved-ebp');
const returnEip = document.getElementById('return-eip');
const overflowLog = document.getElementById('overflow-log');
const eipLog = document.getElementById('eip-log');
const crashBanner = document.getElementById('crash-banner');
const stepButtons = document.getElementById('step-buttons');
const stepTitle = document.getElementById('step-title');
const stepDesc = document.getElementById('step-desc');
const processLogs = document.getElementById('process-logs');

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

function updateBufferPreview(value) {
  const payload = value || '';
  const length = payload.length;
  payloadCount.textContent = `${length} byte${length === 1 ? '' : 's'}`;
  sliderEl.value = String(length);

  bufferGrid.innerHTML = '';
  for (let index = 0; index < MAX_BUFFER; index += 1) {
    const cell = document.createElement('div');
    cell.className = 'buffer-cell';
    if (index < length) {
      cell.classList.add('filled');
      cell.textContent = 'A';
    }
    bufferGrid.appendChild(cell);
  }

  const overflow = Math.max(0, length - MAX_BUFFER);
  const eipOverwritten = Math.max(0, overflow - 4);

  if (overflow > 0) {
    savedEbp.classList.add('overflow');
    savedEbp.querySelector('span:last-child').textContent = '0x41414141';
  } else {
    savedEbp.classList.remove('overflow');
    savedEbp.querySelector('span:last-child').textContent = '0x7ffdead0';
  }

  if (eipOverwritten > 0) {
    returnEip.classList.add('overwritten');
    returnEip.querySelector('span:last-child').textContent = '0x41414141';
  } else {
    returnEip.classList.remove('overwritten');
    returnEip.querySelector('span:last-child').textContent = '0x00401520';
  }

  overflowLog.classList.toggle('hidden', overflow === 0);
  eipLog.classList.toggle('hidden', eipOverwritten === 0);
  crashBanner.classList.toggle('hidden', eipOverwritten === 0);
}

function syncSlider(value) {
  inputEl.value = 'A'.repeat(value);
  updateBufferPreview(inputEl.value);
}

if (inputEl && sliderEl && payloadCount && bufferGrid) {
  inputEl.addEventListener('input', (event) => {
    const payload = event.target.value;
    updateBufferPreview(payload);
  });

  sliderEl.addEventListener('input', (event) => {
    syncSlider(Number(event.target.value));
  });

  updateBufferPreview(inputEl.value);
}

function updateProcessStep(index) {
  const step = steps[index];
  if (!step) return;
  stepTitle.textContent = step.title;
  stepDesc.textContent = step.description;

  processLogs.innerHTML = steps
    .slice(0, index + 1)
    .map((entry) => `<div class="log-entry">${entry.log}</div>`)
    .join('');

  Array.from(stepButtons.children).forEach((button, buttonIndex) => {
    button.classList.toggle('selected', buttonIndex === index);
  });
}

if (stepButtons && stepTitle && stepDesc && processLogs) {
  steps.forEach((step, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'step-button';
    button.textContent = String(index + 1);
    button.addEventListener('click', () => updateProcessStep(index));
    stepButtons.appendChild(button);
  });
  updateProcessStep(0);
}
