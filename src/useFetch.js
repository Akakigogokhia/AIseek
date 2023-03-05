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

        const openai = new OpenAIApi(configuration);
        const response = await openai.createCompletion({
          model: 'text-davinci-003',
          prompt: prompt,
          temperature: 0.8,
          max_tokens: 200,
          top_p: 1,
          frequency_penalty: 1,
          presence_penalty: 0,
        });

        const answer = response.data.choices[0].text;
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
