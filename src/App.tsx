import { useMemo } from 'react';
import BufferOverflowDemo from './components/BufferOverflowDemo';
import ProcessHollowingDemo from './components/ProcessHollowingDemo';

const learningPaths = [
  {
    title: 'Offensive Security',
    description: 'Learn exploitation techniques through interactive simulations.',
    badge: 'Active',
    state: 'active',
  },
  {
    title: 'Defensive Security',
    description: 'Understand how systems detect and prevent attacks.',
    badge: 'Coming Soon',
    state: 'soon',
  },
  {
    title: 'Networking Fundamentals',
    description: '',
    badge: 'Coming Soon',
    state: 'soon',
  },
  {
    title: 'Operating Systems Internals',
    description: '',
    badge: 'Coming Soon',
    state: 'soon',
  },
];

const modules = [
  { title: 'Buffer Overflows', status: 'Available', available: true },
  { title: 'Process Injection / Hollowing', status: 'Available', available: true },
  { title: 'SEH Overflows', status: 'Coming Soon', available: false },
  { title: 'Egghunters', status: 'Coming Soon', available: false },
  { title: 'ASLR Bypass', status: 'Coming Soon', available: false },
];

function App() {
  const heroCtas = useMemo(
    () => [
      { label: 'Start Learning', href: '#offensive' },
      { label: 'Explore Demos', href: '#demos' },
    ],
    [],
  );

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">PictureIt</div>
        <nav className="nav-links">
          <a href="#paths">Learning Paths</a>
          <a href="#offensive">Demos</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">Interactive Cybersecurity Platform</span>
            <h1>See how systems break. Learn how to secure them.</h1>
            <p>Interactive cybersecurity learning platform to build intuition, not just knowledge.</p>
            <div className="hero-actions">
              {heroCtas.map((cta) => (
                <a key={cta.label} href={cta.href} className="button button-primary">
                  {cta.label}
                </a>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-card">
              <div className="visual-tag">Live Simulation</div>
              <div className="visual-glow">
                <div className="visual-panel">
                  <div className="panel-row">
                    <span>Buffer</span>
                    <span>16 bytes</span>
                  </div>
                  <div className="panel-row">
                    <span>Saved EBP</span>
                    <span>0x41414141</span>
                  </div>
                  <div className="panel-row">
                    <span>Return Address</span>
                    <span>0xdeadbeef</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="paths" className="section panel">
          <div className="section-header">
            <div>
              <p className="section-label">Learning Paths</p>
              <h2>Structured tracks for every learner.</h2>
            </div>
            <p className="section-copy">Choose a path to build strong mental models from attack technique to defense strategy.</p>
          </div>
          <div className="grid cards-grid">
            {learningPaths.map((path) => (
              <article key={path.title} className={`card ${path.state}`}>
                <div className="card-title-row">
                  <h3>{path.title}</h3>
                  <span className={`badge ${path.state}`}>{path.badge}</span>
                </div>
                {path.description ? <p>{path.description}</p> : <p>Practical and hands-on content coming soon.</p>}
              </article>
            ))}
          </div>
        </section>

        <section id="offensive" className="section section-secondary panel">
          <div className="section-header">
            <div>
              <p className="section-label">Offensive Security</p>
              <h2>Explore attack techniques with intuitive visuals.</h2>
            </div>
            <p className="section-copy">Gain confidence in how exploits manipulate memory, processes, and control flow.</p>
          </div>
          <div className="grid module-grid">
            {modules.map((module) => (
              <button key={module.title} className={`module-card ${module.available ? 'live' : 'soon'}`}>
                <div>
                  <h3>{module.title}</h3>
                  <p>{module.status === 'Available' ? 'Interactive Demo - Available' : 'Coming Soon'}</p>
                </div>
                <span className={`badge ${module.available ? 'green' : 'soon'}`}>{module.status}</span>
              </button>
            ))}
          </div>
        </section>

        <section id="demos" className="section panel demo-section">
          <div className="split-layout">
            <div className="demo-intro">
              <p className="section-label">Interactive Demo #1</p>
              <h2>Buffer Overflow Visualizer</h2>
              <p>Watch how a simple string can corrupt the stack and overwrite the return address.</p>
            </div>
            <BufferOverflowDemo />
          </div>
        </section>

        <section className="section section-secondary panel demo-section">
          <div className="split-layout reverse">
            <ProcessHollowingDemo />
            <div className="demo-intro">
              <p className="section-label">Interactive Demo #2</p>
              <h2>Process Hollowing Visualizer</h2>
              <p>See how malware can create a suspended process, replace its memory, and resume execution.</p>
            </div>
          </div>
        </section>

        <section id="about" className="section panel about-section">
          <div className="section-header">
            <div>
              <p className="section-label">About</p>
              <h2>Built for learning, designed for clarity.</h2>
            </div>
            <p className="section-copy">PictureIt helps developers and security learners build strong visual intuition with approachable simulations.</p>
          </div>
          <div className="about-grid">
            <article className="info-card">
              <h3>Visual intuition</h3>
              <p>Focus on system behavior, pointer flow, and the stages of an exploit without overwhelming detail.</p>
            </article>
            <article className="info-card">
              <h3>Actionable examples</h3>
              <p>Simulations show step-by-step attack flow, memory state, and defensive context in a modern interface.</p>
            </article>
            <article className="info-card">
              <h3>Future-ready</h3>
              <p>More demos and learning paths are planned to broaden understanding across offensive and defensive domains.</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Built for learning. Free for everyone.</p>
        <div className="footer-links">
          <a href="#">GitHub</a>
          <a href="#">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
