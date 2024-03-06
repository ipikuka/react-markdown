import React from "react";
import ReactDOMServer from "react-dom/server";

import ReactMarkdown from "../src/index.js";

test("works with input", async () => {
  const input = "**strong _italic ==marked==_**";

  expect(
    ReactDOMServer.renderToStaticMarkup(<ReactMarkdown>{input}</ReactMarkdown>),
  ).toMatchInlineSnapshot(
    `"<p><strong>strong <em>italic <mark class="flexible-marker flexible-marker-default">marked</mark></em></strong></p>"`,
  );
});
