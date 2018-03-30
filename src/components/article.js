import React, { PureComponent } from 'react'
import Comments from './comments'

class Article extends PureComponent {
    render() {
        const { article: {title, id}, isOpen, toggleOpen } = this.props
        console.log('---', 'rendering article')
        return (
            <div>
                <h2>{title}</h2>
                <button onClick = {() => toggleOpen(id)}>{isOpen ? 'close' : 'open'}</button>
                {this.getBody()}
            </div>
        )
    }

    getBody() {
        const { article: {text, comments}, isOpen } = this.props
        if (!isOpen) return null

        return (
            <section>
                <p>{text}</p>
                <Comments comments={comments} isOpen={false}/>
            </section>
        )
    }
}

export default Article