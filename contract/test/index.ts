import chai, { expect } from "chai";
import { ethers } from "hardhat";
chai.use(require("chai-as-promised"));

const deployArticle = async () => {
  const Articles = await ethers.getContractFactory("Articles");
  const articles = await Articles.deploy();
  await articles.deployed();
  return articles;
};

const ADMIN_ROLE = `0x${"0".repeat(64)}`;
const WRITER_ROLE = ethers.utils.id("Writer");
const EDITOR_ROLE = ethers.utils.id("Editor");

describe("Article", function () {
  it("test Articles", async () => {
    const [owner, addr1] = await ethers.getSigners();
    const articles = await deployArticle();
    await articles.post("Hello", "World", "1000", "0");
    console.log(
      await articles.uri(1),
      await articles.ownerOnlyUri(await owner.getAddress(), 1)
    );
    console.log(await articles.getArticles(await owner.getAddress()));
  });
});
