import classes from './MeetupItemDetails.module.css';

const MeetupItemDetails = (props) => {
  const {id, image, title,address,  discription } = props.props.meetupDetails;
  
  return (
    <section className={classes.detail}>
      <h2>Meet Details</h2>
      <img src={image} alt={props.title} />

      <h3>{title}</h3>
      <address> <span>Venue:</span>{address}</address>
      <p> <span>Description:</span>{discription}</p>
    </section>
  );
};

export default MeetupItemDetails;
