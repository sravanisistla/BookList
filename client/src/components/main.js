import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Actions from '../actions/bookActions';
import List from './List';
import SearchInput from './SearchInput';

class App extends React.Component {
    constructor(props){
      super(props);
      this.state={ title:'', uid:'', description:'' };

      this.clearForm = this.clearForm.bind(this);
      this.getAllData = this.getAllData.bind(this);
      this.selectItem = this.selectItem.bind(this);
      this.deleteItem = this.deleteItem.bind(this);
      this.searchItems = this.searchItems.bind(this);
    }

    componentWillMount() {
        this.getAllData();
    }

    selectItem(item){
        this.setState({ title : item.name, description : item.description, uid : item.uid });
    }

    getAllData(){
        const {bookAction} = this.props;
        bookAction.getBooks();
    }

    clearForm(){
       this.setState({ title:'', uid:'', description:'' });
    }

    changeValue(value, field){
        let state = this.state;
        state[field] = value;
        this.setState(state);
    }

    handleForm() {
        const {bookAction} = this.props;
        const {title, description, uid} = this.state;
        let data={};
        data.name = title.trim();
        data.description = description.trim();

        if(uid) {
            data.uid = uid;
            bookAction.updateBook(data);
        }else{
            bookAction.createBook(data);
        }
        
        this.clearForm();
    }

    searchItems(e,text){
        e.preventDefault();
        e.stopPropagation();
        this.props.bookAction.searchBooks(text||'');
        this.clearForm();
    }

    deleteItem(e,id) {
        e.preventDefault();
        e.stopPropagation();
        this.props.bookAction.deleteBook(id);
        this.clearForm();
    }

    render() {
        const {book} = this.props;
        return (
            <div className='container'>
                <header className="center-block">
                  <h5 className="text-center">Book</h5>
                </header>
                <div className="container-fluid">
                    <div className="row content">
                        <div className="col-sm-3 col-lg-3 col-xs-3 sidenav">
                            <SearchInput getAllData={this.getAllData} searchItems={this.searchItems}/>
                            <List  book={book} selectItem={this.selectItem} deleteItem={this.deleteItem}/>
                        </div>
                        <div className="col-sm-9 col-lg-9 col-xs-9">
                            <form>

                                <div className="form-group">
                                    <input type="hidden" className="form-control"  value={this.state.uid} placeholder="uid" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="Title">Title</label>
                                    <input type="text" className="form-control" value={this.state.title} onChange={e=>this.changeValue(e.target.value,'title')} placeholder="Title"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="Title">Description:</label>
                                    <textarea className="form-control" type="textarea" value={this.state.description} onChange={e=>this.changeValue(e.target.value,'description')}  placeholder="Description" maxLength="140" rows="7"></textarea>
                                </div>

                                <button type="button" onClick={e=>this.handleForm()} disabled={!this.state.title || !this.state.description} className="btn btn-primary pull-right">Save</button>
                                <button type="button" className="btn btn-default pull-right" onClick={this.clearForm}>Clear</button>
                            </form>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        book: state.book
    }
}

function mapDispatchToProps(dispatch) {
    return {
        bookAction: bindActionCreators(Actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
