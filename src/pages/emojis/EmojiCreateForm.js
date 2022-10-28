import React, { useState } from "react";
import data from '@emoji-mart/data';
import { init } from 'emoji-mart';
import Picker from '@emoji-mart/react';
import { axiosRes } from "../../api/axiosDefaults";

function EmojiCreateForm(props) {
  const { screenshot, setscreenshot, setEmojis } = props;
  const [emoji, setEmoji] = useState("");

  const handleSubmit = async (data) => {
    init({data})
    setEmoji(data.unified)
    console.log(emoji)
    try {
      const { data } = await axiosRes.post("/emojis/", {
        emoji,
        screenshot,
      });
      setEmojis((prevEmojis) => ({
        ...prevEmojis,
        results: [data, ...prevEmojis.results],
      }));
      setEmoji("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Picker data={data} onEmojiSelect={handleSubmit} />
  );
}

export default EmojiCreateForm;
