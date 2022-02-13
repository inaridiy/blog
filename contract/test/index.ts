import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import chai, { expect } from "chai";
import { ethers } from "hardhat";
import { Article } from "../typechain";
chai.use(require("chai-as-promised"));

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

const deployArticle = async () => {
  const Article = await ethers.getContractFactory("Article");
  const article = await Article.deploy();
  await article.deployed();
  return article;
};

let article: Article;
let addrs: SignerWithAddress[];

const ADMIN_ROLE = `0x${"0".repeat(64)}`;
const WRITER_ROLE = ethers.utils.id("Writer");
const EDITOR_ROLE = ethers.utils.id("Editor");

describe("Article", function () {
  beforeEach(async function () {
    article = await deployArticle();
    addrs = await ethers.getSigners();
  });

  it("post uri", async function () {
    await article.post("Hello World");
    expect(await article.tokenURI(1)).to.equal("Hello World");
    await article.post("Hello World2");
    expect(await article.tokenURI(2)).to.equal("Hello World2");
  });

  it("check admin role", async function () {
    expect(await article.getRoleMember(ADMIN_ROLE, 0)).to.equal(
      await article.signer.getAddress()
    );
  });

  it("Whether you can't Mint without a role.", async function () {
    const [owner, addr1] = addrs;

    await expect(article.connect(addr1).post("Hello World")).to.rejectedWith(
      Error
    );
  });

  it("grant role", async function () {
    const [owner, addr1] = addrs;
    await article.grantRole(WRITER_ROLE, addr1.address);
    expect(await article.getRoleMember(WRITER_ROLE, 0)).to.equal(addr1.address);
  });

  it("post uri with role", async function () {
    const [owner, writer, editor] = addrs;
    await article.grantRole(WRITER_ROLE, writer.address);
    await article.connect(writer).post(`Hello World with ${writer.address}`);
    expect(await article.tokenURI(1)).to.equal(
      `Hello World with ${writer.address}`
    );

    await article.grantRole(EDITOR_ROLE, editor.address);
    await article.connect(editor).post(`Hello World with ${editor.address}`);
    expect(await article.tokenURI(2)).to.equal(
      `Hello World with ${editor.address}`
    );
  });

  it("No third party can edit it.", async function () {
    const [owner, thirdPerson, writer] = addrs;
    await article.post("Test Post");
    await expect(
      article.connect(thirdPerson).edit(1, "I'm gonna tamper with it.")
    ).to.rejectedWith(Error);

    await article.grantRole(WRITER_ROLE, writer.address);
    await expect(
      article.connect(writer).edit(1, "I'm gonna tamper with it.")
    ).to.rejectedWith(Error);
  });

  it("edit with editor", async function () {
    const [owner, editor] = addrs;
    await article.post("Test Post");
    await article.grantRole(EDITOR_ROLE, editor.address);
    await article.connect(editor).edit(1, "I'm gonna tamper with it.");
    expect(await article.tokenURI(1)).to.equal("I'm gonna tamper with it.");
  });

  it("Cannot be edited once transferred", async function () {
    const [owner, thirdPerson] = addrs;
    await article.post("Test Post");
    await article.edit(1, "I'm gonna tamper with it.");
    expect(await article.tokenURI(1)).to.equal("I'm gonna tamper with it.");
    await article.transferFrom(
      await article.signer.getAddress(),
      thirdPerson.address,
      1
    );
    await expect(article.edit(1, "I cant tamper...")).to.rejectedWith(Error);
  });
});
