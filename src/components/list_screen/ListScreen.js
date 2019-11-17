import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    showModal = () => {
        document.getElementsByClassName("modal")[0].classList.add("is_visible");
    }
    hideModal = () => {
        document.getElementsByClassName("modal is_visible")[0].classList.remove("is_visible");
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container white">
                <h5 className="grey-text text-darken-3">Todo List</h5>
                <div id="list_trash" onClick={this.showModal.bind()}>&#128465;</div>
                <div className="list_screen_header">
                    <div className="list_name">
                        <div className="input-field">
                            <label htmlFor="email">Name</label>
                            <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={todoList.name} />
                        </div>
                    </div>
                    <div className="list_owner">
                        <div className="input-field">
                            <label htmlFor="password">Owner</label>
                            <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={todoList.owner} />
                        </div>
                    </div>
                </div>
                <ItemsList todoList={todoList} />

                <div className="modal">
                    <div className="modal_dialog">
                        <p>Delete list?</p> 
                        <p><strong>Are you sure you want to delete this list?</strong></p>
                        <input id="delete_dialog_yes" type="button" value="Yes" onClick={this.props.removeList}/> 
                        <input id="delete_dialog_no" type="button" value="No" onClick={this.hideModal}/>
                        <p>The list will not be retreivable.</p>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  todoList.id = id;

  return {
    todoList,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);