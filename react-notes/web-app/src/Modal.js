import React from "react";

export default function Modal(props) {
    
return (
    <div>
        <h1>Souhaitez vous réellement supprimer cette page</h1>
        <form id='delNote' onSubmit={e => props.deleteNote(e)}>
            <div id="buttons">
                <button type="submit" onClick={props.onClick}>Supprimer</button>
                <button type="button" onClick={props.close}>Annuler</button>
            </div>
        </form>
    </div>
);
}