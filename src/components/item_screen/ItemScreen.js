import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { firebaseConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Link } from 'react-router-dom';

class ItemScreen extends Component {

    addItem = (e) => {
        var todoList = this.props.location.state.todoList;
        var itemKey = this.props.location.state.key;
        var item = this.props.location.state.todoList.items;
        if( itemKey != -1 ) {
            item[itemKey] = {
                assigned_to: document.getElementById('item_assigned_to_textfield').value,
                completed: document.getElementById('item_completed_checkbox').checked,
                description: document.getElementById('item_description_textfield').value,
                due_date: document.getElementById('item_due_date_picker').value,
                id: itemKey,
                key: itemKey
            };
        }
        else {
            item[item.length] = {
                assigned_to: document.getElementById('item_assigned_to_textfield').value,
                completed: document.getElementById('item_completed_checkbox').checked,
                description: document.getElementById('item_description_textfield').value,
                due_date: document.getElementById('item_due_date_picker').value,
                id: todoList.items.length,
                key: todoList.items.length
            };
        }

        const firebase = getFirestore();
        firebase.collection("todoLists").doc(todoList.id).update({
            items: item
        });
    }

    render() {
        const todoList = this.props.location.state.todoList;
        const key = this.props.location.state.key;

        return (
            <div>
                <div id="item_form_container">
                    <strong> Item </strong>
                </div>
                <div id="item_description_prompt">
                    <strong>Description: </strong>
                    <input id="item_description_textfield" type="text" defaultValue={todoList.items[key].description}/>
                </div>
                <div id="item_assigned_to_prompt">
                    <strong>AssignedTo: </strong>
                    <input id="item_assigned_to_textfield" type="text" defaultValue={todoList.items[key].assigned_to}/>
                </div>
                <div id="item_due_date_prompt">
                    <strong>Due Date: </strong>
                    <input id="item_due_date_picker" type="date" defaultValue={todoList.items[key].due_date}/>
                </div>
                <div>
                    <strong>Completed: </strong>
                    <input id="item_completed_checkbox" type="checkbox" defaultChecked={todoList.items[key].completed}/>
                </div>
                <div>
                <Link to={'/todoList/' + todoList.id}>
                    <input id="item_form_submit_button" type="button" value="Submit" onClick={(e) => this.addItem(e)}/>
                </Link>
                    <input id="item_form_cancel_button" type="button" value="Cancel" onClick={(e) => this.backToList(e)}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.firebase.auth,
});
  
export default compose(
    connect(mapStateToProps),
)(ItemScreen);