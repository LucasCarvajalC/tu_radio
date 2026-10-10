import { useRef, useState } from "react";

const MIN_ANGLE = -135;
const MAX_ANGLE = 135;

function pointerAngle(clientX, clientY, cx, cy) {
  return (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI;
}

export default function FrequencyDial({ disabled, stations, selectedId, onSelect, locked = false }) {
  const ids = stations.map((s) => s.id);
  const idx = Math.max(0, ids.indexOf(selectedId));
  const angle = ids.length > 1 ? (idx / (ids.length - 1)) * 270 - 135 : 0;
  const [dragAngle, setDragAngle] = useState(null);
  const dragRef = useRef({ active: false, cx: 0, cy: 0, last: 0, base: 0, moved: false });
  const shownAngle = dragAngle ?? angle;

  const cycle = () => {
    if (disabled || !onSelect) return;
    // Ignorar el clic que cierra un arrastre (el snap ya eligió emisora).
    if (dragRef.current.moved) {
      dragRef.current.moved = false;
      return;
    }
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
    const knob = e.currentTarget.closest(".knob");
    const rect = knob ? knob.getBoundingClientRect() : e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    dragRef.current = {
      active: true,
      cx,
      cy,
      last: pointerAngle(e.clientX, e.clientY, cx, cy),
      base: angle,
      moved: false,
    };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    const d = dragRef.current;
    if (!d.active || disabled) return;
    const cur = pointerAngle(e.clientX, e.clientY, d.cx, d.cy);
    const delta = ((((cur - d.last) % 360) + 540) % 360) - 180;
    d.last = cur;
    d.acc = (d.acc ?? 0) + delta;
    if (Math.abs(d.acc) > 4) d.moved = true;
    setDragAngle(Math.min(MAX_ANGLE, Math.max(MIN_ANGLE, d.base + d.acc)));
  };

  const endDrag = () => {
    const d = dragRef.current;
    if (!d.active) return;
    d.active = false;
    if (d.moved && onSelect && ids.length > 1) {
      const pos = Math.round(((shownAngle - MIN_ANGLE) / 270) * (ids.length - 1));
      const target = ids[Math.min(ids.length - 1, Math.max(0, pos))];
      if (target !== ids[idx]) onSelect(target);
    }
    d.acc = 0;
    setDragAngle(null);
  };

  return (
    <div className="dial-wrap">
      <div
        className={
          locked
            ? "knob knob--locked"
            : dragAngle !== null
              ? "knob knob--dragging"
              : "knob"
        }
        style={{ "--knob-angle": `${shownAngle}deg` }}
      >
        <div className="knob__ring" aria-hidden="true" />
        <button
          type="button"
          className="knob__body"
          disabled={disabled}
          aria-disabled={locked || disabled}
          title={disabled ? "Enciende y completa la bienvenida para sintonizar" : "Girar: arrastra en círculo o pulsa para cambiar de emisora (flechas también)"}
          aria-label="Perilla selectora de emisora"
          onClick={cycle}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
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
