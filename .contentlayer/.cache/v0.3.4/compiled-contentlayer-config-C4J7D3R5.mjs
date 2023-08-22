// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.md`,
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    // slug: { type: "string", required: true },
    img_url: { type: "string", required: true },
    category: { type: "string", required: true }
  },
  computedFields: {
    // url: {
    //   type: "string",
    //   resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    // },
    slug: { type: "string", resolve: (post) => post._raw.flattenedPath }
  }
}));
var contentlayer_config_default = makeSource({ contentDirPath: "posts", documentTypes: [Post] });
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-C4J7D3R5.mjs.map
