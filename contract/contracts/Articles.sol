// contracts/Articles.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Articles is ERC1155, AccessControlEnumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    bytes32 public constant WRITER_ROLE = keccak256("Writer");
    bytes32 public constant EDITOR_ROLE = keccak256("Editor");

    struct Article {
        address writer;
        uint256 price;
        string uri;
        string ownerOnly;
    }

    mapping(uint256 => Article) public articles;

    constructor() ERC1155("") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function post(
        string memory tokenURI,
        string memory ownerOnly,
        uint256 quantity,
        uint256 price
    ) public returns (uint256) {
        require(
            hasRole(WRITER_ROLE, msg.sender) ||
                hasRole(EDITOR_ROLE, msg.sender) ||
                hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "You don't have the authority."
        );
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId, quantity, "");
        articles[newItemId] = Article(msg.sender, price, tokenURI, ownerOnly);
        return newItemId;
    }

    function edit(
        uint256 tokenId,
        string memory tokenURI,
        string memory ownerOnly,
        uint256 price
    ) public {
        Article storage article = articles[tokenId];
        require(
            msg.sender == article.writer ||
                hasRole(EDITOR_ROLE, msg.sender) ||
                hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "You don't have editing privileges."
        );
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, AccessControlEnumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
