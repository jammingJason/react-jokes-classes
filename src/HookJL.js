import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HookJoke from './HookJoke';

const HookJL = ({ numJokesToGet }) => {
  const [allJokes, setAllJokes] = useState({
    jokes: [],
    isLoading: true,
  });

  const [allVotes, setAllVotes] = useState(0);

  /* at mount, get jokes */
  useEffect(() => {
    getJokes();
  }, [allVotes]);

  const getJokes = async () => {
    try {
      // load jokes one at a time, adding not-yet-seen jokes
      //   numJokesToGet = 5;
      let newArray = [];
      let seenJokes = new Set();
      //   alert(numJokesToGet);
      while (newArray.length < numJokesToGet) {
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

      setAllJokes({ jokes: [...newArray], isLoading: false });

      console.log(newArray);
      newArray.length = 0;
      return allJokes;
    } catch (err) {
      console.error(err);
    }
  };
  const generateNewJokes = () => {
    setAllVotes(Math.random());
    // return allVotes;
    alert(allVotes);
  };

  /* change vote for this id by delta (+1 or -1) */

  const vote = (id, delta) => {
    console.log(id);
    setAllJokes((allJokes) => ({
      jokes: allJokes.jokes.map((j) =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      ),
    }));
    console.log(allJokes);
  };

  let sortedJokes = [...allJokes.jokes].sort((a, b) => b.votes - a.votes);

  if (allJokes.isLoading) {
    return (
      <div className="loading">
        <i className="fas fa-4x fa-spinner fa-spin" />
      </div>
    );
  } else {
    return (
      <div className="JokeList">
        <button className="JokeList-getmore" onClick={generateNewJokes}>
          Get New Jokes
        </button>
        {sortedJokes.map((j) => (
          <HookJoke
            text={j.joke}
            key={j.id}
            id={j.id}
            votes={j.votes}
            vote={vote}
          />
        ))}
      </div>
    );
  }
};

export default HookJL;
