import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  keywords?: string;
  schema?: Record<string, any>;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Games & Connect - Outdoor Games and Social Events in Ghana',
  description = 'Join Games & Connect for exciting outdoor games, social events, and team building activities in Ghana. Connect with like-minded individuals and explore travel adventures.',
  canonical = 'https://gamesandconnect.com',
  ogType = 'website',
  ogImage = 'https://res.cloudinary.com/drkjnrvtu/image/upload/v1746915383/_MG_2106_epgam5.jpg',
  keywords = 'outdoor games Ghana, social events in Accra, travel and adventure Ghana, young people events Ghana, Ghana community events, games and connect Ghana, fun activities Ghana, networking events Ghana',
  schema,
}) => {
  const siteTitle = title.includes('Games & Connect') ? title : `${title} | Games & Connect`;
  
  // Default schema for organization
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Games and Connect",
    "url": "https://gamesandconnect.com",
    "logo": "https://gamesandconnect.com/logo.png",
    "description": "Community events, outdoor games, and travel adventures for young people in Ghana",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Accra",
      "addressRegion": "Greater Accra",
      "addressCountry": "Ghana"
    },
    "sameAs": [
      "https://www.instagram.com/gamesandconnect",
      "https://twitter.com/gamesandconnect"
    ]
  };

  // Use provided schema or default
  const schemaData = schema || defaultSchema;
  
  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Games and Connect" />
      <meta property="og:locale" content="en_GH" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional meta tags for better SEO */}
      <meta name="geo.region" content="GH" />
      <meta name="geo.placename" content="Accra" />
      <meta name="author" content="Games and Connect" />
      
      {/* Schema.org JSON-LD structured data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default SEO;
