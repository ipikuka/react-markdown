import type { Plugin, Transformer } from "unified";
import type { Root } from "mdast";
import { visit } from "unist-util-visit";
import textr from "textr";

type TextrPlugin = (value: string, options: object) => string | undefined;

type TextrOptions = {
  plugins?: TextrPlugin[];
  options?: object;
};

/**
 * Plugin to improve typography with Textr but synchronously
 */

const plugin: Plugin<[TextrOptions?], Root> = (options) => {
  const plugins = options?.plugins || [];

  const typography = textr(options?.options || {}).use(...plugins);

  const transformer: Transformer<Root> = (tree) => {
    visit(tree, "text", (node) => {
      node.value = typography.exec(node.value);
    });
  };

  return transformer;
};

export default plugin;
