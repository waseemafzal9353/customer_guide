/* eslint-disable no-restricted-syntax */
export default function findObjectBySlug(tree, slug) {
  if (tree && slug) {
    for (const node of tree) {
      if (node?.slug === slug) {
        return node;
      }
      if (Array.isArray(node?.child) && node?.child.length > 0) {
        const foundInChild = findObjectBySlug(node?.child, slug);
        if (foundInChild) {
          return foundInChild;
        }
      }
    }
  }
  return null;
}
