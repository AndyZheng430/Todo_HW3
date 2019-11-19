import React from 'react';
import { Button } from 'react-materialize';
import { getFirestore } from 'redux-firestore';
import { Link, Redirect } from 'react-router-dom'

class ItemCard extends React.Component {
    
    handleCompleted(complete) {
        if ( complete == true ) {
            return "Completed"
        }
        return "Pending"
    }

    showButton(e) {
        if (e.target.className == 'btn-floating item_button') {
            var button_set = e.target.nextSibling;
            button_set.classList.add('-animate');
        }
        else if (e.target.className == 'item_button_show') {
            var button_set = e.target.parentNode.nextSibling;
            button_set.classList.add('-animate');
        }
    }

    moveUp = (e) => {
        if (this.props.item.key == 0) {
            return ;
        }
        var currentList = this.props.todoList;
        var currentItem = currentList.items[this.props.item.key];
        var previousItem = currentList.items[this.props.item.key-1];

        var currentIndex = this.props.item.key;
        var previousIndex = this.props.item.key-1;

        currentItem.key = previousIndex;
        currentItem.id = previousIndex;
        previousItem.key = currentIndex;
        previousItem.id = currentIndex;

        currentList.items[currentIndex] = previousItem;
        currentList.items[previousIndex] = currentItem;

        const firestore = getFirestore();
        firestore.collection("todoLists").doc(this.props.todoList.id).update({
            items: currentList.items
        });
    }

    moveDown = (e) => {
        if (this.props.item.key == this.props.todoList.items.length - 1) {
            return ;
        }
        var currentList = this.props.todoList;
        var currentItem = currentList.items[this.props.item.key];
        var previousItem = currentList.items[this.props.item.key+1];

        var currentIndex = this.props.item.key;
        var previousIndex = this.props.item.key+1;

        currentItem.key = previousIndex;
        currentItem.id = previousIndex;
        previousItem.key = currentIndex;
        previousItem.id = currentIndex;

        currentList.items[currentIndex] = previousItem;
        currentList.items[previousIndex] = currentItem;

        const firestore = getFirestore();
        firestore.collection("todoLists").doc(this.props.todoList.id).update({
            items: currentList.items
        });
    }

    deleteItem = (e) => {
        var currentList = this.props.todoList;
        currentList.items.splice(this.props.item.key, 1);

        for ( var i = 0; i < currentList.items.length; i++) {
            currentList.items[i].id = i;
            currentList.items[i].key = i;
        }
        
        const firestore = getFirestore();
        firestore.collection("todoLists").doc(this.props.todoList.id).update({
            items: currentList.items
        });
    }

    render() {
        const { item } = this.props;  

        return (
            <div className="card z-depth-0 todo-list-link pink-lighten-3">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{item.description}</span>
                    <span className="card-assigned-to">Assigned To: <strong>{item.assigned_to}</strong></span>
                    <span className="card-due_date">{item.due_date}</span>
                    <span className="card-completed">{this.handleCompleted(item.completed)}</span>
                    <Button floating className="item_button" onMouseOver={(e) => this.showButton(e)}>
                        <div className="item_button_show">+</div>
                    </Button>
                    <div className="item_button_set">
                        <Button floating className="moveUpItem" onClick={(e) => this.moveUp(e)}>&#8593;</Button>
                        <Button floating className="moveDownItem" onClick={(e) => this.moveDown(e)}>&#8595;</Button>
                        <Button floating className="deleteItem" onClick={(e) => this.deleteItem(e)}>&#x2715;</Button>
                        <Link to={{pathname: '/todoList/'+this.props.todoList.id+"/"+this.props.item.key, state: {todoList:this.props.todoList, key:this.props.item.key}}}>
                            <Button floating className="editItem">&#9998;</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
export default ItemCard;