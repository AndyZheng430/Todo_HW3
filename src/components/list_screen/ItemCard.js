import React from 'react';
import { Button } from 'react-materialize';
import { directive } from '@babel/types';
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

    deleteItem = (e, item) => {
        const { target } = e;
        const firestore = getFirestore();
        var currentId = this.props.item.id;

        var fir = firestore.collection('todoLists').doc(item).get();
        console.log(fir);
    }

    moveUp = (e) => {}



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
                        <Button floating className="moveUpItem" onClick={this.moveUp}>&#8593;</Button>
                        <Button floating className="moveDownItem" onClick={this.moveDown}>&#8595;</Button>
                        <Button floating className="deleteItem" onClick={(e) => this.deleteItem(e)}>&#x2715;</Button>
                        <Button floating className="editItem" onClick={this.props.editItem}>&#9998;</Button>
                    </div>
                </div>
            </div>
        );
    }
}
export default ItemCard;