import { NextSeo } from "next-seo";
import Navbar from "./Navbar";

interface Props {
  title: string;
}

export default function Container({ title }: Props) {
  return (
    <>
      <NextSeo
        title={title}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/Logo.png",
          },
        ]}
        additionalMetaTags={[
          {
            name: "title",
            content: "Shortl | Make your url shorter!",
          },
          {
            name: "description",
            content:
              "Shortl is a website where you can short your URL's for free!",
          },
          {
            property: "og:type",
            content: "website",
          },
          {
            property: "og:url",
            content: "https://shortl.netlify.app/",
          },
          {
            property: "og:title",
            content: "Shortl | Make your url shorter!",
          },
          {
            property: "og:description",
            content:
              "Shortl is a website where you can short your URL's for free!",
          },
          {
            property: "og:image",
            content: "/Logo.png",
          },
          {
            property: "twitter:card",
            content: "summary_large_image",
          },
          {
            property: "twitter:url",
            content: "https://shortl.netlify.app/",
          },
          {
            property: "twitter:title",
            content: "Shortl | Make your url shorter!",
          },
          {
            property: "twitter:description",
            content:
              "Shortl is a website where you can s  hort your URL's for free!",
          },
          {
            property: "twitter:image",
            content: "/Logo.png",
          },
        ]}
      />
      <Navbar />
    </>
  );
}
