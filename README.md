# hio-mitos.github.io

Documentation and links for the apps I publish on the Microsoft Store.
Live at <https://hio-mitos.github.io>.

## Layout

```
index.html              Homepage — one card per app
assets/style.css        Shared stylesheet. Every page links to it.
assets/theme.js         Light/dark toggle. Loaded in <head>, no defer.
authbox/                One folder per app
  index.html              App page: what it does, where to get it
  privacy.html            Privacy policy (the URL given to the Store)
  license.html            End User License Agreement
  support.html            Support page (the URL given to the Store)
_template/              Copy this to start a new app
privacy_AuthBox.html    Redirect kept alive for the old policy URL
```

`_template/` starts with an underscore, so GitHub Pages does not publish it.

## Adding a new app

1. `cp -r _template <appname>` (lowercase, no spaces — it becomes the URL).
2. Replace every `{{PLACEHOLDER}}` in the four files. Search for `{{` to find them all.
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

All visual changes belong in `assets/style.css`. Pages carry no CSS of their own, so one
edit there restyles the whole site. The palette is defined once in `:root`, again under
`prefers-color-scheme: dark`, and again under `:root[data-theme="dark"]` so a visitor's
explicit choice beats their system setting.

`assets/theme.js` draws the toggle button and remembers the choice in `localStorage`.
It must stay in `<head>` without `defer`, or pages flash the wrong palette before the
stored theme is applied.
