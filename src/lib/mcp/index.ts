import { defineMcp } from "@lovable.dev/mcp-js";
import listCommunitiesTool from "./tools/list-communities";
import getCommunityTool from "./tools/get-community";
import listBlogPostsTool from "./tools/list-blog-posts";

export default defineMcp({
  name: "echelon-property-group-mcp",
  title: "Echelon Property Group",
  version: "0.1.0",
  instructions:
    "Read-only tools for Echelon Property Group, a luxury Austin, TX real estate advisory. Use `list_communities` to browse covered neighborhoods, `get_community` for an editorial guide to a specific community, and `list_blog_posts` to surface recent Austin luxury real estate editorial content. All content is public.",
  tools: [listCommunitiesTool, getCommunityTool, listBlogPostsTool],
});
