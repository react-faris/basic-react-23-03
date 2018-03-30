import React, { PureComponent } from 'react'
import Toogle from '../decorators/toggle'

class Comments extends PureComponent {
    render() {
        const { comments, isOpen, toggle } = this.props

        if (!comments.length) return null;

        return (
            <div>
                <button onClick={toggle}>{!isOpen ? "Показать комментарии" : "Скрыть комментарии"}</button>
                {isOpen ? this.getComments(comments) : null}
            </div>
        )
    }

    getComments(comments) {
        return <ul>{comments.map(this.getComment)}</ul>
    }

    getComment({id, text}) {
        return <li key={id}>{text}</li>
    }
}

export default Toogle(Comments)