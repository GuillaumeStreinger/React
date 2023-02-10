import "./PersonCard.css"

const PersonCard = ({firstName, lastName, gender, dateOfBirth, imageURL, id, onDelete}) => {
    const fullName = `${firstName} ${lastName}`;
    return(
        <div className="Person-card">
            <img src={imageURL} alt={fullName} className="Person-image"/>
            <div className="Person-data">
                <b>{fullName}</b>
                <br />
                <div>{gender === "female" ? "Femme" : "Homme"}</div>
                <br />
                <div>{new Date(dateOfBirth).toLocaleDateString()}</div>
                <button
                onClick={() => {
                    onDelete(id);
                }}>Supprimer</button>
            </div>
        </div>
    )
}

export default PersonCard