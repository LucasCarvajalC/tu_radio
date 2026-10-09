export default function AudioErrorMessage({ message, onRetry }) {
  return (
    <div className="lcd__status" role="alert">
      <span>{message}</span>
      <button type="button" className="btn" onClick={onRetry}>
        INTENTAR DE NUEVO
      </button>
    </div>
  );
}
