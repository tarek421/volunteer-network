import React, { useEffect } from "react";
import { useState } from "react";
import Volunter from "../Volunter/Volunter";

const Volunters = () => {
  // const volunters = [
  //   { name: "Child Support.", image: 1 },
  //   { name: "Refuge Shelter.", image: 2 },
  //   { name: "Food Charity.", image: 3 },
  //   { name: "Host a clothing swap.", image: 4 },
  //   { name: "Host a River Clean-up..", image: 5 },
  //   { name: "Clene water for Children.", image: 6 },
  //   { name: "Good Education.", image: 7 },
  //   { name: "New Books for children.", image: 8 },
  //   { name: "Host a study group.", image: 9 },
  //   { name: "Build Birdhouse for neighbours.", image: 10 },
  //   { name: "Organige Book at the library.", image: 11 },
  //   { name: "Give a seminar for driving safety.", image: 12 },
  //   { name: "Give free music lessons.", image: 13 },
  //   { name: "Teach people how to register to vote.", image: 14 },
  //   { name: "Clene up your local park.", image: 15 },
  //   { name: "Give IT help to local adalts.", image: 16 },
  //   { name: "Forest a selter animal.", image: 17 },
  //   { name: "Babysit during PTA meetings.", image: 18 },
  //   { name: "Collect stuffed animal.", image: 19 },
  //   { name: "Collect school supplies.", image: 20 },
  // ];
  const [volunteers, setVolunteers] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:5000/events')
    .then(response => response.json())
    .then(data => setVolunteers(data))
  },[])

  return (
    <div className="container mt-5">
      <div className="row">
        {volunteers.map((volunter) => (
          <Volunter data={volunter} key={volunter._id}></Volunter>
        ))}
      </div>
    </div>
  );
};

export default Volunters;
