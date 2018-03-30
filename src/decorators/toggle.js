//decorator === Higher Order Component
import React from 'react'

export default OriginalComponent => class DecoratedComponent extends React.Component {
    state = {
        isOpen: false
    }

    toggle = () => this.setState({ isOpen: !this.state.isOpen })

    render() {
        return <OriginalComponent {...this.props}
                                  isOpen = {this.state.isOpen}
                                  toggle = {this.toggle}
        />
    }
}