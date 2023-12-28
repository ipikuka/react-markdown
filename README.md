# @ipikuka/react-markdown

[![NPM version][npm-image]][npm-url]
[![Build][github-build]][github-build-url]
![npm-typescript]
[![License][github-license]][github-license-url]

This package is an opinionated wrapper of the [react-markdown][react-markdown] package that written by wooorm.

## When should I use this?

The `@ipikuka/react-markdown` provides the `<ReactMarkdown />` component which is an opinionated wrapper of the `<ReactMarkdown />` component of the `react-markdown`, which is a React component to render markdown.

The **remark plugins** used in the `@ipikuka/react-markdown` are:

- remark-definition-list
- remark-emoji
- remark-fix-guillemets
- remark-flexible-code-titles
- remark-flexible-containers
- remark-flexible-markers
- remark-flexible-paragraphs
- remark-gemoji
- remark-gfm
- remark-ins
- remark-smartypants
- remark-supersub
- remark-textr-sync (custom)
- remark-textr-plugins (custom)

The **rehype plugins** used in the `@ipikuka/react-markdown` are:

- rehype-autolink-headings
- rehype-prism-plus
- rehype-slug
- rehype-raw
- rehype-pre-language (custom)

## Installation

This package is suitable for ESM module only. In Node.js (16.0+), install with npm:

```bash
npm install @ipikuka/react-markdown
```

or

```bash
yarn add @ipikuka/react-markdown
```

## Usage

This package is peer dependant with `react`, `@types/react`. So, it is assumed that you have already installed them in your project.

```js
import React from 'react'
import ReactDom from 'react-dom'
import ReactMarkdown from '@ipikuka/react-markdown'

ReactDom.render(<ReactMarkdown># Hello, *world*!</ReactMarkdown>, document.body)
```

## Options

The `@ipikuka/react-markdown` **<ReactMarkdown />** component accepts the `OpinionatedReactMarkdownOptions` which is similar to `ReactMarkdownOptions` of the `react-markdown`, _but a little bit opinionated_.

All options are _optional_. 

```typescript
type OpinionatedReactMarkdownOptions = {
  children?: string; // default: ''
  className?: string; // default: undefined
  components?: Record<string, Component>; // default: {}
  skipHtml?: boolean; // default: false
};
```
See the detailed explanation of the options from the link https://github.com/remarkjs/react-markdown#props

All the other options of the `react-markdown` are opinionated, so you can not set the rest of the options like `remarkPlugins` or `rehypePlugins`. This is why the `@ipikuka/react-markdown` is opinionated, providing some pre-selected plugins.

The omitted options from the official `react-markdown` are represented below (See https://github.com/remarkjs/react-markdown#props).

```typescript
{
  remarkPlugins?: PluggableList | undefined;
  rehypePlugins?: PluggableList | undefined;
  remarkRehypeOptions?: Options | undefined;
  allowedElements?: string[] | undefined;
  disallowedElements?: string[] | undefined;
  allowElement?: AllowElement | undefined;
  unwrapDisallowed?: boolean | undefined;
  sourcePos?: boolean | undefined;
  rawSourcePos?: boolean | undefined;
  includeElementIndex?: boolean | undefined;
  transformLinkUri?: false | TransformLink | null | undefined;
  transformImageUri?: TransformImage | undefined;
}
```

If you think that an omitted option is needed, you are wellcome to open an issue.

## Examples:

All the examples given in the link https://github.com/remarkjs/react-markdown#examples are valid, **but YOU DON'T NEED TO PROVIDE ANY PLUGIN** since the `@ipikuka/react-markdown` provides some pre-selected plugins by default for you.

Needs a playground with single page web application. _(PR is wellcome)_

## Types

This package is fully typed with [TypeScript][typeScript]. The `<ReactMarkdown />` component of the `@ipikuka/react-markdown` accepts `OpinionatedReactMarkdownOptions`.

## Compatibility

It is a `React@^18` compatible package.

## Security

## License

[MIT][license] © ipikuka

### Keywords

[remark][remarknpm] [react-markdown][react-markdown]

[unifiednpm]: https://www.npmjs.com/search?q=keywords:unified
[remarknpm]: https://www.npmjs.com/search?q=keywords:remark
[react-markdown]: https://https://github.com/remarkjs/react-markdown
[typescript]: https://www.typescriptlang.org/
[license]: https://github.com/ipikuka/
[npm-url]: https://www.npmjs.com/package/@ipikuka/react-markdown
[npm-image]: https://img.shields.io/npm/v/@ipikuka/react-markdown
[github-license]: https://img.shields.io/github/license/ipikuka/react-markdown
[github-license-url]: https://github.com/ipikuka/react-markdown/blob/master/LICENSE
[github-build]: https://github.com/ipikuka/react-markdown/actions/workflows/publish.yml/badge.svg
[github-build-url]: https://github.com/ipikuka/react-markdown/actions/workflows/publish.yml
[npm-typescript]: https://img.shields.io/npm/types/react-markdown
