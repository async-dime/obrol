const hre = require('hardhat');
const fs = require('fs');

const main = async () => {
  const profileImageMinterFactory = await hre.ethers.getContractFactory(
    'ProfileImageNfts'
  );
  const profileImageContract = await profileImageMinterFactory.deploy();

  await profileImageContract.deployed();

  console.log(
    'Profile Image Minter contract address:',
    profileImageContract.address
  );

  fs.writeFileSync(
    './config.js',
    `
  export const contractAddress = "${profileImageContract.address}"
  export const ownerAddress = "${profileImageContract.signer.address}"
  `
  );
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.error('Error deploying Profile Image Minter contract', err);
    process.exit(1);
  }
};

runMain();
