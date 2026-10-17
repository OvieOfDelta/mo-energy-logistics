# M. O. ENERGY LOGISTICS Website

Static website (HTML, CSS, JS) hosted on GitHub Pages. No build step.

```
index.html     page markup, legal dialogs, cookie banner, forms
css/style.css  styles
js/main.js     site logic, form sending (Web3Forms), cookie consent
images/        every picture you may want to swap (see below)
assets/fonts/  icon fonts (do not edit)
favicon.ico    browser-tab icon
CNAME          tells GitHub Pages the custom domain (keep it)
.nojekyll      tells GitHub Pages to serve the files as they are (keep it)
```

## Changing images

Replace the file inside `images/` and keep the SAME file name:

| File               | Where it shows                         |
|--------------------|----------------------------------------|
| `hero-bg.jpg`      | Hero (top banner) background           |
| `ceo.jpg`          | C.E.O. photo (square works best)       |
| `logo.png`         | Header and footer logo                 |
| `favicon-*.png`, `apple-touch-icon.png`, `favicon.ico` | Browser tab / phone icons |

GitHub Pages caches files for a few minutes, so a replaced image can take a little while to appear (a hard refresh helps).

## Contact and quote forms (email)

Both forms are delivered by Web3Forms (free plan, 250 messages a month).
1. Go to https://web3forms.com, enter the email that should receive messages, and copy the access key emailed to you.
2. Open `js/main.js`, find `WEB3FORMS_KEY` and paste the key between the quotes (already done for the current key).
3. Commit. Submit a test from the live site and check the inbox (and spam folder).
The key is public by design; it can only route messages to that inbox.

## Email address (ImprovMX forwarding)

DNS is at Whogohost. In the Whogohost DNS panel add the two MX records and one TXT (SPF) record ImprovMX shows you,
and delete any old default MX record. Do not create a second SPF record; merge into the existing one if there is one.

## GitHub Pages and the domain

- Repo > Settings > Pages: deploy from the `main` branch, custom domain `www.moenergylogistics.com.ng`, tick Enforce HTTPS when offered.
- Whogohost DNS: `CNAME` for `www` pointing to `YOUR-USERNAME.github.io`, plus four `A` records on the main domain
  pointing to GitHub Pages' addresses listed at docs.github.com (Pages > custom domains).

## Before going live

- Confirm the 24-month retention period in the Privacy Policy.
- Add your CAC RC number to the footer / Privacy Policy if applicable.
- Have a Nigerian lawyer review the Privacy Policy, Cookie Policy and Terms.
