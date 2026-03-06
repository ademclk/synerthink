# Search Monitoring Checklist

Use this after launches, blog releases, or sitemap changes.

## Google

- Confirm the canonical page returns `200`.
- Open Google Search Console and run URL Inspection for the changed page.
- Request indexing only for materially changed pages.
- Check `Sitemaps` and confirm `https://synerthink.com/sitemap.xml` was fetched successfully.
- Review `Pages` / indexing coverage for newly discovered or excluded URLs.
- Review `Performance` after 24-72 hours for impressions, clicks, and query changes.

## Bing

- Confirm the canonical page returns `200`.
- Open Bing Webmaster Tools and verify the sitemap is healthy.
- Confirm the IndexNow key file is reachable at the site root.
- Run `npm run geo:indexnow` after production deploys to push changed URLs.
- Review Search Performance for query and page changes.
- Review AI Performance for Bing AI visibility and citation movement.

## Release-Day Checks

- Verify `https://synerthink.com/sitemap.xml` includes the new URL.
- Verify `https://synerthink.com/feed.xml` and `https://synerthink.com/atom.xml` update with the latest post.
- Verify `https://synerthink.com/llms.txt` still reflects the newest canonical content.
- Verify the IndexNow key file responds at `https://synerthink.com/{key}.txt`.

## Cadence

- Same day: URL Inspection, sitemap check, IndexNow submission.
- 48-72 hours: indexing and performance review.
- Weekly: Google/Bing performance review and AI visibility review.
