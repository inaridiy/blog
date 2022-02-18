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

    mapping(uint256 => Article) private articles;

    constructor() ERC1155("") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function post(
        string memory tokenURI,
        string memory ownerOnly,
        uint256 quantity,
        uint256 _price
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
        articles[newItemId] = Article(msg.sender, _price, tokenURI, ownerOnly);
        return newItemId;
    }

    function edit(
        uint256 tokenId,
        string memory tokenURI,
        string memory ownerOnly,
        uint256 _price
    ) public {
        Article storage article = articles[tokenId];
        require(
            msg.sender == article.writer ||
                hasRole(EDITOR_ROLE, msg.sender) ||
                hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "No authority."
        );
        article.price = _price;
        article.uri = tokenURI;
        article.ownerOnly = ownerOnly;
    }

    function mint(uint256 id, uint256 quantity) public payable {
        Article memory _article = articles[id];
        require(
            quantity < balanceOf(_article.writer, id),
            "We're running low on inventory."
        );
        require(
            msg.value >= _article.price * quantity,
            "amount was not enough."
        );
        if (
            (_article.price == 0 && quantity > 1) ||
            (balanceOf(msg.sender, id) > 0 && _article.price == 0)
        ) {
            revert("You can only have one.");
        }

        _safeTransferFrom(_article.writer, msg.sender, id, quantity, "");
    }

    function getArticles(address user) public view returns (Article[] memory) {
        bool isAdmin = hasRole(DEFAULT_ADMIN_ROLE, user);
        bool isEditor = hasRole(EDITOR_ROLE, user);
        uint256 articleCount = 0;
        for (uint256 i = 1; i <= _tokenIds.current(); i++) {
            if (isAdmin || isEditor || articles[i].writer == user) {
                articleCount++;
            }
        }
        Article[] memory _articles = new Article[](articleCount);
        for (uint256 i = 1; i <= _tokenIds.current(); i++) {
            Article memory _article = articles[i];
            if (isAdmin || isEditor || _article.writer == user) {
                _articles[i].writer = _article.writer;
                _articles[i].price = _article.price;
                _articles[i].uri = _article.uri;
                _articles[i].ownerOnly = _article.ownerOnly;
            }
        }
        return _articles;
    }

    function uri(uint256 id) public view override returns (string memory) {
        return articles[id].uri;
    }

    function ownerOnlyUri(address user, uint256 id)
        public
        view
        returns (string memory)
    {
        if (balanceOf(user, id) > 0) {
            return articles[id].ownerOnly;
        } else {
            return articles[id].uri;
        }
    }

    function price(uint256 id) public view returns (uint256) {
        return articles[id].price;
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
