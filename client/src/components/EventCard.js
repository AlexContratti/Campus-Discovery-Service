
const EventCard = (props) => {


    return (
        <section>
            <h5>{props.event[0]}</h5>
            <p>{props.event[1]}</p>
            <p>{props.event[2]}</p>
            <p>{props.event[3]}</p>
            <p>{props.event[4]}</p>
        </section>

    )
}

export default EventCard