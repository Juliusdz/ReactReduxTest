import React from 'react'
import { connect } from 'react-redux'
import { getPerson } from '../actions'
import SimpleReactValidator from 'simple-react-validator'
import PropTypes from 'prop-types'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setInput = this.setInput.bind(this)
    this.overlayOff = this.overlayOff.bind(this)

    this.validator = new SimpleReactValidator()
    this.everlayRef = React.createRef();
    this.state = { input: '' }
  }

  overlayOff() {
    this.everlayRef.current.style.display = 'none'
  }

  setInput(event) {
    this.setState({input: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.dispatch(getPerson(this.state.input))
    this.everlayRef.current.style.display = 'block'
  }

  render() {

    const overlayText = {
      margin: '0 auto',
      textAlign: 'center',
      color: 'white'
    }
  
    return (
      <React.Fragment>
        <div 
          className="overlay"
          ref={this.everlayRef}
          onClick={this.overlayOff}
        >
          <h1 style={overlayText}>{this.props.totalValue}</h1>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
          <fieldset>
            <input type="text" value={this.state.input} onChange={this.setInput}/>
            {this.validator.message('title', this.state.input, 'required|alpha_num|min:1|max:10')}
            <button type="submit" disabled={!this.validator.allValid()}>
              Submit
            </button>
            </fieldset>
          </form>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  totalValue: state.totalValue
})

Home.propTypes = {
  totalValue: PropTypes.number
}

export default connect(mapStateToProps)(Home)