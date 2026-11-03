from html.parser import HTMLParser
from pathlib import Path
import unittest
from urllib.parse import unquote, urlsplit
import xml.etree.ElementTree as ET


ROOT = Path(__file__).resolve().parents[1]
POSTS = [
    "user-avatar", "webpack", "block-level-links", "target-blank",
    "social-sharing", "plectica", "take-home-assignments", "pin", "chips",
    "hash", "uniq", "flatten", "uyrobot", "interview-trivia",
    "why-i-hate-images",
]
ROUTES = {"/", "/about/", "/archive/", "/404.html"}
ROUTES.update(f"/{slug}/" for slug in POSTS)
ATOM = {"a": "http://www.w3.org/2005/Atom"}


def local_file(route):
    path = ROOT / unquote(route).lstrip("/")
    return path / "index.html" if route.endswith("/") else path


class Document(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.tags = []
        self.feed(source)

    def elements(self, tag, **attributes):
        return [
            attrs for name, attrs in self.tags
            if name == tag and all(attrs.get(k) == v for k, v in attributes.items())
        ]

    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))


class StaticSiteTests(unittest.TestCase):
    def test_routes_and_plain_html(self):
        actual = {
            "/" + str(path.relative_to(ROOT)).removesuffix("index.html")
            for path in ROOT.rglob("*.html")
        }
        self.assertEqual(actual, ROUTES)
        self.assertTrue((ROOT / ".nojekyll").is_file())
        for route in ROUTES:
            with self.subTest(route=route):
                source = local_file(route).read_text()
                self.assertTrue(source.startswith("<!DOCTYPE html>"))
                self.assertNotIn("{%", source)
                self.assertNotIn("{{", source)
                self.assertNotIn('name="generator" content="Jekyll', source)
                doc = Document(source)
                self.assertTrue(doc.elements("main"))
                self.assertEqual(len(doc.elements("header", **{"class": "Header"})), 1)
                self.assertEqual(len(doc.elements("footer", **{"class": "Footer"})), 1)
                self.assertTrue(doc.elements("link", rel="stylesheet", href="/public/styles.css"))
                self.assertTrue(doc.elements("link", rel="canonical", href="https://adiaz.uy" + route))
                self.assertTrue(doc.elements("link", rel="alternate", href="/atom.xml"))

    def test_local_links_and_assets(self):
        for route in ROUTES:
            doc = Document(local_file(route).read_text())
            for tag, attrs in doc.tags:
                for attribute in ("href", "src"):
                    value = attrs.get(attribute, "")
                    url = urlsplit(value)
                    if url.netloc not in ("", "adiaz.uy") or url.scheme not in ("", "https", "http"):
                        continue
                    if not url.path:
                        continue
                    with self.subTest(route=route, link=value):
                        self.assertTrue(url.path.startswith("/"), value)
                        self.assertTrue(local_file(url.path).is_file(), value)
        self.assertEqual((ROOT / "CNAME").read_text().strip(), "adiaz.uy")
        self.assertTrue((ROOT / "Resume.pdf").is_file())

    def test_post_order_and_navigation(self):
        home = Document((ROOT / "index.html").read_text())
        self.assertEqual(len(home.elements("article", **{"class": "Post"})), len(POSTS))
        archive = Document((ROOT / "archive/index.html").read_text())
        self.assertEqual(
            [a["href"] for a in archive.elements("a", **{"class": "lead Archive__Item__Link"})],
            [f"/{slug}/" for slug in POSTS],
        )
        for index, slug in enumerate(POSTS):
            doc = Document(local_file(f"/{slug}/").read_text())
            previous = doc.elements("link", rel="prev")
            following = doc.elements("link", rel="next")
            self.assertEqual(
                [link["href"] for link in previous],
                ["https://adiaz.uy/" + POSTS[index + 1] + "/"] if index + 1 < len(POSTS) else [],
            )
            self.assertEqual(
                [link["href"] for link in following],
                ["https://adiaz.uy/" + POSTS[index - 1] + "/"] if index else [],
            )
            links = [a.get("href") for a in doc.elements("a") if "Pagination__Item" in a.get("class", "")]
            self.assertEqual(links, [urlsplit(link["href"]).path for link in previous + following])
        for route in ("/about/", "/archive/"):
            doc = Document(local_file(route).read_text())
            active = [a["href"] for a in doc.elements("a") if "Header__Nav__Link--active" in a.get("class", "")]
            self.assertEqual(active, [route])

    def test_feed_and_content_copies(self):
        feed = ET.parse(ROOT / "atom.xml").getroot()
        entries = feed.findall("a:entry", ATOM)
        self.assertEqual(
            [urlsplit(entry.find("a:link", ATOM).get("href")).path for entry in entries],
            [f"/{slug}/" for slug in POSTS],
        )
        home = (ROOT / "index.html").read_text()
        for slug, entry in zip(POSTS, entries):
            content = entry.findtext("a:content", namespaces=ATOM).strip()
            with self.subTest(post=slug):
                self.assertIn(content, local_file(f"/{slug}/").read_text())
                self.assertIn(content, home)

    def test_sitemap(self):
        sitemap = ET.parse(ROOT / "sitemap.xml").getroot()
        urls = sitemap.findall("{http://www.sitemaps.org/schemas/sitemap/0.9}url")
        paths = {
            urlsplit(url.findtext("{http://www.sitemaps.org/schemas/sitemap/0.9}loc")).path
            for url in urls
        }
        self.assertEqual(paths, (ROUTES - {"/404.html"}) | {"/Resume.pdf"})


if __name__ == "__main__":
    unittest.main()
