# hio-mitos.github.io

Documentation and links for the apps I publish on the Microsoft Store.
Live at <https://hio-mitos.github.io>.

## Layout

```
index.html              Homepage — one card per app
assets/home.css         Homepage design (its own look, not shared with any app)
assets/theme.js         Light/dark toggle, shared by every page. Loaded in <head>, no defer.
authbox/                One folder per app, each with its own design
  style.css               This app's stylesheet — every page in the folder links to it
  index.html              App page: what it does, where to get it
  privacy.html            Privacy policy (the URL given to the Store)
  license.html            End User License Agreement
  support.html            Support page (the URL given to the Store)
  changelog.html          Release history — every public release, newest first
_template/              Copy this to start a new app
_drafts/                Release entries written ahead of certification
privacy_AuthBox.html    Redirect kept alive for the old policy URL
```

`_template/` and `_drafts/` start with an underscore, so GitHub Pages does not publish them.

## Adding a new app

1. `cp -r _template <appname>` (lowercase, no spaces — it becomes the URL).
2. Replace every `{{PLACEHOLDER}}` in the five files. Search for `{{` to find them all.
3. Copy the AuthBox `<li class="app-item">` block in `index.html`, point it at the new
   folder and update the name, tagline, blurb and links.
4. Commit and push. GitHub Pages rebuilds in about a minute.

The URLs to paste into Partner Center are then:

- Privacy policy — `https://hio-mitos.github.io/<appname>/privacy.html`
- Support — `https://hio-mitos.github.io/<appname>/support.html`
- Licence (if the listing asks for custom terms) — `https://hio-mitos.github.io/<appname>/license.html`

## Renaming or moving a page

Once a URL has been submitted to the Microsoft Store, do not delete it — leave a
redirect at the old path, the way `privacy_AuthBox.html` does. A Store listing
pointing at a dead privacy policy URL can fail certification.

## Distribution

Apps are sold and distributed through the Microsoft Store. No installers — no `.exe`,
no `.msix` — are committed to this repo or attached to releases. The Store listing is
the only download route, and the app page links to it.

Until Microsoft certifies a listing, the app page shows a short "being published" note
in place of the Store button. Replace it with the real link once the listing is live.

Live listings:

- AuthBox — <https://apps.microsoft.com/store/detail/9NTHV4CQ7MMR>
- Clipboard Typer — <https://apps.microsoft.com/store/detail/9PN8744TNJ8V>
- Space Analyzer (listed as "Disk-Space-Analyzer") — <https://apps.microsoft.com/store/detail/9N1S53NNNBLW>

## Release history

Each app's `changelog.html` is the permanent record of its public releases. The Store's
"What's new" field is overwritten on every submission; this page is not.

When a release is submitted:

1. Write its entry in `_drafts/<app>-v<version>.html`, using the same New / Improved /
   Fixed headings as the Store notes, and the same wording.
2. Hold back any page edits that describe the new version's features until it is live.

When certification clears:

1. Set the date it went live, and paste the entry at the top of `changelog.html`, under
   the `NEW RELEASES GO HERE` comment.
2. Update the `Latest:` line on the app page.
3. Commit the entry together with the held page edits, then delete the draft.

Rules: only versions that reached the Store get an entry — internal builds do not. A
published entry is never edited; corrections go in a later release. Changes to the
privacy policy or licence are noted under a "Documents" heading in the release they
shipped with.

## Dates on legal pages

The privacy policy and licence each carry `Effective` and `Last updated` in their header.
Set both to the day the page is published — never a future date, which reads as a document
not yet in force and can be queried during Store certification. Afterwards bump only
`Last updated`, and only when the wording actually changes.

## Contact

`Hio-Mitos@gladiators.city` is the single public contact for every app. It appears in the
homepage footer and on each app's privacy and support page — grep for `gladiators.city`
to find every occurrence if it ever changes.

There is no comment system on the site; support goes through that mailbox.

## Styling and theme

Every app has its own design, and the homepage has a third one:

- `authbox/style.css` — AuthBox: green, rounded cards.
- `clipboard-typer/style.css` — Clipboard Typer: blue banner header, Segoe UI.
- `space-analyzer/style.css` — Space Analyzer: amber on charcoal, treemap mosaic header.
- `assets/home.css` — the homepage: warm paper, serif headings, and each app card in that
  app's own accent colour.

Pages carry no CSS of their own; an app's pages all link to the `style.css` in their
folder, so one edit restyles that app and nothing else. A new app starts with
`_template/style.css` (a copy of AuthBox's) — restyle it, and add the app's accent colours
as an `.app-<slug>` rule in `assets/home.css` for its homepage card.

Every stylesheet must keep three things so the shared toggle works: the palette defined on
`:root`, again under `prefers-color-scheme: dark` guarded by `:not([data-theme="light"])`,
and again under `:root[data-theme="dark"]`; plus the `.theme-toggle` rules.

`assets/theme.js` draws the toggle button and remembers the choice in `localStorage`.
It must stay in `<head>` without `defer`, or pages flash the wrong palette before the
stored theme is applied.

Use system fonts only. Web fonts would make every visit send the visitor's IP address to
a third party, which sits badly with apps whose selling point is that nothing leaves the
device.
