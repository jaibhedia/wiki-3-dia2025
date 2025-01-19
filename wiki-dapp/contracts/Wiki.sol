// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Wiki {
    /**
     * @dev We define a simple page structure: a title, content, and creator address.
     */
    struct Page {
        string title;
        string content;
        address creator;
    }

    // Mapping of page title => Page
    mapping(string => Page) private pages;

    /**
     * @dev Emitted when a page is created or updated.
     * @param title The title of the page.
     * @param editor The address of the user who created/updated the page.
     */
    event PageChanged(string title, address indexed editor);

    /**
     * @dev Create or update a wiki page.
     * @param _title Title of the page.
     * @param _content Content of the page.
     */
    function setPage(string memory _title, string memory _content) public {
        Page storage page = pages[_title];
        page.title = _title;
        page.content = _content;
        page.creator = msg.sender;

        emit PageChanged(_title, msg.sender);
    }

    /**
     * @dev Retrieve a page by its title.
     * @param _title The title of the page.
     * @return pageTitle The page title.
     * @return pageContent The page content.
     * @return pageCreator The address of the page creator.
     */
    function getPage(string memory _title)
        public
        view
        returns (string memory pageTitle, string memory pageContent, address pageCreator)
    {
        Page storage page = pages[_title];
        return (page.title, page.content, page.creator);
    }
}
