import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//import {findDOMNode} from 'react-dom'
import Article from '../article'
import accordion from '../../decorators/accordion'

export class ArticleList extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired,

        //from accordion decorator
        openItemId: PropTypes.string,
        toggleItem: PropTypes.func
    };

    componentDidMount() {
        const { fetchData } = this.props
        if (fetchData) fetchData()
    }

    render() {
        return (
            <ul>
                {this.getArticles()}
            </ul>
        )
    }

    getArticles() {
        const { articles, openItemId, toggleItem } = this.props
        return articles.map(article => (
            <li key = {article.id} className = "test--article-list__item">
                <Article article = {article}
                         isOpen = {article.id === openItemId}
                         toggleOpen = {toggleItem}
                         ref = {this.setListElementRef}
                />
            </li>
        ))
    }

    setListElementRef = _ => {
        //console.log('---', listElement, findDOMNode(listElement))
    }
}

export default connect(({articles, selectors: {picked, dateRange: {from, to}}}) => ({
        articles: articles.filter(({id, date}) =>
            (!date || !from || !to || Date.parse(date) >= from && Date.parse(date) <= to)
            && (!picked.length || picked.indexOf(id) >= 0)
        )
}))(accordion(ArticleList))