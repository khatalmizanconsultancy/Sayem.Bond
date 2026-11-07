import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Sparkles, 
  Link as LinkIcon, 
  Trash2, 
  Check, 
  Camera, 
  User, 
  Image as ImageIcon 
} from 'lucide-react';
import { AVATAR_PRESETS } from '../data/avatarPresets.ts';
import { ClientAvatar } from './ClientAvatar.tsx';

interface AvatarPickerProps {
  currentPhotoUrl?: string;
  applicantName: string;
  onPhotoSelected: (url: string | undefined) => void;
  compact?: boolean;
}

export const AvatarPicker: React.FC<AvatarPickerProps> = ({
  currentPhotoUrl,
  applicantName,
  onPhotoSelected,
  compact = false,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'presets' | 'url'>('presets');
  const [urlInput, setUrlInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Downscale and convert file to lightweight base64 Data URL
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPEG, PNG, WebP).');
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Create canvas to downscale to 280x280 max for optimized storage
        const canvas = document.createElement('canvas');
        const maxDim = 280;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          onPhotoSelected(compressedDataUrl);
        }
        setIsProcessing(false);
      };
      img.onerror = () => {
        setIsProcessing(false);
        alert('Could not process this image file.');
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    onPhotoSelected(urlInput.trim());
    setUrlInput('');
  };

  const handleRemovePhoto = () => {
    onPhotoSelected(undefined);
  };

  return (
    <div className="space-y-4">
      {/* Top Preview & Fast Action Bar */}
      <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.03] border border-white/10">
        <div className="relative group">
          <ClientAvatar
            photoUrl={currentPhotoUrl}
            name={applicantName || 'Client'}
            size={compact ? 'lg' : 'xl'}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 rounded-2xl flex items-center justify-center transition-opacity cursor-pointer text-white"
            title="Upload custom photo"
          >
            <Camera className="w-5 h-5 text-[#73e4e8]" />
          </button>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-white block truncate">
                {applicantName || 'New Client File'}
              </span>
              <span className="text-[11px] text-gray-400">
                {currentPhotoUrl ? 'Custom Profile Photo Active' : 'Default Monogram Initials'}
              </span>
            </div>

            {currentPhotoUrl && (
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="p-1.5 rounded-lg bg-[#ff8296]/15 hover:bg-[#ff8296]/25 text-[#ff8296] text-xs cursor-pointer flex items-center gap-1"
                title="Reset to Initials"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[10px]">Reset</span>
              </button>
            )}
          </div>

          {/* Quick Tab Selector */}
          <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-white/5">
            <button
              type="button"
              onClick={() => setActiveTab('presets')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                activeTab === 'presets'
                  ? 'bg-[#73e4e8]/20 text-[#73e4e8] border border-[#73e4e8]/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>UAE Avatars</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                activeTab === 'upload'
                  ? 'bg-[#73e4e8]/20 text-[#73e4e8] border border-[#73e4e8]/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Upload className="w-3 h-3" />
              <span>Upload Photo</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                activeTab === 'url'
                  ? 'bg-[#73e4e8]/20 text-[#73e4e8] border border-[#73e4e8]/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <LinkIcon className="w-3 h-3" />
              <span>Direct URL</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
      />

      {/* TAB 1: Presets Selection Grid */}
      {activeTab === 'presets' && (
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">
            Select Curated UAE Resident & Business Avatar
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {AVATAR_PRESETS.map((preset) => {
              const isSelected = currentPhotoUrl === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onPhotoSelected(preset.id)}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#73e4e8]/15 border-[#73e4e8] shadow-md shadow-cyan-500/10 ring-1 ring-[#73e4e8]'
                      : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.06] hover:border-white/20'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 border border-white/15">
                    <img
                      src={preset.avatarSvg}
                      alt={preset.label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-bold text-white block truncate">
                      {preset.label}
                    </span>
                    <span className="text-[10px] text-gray-400 block truncate">
                      {preset.role}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="w-4 h-4 rounded-full bg-[#73e4e8] flex items-center justify-center text-[#080d1b] shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Custom Photo Upload */}
      {activeTab === 'upload' && (
        <div className="p-4 rounded-xl border-2 border-dashed border-white/15 hover:border-[#73e4e8]/40 transition-colors text-center space-y-2.5 bg-white/[0.01]">
          <div className="w-10 h-10 rounded-xl bg-[#73e4e8]/10 text-[#73e4e8] flex items-center justify-center mx-auto">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">
              {isProcessing ? 'Optimizing image...' : 'Upload Client Biometric or Profile Photo'}
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Supports JPG, PNG, WebP · Auto-resized to passport resolution
            </p>
          </div>
          <button
            type="button"
            disabled={isProcessing}
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#73e4e8] to-[#a99cff] text-[#07111d] text-xs font-bold shadow-md hover:brightness-110 cursor-pointer disabled:opacity-50"
          >
            {isProcessing ? 'Processing Image...' : 'Choose File from Device'}
          </button>
        </div>
      )}

      {/* TAB 3: Image URL Input */}
      {activeTab === 'url' && (
        <form onSubmit={handleApplyUrl} className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Paste direct HTTPS image link (e.g. https://...)"
            className="flex-1 glass-input px-3 py-2 rounded-xl text-xs text-white"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold cursor-pointer transition-colors"
          >
            Apply URL
          </button>
        </form>
      )}
    </div>
  );
};
