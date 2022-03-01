# :speech_balloon: Obrol :speech_balloon:

> Share your opinion, but with blockchain (a twitter blockchain clone)

### [Live Site](https://obrol.vercel.app/)

## Environment Variables

### `client`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_TOKEN=
NEXT_PUBLIC_PINATA_API_KEY=
NEXT_PUBLIC_PINATA_API_SECRET=
```

### `smart_contract`:

```
ALCHEMY_API_KEY_URL=
PRIVATE_KEY=
```

## Available Scripts

1. Run `npm install` at the root of each directory: `client`, `smart_contract`, and `studio`
2. Run `npm run rinkeby` in `smart_contract` directory to deploy smart contract on rinkeby testnet
3. Run `npm run dev` in `client` directory to start the project on http://localhost:3000
4. Run `sanity start` in `studio` directory to see the database at http://localhost:3333
5. Start coding!

## Built Using

- [Alchemy](https://www.alchemy.com/)
- [Ethers](https://ethers.org/)
- [Hardhat](https://hardhat.org/)
- [Next.js](https://nextjs.org/)
- [Pinata](https://app.pinata.cloud/)
- [Sanity](https://www.sanity.io/)
- [Tailwindcss](https://tailwindcss.com/)
- [Vercel](https://vercel.com)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`with-tailwindcss`](https://tailwindcss.com/docs/guides/nextjs), and the smart contract is deployed to Rinkeby Testnet: [Etherscan][contractaddress].

[contractaddress]: https://rinkeby.etherscan.io/address/0xB1F89Cf8eFc570004046A1Dc6Ce16D877A804772
