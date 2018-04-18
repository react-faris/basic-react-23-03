import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class PageNavBar extends Component {
    render() {
        let {pagesCount} = this.props;
        if (pagesCount === null) return null;

        let arr = [];
        for (let i = 1; i <= pagesCount; i++)
            arr.push(this.getPageButton(i))

        return <span>Page: <ul style={{display: "inline"}}>{arr}</ul></span>
    }

    getPageButton = page => <li key={`pageNav${page}`} style={{display: "inline-block"}}><NavLink to={`/comments/${page}`} activeStyle = {{ color: 'red' }}>{page}</NavLink></li>
}