export default function Modal({ content, setModalContent }) {
  if (!content) {
    return;
  } else {
    return (
      <>
        <div className="modal" onClick={() => setModalContent("")}>
          <div className="modal-content">
            <p>{content}</p>
            <button className="btn-modal" onClick={() => setModalContent("")}>
              OK
            </button>
          </div>
        </div>
      </>
    );
  }
}
