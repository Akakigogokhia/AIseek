import { useEffect, useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';

export const useFetch = (prompt) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!prompt) return;
        setLoading(true);
        const configuration = new Configuration({
          apiKey: process.env.REACT_APP_GPT_KEY,
        });
        delete configuration.baseOptions.headers['User-Agent'];
        const openai = new OpenAIApi(configuration);
        const response = await openai.createChatCompletion({
          model: 'gpt-4-turbo',
          temperature: 0.8,
          max_tokens: 500,
          top_p: 1,
          frequency_penalty: 1,
          presence_penalty: 0,
          messages: [
            {
              role: 'system',
              content: 'you are chatbot of search engine called AIseek',
            },
            { role: 'user', content: prompt },
          ],
        });
        const answer = response.data.choices[0].message.content;
        setData(answer);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [prompt]);
  return {
    data,
    error,
    loading,
  };
};
