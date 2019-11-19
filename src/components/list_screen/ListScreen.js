import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { Modal, Button } from 'react-materialize';
import { getFirestore } from 'redux-firestore';

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

    handleChangeName = (e) => {
        const { target } = e;
        const firestore = getFirestore();
        firestore.collection('todoLists').doc(this.props.todoList.id).update({
            name: target.value
        });
    }

    handleChangeOwner = (e) => {
        const { target } = e;
        const firestore = getFirestore();
        firestore.collection('todoLists').doc(this.props.todoList.id).update({
            name: target.value
        });
    }

    showModal = (e) => {
        document.getElementsByClassName("modal modal-content")[0].classList.add("is_visible");
    }
    hideModal = (e) => {
        var modal = document.getElementsByClassName("modal modal-fixed-footer open")[0];
        console.log(modal.parentNode);
    }

    removeList = (e) => {
        const firestore = getFirestore();
        firestore.collection('todoLists').doc(this.props.todoList.id).delete();
        this.props.history.push('/');
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!todoList)
            return <React.Fragment />
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        const trash = <Button id="list_trash">&#128465;</Button>;
        
        return (
            <div className="container white">
                <h5 className="grey-text text-darken-3 list_header">Todo List</h5>
                <Modal header="Delete list?" fixedFooter trigger={trash}>
                    <p><strong>Are you sure you want to delete this list?</strong></p>
                    <Button id="delete_dialog_yes" onClick={(e) => this.removeList(e)}>Yes</Button>
                    <p>The list will not be retreivable.</p>
                </Modal>
                <div className="list_screen_header">
                    <div className="list_name">
                        <div className="input-field">
                            <label htmlFor="email">Name</label>
                            <input className="active" type="text" name="name" id="name" onChange={this.handleChangeName} defaultValue={todoList.name} />
                        </div>
                    </div>
                    <div className="list_owner">
                        <div className="input-field">
                            <label htmlFor="password">Owner</label>
                            <input className="active" type="text" name="owner" id="owner" onChange={this.handleChangeOwner} defaultValue={todoList.owner} />
                        </div>
                    </div>
                </div>
                <ItemsList todoList={todoList}/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[id] : null;

    if (todoList) {
        todoList.id = id;
    }

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