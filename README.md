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
  support.html            Support page (the URL given to the Store)
_template/              Copy this to start a new app
privacy_AuthBox.html    Redirect kept alive for the old policy URL
```

`_template/` starts with an underscore, so GitHub Pages does not publish it.

## Adding a new app

1. `cp -r _template <appname>` (lowercase, no spaces — it becomes the URL).
2. Replace every `{{PLACEHOLDER}}` in the three files. Search for `{{` to find them all.
3. Copy the AuthBox `<li>` block in `index.html`, point it at the new folder and
   update the name, tagline, blurb and Store link.
4. Commit and push. GitHub Pages rebuilds in about a minute.

The URLs to paste into Partner Center are then:

- Privacy policy — `https://hio-mitos.github.io/<appname>/privacy.html`
- Support — `https://hio-mitos.github.io/<appname>/support.html`

## Renaming or moving a page

Once a URL has been submitted to the Microsoft Store, do not delete it — leave a
redirect at the old path, the way `privacy_AuthBox.html` does. A Store listing
pointing at a dead privacy policy URL can fail certification.

## Styling

All visual changes belong in `assets/style.css`. Pages carry no CSS of their own,
so one edit there restyles the whole site. The palette is defined once in `:root`
and again under `prefers-color-scheme: dark`.
