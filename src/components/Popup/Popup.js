import "./Popup.css";

const Popup = (props) => {
  function handleClickByOverlay(e) {
    e.currentTarget === e.target && props.setPopupOpened(false);
  }
  return (
    <section
      className={`popup popup_type_notify ${props.isOpen && "popup_opened"}`}
      onClick={handleClickByOverlay}
    >
      <div className={`popup__container popup__container_notify`}>
        <button
          type="button"
          className="popup__close"
          onClick={() => props.setPopupOpened(false)}
        />
        <h3 className="popup__notify-title">{props.textNotify}</h3>
      </div>
    </section>
  );
};

export default Popup;
