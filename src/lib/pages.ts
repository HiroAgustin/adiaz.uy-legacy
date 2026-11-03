const legacyDocuments = import.meta.glob("../content/pages/*.html", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

export interface LegacyPage {
  slug: string;
  title: string;
  description: string;
  canonical: string;
  content: string;
  header: string;
  footer: string;
  isArticle: boolean;
  publishedAt?: string;
  previous?: string;
  next?: string;
  structuredData?: string;
}

function match(source: string, expression: RegExp): string | undefined {
  return expression.exec(source)?.[1];
}

function extractFragment(source: string, tag: string): string {
  return match(source, new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i")) ?? "";
}

function extractAttribute(
  source: string,
  tag: string,
  attribute: string,
  value: string,
  resultAttribute: string,
): string | undefined {
  const tagPattern = new RegExp(
    `<${tag}\\b(?=[^>]*\\b${attribute}=["']${value}["'])[^>]*\\b${resultAttribute}=["']([^"']*)["'][^>]*>`,
    "i",
  );
  return match(source, tagPattern);
}

function markActiveNavigation(header: string, slug: string): string {
  return header.replace(
    /<a class="Header__Nav__Link(?: Header__Nav__Link--active)?\s*"([\s\S]*?)>/g,
    (anchor, attributes: string) => {
      const href = /href="([^"]+)"/.exec(attributes)?.[1];
      const active = href === `/${slug}/`;
      return anchor.replace(
        /class="[^"]*"/,
        `class="Header__Nav__Link${active ? " Header__Nav__Link--active" : ""}"`,
      );
    },
  );
}

export function getLegacyPages(): LegacyPage[] {
  const homeSource = legacyDocuments["../content/pages/home.html"];
  if (!homeSource) {
    throw new Error("The home page is required to build the site.");
  }

  const sharedHeader = extractFragment(homeSource, "header");
  const sharedFooter = extractFragment(homeSource, "footer");

  return Object.entries(legacyDocuments)
    .filter(([sourcePath]) => !sourcePath.endsWith("/404.html"))
    .map(([sourcePath, source]) => {
      const file = sourcePath.split("/").at(-1) ?? "";
      const slug = file === "home.html" ? "" : file.slice(0, -".html".length);
      const titleText = match(source, /<title>([\s\S]*?)<\/title>/i) ?? "adiaz.uy";
      const title = titleText.replace(/\s*[·&]middot; adiaz\.uy\s*$/, "").trim();
      const description =
        extractAttribute(source, "meta", "name", "description", "content") ??
        "Agustín Díaz (@HiroAgustin) · Web Development Blog.";
      const canonical = extractAttribute(source, "link", "rel", "canonical", "href") ??
        (slug ? `https://adiaz.uy/${slug}/` : "https://adiaz.uy/");
      const structuredData = match(
        source,
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/i,
      )?.trim();

      return {
        slug,
        title,
        description,
        canonical,
        content: extractFragment(source, "main"),
        header: markActiveNavigation(sharedHeader, slug),
        footer: sharedFooter,
        isArticle: /<meta property="og:type" content="article"/i.test(source),
        publishedAt: extractAttribute(
          source,
          "meta",
          "property",
          "article:published_time",
          "content",
        ),
        previous: extractAttribute(source, "link", "rel", "prev", "href"),
        next: extractAttribute(source, "link", "rel", "next", "href"),
        structuredData,
      };
    });
}

export function getNotFoundPage(): LegacyPage {
  const source = legacyDocuments["../content/pages/404.html"];
  if (!source) {
    throw new Error("The not-found page is required to build the site.");
  }

  const home = getLegacyPages().find((page) => page.slug === "");

  if (!home) {
    throw new Error("The home page is required to build the not-found page.");
  }

  return {
    ...home,
    title: "404: Page not found",
    canonical: "https://adiaz.uy/404.html",
    content: extractFragment(source, "main"),
    structuredData: match(
      source,
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/i,
    )?.trim(),
  };
}
