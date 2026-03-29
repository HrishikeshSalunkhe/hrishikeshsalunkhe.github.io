/** Credits: ChatGPT (general) + classic “How browsers work” reference */
export const CHATGPT_CREDIT_URL = 'https://chatgpt.com/';
export const HOW_BROWSERS_WORK_REFERENCE_URL =
  'https://taligarsiel.com/projects/howbrowserswork1.html#The_rendering_engine';

export function getLocalPostBySlug(slug) {
  return LOCAL_BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}

export function getLocalPostsForListing() {
  return LOCAL_BLOG_POSTS.map((p) => ({
    title: p.title,
    brief: p.brief,
    url: `internal://local/${p.slug}`,
    slug: p.slug,
    publishedAt: p.publishedAt,
    readTimeInMinutes: p.readTimeInMinutes,
    tags: p.tags,
    category: 'web',
    isLocal: true,
  }));
}

const LOCAL_BLOG_POSTS = [
  {
    slug: 'browser-rendering-engine-summary',
    title:
      'How Browser Rendering Engines Work: DOM, CSSOM, Render Tree, Layout & Paint',
    brief:
      'Learn how browser rendering engines convert HTML and CSS into pixels: the DOM and CSSOM, render tree vs DOM, layout (reflow) and painting, incremental rendering, WebKit vs Gecko, reflow vs repaint, the critical rendering path, and CSS/JS placement—plus interview Q&A.',
    seoTitle: 'How Browser Rendering Engines Work | DOM, CSSOM, Layout, Reflow & Paint',
    seoDescription:
      'Browser rendering engine explained: HTML to DOM, CSS to CSSOM, render tree, layout and reflow, painting, incremental rendering, critical rendering path, and performance. Includes WebKit vs Gecko and interview notes.',
    seoKeywords:
      'browser rendering engine, DOM, CSSOM, render tree, reflow, repaint, layout engine, critical rendering path, WebKit, Gecko, Blink, incremental rendering, FOUC, parser blocking',
    publishedAt: '2026-03-29T00:00:00.000Z',
    readTimeInMinutes: 28,
    tags: [
      { name: 'Web' },
      { name: 'Browsers' },
      { name: 'Performance' },
      { name: 'Rendering' },
    ],
    contentHtml: `
<div class="article-callout not-prose">
  <p class="article-callout-title">Overview</p>
  <p class="text-gray-300 text-sm sm:text-base leading-relaxed mb-0">
    This guide explains <strong class="text-gray-100">how browser rendering engines work</strong>: from downloaded HTML and CSS to the
    <strong class="text-gray-100">DOM</strong>, <strong class="text-gray-100">CSSOM</strong>, <strong class="text-gray-100">render tree</strong>,
    <strong class="text-gray-100">layout</strong> (reflow), and <strong class="text-gray-100">painting</strong>. It aligns with the mental model in
    <a href="${HOW_BROWSERS_WORK_REFERENCE_URL}" target="_blank" rel="noopener noreferrer" class="text-primary-400 hover:text-primary-300">How browsers work: The rendering engine</a>
    and common interview questions on the <strong class="text-gray-100">critical rendering path</strong>.
  </p>
</div>

<div class="article-part-header" role="presentation" aria-hidden="true">
  <span class="article-part-line"></span>
  <span class="article-part-label">Part 1 · Foundations</span>
  <span class="article-part-line"></span>
</div>

<h2>What is a browser rendering engine?</h2>
<p>
  The <strong>rendering engine</strong> displays web content on screen. It primarily handles
  <strong>HTML</strong>, <strong>XML</strong>, and <strong>images</strong>. Other formats (PDFs, etc.) usually go through plugins or extensions.
</p>

<div class="article-key-point not-prose">
  <span class="article-key-point-icon" aria-hidden="true">◆</span>
  <div>
    <p class="text-sm font-semibold text-gray-200 mb-1">Core job</p>
    <p class="text-sm text-gray-400 mb-0">Turn <strong class="text-gray-200">HTML + CSS</strong> into <strong class="text-gray-200">pixels</strong> users actually see.</p>
  </div>
</div>

<h2>Popular rendering engines: Gecko, WebKit, and Blink</h2>
<ul>
  <li><strong>Gecko</strong> — Firefox</li>
  <li><strong>WebKit</strong> — Safari (and historically Chrome)</li>
  <li><strong>Blink</strong> — Chrome, Edge, and others today</li>
</ul>
<p>Different browsers use different engines, but the <strong>pipeline idea</strong> is almost the same everywhere.</p>

<h2>High-level rendering pipeline: network to DOM, CSSOM, and paint</h2>
<p>The central pipeline usually looks like this:</p>
<ol>
  <li>Fetch bytes from the network (often in chunks, e.g. ~8KB).</li>
  <li>Parse HTML → <strong>DOM</strong> tree (content tree).</li>
  <li>Parse CSS → <strong>CSSOM</strong> (style information).</li>
  <li>Build the <strong>render tree</strong>.</li>
  <li><strong>Layout</strong> — positions and sizes (reflow).</li>
  <li><strong>Painting</strong> — draw pixels.</li>
</ol>

<pre class="article-flow-diagram" aria-label="Rendering pipeline diagram"><code>  HTML bytes ──────────────► DOM tree
                                  │
                                  │    CSS bytes ──► CSSOM
                                  │         │         │
                                  └─────────┴─────────┘
                                            ▼
                                    ┌───────────────┐
                                    │  Render tree  │
                                    └───────┬───────┘
                                            ▼
         Layout (reflow) ──────────►  Paint  ──────────►  Pixels on screen</code></pre>

<div class="article-callout not-prose">
  <p class="article-callout-title">Why “incremental” matters</p>
  <p class="text-gray-300 text-sm leading-relaxed mb-0">
    The engine does <strong class="text-gray-100">not</strong> always wait for the full document. It streams work so users see content sooner — that’s <strong class="text-gray-100">progressive rendering</strong>.
  </p>
</div>

<hr />

<h2>DOM vs render tree: key data structures</h2>

<h3>DOM tree (content tree)</h3>
<ul>
  <li>Built from HTML parsing.</li>
  <li>Represents document <strong>structure</strong>.</li>
</ul>

<h3>Render tree</h3>
<ul>
  <li>Merges DOM nodes with <strong>computed CSS</strong>.</li>
  <li>Holds visual boxes (rectangles), color, size, order.</li>
  <li>Contains <strong>only visible</strong> content (e.g. not <code>head</code>, not <code>display: none</code>).</li>
</ul>

<pre class="article-flow-diagram" aria-label="DOM and CSSOM merge into render tree"><code>     DOM                    CSSOM
      │                       │
      └───────────┬───────────┘
                  ▼
           Render tree  →  Layout  →  Paint</code></pre>

<p><strong>DOM ≠ render tree.</strong> Think: structure + styles → what actually gets painted.</p>

<hr />

<h2>Layout and reflow phase</h2>
<p>Layout assigns <strong>exact position and size</strong> so every box has coordinates.</p>

<div class="article-key-point not-prose">
  <span class="article-key-point-icon" aria-hidden="true">!</span>
  <div>
    <p class="text-sm font-semibold text-gray-200 mb-1">Performance</p>
    <p class="text-sm text-gray-400 mb-0">Layout is <strong class="text-amber-200/90">expensive</strong>. WebKit says <em>layout</em>; Gecko often says <em>reflow</em> — same stage, different labels.</p>
  </div>
</div>

<h2>Painting phase: from render tree to pixels</h2>
<p>
  Painting walks the render tree and rasterizes to the screen using the OS / GPU stack. The outcome is the visible page.
</p>

<h2>Incremental rendering and progressive display</h2>
<ul>
  <li>Download and parse can overlap.</li>
  <li>First paint can happen <strong>before</strong> all HTML arrives.</li>
  <li>Improves <strong>perceived speed</strong> and UX.</li>
</ul>

<h2>WebKit vs Gecko: naming differences, same ideas</h2>
<table>
  <thead>
    <tr>
      <th>Concept</th>
      <th>WebKit</th>
      <th>Gecko</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Render tree</td><td>Render Tree</td><td>Frame Tree</td></tr>
    <tr><td>Elements</td><td>Render Objects</td><td>Frames</td></tr>
    <tr><td>Layout</td><td>Layout</td><td>Reflow</td></tr>
    <tr><td>DOM creation</td><td>Direct</td><td>“Content sink” layer</td></tr>
  </tbody>
</table>
<p class="text-gray-400 text-sm">Differences are mostly <strong class="text-gray-300">terminology</strong>, not separate concepts.</p>

<div class="article-part-header" role="presentation" aria-hidden="true">
  <span class="article-part-line"></span>
  <span class="article-part-label">Part 2 · Parsing</span>
  <span class="article-part-line"></span>
</div>

<h2>HTML parsing: tokenizer and tree construction</h2>
<p><strong>Parsing</strong> turns the document into a tree (parse / syntax tree). Two stages:</p>
<ol>
  <li><strong>Lexical analysis (tokenizer)</strong> — input → tokens (tags, text, attributes).</li>
  <li><strong>Syntax analysis (parser)</strong> — tokens → DOM by grammar rules.</li>
</ol>

<h2>Grammars and why HTML parsing is special</h2>
<ul>
  <li>Many formats use <strong>context-free grammars</strong> (vocabulary + rules).</li>
  <li>HTML is <strong>forgiving</strong> (implicit tags, error recovery) — real parsers are custom, not a naive textbook parser.</li>
</ul>

<div class="article-part-header" role="presentation" aria-hidden="true">
  <span class="article-part-line"></span>
  <span class="article-part-label">Part 3 · Mental model</span>
  <span class="article-part-line"></span>
</div>

<h2>Rendering pipeline takeaways</h2>

<h3>Core ideas</h3>
<ul>
  <li>Rendering is a <strong>pipeline</strong>, not one atomic step.</li>
  <li>DOM and stylesheet parsing feed <strong>separate</strong> structures before merge.</li>
  <li>The render tree is the bridge to pixels.</li>
</ul>

<h3>Performance habits</h3>
<ul>
  <li>Prefer <strong>incremental</strong> mental model when debugging load.</li>
  <li>Treat <strong>reflow</strong> as a cost center.</li>
  <li>Parsing can overlap with network.</li>
</ul>

<h3>Mental model (one line)</h3>
<blockquote>
  HTML → DOM · CSS → rules · DOM + CSS → render tree → layout → paint → screen.
</blockquote>

<h2>One-line summary of the rendering engine</h2>
<p>
  The engine turns HTML + CSS into pixels through <strong>parsing → render tree → layout → paint</strong>, usually <strong>incrementally</strong>.
</p>

<hr />

<div class="article-part-header" role="presentation" aria-hidden="true">
  <span class="article-part-line"></span>
  <span class="article-part-label">Part 4 · Interview prep</span>
  <span class="article-part-line"></span>
</div>

<h2>Basic interview questions: rendering fundamentals</h2>
<ol>
  <li><strong>What is a rendering engine?</strong> Converts HTML + CSS into screen pixels.</li>
  <li><strong>Popular engines?</strong> Gecko, WebKit, Blink, etc.</li>
  <li><strong>What is the DOM?</strong> Tree of HTML structure.</li>
  <li><strong>What is the render tree?</strong> DOM + styles, visibility only.</li>
  <li><strong>DOM vs render tree?</strong> Structure vs what’s painted.</li>
  <li><strong>Steps in order?</strong> HTML→DOM, CSS→CSSOM, render tree, layout, paint.</li>
</ol>

<hr />

<h2>Intermediate questions: CSSOM, reflow, and repaint</h2>
<ol start="7">
  <li><strong>CSSOM?</strong> CSS Object Model — how rules attach to the document.</li>
  <li><strong>Layout / reflow?</strong> Computes geometry; costly.</li>
  <li><strong>Painting?</strong> Pixels from the render tree.</li>
  <li><strong>Incremental rendering?</strong> Paint before full download.</li>
  <li><strong>Why incremental?</strong> Better UX and perceived performance.</li>
</ol>

<div class="article-callout not-prose">
  <p class="article-callout-title">Reflow vs repaint</p>
  <table class="mb-0 mt-2 border-0">
    <thead>
      <tr>
        <th>Reflow</th>
        <th>Repaint</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Layout / geometry</td><td>Visuals only</td></tr>
      <tr><td>More expensive</td><td>Usually cheaper</td></tr>
      <tr><td>Structure shifts</td><td>Appearance changes</td></tr>
    </tbody>
  </table>
</div>

<ol start="13">
  <li><strong>Reflow triggers?</strong> Size, position, fonts, DOM edits…</li>
  <li><strong>Repaint triggers?</strong> Color, background, many visibility tweaks…</li>
</ol>

<hr />

<h2>Advanced questions: critical rendering path and blocking</h2>
<ol start="15">
  <li><strong>Why is reflow expensive?</strong> Can propagate across subtrees.</li>
  <li><strong>Minimize reflows?</strong> Batch reads/writes; isolate changes.</li>
  <li><strong>Critical rendering path?</strong> DOM + CSSOM → render tree → layout → paint.</li>
  <li><strong>CSS blocking?</strong> Need styles for a correct tree and layout.</li>
  <li><strong>JS blocking?</strong> Parser-blocking scripts pause HTML parsing.</li>
  <li><strong>CSS in head / JS placement?</strong> See Part 5 below.</li>
  <li><strong>Late CSS?</strong> FOUC, layout shift.</li>
  <li><strong>FOUC?</strong> Unstyled flash before CSS applies.</li>
</ol>

<hr />

<h2>Scenario-based performance questions</h2>
<ol start="23">
  <li><strong>Fast API, slow UI?</strong> CSS weight, reflow storms, blocking JS, huge DOM…</li>
  <li><strong><code>display</code> vs <code>color</code>?</strong> Display often reflows; color often repaints.</li>
  <li><strong><code>offsetHeight</code>?</strong> Can force sync layout.</li>
  <li><strong>New DOM node?</strong> Tree update → layout → paint.</li>
</ol>

<table>
  <thead>
    <tr>
      <th><code>visibility: hidden</code></th>
      <th><code>display: none</code></th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Keeps layout space</td><td>Dropped from render tree</td></tr>
  </tbody>
</table>

<ol start="28">
  <li><strong>Why <code>transform</code> for animation?</strong> Often skips layout; can use GPU / compositor.</li>
</ol>

<hr />

<h2>Deep-dive interview questions</h2>
<ol start="29">
  <li><strong>Render tree before CSSOM ready?</strong> No — need both.</li>
  <li><strong>Render without full HTML?</strong> Yes — incremental rendering.</li>
  <li><strong>Every DOM node has a render object?</strong> No — e.g. <code>head</code>, <code>display: none</code>.</li>
  <li><strong>Dynamic CSS change?</strong> Restyle → tree update → reflow/repaint as needed.</li>
</ol>

<h2>Quick revision: rendering cheat sheet</h2>
<ul class="article-bullet-grid not-prose">
  <li>DOM + CSSOM → render tree → layout → paint</li>
  <li>Reflow ≈ layout change</li>
  <li>Repaint ≈ visual-only change</li>
  <li>Rendering streams incrementally</li>
  <li>JS/CSS timing affects blocking</li>
</ul>

<hr />

<div class="article-part-header" role="presentation" aria-hidden="true">
  <span class="article-part-line"></span>
  <span class="article-part-label">Part 5 · Critical path</span>
  <span class="article-part-line"></span>
</div>

<h2>Critical rendering path: why CSS in <code>&lt;head&gt;</code> and where to put JavaScript</h2>
<p>Placement follows <strong>parser</strong> and <strong>painter</strong> behavior — not arbitrary style advice.</p>

<h3>Big picture</h3>
<ol>
  <li>Parse HTML → DOM.</li>
  <li>Parse CSS → CSSOM (parallel when possible).</li>
  <li>Merge → render tree → layout → paint.</li>
</ol>

<pre class="article-flow-diagram" aria-label="Blocking behavior diagram"><code>  Parser hits &lt;script&gt; (classic)  ──►  HTML parsing pauses
  Parser needs CSS for first paint   ──►  Render can wait for CSSOM</code></pre>

<h3>Why CSS belongs in <code>&lt;head&gt;</code></h3>
<p><strong>Render-blocking CSS</strong>: the browser wants correct styles to avoid wrong layout and FOUC.</p>

<div class="article-callout not-prose">
  <p class="article-callout-title">Stylesheet in head (typical good)</p>
  <ul class="text-sm text-gray-300 list-disc ml-4 mb-0 space-y-1">
    <li>Early discovery → earlier CSSOM.</li>
    <li>More stable first paint.</li>
  </ul>
</div>

<div class="article-callout not-prose border-rose-500/25 bg-rose-500/[0.07]">
  <p class="article-callout-title text-rose-300/90">Stylesheet at end of body</p>
  <p class="text-sm text-gray-400 mb-0">HTML may paint first → <strong class="text-gray-200">FOUC</strong> and <strong class="text-gray-200">layout shift</strong> when CSS arrives.</p>
</div>

<h3>Why scripts often go at the bottom</h3>
<p>Classic <strong>parser-blocking</strong> scripts stop HTML parsing until run (think <code>document.write</code>, DOM mutations).</p>
<ul>
  <li><strong>Script in head:</strong> DOM incomplete longer; can delay first paint.</li>
  <li><strong>Script before <code>&lt;/body&gt;</code>:</strong> most markup already parsed.</li>
</ul>

<h3>CSS and JS interaction</h3>
<p>Calls like <code>getComputedStyle</code> may force the engine to reconcile styles — another reason load order matters.</p>

<h3>Modern loading</h3>
<ul>
  <li><strong><code>defer</code></strong> — run after document parse, ordered.</li>
  <li><strong><code>async</code></strong> — run when ready; order not guaranteed between async files.</li>
  <li><strong><code>type="module"</code></strong> — deferred by default.</li>
</ul>

<h3>Short interview answer</h3>
<p>
  <strong>CSS in head</strong> so styles join the pipeline early and reduce FOUC/shift.
  <strong>JS at bottom</strong> or <code>defer</code>/<code>async</code> so you don’t stall DOM construction unnecessarily.
</p>

<hr />

<h2>Sources and further reading</h2>
<ul>
  <li>
    Assisted by
    <a href="${CHATGPT_CREDIT_URL}" target="_blank" rel="noopener noreferrer">ChatGPT</a>.
  </li>
  <li>
    Deep dive:
    <a href="${HOW_BROWSERS_WORK_REFERENCE_URL}" target="_blank" rel="noopener noreferrer">How browsers work — The rendering engine</a>
    (Tali Garsiel).
  </li>
</ul>
`.trim(),
  },
];
