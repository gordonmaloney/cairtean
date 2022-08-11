import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {createCard} from '../features/cards/cardSlice'

function AddCards() {
    
  const [cardData, setCardData] = useState({
    "front": "",
    "back": "",
    "date": "",
    "delay": 1,
    "reviews": 0,
    "tag": ""
  });

    const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createCard({cardData}))
    setCardData({
        "front": "",
        "back": "",
        "date": "",
        "delay": 1,
        "reviews": 0,
        "tag": ""
      })
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Front</label>
          <input
            type="text"
            name="front"
            id="front"
            value={cardData.front}
            placeholder="Enter the front side of the card here"
            onChange={(e) => setCardData({...cardData, front: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Back</label>
          <input
            type="text"
            name="back"
            id="back"
            value={cardData.back}
            placeholder="Enter the back of the card here"
            onChange={(e) => setCardData({...cardData, back: e.target.value})}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block">Create New Card</button>
        </div>
      </form>
    </section>
  );
}

export default AddCards;
