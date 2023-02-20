import React, { useState } from 'react';
import axios from 'axios';

const stopMe = () => {
  alert('Stop Me');
  return;
};
const useDataConnect = async () => {
  const howManyJokes = 5;
  try {
    // load jokes one at a time, adding not-yet-seen jokes
    const [jokes, setJokes] = useState([]);
    let newArray = [];
    let seenJokes = new Set();

    while (newArray.length < howManyJokes) {
      console.log('This is the arrary length ==> ' + newArray.length);
      let res = await axios.get('https://icanhazdadjoke.com', {
        headers: { Accept: 'application/json' },
      });
      let { ...joke } = res.data;

      if (!seenJokes.has(joke.id)) {
        seenJokes.add(joke.id);
        newArray.push({ ...joke, votes: 0 });
      } else {
        console.log('duplicate found!');
      }
    }

    setJokes({ ...newArray, isLoading: false });
    console.log(jokes);
    stopMe();
    return jokes;
  } catch (err) {
    console.error(err);
  }
};

export default useDataConnect;
