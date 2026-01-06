import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const PolyMindContext = createContext();

export const PolyMindProvider = ({ children }) => {
  const [token, setTokenState] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [imagePrompt, setImagePrompt] = useState("");
  const [generatedImages, setGeneratedImages] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [generatedVideos, setGeneratedVideos] = useState([]);
  const [videoLoading, setVideoLoading] = useState(false);
  const [generatedMusics, setGeneratedMusics] = useState([]);
  const [musicLoading, setMusicLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const errorInterceptor = (error) => {
      if (error.response && error.response.status === 403) {
        navigate("/subscription");
      }
      return Promise.reject(error);
    };

    const interceptor = axios.interceptors.response.use(
      (response) => response,
      errorInterceptor
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, [navigate]);

  useEffect(() => {
    if (
      user &&
      user.subscription &&
      new Date(user.subscription.endDate) > new Date()
    ) {
      setIsSubscribed(true);
    } else {
      setIsSubscribed(false);
    }
  }, [user]);

  const setToken = (newToken) => {
    setTokenState(newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setChats([]);
    localStorage.removeItem("token");
  };

  const fetchChats = async () => {
    try {
      const response = await axios.get("https://api.daxer.dev/polymind/chat");
      setChats(response.data);
    } catch (error) {
      console.error("Failed to fetch chats", error);
    }
  };

  const generateImage = async ({ prompt }) => {
    setImageLoading(true);
    try {
      const response = await axios.post(
        "https://api.daxer.dev/polymind/chat/generate-image",
        {
          prompt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGeneratedImages((prevImages) => [
        ...prevImages,
        response.data.data.url,
      ]);
    } catch (error) {
      console.error("Failed to generate image", error);
    } finally {
      setImageLoading(false);
    }
  };

  const generateVideo = async ({ prompt }) => {
    setVideoLoading(true);
    try {
      const response = await axios.post(
        "https://api.daxer.dev/polymind/chat/generate-video",
        {
          prompt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGeneratedVideos((prevVideos) => [
        ...prevVideos,
        response.data.data.url,
      ]);
    } catch (error) {
      console.error("Failed to generate video", error);
    } finally {
      setVideoLoading(false);
    }
  };

  const generateMusic = async (input) => {
    setMusicLoading(true);
    try {
      const response = await axios.post(
        "https://api.daxer.dev/polymind/chat/music",
        input,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const taskId = response.data.data.task_id;

      const intervalId = setInterval(async () => {
        try {
          const statusResponse = await axios.get(
            `https://api.daxer.dev/polymind/chat/music/${taskId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (statusResponse.data.data.status === "finished") {
            clearInterval(intervalId);
            setGeneratedMusics((prevMusics) => [
              ...prevMusics,
              { url: statusResponse.data.data.url },
            ]);
            setMusicLoading(false);
          } else if (statusResponse.data.data.status === "failed") {
            clearInterval(intervalId);
            console.error("Music generation failed");
            setMusicLoading(false);
          }
        } catch (error) {
          clearInterval(intervalId);
          console.error("Failed to get music status", error);
          setMusicLoading(false);
        }
      }, 3000);
    } catch (error) {
      console.error("Failed to generate music", error);
      setMusicLoading(false);
    }
  };

  const generatePrompt = async ({ prompt }) => {
    setLoading(true);
    const response = await axios.post(
      "https://api.daxer.dev/polymind/chat/prompt",
      {
        prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setLoading(false);

    return response.data;
  };

  const sendMessage = async ({ prompt, chatId, llm }) => {
    setLoading(true);
    const llms = ["gemini", "gpt", "deepseek", "perplexity"];
    const loadingResponses = llms.map((model) => ({
      llm: model,
      response: "loading",
    }));

    setMessages((prevMessages) => [
      ...prevMessages,
      { user: prompt, responses: loadingResponses },
    ]);
    try {
      const response = await axios.post(
        "https://api.daxer.dev/polymind/chat/message",
        {
          prompt,
          chatID: chatId,
          llm,
        }
      );

      if (response.data.chatID && !chatId) {
        setActiveChatId(response.data.chatID);
      }

      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        const lastMessage = newMessages[newMessages.length - 1];

        if (Array.isArray(response.data.responses)) {
          lastMessage.responses = response.data.responses.map((r) => ({
            _id: r.messageID,
            llm: r.llm,
            response: r.response,
          }));
        } else {
          lastMessage.responses = [
            {
              _id: response.data.messageID,
              llm: response.data.llm,
              response: response.data.response,
            },
          ];
        }

        return newMessages;
      });
      setLoading(false);
    } catch (error) {
      console.error("Failed to send message", error);
      const llms = ["gemini", "gpt", "deepseek", "perplexity"];
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        const lastMessage = newMessages[newMessages.length - 1];
        lastMessage.responses = llms.map((model) => ({
          from: model,
          message: "Error: Failed to get response.",
        }));
        return newMessages;
      });
      setLoading(false);
    }
  };

  const selectMessage = async ({ chatID, messageID }) => {
    try {
      await axios.post("https://api.daxer.dev/polymind/chat/select", {
        chatID,
        messageID,
      });

      setMessages((prevMessages) => {
        return prevMessages.map((turn) => {
          // Find the turn that contains the message that was selected
          const isTargetTurn = turn.responses.some((r) => r._id === messageID);

          if (isTargetTurn) {
            const newResponses = turn.responses.map((response) => {
              return {
                ...response,
                isSelected: response._id === messageID,
              };
            });
            return { ...turn, responses: newResponses };
          }
          return turn;
        });
      });
    } catch (error) {
      console.error("Failed to select message", error);
    }
  };

  const newChat = () => {
    setMessages([]);
    setActiveChatId(null);
  };

  const loadChat = async (chatID) => {
    try {
      const response = await axios.get(
        `https://api.daxer.dev/polymind/chat/${chatID}`
      );
      setMessages(response.data);
      setActiveChatId(chatID);
    } catch (error) {
      console.error("Failed to load chat", error);
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            "https://api.daxer.dev/polymind/auth/me"
          );
          setUser(response.data);
          fetchChats();
        } catch (error) {
          console.error("Failed to fetch user", error);
          logout();
        }
      };
      fetchUser();
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  const isLoggedIn = !!token;

  return (
    <PolyMindContext.Provider
      value={{
        token,
        setToken,
        isLoggedIn,
        user,
        logout,
        messages,
        sendMessage,
        selectMessage,
        activeChatId,
        imagePrompt,
        setImagePrompt,
        generatedImages,
        imageLoading,
        generateImage,
        generatedVideos,
        videoLoading,
        generateVideo,
        generatedMusics,
        musicLoading,
        generateMusic,
        generatePrompt,
        chats,
        fetchChats,
        loadChat,
        newChat,
        setMessages,
        setActiveChatId,
        loading,
        isSubscribed,
      }}
    >
      {children}
    </PolyMindContext.Provider>
  );
};
