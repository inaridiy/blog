// contracts/Article.sol
// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "hardhat/console.sol";

pragma solidity ^0.8.4;

contract Article is ERC721URIStorage, AccessControlEnumerable {
    bytes32 public constant WRITER_ROLE = keccak256("Writer");
    bytes32 public constant EDITOR_ROLE = keccak256("Editor");
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Anon Dev Articles", "Anon") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function post(string memory tokenURI) public returns (uint256) {
        require(
            hasRole(WRITER_ROLE, msg.sender) ||
                hasRole(EDITOR_ROLE, msg.sender) ||
                hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "You don't have the authority."
        );
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

    function edit(uint256 tokenId, string memory tokenURI) public {
        require(
            hasRole(EDITOR_ROLE, msg.sender) ||
                hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "You don't have the authority."
        );
        require(isOwnerdByMembers(tokenId), "A third party has the token.");
        _setTokenURI(tokenId, tokenURI);
    }

    function isOwnerdByMembers(uint256 tokenId) public view returns (bool) {
        address tokenOwner = ownerOf(tokenId);
        bool isAdmin = hasRole(DEFAULT_ADMIN_ROLE, tokenOwner);
        bool isEditor = hasRole(EDITOR_ROLE, tokenOwner);
        bool isWriter = hasRole(WRITER_ROLE, tokenOwner);
        //    console.log(tokenOwner);
        return isAdmin || isEditor || isWriter;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, AccessControlEnumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
