import './Card.css'
function Card(props){
    return(
        <>
        <div className = "card">
            <img className = "card-img "src = {props.imgSrc} alt="Watchlist"></img>
            <h4>{props.head}</h4>
            <p>
                Dynamic watchlist that can be edited after user edits it.
            </p>
        </div>
        </>
    );
}
export default Card