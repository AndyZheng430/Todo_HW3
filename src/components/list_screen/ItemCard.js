import React from 'react';

class ItemCard extends React.Component {

    handleCompleted(complete) {
        if ( complete == true ) {
            return "Completed"
        }
        return "Pending"
    }

    showButton(e) {
        if (e.target.className == 'item_button') {
            var button_set = e.target.nextSibling;
            button_set.classList.add('-animate');
        }
        else if (e.target.className == 'line1' || e.target.className == 'line2'|| e.target.className == 'line3') {
            var button_set = e.target.parentNode.nextSibling;
            button_set.classList.add('-animate');
        }
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
                    <div className="item_button" onClick={(e) => this.showButton(e)}>
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                    <div className="item_button_set">
                        <div className="moveUpItem">&#8593;</div>
                        <div className="moveDownItem">&#8595;</div>
                        <div className="deleteItem">&#x2715;</div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ItemCard;