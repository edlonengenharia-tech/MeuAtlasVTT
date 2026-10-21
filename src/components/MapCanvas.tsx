import { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../store';
import { Position, Token } from '../types';

export default function MapCanvas() {
  const { state, dispatch } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<Position>({ x: 0, y: 0 });
  const [measureStart, setMeasureStart] = useState<Position | null>(null);
  const [measureEnd, setMeasureEnd] = useState<Position | null>(null);
  const [mousePos, setMousePos] = useState<Position>({ x: 0, y: 0 });

  const { map, tokens, selectedTokenId, selectedTool, fog } = state;
  const { gridSize, gridType, zoom, panOffset } = map;

  const screenToMap = useCallback((clientX: number, clientY: number): Position => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return {
      x: (clientX - rect.left - panOffset.x) / zoom,
      y: (clientY - rect.top - panOffset.y) / zoom,
    };
  }, [panOffset, zoom]);

  const snapToGrid = useCallback((pos: Position): Position => {
    if (gridType === 'none') return pos;
    return {
      x: Math.round(pos.x / gridSize) * gridSize + gridSize / 2,
      y: Math.round(pos.y / gridSize) * gridSize + gridSize / 2,
    };
  }, [gridSize, gridType]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
      return;
    }

    const pos = screenToMap(e.clientX, e.clientY);

    if (selectedTool === 'measure') {
      setMeasureStart(pos);
      setMeasureEnd(pos);
      return;
    }

    if (selectedTool === 'fog' || selectedTool === 'erase') {
      toggleFogAt(pos);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const pos = screenToMap(e.clientX, e.clientY);
    setMousePos(pos);

    if (isPanning) {
      dispatch({
        type: 'SET_PAN',
        offset: { x: e.clientX - panStart.x, y: e.clientY - panStart.y },
      });
      return;
    }

    if (dragging) {
      const snapped = snapToGrid({
        x: pos.x - dragOffset.x,
        y: pos.y - dragOffset.y,
      });
      dispatch({
        type: 'UPDATE_TOKEN',
        id: dragging,
        updates: { position: snapped },
      });
      return;
    }

    if (selectedTool === 'measure' && measureStart) {
      setMeasureEnd(pos);
    }

    if ((selectedTool === 'fog' || selectedTool === 'erase') && e.buttons === 1) {
      toggleFogAt(pos);
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
    setIsPanning(false);
    if (selectedTool === 'measure') {
      // keep measurement visible
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.max(0.3, Math.min(3, zoom + delta));
    dispatch({ type: 'SET_ZOOM', zoom: newZoom });
  };

  const handleTokenMouseDown = (e: React.MouseEvent, token: Token) => {
    e.stopPropagation();
    if (selectedTool === 'select' || selectedTool === 'move') {
      dispatch({ type: 'SELECT_TOKEN', id: token.id });
      const pos = screenToMap(e.clientX, e.clientY);
      setDragOffset({ x: pos.x - token.position.x, y: pos.y - token.position.y });
      setDragging(token.id);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (selectedTool === 'select' && !dragging) {
      dispatch({ type: 'SELECT_TOKEN', id: null });
    }
    if (selectedTool === 'measure') {
      setMeasureStart(null);
      setMeasureEnd(null);
    }
  };

  const toggleFogAt = (pos: Position) => {
    const cellX = Math.floor(pos.x / gridSize);
    const cellY = Math.floor(pos.y / gridSize);
    const exists = fog.find(c => c.x === cellX && c.y === cellY);
    if (exists) {
      dispatch({
        type: 'TOGGLE_FOG',
        cells: fog.map(c =>
          c.x === cellX && c.y === cellY
            ? { ...c, revealed: selectedTool === 'erase' ? false : true }
            : c
        ),
      });
    } else {
      dispatch({
        type: 'TOGGLE_FOG',
        cells: [...fog, { x: cellX, y: cellY, revealed: selectedTool === 'fog' }],
      });
    }
  };

  const getDistance = (p1: Position, p2: Position): number => {
    const dx = (p2.x - p1.x) / gridSize;
    const dy = (p2.y - p1.y) / gridSize;
    const cells = Math.round(Math.sqrt(dx * dx + dy * dy));
    return cells * 1.5; // 1.5m per cell (D&D standard)
  };

  const selectedToken = tokens.find(t => t.id === selectedTokenId);

  return (
    <div
      ref={containerRef}
      className="flex-1 relative overflow-hidden bg-slate-900 cursor-crosshair"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      onClick={handleCanvasClick}
      style={{
        cursor: isPanning ? 'grabbing' :
          selectedTool === 'move' ? 'grab' :
          selectedTool === 'measure' ? 'crosshair' :
          selectedTool === 'fog' ? 'cell' :
          selectedTool === 'erase' ? 'cell' : 'default'
      }}
    >
      {/* Map transform layer */}
      <div
        className="absolute inset-0 origin-top-left"
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
        }}
      >
        {/* Background texture */}
        <div className="absolute inset-0 w-[3000px] h-[3000px]" style={{
          background: 'radial-gradient(ellipse at 30% 40%, rgba(139, 92, 42, 0.15), transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(59, 130, 246, 0.08), transparent 40%), #1e293b',
        }} />

        {/* Grid */}
        {gridType !== 'none' && (
          <svg className="absolute inset-0 w-[3000px] h-[3000px] pointer-events-none" style={{ opacity: 0.15 }}>
            {gridType === 'square' && (
              <>
                {[...Array(60)].map((_, i) => (
                  <line
                    key={`v${i}`}
                    x1={i * gridSize}
                    y1={0}
                    x2={i * gridSize}
                    y2={3000}
                    stroke="#f59e0b"
                    strokeWidth={1}
                  />
                ))}
                {[...Array(60)].map((_, i) => (
                  <line
                    key={`h${i}`}
                    x1={0}
                    y1={i * gridSize}
                    x2={3000}
                    y2={i * gridSize}
                    stroke="#f59e0b"
                    strokeWidth={1}
                  />
                ))}
              </>
            )}
            {gridType === 'hex' && (
              <g>
                {[...Array(40)].map((_, row) =>
                  [...Array(40)].map((_, col) => {
                    const x = col * gridSize * 1.5;
                    const y = row * gridSize * Math.sqrt(3) + (col % 2 === 1 ? gridSize * Math.sqrt(3) / 2 : 0);
                    const r = gridSize * 0.55;
                    const points = [...Array(6)].map((_, i) => {
                      const angle = (Math.PI / 3) * i - Math.PI / 6;
                      return `${x + r * Math.cos(angle)},${y + r * Math.sin(angle)}`;
                    }).join(' ');
                    return <polygon key={`${row}-${col}`} points={points} fill="none" stroke="#f59e0b" strokeWidth={1} />;
                  })
                )}
              </g>
            )}
          </svg>
        )}

        {/* Fog of war */}
        {fog.length > 0 && (
          <div className="absolute inset-0 w-[3000px] h-[3000px] pointer-events-none">
            {fog.filter(c => !c.revealed).map((cell, i) => (
              <div
                key={i}
                className="absolute bg-gray-900/90"
                style={{
                  left: cell.x * gridSize,
                  top: cell.y * gridSize,
                  width: gridSize,
                  height: gridSize,
                }}
              />
            ))}
          </div>
        )}

        {/* Measurement line */}
        {measureStart && measureEnd && selectedTool === 'measure' && (
          <svg className="absolute inset-0 w-[3000px] h-[3000px] pointer-events-none">
            <line
              x1={measureStart.x}
              y1={measureStart.y}
              x2={measureEnd.x}
              y2={measureEnd.y}
              stroke="#f59e0b"
              strokeWidth={2}
              strokeDasharray="8,4"
            />
            <circle cx={measureStart.x} cy={measureStart.y} r={4} fill="#f59e0b" />
            <circle cx={measureEnd.x} cy={measureEnd.y} r={4} fill="#f59e0b" />
            <text
              x={(measureStart.x + measureEnd.x) / 2}
              y={(measureStart.y + measureEnd.y) / 2 - 10}
              fill="#f59e0b"
              fontSize={14}
              textAnchor="middle"
              fontWeight="bold"
            >
              {getDistance(measureStart, measureEnd).toFixed(1)}m
            </text>
          </svg>
        )}

        {/* Notes */}
        {state.notes.map(note => (
          <motion.div
            key={note.id}
            className="absolute w-6 h-6 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-125 transition-transform"
            style={{
              left: note.position.x - 12,
              top: note.position.y - 12,
              backgroundColor: note.color,
            }}
            whileHover={{ scale: 1.3 }}
            title={note.title}
          >
            <span className="text-xs">📌</span>
          </motion.div>
        ))}

        {/* Tokens */}
        {tokens.map(token => (
          <motion.div
            key={token.id}
            className={`absolute flex flex-col items-center cursor-grab active:cursor-grabbing select-none ${
              selectedTokenId === token.id ? 'z-20' : 'z-10'
            }`}
            style={{
              left: token.position.x - token.size / 2,
              top: token.position.y - token.size / 2,
              width: token.size,
              height: token.size,
            }}
            onMouseDown={(e) => handleTokenMouseDown(e, token)}
            whileHover={{ scale: 1.1 }}
            animate={selectedTokenId === token.id ? { scale: 1.05 } : {}}
          >
            {/* Token body */}
            <div
              className={`w-full h-full rounded-full flex items-center justify-center shadow-lg border-2 transition-all ${
                selectedTokenId === token.id
                  ? 'border-amber-400 shadow-amber-400/40 ring-2 ring-amber-400/30'
                  : token.isEnemy
                  ? 'border-red-500/60 shadow-red-500/20'
                  : 'border-white/30 shadow-black/40'
              }`}
              style={{ backgroundColor: token.color }}
            >
              <span className="text-lg" style={{ fontSize: token.size * 0.4 }}>
                {token.emoji}
              </span>
            </div>

            {/* HP bar */}
            {token.hp !== undefined && token.maxHp !== undefined && (
              <div className="w-full mt-0.5">
                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                  <div
                    className={`h-full transition-all ${
                      token.hp / token.maxHp > 0.5 ? 'bg-green-500' :
                      token.hp / token.maxHp > 0.25 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(token.hp / token.maxHp) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Name label */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="text-[10px] font-medium text-white bg-black/70 px-1.5 py-0.5 rounded">
                {token.name}
              </span>
            </div>

            {/* Initiative badge */}
            {state.combatActive && token.initiative && (
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-amber-500 text-[10px] font-bold text-black flex items-center justify-center border border-amber-300">
                {token.initiative}
              </div>
            )}

            {/* Conditions */}
            {token.conditions.length > 0 && (
              <div className="absolute -top-2 -left-2 flex gap-0.5">
                {token.conditions.slice(0, 2).map((c, i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-purple-500 border border-purple-300" title={c} />
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* HUD overlay - coordinates */}
      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs text-gray-300 font-mono">
        X: {Math.round(mousePos.x)} Y: {Math.round(mousePos.y)} | Zoom: {(zoom * 100).toFixed(0)}%
      </div>

      {/* Selected token info */}
      {selectedToken && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 right-4 bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-xl p-4 w-64"
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-amber-400"
              style={{ backgroundColor: selectedToken.color }}
            >
              <span className="text-sm">{selectedToken.emoji}</span>
            </div>
            <div>
              <div className="text-white font-semibold text-sm">{selectedToken.name}</div>
              <div className="text-gray-400 text-xs">
                {selectedToken.isEnemy ? 'Inimigo' : 'Aliado'}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-gray-700/50 rounded px-2 py-1">
              <span className="text-gray-400">PV: </span>
              <span className="text-green-400 font-bold">{selectedToken.hp}/{selectedToken.maxHp}</span>
            </div>
            <div className="bg-gray-700/50 rounded px-2 py-1">
              <span className="text-gray-400">CA: </span>
              <span className="text-blue-400 font-bold">{selectedToken.ac}</span>
            </div>
          </div>
          <div className="flex gap-1 mt-2">
            <button
              onClick={() => dispatch({
                type: 'UPDATE_TOKEN',
                id: selectedToken.id,
                updates: { hp: Math.max(0, (selectedToken.hp || 0) - 1) },
              })}
              className="flex-1 bg-red-500/20 border border-red-500/30 text-red-400 rounded px-2 py-1 text-xs hover:bg-red-500/30 transition-colors"
            >
              -1 PV
            </button>
            <button
              onClick={() => dispatch({
                type: 'UPDATE_TOKEN',
                id: selectedToken.id,
                updates: { hp: Math.min(selectedToken.maxHp || 999, (selectedToken.hp || 0) + 1) },
              })}
              className="flex-1 bg-green-500/20 border border-green-500/30 text-green-400 rounded px-2 py-1 text-xs hover:bg-green-500/30 transition-colors"
            >
              +1 PV
            </button>
            <button
              onClick={() => dispatch({ type: 'REMOVE_TOKEN', id: selectedToken.id })}
              className="bg-gray-700/50 border border-gray-600/30 text-gray-400 rounded px-2 py-1 text-xs hover:bg-gray-600/50 transition-colors"
            >
              🗑️
            </button>
          </div>
        </motion.div>
      )}

      {/* Tool indicator */}
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs text-amber-400 font-medium">
        {selectedTool === 'select' && '🖱️ Selecionar'}
        {selectedTool === 'move' && '✋ Mover'}
        {selectedTool === 'measure' && '📏 Medir Distância'}
        {selectedTool === 'fog' && '🌫️ Névoa de Guerra'}
        {selectedTool === 'erase' && '🧹 Apagar Névoa'}
        {selectedTool === 'draw' && '✏️ Desenhar'}
        {selectedTool === 'text' && '📝 Texto'}
        {selectedTool === 'pin' && '📌 Fixar Nota'}
      </div>
    </div>
  );
}
