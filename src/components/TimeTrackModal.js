import React from "react";

const TimeTrackModal = ({
  isModalOpened,
  hours,
  message,
  onTrackInput,
  onTrackSubmit,
  onModalClose
}) => (
  <form
    className={`fixedWindow trackWindow position-fixed w-25 overflow-hidden shadow-sm ${
      isModalOpened ? "d-flex" : "d-none"
    } flex-column align-items-center p-2 bg-white rounded`}
  >
    <h5>Track</h5>
    <input
      className="w-100 mb-3"
      type="number"
      placeholder="How long..."
      value={hours}
      onChange={onTrackInput}
      name="hours"
    />
    <input
      className="w-100 mb-3"
      type="text"
      placeholder="Comment..."
      value={message}
      onChange={onTrackInput}
      name="message"
    />
    <button
      className="btn btn-primary w-75 align-self-center mb-3"
      type="submit"
      onClick={onTrackSubmit}
    >
      Submit
    </button>
    <button
      className="btn btn-danger w-75 align-self-center"
      type="button"
      onClick={onModalClose}
    >
      Cancel
    </button>
  </form>
);

export default TimeTrackModal;
