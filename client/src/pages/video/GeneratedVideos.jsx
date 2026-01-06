import React, { useContext } from "react";
import { PolyMindContext } from "../../context/context";

function GeneratedVideos() {
  const { generatedVideos } = useContext(PolyMindContext);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {generatedVideos.map((video, index) => (
          <div key={index} className="rounded-lg overflow-hidden">
            <video
              src={`https://api.daxer.dev/polymind${video}`}
              alt={`Generated video ${index + 1}`}
              className="w-full h-full object-cover"
              controls
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GeneratedVideos;
