import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HookJoke from './HookJoke';
import { v4 as uuid } from 'uuid';
import './HookJokeList.css';
import useDataConnect from './hooks/useDataConnect';

/** List of jokes. */

const HookJokeList = ({ numJokesToGet }) => {
  const [allJokes, setAllJokes] = useState({
    jokes: [],
    isLoading: true,
  });

  const [allVotes, setAllVotes] = useState(0);

  /* at mount, get jokes */
  useEffect(() => {
    getJokes();
  }, []);
  /* retrieve jokes from API */

  const getJokes = async () => {
    try {
      // load jokes one at a time, adding not-yet-seen jokes
      let newArray = [];
      let seenJokes = new Set();

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

      newArray.length = 0;

      return allJokes;
    } catch (err) {
      console.error(err);
    }
  };

  /* empty joke list, set to loading state, and then call getJokes */

  const generateNewJokes = async () => {
    setAllJokes({ isLoading: true });
    getJokes();
  };

  /* change vote for this id by delta (+1 or -1) */

  const vote = (id, delta) => {
    setAllJokes((allJokes) => ({
      jokes: allJokes.jokes.map((j) =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      ),
    }));
    console.log(allJokes);
  };
  /* render: either loading spinner or list of sorted jokes. */

  let sortedJokes = [...allJokes.jokes].sort((a, b) => b.votes - a.votes);
  // console.log(allJokes);
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

export default HookJokeList;
