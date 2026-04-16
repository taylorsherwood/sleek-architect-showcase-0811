import { lazy, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
const Footer = lazy(() => import("@/components/Footer"));
import AboutBlock from "@/components/AboutBlock";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createArticleSchema, createFAQSchema, createBreadcrumbSchema, createBlogPostingSchema } from "@/components/SchemaMarkup";
import { blogPosts } from "@/data/blogPosts";
import { seoBlogPosts } from "@/data/seoBlogPosts";
import AuthorBio from "@/components/AuthorBio";
import BlogCTA from "@/components/BlogCTA";
import RelatedInsights from "@/components/RelatedInsights";
import BlogContent, { extractFAQsFromContent } from "@/components/BlogContent";
import CommunityBoundaryMap from "@/components/CommunityBoundaryMap";

/** Posts that should display a community boundary map below the hero image. */
const BLOG_BOUNDARY_MAPS: Record<string, { slug: string; name: string }> = {
  "best-neighborhoods-near-bee-cave": { slug: "bee-cave", name: "Bee Cave" },
};

const allPosts = [...seoBlogPosts, ...blogPosts];

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = allPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
      <div className="h-12 md:h-20" aria-hidden="true" />
        <div className="pt-32 pb-32">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-2xl sm:text-4xl md:text-6xl font-light text-architectural mb-8">
                Post Not Found
              </h1>
              <Link 
                to="/blog" 
                className="text-minimal text-foreground hover:text-muted-foreground transition-colors duration-300"
              >
                ← BACK TO BLOG
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Extract FAQs — prefer new :::faq block, fall back to legacy "Frequently Asked Questions" markdown section
  let faqs: { question: string; answer: string }[] = extractFAQsFromContent(post.content);
  if (faqs.length === 0 && post.content.includes("Frequently Asked Questions")) {
    const faqContent = post.content.split("Frequently Asked Questions")[1] || "";
    const faqItems = faqContent.match(/### (.+?)\n([\s\S]+?)(?=\n###|$)/g);
    if (faqItems) {
      faqItems.forEach(item => {
        const lines = item.trim().split('\n');
        const question = lines[0].replace('### ', '').trim();
        const answer = lines.slice(1).join(' ').replace(/\s+/g, ' ').trim();
        if (question && answer && answer.length >= 20) {
          faqs.push({ question, answer });
        }
      });
    }
  }

  const postUrl = `https://www.echelonpropertygroup.com/blog/${post.id}`;

  // Skip BlogPosting schema for off-topic posts
  const skipBlogPosting = ["sustainable-architecture-future", "minimalism-modern-living", "urban-planning-community-spaces"].includes(post.id);

  const schemas: Record<string, unknown>[] = [
    createArticleSchema(post.title, post.excerpt, post.date, post.author, post.image, postUrl),
    ...(skipBlogPosting ? [] : [createBlogPostingSchema({ title: post.title, description: post.excerpt, datePublished: post.date, author: post.author, image: post.image, url: postUrl })]),
    createBreadcrumbSchema([
      { name: "Home", url: "https://www.echelonpropertygroup.com/" },
      { name: "Blog", url: "https://www.echelonpropertygroup.com/blog" },
      { name: post.title, url: postUrl }
    ])
  ];
  if (faqs.length > 0) {
    schemas.push(createFAQSchema(faqs));
  }

  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 4);

  // If not enough same-category posts, fill with recent posts from other categories
  const filledRelatedPosts = relatedPosts.length >= 3
    ? relatedPosts
    : [
        ...relatedPosts,
        ...allPosts
          .filter(p => p.id !== post.id && !relatedPosts.find(rp => rp.id === p.id))
          .slice(0, 4 - relatedPosts.length)
      ].slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={post.metaTitle || post.title}
        description={post.excerpt}
        ogType="article"
        noindex={["sustainable-architecture-future", "minimalism-modern-living", "urban-planning-community-spaces"].includes(post.id)}
      />
      {schemas.map((s, i) => <SchemaMarkup key={i} schema={s} />)}
      <Navigation />
      <div className="h-12 md:h-20" aria-hidden="true" />
      
      <article className="pt-32 pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/blog" 
              className="inline-block text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300 mb-12"
            >
              ← BACK TO BLOG
            </Link>
            
            <div className="mb-8">
              <div className="flex flex-wrap items-center text-minimal text-muted-foreground gap-x-4 gap-y-1 mb-6">
                <span className="bg-secondary px-3 py-1 text-foreground">{post.category}</span>
                <span>Published {post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
                <span>•</span>
                <span>By {post.author}</span>
              </div>
              
              <h1 className="text-2xl sm:text-4xl md:text-6xl font-light text-architectural mb-6">
                {post.title}
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            </div>
            
            <div className="w-full aspect-[16/9] mb-12 overflow-hidden">
              <img 
                src={post.heroImage || post.image} 
                alt={`${post.title} - Austin luxury real estate`}
                title={post.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy" decoding="async"
                    />
            </div>

            <BlogContent
              content={post.content}
              afterGlance={
                BLOG_BOUNDARY_MAPS[post.id] ? (
                  <div className="-mx-6 md:mx-0 mt-4 mb-12">
                    <CommunityBoundaryMap
                      imageSrc={`/images/communities/${BLOG_BOUNDARY_MAPS[post.id].slug}-boundary.webp`}
                      communityName={BLOG_BOUNDARY_MAPS[post.id].name}
                    />
                  </div>
                ) : null
              }
            />
            
            <AuthorBio />
            
            {/* Related Posts */}
            {filledRelatedPosts.length > 0 && (
              <div className="mt-20">
                <h2 className="text-2xl font-light text-architectural mb-8">Related Reading</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {filledRelatedPosts.map(relatedPost => (
                    <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`} className="group">
                      <div className="w-full aspect-[4/3] mb-4 overflow-hidden">
                        <img 
                          src={relatedPost.image} 
                          alt={`${relatedPost.title} - Austin real estate insights`}
                          title={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy" decoding="async"
                        />
                      </div>
                      <h4 className="text-lg font-light text-architectural group-hover:text-muted-foreground transition-colors duration-300 mb-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-2">
                        {relatedPost.excerpt}
                      </p>
                      <p className="text-minimal text-muted-foreground">{relatedPost.date} • {relatedPost.readTime}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      <BlogCTA />
      <RelatedInsights maxLinks={5} />
      <AboutBlock />
      <Suspense fallback={<div className="min-h-[100px]" />}><Footer /></Suspense>
    </div>
  );
};

export default BlogPost;
