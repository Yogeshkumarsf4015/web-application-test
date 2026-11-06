import './styles.css';

const app = document.querySelector<HTMLDivElement>('#app')!;

const buildTime = new Date().toISOString();

app.innerHTML = `
  <main class="container">
    <div class="card">
      <span class="badge">Cloudflare CI/CD</span>
      <h1>Hello from Cloudflare 👋</h1>
      <p class="subtitle">
        This page is served by Cloudflare Pages, built automatically by
        <strong>Cloudflare Workers Builds</strong> every time a commit is pushed to GitHub.
      </p>

      <div class="grid">
        <div class="metric">
          <span class="label">Status</span>
          <span class="value ok">● Live</span>
        </div>
        <div class="metric">
          <span class="label">Build time (UTC)</span>
          <span class="value mono">${buildTime}</span>
        </div>
        <div class="metric">
          <span class="label">Runtime</span>
          <span class="value">Edge (V8 isolates)</span>
        </div>
      </div>

      <section class="flow">
        <h2>How the pipeline works</h2>
        <ol>
          <li><code>git push</code> to GitHub</li>
          <li>Cloudflare Workers Builds detects the push via a webhook</li>
          <li><code>npm install &amp;&amp; npm run build</code> runs on Cloudflare</li>
          <li>The <code>dist/</code> output is deployed to the global edge</li>
        </ol>
      </section>

      <button id="ping" class="primary">Test edge function</button>
      <pre id="result" class="result" hidden></pre>
    </div>
    <footer>Deployed via Cloudflare Workers Builds · v1.0.0</footer>
  </main>
`;

const pingBtn = document.querySelector<HTMLButtonElement>('#ping')!;
const result = document.querySelector<HTMLPreElement>('#result')!;

pingBtn.addEventListener('click', async () => {
  pingBtn.disabled = true;
  pingBtn.textContent = 'Pinging…';
  result.hidden = false;
  result.textContent = 'Loading…';
  try {
    const res = await fetch('/api/health', { method: 'GET' });
    const data = await res.json();
    result.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    result.textContent = `Error: ${(err as Error).message}`;
  } finally {
    pingBtn.disabled = false;
    pingBtn.textContent = 'Test edge function again';
  }
});
