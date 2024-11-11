import { useState } from "react";
import './App.css';

const Fighter = ({ zombieFighter, handleAddFighter, handleRemoveFighter, index, isTeamListing }) => (
  <li>
    <h2>{zombieFighter.name}</h2>
    <img src={zombieFighter.img} alt={zombieFighter.name} />
    <h3>{'$ ' + zombieFighter.price}</h3>
    <h3>{`Strength: ${zombieFighter.strength}`}</h3>
    <h3>{`Agility: ${zombieFighter.agility}`}</h3>
    {
      isTeamListing
        ? <button onClick={() => handleRemoveFighter(zombieFighter, index)}>Remove</button>
        : <button onClick={() => handleAddFighter(zombieFighter)}>Add</button>
    }
  </li>
);

const App = () => {
  const [team, setTeam] = useState([]);
  let [money, setMoney] = useState(100);
  const [zombieFighters, setZombieFighters] = useState([
    {
      name: 'Survivor',
      price: 12,
      strength: 6,
      agility: 4,
      img: 'https://via.placeholder.com/150/92c952',
    },
    {
      name: 'Scavenger',
      price: 10,
      strength: 5,
      agility: 5,
      img: 'https://via.placeholder.com/150/771796',
    },
    {
      name: 'Shadow',
      price: 18,
      strength: 7,
      agility: 8,
      img: 'https://via.placeholder.com/150/24f355',
    },
    {
      name: 'Tracker',
      price: 14,
      strength: 7,
      agility: 6,
      img: 'https://via.placeholder.com/150/d32776',
    },
    {
      name: 'Sharpshooter',
      price: 20,
      strength: 6,
      agility: 8,
      img: 'https://via.placeholder.com/150/1ee8a4',
    },
    {
      name: 'Medic',
      price: 15,
      strength: 5,
      agility: 7,
      img: 'https://via.placeholder.com/150/66b7d2',
    },
    {
      name: 'Engineer',
      price: 16,
      strength: 6,
      agility: 5,
      img: 'https://via.placeholder.com/150/56acb2',
    },
    {
      name: 'Brawler',
      price: 11,
      strength: 8,
      agility: 3,
      img: 'https://via.placeholder.com/150/8985dc',
    },
    {
      name: 'Infiltrator',
      price: 17,
      strength: 5,
      agility: 9,
      img: 'https://via.placeholder.com/150/392537',
    },
    {
      name: 'Leader',
      price: 22,
      strength: 7,
      agility: 6,
      img: 'https://via.placeholder.com/150/602b9e',
    },
  ]
  );
  let [totalStrength, setTotalStrength] = useState(0);
  let [totalAgility, setTotalAgility] = useState(0);

  const handleAddFighter = (fighter) => {
    if (team.some(member => fighter.name === member.name))
      return;

    if (money < fighter.price) {
      console.log('Not enough money');
      return;
    }
    setMoney(money - fighter.price);
    setTeam([...team, fighter]);
    setTotalStrength([...team, fighter].reduce((acc, fighter) => acc + fighter.strength, 0));
    setTotalAgility([...team, fighter].reduce((acc, fighter) => acc + fighter.agility, 0));
  }

  const handleRemoveFighter = (fighter, indexToRemove) => {
    const newTeam = team.filter((fighter, index) => index !== indexToRemove);
    setMoney(money + fighter.price);
    setTeam(newTeam);
    setTotalStrength(newTeam.reduce((acc, fighter) => acc + fighter.strength, 0));
    setTotalAgility(newTeam.reduce((acc, fighter) => acc + fighter.agility, 0));
  }

  return (
    <>
      <h1>Zombie Fighters</h1>
      {<p>Team strength: {totalStrength}</p>}
      {<p>Team agility: {totalAgility}</p>}
      {
        !team.length ? <h2>Pick some team members!</h2> :
          <ul>
            {
              team.map((zombieFighter, index) => (
                <Fighter key={zombieFighter.name} zombieFighter={zombieFighter} handleAddFighter={handleAddFighter} handleRemoveFighter={handleRemoveFighter} index={index} isTeamListing={true} />
              ))
            }
          </ul>
      }
      <h3>Money available: {money}</h3>
      <ul>
        {
          zombieFighters.map((zombieFighter, index) => (
            <Fighter key={zombieFighter.name} zombieFighter={zombieFighter} handleAddFighter={handleAddFighter} handleRemoveFighter={handleRemoveFighter} index={index} isTeamListing={false} />
          ))
        }
      </ul>

    </>
  );
}
export default App
