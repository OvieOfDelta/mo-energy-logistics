# M. O. ENERGY LOGISTICS Website

Static website (HTML, CSS, JS). No build step.

```
index.html   page markup, legal dialogs, cookie banner
css/         styles
js/          site logic + cookie consent
assets/      images and fonts
_headers     Netlify security and caching headers
```

## Deploy with Netlify

1. Push these files to a GitHub repository (files at the repo root).
2. In Netlify: Add new site > Import an existing project > GitHub > pick the repo.
3. Leave build command empty; publish directory is the repo root (`/`). Deploy.
4. Domain: Site configuration > Domain management > Add custom domain
   (`moenergylogistics.com.ng`, also add `www`). Netlify shows the exact DNS
   records to add. Either point nameservers to Netlify, or keep Whogohost
   nameservers and add the records there (this keeps Whogohost email working).
5. HTTPS is issued automatically once DNS is verified.

Every push to GitHub redeploys the site automatically.

## Before going live

- Replace `mosesolonode@yahoo.com` in `index.html` (4 places) once the business email works.
- Confirm the 24-month retention period in the Privacy Policy.
- Add your CAC RC number to the footer / Privacy Policy if applicable.
- Have a Nigerian lawyer review the Privacy Policy, Cookie Policy and Terms.

## Analytics

None is installed. If you add one, load it inside `loadAnalytics()` in `js/main.js`
so it only runs after the visitor opts in, and name it in the Cookie and Privacy Policies.
