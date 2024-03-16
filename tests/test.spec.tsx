import React from "react";
import ReactDOMServer from "react-dom/server";

import ReactMarkdown from "../src/index.js";

test("works with markdown syntax", async () => {
  const input = "==**strong and _italic_ marked text**==";

  expect(
    ReactDOMServer.renderToStaticMarkup(<ReactMarkdown>{input}</ReactMarkdown>),
  ).toMatchInlineSnapshot(
    `"<p><mark class="flexible-marker flexible-marker-default"><strong>strong and <em>italic</em> marked text</strong></mark></p>"`,
  );
});

test("works with code fences", async () => {
  const input = `\`\`\`javascript:title.js\n
const a = null;\n
\`\`\``;

  expect(
    ReactDOMServer.renderToStaticMarkup(<ReactMarkdown>{input}</ReactMarkdown>),
  ).toMatchInlineSnapshot(`
    "<div class="remark-code-container"><div class="remark-code-title">title.js</div><pre data-language="javascript" class="language-javascript"><code class="language-javascript code-highlight"><span class="code-line">
    </span><span class="code-line"><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token keyword null nil">null</span><span class="token punctuation">;</span>
    </span><span class="code-line">
    </span></code></pre></div>"
  `);
});

test("strips out the React Components", async () => {
  const input = `Hi <Poppy />`;

  // Without "html" handler it would be "<p>Hi <poppy></poppy></p>"

  expect(
    ReactDOMServer.renderToStaticMarkup(<ReactMarkdown>{input}</ReactMarkdown>),
  ).toMatchInlineSnapshot(`"<p>Hi </p>"`);
});
