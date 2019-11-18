import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { Button } from 'react-materialize';
import { getFirestore } from 'redux-firestore';

class ItemsList extends React.Component {

    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        const self = this.props;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
                <div id="list_item_header">
                    <div className="list_item_task_header" onClick={this.props.orderTask}>Task</div>
                    <div className="list_item_due_date_header">Due Date</div>
                    <div className="list_item_status_header">Status</div>
                </div>
                {items && items.map(function(item) {
                    item.id = item.key;
                    return (
                        <ItemCard todoList={todoList} item={item} />
                    );})
                }
                <div className="list_item_add_button_container">
                    <Button className="list_item_add_button">&#8853;</Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
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
)(ItemsList);