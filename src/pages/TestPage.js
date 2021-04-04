import React, {Component} from 'react'
import {connect} from 'react-redux'
import {add, append, appendAsync, reset, sub} from "../redux/actions";

class TestPage extends Component{
    render(){
        return(
            <div>
                <div className="d-flex align-items-center justify-content-center m-4 mb-0">
                    <button className="btn btn-success" onClick={this.props.onAdd}>+1</button>
                    <button className="btn btn-success ms-2" onClick={() => this.props.onAppend(10)}>+10</button>
                    <h1 className="text-center mx-2">{this.props.counter}</h1>
                    <button className="btn btn-danger me-2" onClick={() => this.props.onAppend(-10)}>-10</button>
                    <button className="btn btn-danger" onClick={this.props.onSub}>-1</button>
                </div>
                <div className="d-flex align-items-center justify-content-center m-4 mt-0 ">
                    <button className="btn btn-danger" onClick={this.props.onReset}>Сбросить</button>
                </div>
                <div className="d-flex align-items-center justify-content-center m-4 mt-0 ">
                    <button className="btn btn-primary small" onClick={() =>  this.props.onAsync(100)}>Добавить 100 (async)</button>
                </div>
            </div>

        )
    }
}
//присваевает в props значения со state(redux) -> в connect
function mapStateToProps(state){
    return {
        counter: state.counter.counter
    }
}

function mapDispatchToProps(dispatch){
    return {
        onAdd: () => dispatch(add()),
        onSub: () => dispatch(sub()),
        onAppend: (value) => dispatch(append(value)),
        onReset: () => dispatch(reset()),
        onAsync: number => dispatch(appendAsync(number))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TestPage)
