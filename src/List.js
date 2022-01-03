import React, {Component} from 'react'
import {getList, addItem, deleteItem, updateItem} from './ListFunctions'

class List extends Component {
    constructor() {
        super();

        this.state = {
            id: '',
            name: '',
            editDisabled : false,
            items: []
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        this.getAll();
    }

    onChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    getAll = () => {
        getList().then(data => {
            this.setState({
                name: '',
                items: [...data]
            },
            () => {
                console.log(this.state.item)
            })
        })
    }

    onSubmit = e => {
        e.preventDefault()
        addItem(this.state.name).then(() => {
            this.getAll();
        })
        this.setState({
            name: '',
            editDisabled: ''
        })
        this.getAll()
    }

    onEdit = (itemid, e) => {
        e.preventDefault();
       
        var data = [...this.state.items]
        data.forEach((item, index) => {
            if (item.id === itemid) {
                this.setState({
                    id   : item.id,
                    name : item.name,
                    editDisabled : true
                });
            }
        })
    }

    onDelete = (val, e) => {
        e.preventDefault()
        deleteItem(val)
        this.getAll()
    }

    render() {
        return (
            <div className='col-md-12'>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor='name'>Nama</label>
                        <div className="row">
                            <div className="col-md-12">
                                <input type="text" className="form-control" id="name" name="name" value={this.state.name || ''} onChange={this.onChange.bind(this)}/>
                            </div>
                        </div>
                    </div>

                    {!this.state.editDisabled ? (
                        <button type="submit" className="btn btn-primary btn-block" onClick={this.onSubmit.bind(this)}>Submit</button>
                    ) : ( '' )}

                    {this.state.editDisabled ? (
                        <button type="submit" className="btn btn-primary btn-block" onClick={this.onUpdate.bind(this)}>Update</button>
                    ): ('')}
                </form>
                <table className='table'>
                    <tbody>
                        {this.state.item.map((item, index) => (
                            <tr key={index}>
                                <td className="text-left">{item.nama}</td>
                                <td className="text-right">
                                    <button href="" className="btn btn-info mr-1" disabled={this.state.editDisabled} onClick={this.onEdit.bind(this, item.id)}>
                                        Edit
                                    </button>
                                    <button href="" className="btn btn-danger mr-1" disabled={this.state.editDisabled} onClick={this.onDelete.bind(this, item.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default List
