import React, { Component } from 'react';

import plane from '../aeroplane.png';

class Search extends Component {
  onFormSubmit(e) {
    e.preventDefault();
    const loc = {
      dep: this.refs.dep.value,
      arr: this.refs.arr.value
    }
    this.props.formDataHandler(loc);
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.onFormSubmit.bind(this)}>
        <div className="form-group">
          <input type="text" ref="dep" className="form-control" placeholder="From" />
        </div>
        <span className="plane"><img src={plane} className="plane-img" alt="plane" /></span>
        <div className="form-group">
          <input type="text" ref="arr" className="form-control" placeholder="To" />
        </div>
        <div className="form-group">
          <button className="btn btn-search" type="submit">Submit</button>
        </div>
      </form>
    )
  }
}

export default Search;
