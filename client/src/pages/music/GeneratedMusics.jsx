import React, { useContext } from "react";
import { PolyMindContext } from "../../context/context";

function GeneratedMusics() {
  const { generatedMusics } = useContext(PolyMindContext);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {generatedMusics.map((music, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden w-[1080px] h-[500px] "
          >
            <audio controls src={music.url} className="w-full">
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GeneratedMusics;
