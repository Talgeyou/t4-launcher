import { memo } from 'react';
import useLogSection from '../model';

function LogSection() {
  const { messages } = useLogSection();

  return (
    <div className="h-full w-full bg-slate-900/90 text-slate-50 flex flex-col max-h-screen overflow-hidden">
      <div className="w-full h-full p-4 flex flex-col gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-slate-900">
        {messages.map((message, index) => (
          <div
            key={message.id}
            ref={(element) => {
              if (index === messages.length - 1) {
                element?.scrollIntoView();
              }
            }}
          >
            {message.body}
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(LogSection);
