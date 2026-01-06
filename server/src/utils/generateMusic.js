const POYO_API_KEY = process.env.POYO_API_KEY;
const API_URL = "https://api.poyo.ai/api/generate/submit";
const QUERY_API_URL = "https://api.poyo.ai/api/generate/detail/music";

if (!POYO_API_KEY) {
  throw new Error("POYO_API_KEY environment variable is not set!");
}
const generateMusic = async (input) => {
  
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${POYO_API_KEY}`,
      },
      body: JSON.stringify({
        model: "generate-music",
        input: input,
      }),
    });

    const data = await response.json();

    if (data.code !== 200) {
      const error = new Error(data.error.message);
      error.status = data.code;
      error.data = data.error;
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const queryMusic = async (taskId) => {
  if (!POYO_API_KEY) {
    throw new Error("POYO_API_KEY environment variable is not set!");
  }

  try {
    const url = new URL(QUERY_API_URL);
    url.searchParams.append("task_id", taskId);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${POYO_API_KEY}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `API request failed with status ${response.status}: ${
          errorData.message || "Unknown error"
        }`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error querying music:", error);
    throw error;
  }
};

export default generateMusic;
