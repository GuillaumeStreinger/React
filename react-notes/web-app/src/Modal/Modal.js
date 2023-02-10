import React from "react";
import { DIV, H1, FORM, POPUP, BUTTON} from "./Modal.styled"; 

export default function Modal(props) {
    
return (
    <DIV>
        <POPUP>
            <H1>Souhaitez vous réellement supprimer cette page</H1>
            <FORM id='delNote' onSubmit={e => props.deleteNote(e)}>
                <BUTTON id="buttons">
                    <button type="submit" onClick={props.onClick}>Supprimer</button>
                    <button type="button" onClick={props.close}>Annuler</button>
                </BUTTON>
            </FORM>
        </POPUP>
    </DIV>
);
}