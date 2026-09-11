# hio-mitos.github.io

Documentation and links for the apps I publish on the Microsoft Store.
Live at <https://hio-mitos.github.io>.

## Layout

```
index.html              Homepage — one card per app
assets/style.css        Shared stylesheet. Every page links to it.
authbox/                One folder per app
  index.html              App page: what it does, store link
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
3. Copy the AuthBox `<li>` block in `index.html`, point it at the new folder and
   update the name, tagline, blurb and Store link.
4. Commit and push. GitHub Pages rebuilds in about a minute.

The URLs to paste into Partner Center are then:

- Privacy policy — `https://hio-mitos.github.io/<appname>/privacy.html`
- Support — `https://hio-mitos.github.io/<appname>/support.html`
- Licence (if the listing asks for custom terms) — `https://hio-mitos.github.io/<appname>/license.html`

## Renaming or moving a page

Once a URL has been submitted to the Microsoft Store, do not delete it — leave a
redirect at the old path, the way `privacy_AuthBox.html` does. A Store listing
pointing at a dead privacy policy URL can fail certification.

## Styling

All visual changes belong in `assets/style.css`. Pages carry no CSS of their own,
so one edit there restyles the whole site. The palette is defined once in `:root`
and again under `prefers-color-scheme: dark`.

## Publishing an installer

Installers are **not** committed to this repo. GitHub rejects any file over 100 MB, and
Pages is not built to serve large binaries. Put them in a GitHub Release instead:

1. Repo → **Releases** → **Draft a new release**.
2. Tag: `<appname>-v<version>`, e.g. `authbox-v1.0.0`. Target `main`.
3. Drag the `.exe` into the attachments box. Releases allow up to 2 GB per file.
4. Publish. The asset is then permanently at:
   `https://github.com/Hio-Mitos/hio-mitos.github.io/releases/download/<tag>/<filename>`
5. Point the download button on the app page at that URL, and update the version, size
   and SHA-256 shown beside it.

Get the checksum with `Get-FileHash .\<file>.exe -Algorithm SHA256` and publish it — for a
security app it is what lets someone confirm the download was not tampered with.

## Comments

The support pages embed [Cusdis](https://cusdis.com), a third-party comment widget. It is
a temporary measure: each support page carries a notice saying so and warning that the
widget is outside the app's privacy policy.

To switch it on, create a Cusdis app, then replace `CUSDIS_APP_ID_HERE` with the app ID it
issues (search for it — it appears once per support page). Until that is done the widget
hides itself and shows "not switched on yet" instead of erroring.

When a permanent support channel replaces it, remove the widget `<div>`, its `<script>`
and the `.notice` block from each support page.
