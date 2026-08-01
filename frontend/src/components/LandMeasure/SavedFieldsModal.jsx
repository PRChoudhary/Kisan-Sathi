import React, { useState } from 'react';
import { LuX, LuTrash2, LuPencil, LuMapPin, LuCheck, LuDownload } from 'react-icons/lu';
import { formatDate } from '../../utils/formatters';

export default function SavedFieldsModal({
  isOpen,
  onClose,
  savedFields,
  onLoadField,
  onRenameField,
  onDeleteField
}) {
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState('');

  if (!isOpen) return null;

  const handleStartRename = (field) => {
    setEditingId(field.id);
    setNewName(field.name);
  };

  const handleSaveRename = (id) => {
    if (newName.trim()) {
      onRenameField(id, newName.trim());
      setEditingId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-farmer-200 max-w-2xl w-full overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="bg-farmer-800 text-white px-6 py-5 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black flex items-center gap-2">
              🌾 Saved Agricultural Fields
            </h3>
            <p className="text-xs text-farmer-200 mt-0.5">
              View, reload onto map, rename or delete your stored land boundaries.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <LuX className="w-5 h-5" />
          </button>
        </div>

        {/* Fields List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {savedFields.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <span className="text-4xl block">🗺️</span>
              <p className="text-base font-bold text-slate-700">No Saved Fields Yet</p>
              <p className="text-xs">Measure your land using any of the 3 methods and click "Save Field".</p>
            </div>
          ) : (
            savedFields.map((field) => (
              <div
                key={field.id}
                className="bg-slate-50 hover:bg-farmer-50/50 p-4 rounded-2xl border border-slate-200 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1 flex-1">
                  {editingId === field.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="px-3 py-1 rounded-lg border border-farmer-500 font-bold text-sm text-slate-900 focus:outline-none"
                      />
                      <button
                        onClick={() => handleSaveRename(field.id)}
                        className="p-1.5 rounded-lg bg-farmer-600 text-white"
                      >
                        <LuCheck className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-black text-slate-900">{field.name}</h4>
                      <button
                        onClick={() => handleStartRename(field)}
                        className="p-1 text-slate-400 hover:text-farmer-600"
                        title="Rename Field"
                      >
                        <LuPencil className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <div className="flex items-center gap-3 text-xs text-slate-600 flex-wrap">
                    <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      {field.areaAcres} Acres
                    </span>
                    <span>({field.areaSqMeters} m²)</span>
                    <span>• Method: {field.method}</span>
                    <span className="text-slate-400">• {formatDate(field.createdAt)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onLoadField(field);
                      onClose();
                    }}
                    className="px-4 py-2 rounded-xl bg-farmer-600 hover:bg-farmer-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
                    title="Load Polygon onto Map to edit/view"
                  >
                    <LuDownload className="w-4 h-4" />
                    <span>Load Map</span>
                  </button>

                  <button
                    onClick={() => onDeleteField(field.id)}
                    className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                    title="Delete Field"
                  >
                    <LuTrash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
