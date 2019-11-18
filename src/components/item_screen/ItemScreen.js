import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { firebaseConnect } from 'react-redux-firebase';


class ItemScreen extends Component {
    render() {
        return (
            <div>
                <div id="item_form_container">
                    <strong> Item </strong>
                </div>
                <div id="item_description_prompt">
                    <strong>Description: </strong>
                    <input id="item_description_textfield" type="text" defaultValue=""/>
                </div>
                <div id="item_assigned_to_prompt">
                    <strong>AssignedTo: </strong>
                    <input id="item_assigned_to_textfield" type="text" defaultValue=""/>
                </div>
                <div id="item_due_date_prompt">
                    <strong>Due Date: </strong>
                    <input id="item_due_date_picker" type="date" defaultValue=""/>
                </div>
                <div>
                    <strong>Completed: </strong>
                    <input id="item_completed_checkbox" type="checkbox" defaultChecked=""/>
                </div>
                <div>
                    <input id="item_form_submit_button" type="button" value="Submit"/>
                    <input id="item_form_cancel_button" type="button" value="Cancel"/>
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