const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + "/" + file).isDirectory();
  });
}

function getFiles(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + "/" + file).isFile();
  });
}

function getAbiOfContract(contractName) {
  const current_path_to_artifacts = path.join(
    __dirname,
    "..",
    `out/${contractName}.sol`
  );
  const artifactJson = JSON.parse(
    fs.readFileSync(`${current_path_to_artifacts}/${contractName}.json`)
  );

  return artifactJson.abi;
}

function main() {
  const current_path_to_broadcast = path.join(
    __dirname,
    "..",
    "broadcast/Deploy.s.sol"
  );
  const current_path_to_deployments = path.join(__dirname, "..", "deployments");
  const generatedContractComment = `
  /**
   * This file is autogenerated by Scaffold-ETH.
   * You should not edit it manually or your changes might be overwritten.
   */
  `;
  const chains = getDirectories(current_path_to_broadcast);
  const Deploymentchains = getFiles(current_path_to_deployments);

  var deployments = {};

  Deploymentchains.forEach((chain) => {
    if (!chain.endsWith(".json")) return;
    chain = chain.slice(0, -5);
    var deploymentObject = JSON.parse(
      fs.readFileSync(`${current_path_to_deployments}/${chain}.json`)
    );
    deployments[chain] = deploymentObject;
  });

  var allGeneratedContracts = {};

  chains.forEach((chain) => {
    allGeneratedContracts[chain] = {};

    var broadCastObject = JSON.parse(
      fs.readFileSync(`${current_path_to_broadcast}/${chain}/run-latest.json`)
    );
    var transactionsCreate = broadCastObject.transactions.filter(
      (transaction) => transaction.transactionType == "CREATE"
    );

    transactionsCreate.forEach((transaction) => {
      allGeneratedContracts[parseInt(chain)][
        deployments[chain][transaction.contractAddress] || transaction.contractName
      ] = {
        address: transaction.contractAddress,
        abi: getAbiOfContract(transaction.contractName),
      };
    });
  });

  const TARGET_DIR = "../nextjs/contracts/";

  const fileContent = Object.entries(allGeneratedContracts).reduce((content, [chainId, chainConfig]) => {
    return `${content}${chainId}:${JSON.stringify(chainConfig, null, 2)},`;
  }, "");

  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR);
  }
  fs.writeFileSync(
    `${TARGET_DIR}deployedContracts.ts`,
    prettier.format(
      `${generatedContractComment} import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract"; \n\n
 const deployedContracts = {${fileContent}} as const; \n\n export default deployedContracts satisfies GenericContractsDeclaration`,
      {
        parser: "typescript",
      },
    ),
  );
}

try {
  main();
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}