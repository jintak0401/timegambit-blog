import { Literal, Node, Parent } from 'unist';
import { visit } from 'unist-util-visit';

interface ImageNode extends Parent {
  url: string;
  alt: string;
  name: string;
  attributes: (Literal & { name: string })[];
}

export default function remarkImgToJsx() {
  return (tree: Node) => {
    visit(
      tree,
      // only visit p tags that contain an img element
      (node): node is Parent =>
        node.type === 'paragraph' &&
        (node as Parent).children.some((n) => n.type === 'image'),
      (node) => {
        const imageNode = (node as Parent).children.find(
          (n) => n.type === 'image'
        ) as ImageNode;

        imageNode.attributes = [
          { type: 'mdxJsxAttribute', name: 'alt', value: imageNode.alt },
          { type: 'mdxJsxAttribute', name: 'src', value: imageNode.url },
        ];
        (node as Parent).type = 'div';
        (node as Parent).children = [imageNode];
      }
    );
  };
}
