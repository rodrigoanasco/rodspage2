# Projects page

Projects follows the About page’s journal style: the same page background, serif headings,
underlined links, small captions, and open layouts. All six existing project entries,
seven videos (including Unify’s development process), three Learnverse photos, the PDF,
and existing project anchors remain available. There are no scroll reveal effects.

The research entry uses Rodrigo’s supplied title, contribution description, and OpenReview
link. OpenReview returned a browser challenge during verification; no venue, acceptance
status, publication date, or additional authorship claims were inferred.

## Media behavior

- Videos mount only after a visitor presses Play. Scrolling alone does not request MP4 data.
- Activated videos use native controls, start muted, and do not loop. Playback pauses when
  the video leaves the viewport, the tab becomes hidden, or another media player starts.
- Previews have a reserved aspect ratio. Small WebP images replace video decoding while browsing.
- Unify’s additional process video is available in a native disclosure.
- Photos use smaller WebP derivatives with intrinsic dimensions, lazy loading, and original proportions.
- Projects JavaScript and CSS load as a separate route chunk.

Original assets remain intact. Regenerate the derivatives from `portfolio/` with:

```sh
node scripts/prepare-project-media.mjs
```

The script uses the installed Playwright Chromium and a temporary Vite server on port 5177.
It writes genuine video frames and resized photos to `public/projects/`, plus a size/dimension
manifest. No third-party image service or generated imagery is involved.

## Verification

Local headless Chromium evidence, captured before and after the change:

| Check | Before | After |
| --- | --- | --- |
| Video sources attached shortly after opening | 3 | 0 |
| Video sources attached after scrolling the entries | 7 | 0 |
| Videos playing after scrolling without clicking | 2 | 0 |
| MP4 requests while browsing without clicking | Videos loaded automatically | 0 |
| Combined three project photo files | 3,543,675 bytes | 195,928 bytes |

The photo derivatives are about 94% smaller. This measures media behavior and file sizes,
not real-device frame rates or a claimed production load-time percentage. Original MP4s
retain their existing sizes when a visitor chooses to play them, including the roughly
40 MB Hungry Doug demo.

`tests/projects-page.spec.js` covers responsive layouts, both themes, loaded previews,
the paper/PDF links, zero passive video requests, project anchors, requested playback,
offscreen/player coordination, and failed-video recovery. Existing navigation and privacy
tests cover the shared layout. Screenshots and network observations live in the ignored
`.impeccable/review/` directory and are not website assets.

The design detector flags Inter as common. It is intentionally retained to match the
already approved About page and the existing site typography.
