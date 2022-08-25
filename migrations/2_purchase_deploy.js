async function main() {
  const Purchase = await ethers.getContractFactory("Purchase")

  // Start deployment, returning a promise that resolves to a contract object
  const purchase = await Purchase.deploy()
  await purchase.deployed()
  console.log("Contract deployed to address:", purchase.address)
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
