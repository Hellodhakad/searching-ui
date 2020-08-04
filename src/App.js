import React, { Component } from 'react';
import './App.css';
import { searchInfo } from './searchInfo.js'
import { linerSearch } from './algo.js'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchType: '',
      inputStr: '',
      findValue: '',
      result: '',
      showOutput: false
    }
  }

  onSelect = (selectValue) => {
    this.setState({
      searchType: selectValue,
      inputArr:'',
      findValue:'',
      result:'',
      showOutput: false
    })
  }

  onClick = (type) => {

    if (this.state.inputStr && this.state.findValue) {
      let result, showOutput = false

      let inputArr = this.state.inputStr
      let findValue = this.state.findValue

      inputArr = inputArr.split(' ').join('').split(',')

      if (type == 'find') {

        result = linerSearch(inputArr, findValue)
        showOutput = true
        this.setState({
          result: result,
          showOutput: showOutput
        })
      }

      if (type == 'reset') {
        this.setState({
          result: '',
          showOutput: showOutput,
          inputStr: '',
          findValue: ''
        })
      }
    }
  }

  onChange = (type, value = '') => {
    switch (type) {
      case 'array':
        if (value) {
          console.log('vale', value)
          this.setState({
            inputStr: value
          })
        }
        break
      case 'findValue':
        this.setState({
          findValue: value
        })
        break
      default:
        break
    }
  }

  renderSearchInfo() {
    if (this.state.searchType) {
      const { definition, steps, link } = searchInfo[this.state.searchType]

      return (<>
        <div className='card searchInfo'>
          <div className='card-header'><strong>Definition and Uses</strong></div>
          {definition}
          <a href={link} target='_blank'>Read more on geeksforgeeks</a>
        </div>
        {/* <div className='card info-steps'>
          <div className='card-header'>Steps</div>
          {steps}
        </div> */}
        {this.renderTakeInput()}
      </>)
    }
  }

  renderTakeInput() {
    return (<>
      <div className='card takeInput'>
        <label><strong> Provide inputs</strong></label>

        <div className='form-row inputPart'>
          <input type="text" placeholder='Enter comma saprated array' className=' form-control inputArray' value={this.state.inputStr} onChange={(e) => this.onChange('array', e.target.value)} value={this.state.array} />
        </div>

        <div className='form-row inputPart'>
          <input type="text" className='form-control inputArray' placeholder='Enter value to be find in array' value={this.state.findValue} onChange={(e) => this.onChange('findValue', e.target.value)} value={this.state.array} />
        </div>

        <div className='form-row inputPart'>
          <div className='col-md-6'>
            <button type='button' className='btn btn-primary buttonClass' onClick={() => this.onClick('find')}>Find</button>
          </div>

          <div className='col-md-6'>
            <button type='button' className='btn btn-primary buttonClass' onClick={() => this.onClick('reset')}>Reset inputs</button>
          </div>
        </div>
        {/* <div className='form-row input-group inputPart'>
          <input type="text" className='form-control' placeholder='Enter value to be find in array' value={this.state.findValue} onChange={(e) => this.onChange('findValue', e.target.value)} value={this.state.array} />

          <div className='input-group-append'>
            <button type='button' className='btn btn-primary' onClick={() => this.onClick('reset')}>Reset inputs</button>
          </div>

        </div> */}
      </div>
    </>)
  }

  renderAlgoTypes() {
    return (<>
      <div className='input-group'>
        <select class="custom-select custom-select-sm " onChange={(e) => this.onSelect(e.target.value)}>
          <option value='' selected>Open this select menu</option>
          <option value="liner">Linear Search</option>
          <option value="binary">Binary Search</option>
          <option value="jump">Jump Search</option>
        </select>
      </div>
    </>)
  }

  renderOutput() {
    if (this.state.searchType && this.state.showOutput) {
      const { definition, steps, link, timeComplexity, spaceComplexity } = searchInfo[this.state.searchType]
      const { index, value } = this.state.result

      return (<>
        <div className='row'>
          <div className='col-md-2'>
            <label>Time</label>
            <div className='card small-card'>
              {timeComplexity}
            </div>
          </div>
          <div className='col-md-2'>
            <label>Space</label>
            <div className='card small-card'>
              {spaceComplexity}
            </div>
          </div>
          <div className='col-md-2'>
            <label>Element</label>
            <div className='card small-card'>
              {value}
            </div>
          </div>
          <div className='col-md-2'>
            <label>Index in Array</label>
            <div className='card small-card'>
              {index}
            </div>
          </div>
          <div className='col-md-2'>
            <label>Status</label>
            <div className='card small-card'>
              {index == '-1' ? 'Not Found' : 'Found'}
            </div>
          </div>
          <div className='col-md-2'></div>
        </div>
      </>)
    }
  }

  renderInputSide() {
    return (<>
      {this.renderAlgoTypes()}
      {this.state.searchType ? this.renderSearchInfo() : ''}
    </>)
  }

  render() {
    return (
      <div className="App">
        <nav class="navbar  navbar-dark bg-dark">
          <span class="navbar-brand mb-0 h1">Searching Algorithms...</span>
        </nav>
        <div className='row '>
          <div className='col-md-4 inputPart'>
            {this.renderInputSide()}
          </div>
          <div className='col-md-7 outputpart'>
            <div className='card output-card'>
              {this.renderOutput()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
