import React from 'react';
import { Button } from 'react-materialize';
import { getFirestore } from 'redux-firestore';

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
        const { target } = e;
        const firestore = getFirestore();

        // let newItems = this.props.todoList.items.splice(this.props.todoList., 1);
        // firestore.collection("todoLists").doc(this.props.todoList.id).update({ items: newItems });
    }

    editItem = (e) => {
        const firestore = getFirestore();
        var item = firestore.collection('todoLists').doc(this.props.todoList.id).get();
        console.log(item);
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
                        <Button floating className="moveDownItem" onClick={this.moveDown}>&#8595;</Button>
                        <Button floating className="deleteItem" onClick={(e) => this.deleteItem(e)}>&#x2715;</Button>
                        <Button floating className="editItem" onClick={(e) => this.editItem(e)}>&#9998;</Button>
                    </div>
                </div>
            </div>
        );
    }
}
export default ItemCard;