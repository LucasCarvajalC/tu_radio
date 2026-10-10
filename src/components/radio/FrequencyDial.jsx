import { useRef } from "react";

export default function FrequencyDial({ disabled, stations, selectedId, onSelect, locked = false }) {
  const ids = stations.map((s) => s.id);
  const idx = Math.max(0, ids.indexOf(selectedId));
  const angle = ids.length > 1 ? (idx / (ids.length - 1)) * 270 - 135 : 0;
  const dragRef = useRef({ x: 0, active: false });

  const cycle = () => {
    if (disabled || !onSelect) return;
    const next = ids[(idx + 1 + ids.length) % ids.length];
    onSelect(next);
  };

  const step = (dir) => {
    if (disabled || !onSelect) return;
    const next = ids[(idx + dir + ids.length) % ids.length] || ids[0];
    onSelect(next);
  };

  const onKeyDown = (e) => {
    if (disabled || !onSelect) return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      onSelect(ids[0]);
    } else if (e.key === "End") {
      e.preventDefault();
      onSelect(ids[ids.length - 1]);
    }
  };

  const onPointerDown = (e) => {
    if (disabled) return;
    dragRef.current = { x: e.clientX, active: true };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    const d = dragRef.current;
    if (!d.active || disabled) return;
    const dx = e.clientX - d.x;
    if (dx > 32) {
      step(1);
      d.x = e.clientX;
    } else if (dx < -32) {
      step(-1);
      d.x = e.clientX;
    }
  };

  const onPointerUp = () => {
    dragRef.current.active = false;
  };

  return (
    <div className="dial-wrap">
      <div className={locked ? "knob knob--locked" : "knob"} style={{ "--knob-angle": `${angle}deg` }}>
        <div className="knob__ring" aria-hidden="true" />
        <button
          type="button"
          className="knob__body"
          disabled={disabled}
          aria-disabled={locked || disabled}
          title={disabled ? "Enciende y completa la bienvenida para sintonizar" : "Girar: arrastra o pulsa para cambiar de emisora (flechas también)"}
          aria-label="Perilla selectora de emisora"
          onClick={cycle}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <span className="knob__cap" aria-hidden="true">
            <span className="knob__pointer" aria-hidden="true" />
          </span>
        </button>
      </div>
      <small className="dial-caption">TUNE</small>
    </div>
  );
}
