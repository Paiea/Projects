(async () => {
  const app = document.getElementById('app');
  try {
    if (!('DecompressionStream' in window)) {
      throw new Error('This browser does not support DecompressionStream, which is required to load the packaged Praxis study engine.');
    }
    const parts = window.__praxisGz || [];
    if (parts.length !== 10) {
      throw new Error(`Praxis runtime incomplete: expected 10 parts, found ${parts.length}.`);
    }
    const b64 = parts.join('');
    const binary = atob(b64);
    const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
    const source = await new Response(stream).text();
    (0, eval)(source);
  } catch (err) {
    if (app) {
      app.innerHTML = '<section class="panel"><h1>Praxis 5001 Study Tool</h1><p>The study engine could not load.</p><pre class="errorbox"></pre></section>';
      const pre = app.querySelector('.errorbox');
      if (pre) pre.textContent = err && err.stack ? err.stack : String(err);
    }
    console.error(err);
  }
})();
