import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listCommunitiesTool from "./tools/list-communities";
import getCommunityTool from "./tools/get-community";
import listBlogPostsTool from "./tools/list-blog-posts";
import listLeadsTool from "./tools/list-leads";
import updateCommunityTool from "./tools/update-community";

// Build the OAuth issuer from the Supabase project ref. `VITE_SUPABASE_PROJECT_ID`
// is inlined by Vite at build time, keeping the module import-safe (no runtime
// env read at module top level). The fallback keeps the string well-formed
// during the manifest-extract eval, where no token is ever verified.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "echelon-property-group-mcp",
  title: "Echelon Property Group",
  version: "0.2.0",
  instructions:
    "Tools for Echelon Property Group, a luxury Austin, TX real estate advisory. Public read-only tools: `list_communities`, `get_community`, `list_blog_posts`. Admin-only tools (require an Echelon administrator OAuth session): `list_leads` to review recent lead submissions, and `update_community` to edit community editorial content. Admin tools return an authorization error for non-admin sessions.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    listCommunitiesTool,
    getCommunityTool,
    listBlogPostsTool,
    listLeadsTool,
    updateCommunityTool,
  ],
});
