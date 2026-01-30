'use client';

interface ActionBarProps {
  onAddRound: () => void;
  showButton: boolean;
}

export default function ActionBar({ onAddRound, showButton }: ActionBarProps) {
  if (!showButton) {
    return null;
  }

  return (
    <div data-testid="action-bar" className="bg-white border-t px-4 py-3 flex justify-center sm:px-6 lg:px-8 lg:py-4 lg:max-w-4xl lg:mx-auto">
      <button
        onClick={onAddRound}
        className="btn btn-primary rounded-full shadow-md flex items-center gap-2 font-semibold px-6 py-2.5 text-sm sm:px-8 sm:py-3 sm:text-base lg:px-10 lg:py-3.5"
        data-testid="add-round-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        차수 추가
      </button>
    </div>
  );
}
