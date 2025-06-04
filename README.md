This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## A sample digital marketplace Using Next.js

 **A digital marketplace web app where users can browse, search, and purchase**

- Show the product list with infinite scroll
- User should be able to filter.
- Support sorting
- Support Keyword Search
- Support tests


### Following Design System
 we use the idea of [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) as a part of building a web page.

 Basic Terminology
* Atom - A single and the most basic entity in our system. This can be anything, be it a single image or a simple piece of text indicating a headline/subheadline.

* Molecules - Group of atoms forms a molecule. A combination of an image and a headline can form a card, which is indeed a molecu****le.
`Atom + Atom = Molecules`

* Row - Group of molecules forms a row. A couple of card groups arranged in some order can form a row. This can be the highest entity level in our system where multiple rows form a web page.
`Molecule + Molecule = Organisms`.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployed on Vercel

link : https://connect-alpha-nine.vercel.app/

### Available Scripts

```bash
npm run dev
npm run build
npm run test

```



