export default function Modal({ content, onCloseModal }) {
  if (!content) {
    return;
  } else {
    return (
      <>
        <div className="modal" onClick={onCloseModal}>
          <div className="modal-content">
            <p>{content}</p>
            <button className="btn-modal" onClick={onCloseModal}>
              OK
            </button>
          </div>
        </div>
      </>
    );
  }
}
