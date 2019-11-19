import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { Button } from 'react-materialize';
import { getFirestore } from 'redux-firestore';
import { Link } from 'react-router-dom';

class ItemsList extends React.Component {
    state = {
        sortBy: ""
    }

    orderTask = (e) => {
        var currentList = this.props.todoList;
        if (this.state.sortBy == "TaskAsc") {
            this.setState({sortBy: "TaskDesc"})
            currentList.items.sort((a,b) => a.description < b.description);
        }
        else {
            this.setState({sortBy: "TaskAsc"})
            currentList.items.sort((a,b) => a.description > b.description);
        }

        for( var i=0; i< currentList.items.length; i++ ) {
            currentList.items[i].key = i;
            currentList.items[i].id = i;
        }

        const firebase = getFirestore();
        firebase.collection("todoLists").doc(this.props.todoList.id).update({
            items: currentList.items
        });
    }

    orderDueDate = (e) => {
        var currentList = this.props.todoList;
        if (this.state.sortBy == "DueDateAsc") {
            this.setState({sortBy: "DueDateDesc"})
            currentList.items.sort((a,b) => a.due_date < b.due_date);
        }
        else {
            this.setState({sortBy: "DueDateAsc"})
            currentList.items.sort((a,b) => a.due_date > b.due_date);
        }

        for( var i=0; i< currentList.items.length; i++ ) {
            currentList.items[i].key = i;
            currentList.items[i].id = i;
        }

        const firebase = getFirestore();
        firebase.collection("todoLists").doc(this.props.todoList.id).update({
            items: currentList.items
        });
    }

    orderCompleted = (e) => {
        var currentList = this.props.todoList;
        if (this.state.sortBy == "CompletedAsc") {
            this.setState({sortBy: "CompletedDesc"})
            currentList.items.sort((a,b) => a.completed > b.completed);
        }
        else {
            this.setState({sortBy: "CompletedAsc"})
            currentList.items.sort((a,b) => a.completed < b.completed);
        }

        for( var i=0; i< currentList.items.length; i++ ) {
            currentList.items[i].key = i;
            currentList.items[i].id = i;
        }

        const firebase = getFirestore();
        firebase.collection("todoLists").doc(this.props.todoList.id).update({
            items: currentList.items
        });
    }

    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        const self = this.props;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
                <div id="list_item_header">
                    <div className="list_item_task_header" onClick={(e) => this.orderTask(e)}>Task</div>
                    <div className="list_item_due_date_header" onClick={(e) => this.orderDueDate(e)}>Due Date</div>
                    <div className="list_item_status_header" onClick={(e) => this.orderCompleted(e)}>Status</div>
                </div>
                {items && items.map(function(item) {
                    item.id = item.key;
                    return (
                        <ItemCard todoList={todoList} item={item} />
                    );})
                }
                <Link to={{pathname: '/todoList/'+this.props.todoList.id+"/-1", state: {todoList:this.props.todoList, key:-1}}}>
                    <div className="list_item_add_button_container">
                        <Button className="list_item_add_button">&#8853;</Button>
                    </div>
                </Link>
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
        { collection: 'todoLists'},
    ]),
)(ItemsList);