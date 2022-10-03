import yaml from 'js-yaml';
import { Parent } from 'unist';
import { visit } from 'unist-util-visit';

export default function extractFrontmatter() {
  // @ts-ignore
  return (tree: Parent, file) => {
    visit(tree, 'yaml', (node: Parent) => {
      // @ts-ignore
      file.data.frontmatter = yaml.load(node.value);
    });
  };
}
