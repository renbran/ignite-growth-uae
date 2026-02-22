import { Helmet } from "react-helmet-async";

interface ArticleMeta {
  publishedTime: string;
  author: string;
  section: string;
}

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical: string;
  ogType?: "website" | "article";
  ogImage?: string;
  article?: ArticleMeta;
  schema?: object | object[];
  noIndex?: boolean;
}

const BASE_URL = "https://sgctech.ai";
const DEFAULT_OG_IMAGE = `${BASE_URL}/sgc-og.svg`;
const SITE_NAME = "SGC TECH AI";

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  article,
  schema,
  noIndex = false,
}: SEOProps) => {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const schemaArray = schema
    ? Array.isArray(schema)
      ? schema
      : [schema]
    : null;

  return (
    <Helmet>
      {/* Core */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={`${title} - ${SITE_NAME}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@SGCTECHAI" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${title} - ${SITE_NAME}`} />

      {/* Article-specific Open Graph */}
      {article && (
        <>
          <meta
            property="article:published_time"
            content={article.publishedTime}
          />
          <meta property="article:author" content={article.author} />
          <meta property="article:section" content={article.section} />
        </>
      )}

      {/* JSON-LD Schema */}
      {schemaArray && (
        <script type="application/ld+json">
          {JSON.stringify(schemaArray)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
