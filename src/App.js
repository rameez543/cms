import React from 'react';
import { connect } from 'react-redux';
import { getProducts } from './redux/ActionCreators'

class App extends React.Component {
  state = {}
  componentDidMount() {
    this.props.getProducts()
  }
  render() {
    console.log("prp", this.props)
    return (<div></div>)
  }
}

const mapStateToProps = (state) => ({ state })
const mapDispatchToProps = { getProducts }

export default connect(mapStateToProps, mapDispatchToProps)(App);
