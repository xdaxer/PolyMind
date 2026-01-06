import React, { useContext } from "react";
import { PolyMindContext } from "../../context/context";

function GeneratedImages() {
  const { generatedImages } = useContext(PolyMindContext);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {generatedImages.map((image, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden w-[1080px] h-[500px] "
          >
            <img
              src={`https://api.daxer.dev/polymind${image}`}
              alt={`Generated image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GeneratedImages;
