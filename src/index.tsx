import ReactMarkdown, {
  type Options as ReactMarkdownOptions,
} from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkGemoji from "remark-gemoji";
import remarkEmoji from "remark-emoji";
import remarkSuperSub from "remark-supersub";
import smartypants from "remark-smartypants";
import remarkCodeTitles from "remark-flexible-code-titles";
import remarkFixGuillemets from "remark-fix-guillemets";
import remarkFlexibleContainers, {
  type FlexibleContainerOptions,
} from "remark-flexible-containers";
import {
  remarkDefinitionList,
  defListHastHandlers,
} from "remark-definition-list";
import remarkFlexibleParagraphs from "remark-flexible-paragraphs";
import remarkFlexibleMarkers, {
  type FlexibleMarkerOptions,
} from "remark-flexible-markers";
import remarkIns from "remark-ins";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings, { type Options } from "rehype-autolink-headings";
import rehypePrismPlus from "rehype-prism-plus";
import rehypeRaw from "rehype-raw";
import { h } from "hastscript";

import rehypePreLanguage from "./lib/rehype-pre-language.js";
import remarkTextr from "./lib/remark-textr-sync.js";
import {
  trademarks,
  typographic,
  math,
  guillemets,
  orEqual,
} from "./lib/remark-textr-plugins.js";

/**
 * Returns the Title Case of a given string
 * https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
 */
function toTitleCase(str: string | undefined) {
  if (!str) return;

  return str.replace(/\b\w+('\w{1})?/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
}

type OpinionatedReactMarkdownOptions = Pick<
  ReactMarkdownOptions,
  "children" | "className" | "components" | "skipHtml"
>;

export { type OpinionatedReactMarkdownOptions };

/*
type ReactMarkdownOptions = {
    children: string;
    remarkPlugins?: PluggableList | undefined;
    rehypePlugins?: PluggableList | undefined;
    remarkRehypeOptions?: Options | undefined;
    className?: string | undefined;
    allowedElements?: string[] | undefined;
    disallowedElements?: string[] | undefined;
    allowElement?: AllowElement | undefined;
    unwrapDisallowed?: boolean | undefined;
    sourcePos?: boolean | undefined;
    rawSourcePos?: boolean | undefined;
    skipHtml?: boolean | undefined;
    includeElementIndex?: boolean | undefined;
    transformLinkUri?: false | TransformLink | null | undefined;
    transformImageUri?: TransformImage | undefined;
    components?: Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents> | undefined;
}

type OpinionatedReactMarkdownOptions = {
    children: string; // Markdown
    className?: string | undefined; // Wrap in a `div` with this class name.
    components?: Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents> | undefined; // Map tag names to components.
    skipHtml?: boolean | undefined; // Ignore HTML in markdown completely (default: `false`)
}
*/

/**
 *
 * Component to render markdown. Opinionated ReactMarkdown wrapper.
 *
 */
const OpinionatedReactMarkdown = (
  props: Readonly<OpinionatedReactMarkdownOptions>,
): JSX.Element => {
  return (
    <ReactMarkdown
      {...props}
      remarkPlugins={[
        remarkFixGuillemets,
        [
          smartypants,
          {
            dashes: "oldschool",
          },
        ],
        [
          remarkFlexibleMarkers,
          { doubleEqualityCheck: "=:=" } as FlexibleMarkerOptions,
        ],
        remarkIns,
        [
          remarkGfm, // Github Flavored Markup
          {
            singleTilde: false,
          },
        ],
        [
          remarkTextr,
          {
            plugins: [orEqual, guillemets, trademarks, typographic, math], // order is matter
          },
        ],
        remarkDefinitionList,
        remarkFlexibleParagraphs,
        remarkSuperSub,
        remarkGemoji,
        [
          remarkEmoji,
          {
            padSpaceAfter: false,
            emoticon: true,
          },
        ],
        [
          remarkFlexibleContainers,
          {
            title: () => null,
            containerTagName: "admonition",
            containerProperties: (type, title) => {
              return {
                ["data-type"]: type?.toLowerCase(),
                ["data-title"]: toTitleCase(title),
              };
            },
          } as FlexibleContainerOptions,
        ],
        remarkCodeTitles,
      ]}
      rehypePlugins={[
        rehypeRaw, // to support html in markdown
        rehypePreLanguage, // to add "data-language" property to pre elements.
        rehypeSlug, // to add ids to headings.
        [
          rehypeAutolinkHeadings,
          {
            behavior: "prepend",
            properties: { className: "anchor-copylink" },
            content: () => [h("icon.copylink")],
          } as Options,
        ], // to add links to headings with ids back to themselves.
        [
          rehypePrismPlus,
          {
            ignoreMissing: true,
          },
        ],
      ]}
      remarkRehypeOptions={{
        handlers: {
          ...defListHastHandlers,
        },
      }}
    />
  );
};

export default OpinionatedReactMarkdown;
