import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { connect } from 'react-redux'
import { selectByPick } from '../../ac'

import 'react-select/dist/react-select.css'

class SelectFilter extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired
    }

    handleChange = picked => {
        const { selectByPick } = this.props

        selectByPick(picked)
    }

    render() {
        const { articles, picked } = this.props
        const options = articles.map(article => ({
            label: article.title,
            value: article.id
        }))

        return <Select
            options={options}
            value={picked}
            onChange={this.handleChange}
            multi
        />
    }
}

export default connect(({articles, selectors: {picked}}) => ({articles, picked}), { selectByPick })(SelectFilter)