# Falcon Trades website

Personal trading website: a public/private journal, playbooks, research, tools shop, videos and an About page.

- **Site:** Astro (static, fast, free to host)
- **Hosting:** Cloudflare Pages (free)
- **Journal desk:** Pages CMS (free), signing in with GitHub

## How private entries work

Every journal entry has a **Visibility** setting: *Private (only me)* or *Public (on the website)*.
Private entries are saved in your **private** GitHub repository and are never built into the website.
Anything not explicitly marked Public is treated as private.

---

## Launch guide (about 20 minutes, one time)

### 1. Create a GitHub account
1. Go to github.com and sign up (free). Turn on two-factor authentication in Settings → Password and authentication.

### 2. Put the website in a private repository
1. Click **+ → New repository**. Name it `falcon-trades`, choose **Private**, and click **Create repository**.
2. On the next page click **uploading an existing file**.
3. Unzip `falcon-trades.zip` on your computer, open the folder, select **everything inside it** and drag it into the upload area.
4. Check that `.pages.yml` appears in the file list (it starts with a dot, so some computers hide it). Then click **Commit changes**.

### 3. Publish it free on Cloudflare
1. Create a free account at dash.cloudflare.com.
2. In the left sidebar go to **Build → Compute** (older guides call it "Workers & Pages") and click **Create application**.
3. Connect GitHub (choose *Only select repositories* → `falcon-trades`) and select the repository.
4. Settings: build command `npm run build`, deploy command `npx wrangler deploy` (the defaults are fine).
   The included `wrangler.jsonc` tells Cloudflare to publish the `dist` folder as a static site.
5. Deploy. Your site goes live at `https://falcon-trades.<your-account>.workers.dev`.
6. Open `astro.config.mjs` in GitHub and set `site:` to that address (this makes link previews on social media work).

### 4. Set up your Journal Desk
1. Go to app.pagescms.org and **Sign in with GitHub**.
2. Install the Pages CMS GitHub app when asked, and give it access to the `falcon-trades` repository only.
3. Open `falcon-trades`. You'll see: **Journal, Playbooks, Research, Tools shop, Videos, About me, Site settings & social links**.
4. Start with **Site settings & social links**: add your YouTube, Facebook, Instagram, TikTok, X and email. Empty ones stay hidden.
5. Then fill in **About me** and upload your portrait.

Every time you save in the desk, Cloudflare rebuilds the site automatically (about a minute).

---

## Day to day

- **New journal entry:** Journal → Add an entry → choose Visibility, type (daily/weekly/monthly/quarterly) and markets → Save.
- **Sell a tool:** create the product on Gumroad or Lemon Squeezy, then paste its checkout link and price into Tools shop.
- **Add a video:** Videos → paste the YouTube link.
- **Playbooks and Research:** tick *Show on website* when ready; attach a PDF if you have one.
- **Newsletter:** paste a Substack/Beehiiv/Buttondown signup link in Site settings to show the signup box.

Before going live, replace or delete the starter "Welcome to the journal" entry and add real descriptions to the three tools.

## Custom domain (optional, later)
Buy a domain (any registrar, or Cloudflare Registrar), then in Cloudflare Pages → your project → **Custom domains**, add it.

## Working on the code (optional)
```
npm install
npm run dev     # preview at http://localhost:4321
npm run build   # production build into dist/
```
Requires Node 22. Content lives in `src/content/`, settings in `src/data/`, styles in `src/styles/global.css`.
