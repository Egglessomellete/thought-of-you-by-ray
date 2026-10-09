import React from 'react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, onStart }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#02213c]/30 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#fffadf] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#02213c]/10 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="w-8 h-8 rounded-full bg-[#fcf6bd] flex items-center justify-center text-[#02213c]">
            <span className="material-symbols-outlined text-[18px]">filter_vintage</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-[#74777e] hover:text-[#000816] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#43474d] font-semibold">
            Our Story
          </span>
          <h2 className="font-serif italic text-3xl text-[#02213c] mt-1 mb-3">
            Thought of You
          </h2>
          <p className="font-sans text-sm text-[#43474d] leading-relaxed mb-3">
            In an era of fleeting notifications and ephemeral chats, <em>Thought of You</em> is a quiet ritual of appreciation.
          </p>
          <p className="font-sans text-sm text-[#43474d] leading-relaxed mb-3">
            Each digital arrangement is hand-curated stem by stem, gathered into a warm kraft parcel, and accompanied by your genuine handwriting. When your recipient opens the unlisted link, they unwrap a moment made specifically for them—a blooming keepsake that never fades.
          </p>
        </div>

        <div className="bg-[#fcf6bd]/70 rounded-2xl p-4 border border-[#02213c]/5">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="material-symbols-outlined text-sm text-[#02213c]">spa</span>
            <span className="font-mono text-xs font-semibold text-[#02213c] uppercase tracking-wider">
              The Botanical Atelier
            </span>
          </div>
          <p className="font-sans text-xs text-[#43474d] leading-relaxed">
            Zero accounts required. Fully private unlisted parcels. Designed to cultivate tenderness across distance.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono text-[#43474d] hover:text-[#000816] cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onStart();
            }}
            className="px-6 py-2.5 rounded-full bg-[#02213c] text-white font-sans text-xs font-medium hover:bg-[#02213c]/90 transition-all shadow-sm cursor-pointer"
          >
            Start Arranging
          </button>
        </div>
      </div>
    </div>
  );
};
