import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/bus.jpg";
import moment from "moment";

function Bus({ bus }) {
  const navigate = useNavigate();
  const percentage = bus.seatsBooked.length * 100 / bus.capacity;
  const busColor = percentage <= 60 ? 'green' : (percentage <=90 ? 'yellow' : 'red')
  return (
    <>
      <div className="max-w-full bg-white flex flex-col rounded overflow-hidden shadow-lg">
        <div 
          className="flex flex-row items-baseline flex-nowrap p-2" 
          style={{backgroundColor: busColor}}
        >
          <img className="h-10 w-10 rounded-full mr-4" style={{marginLeft: '2rem', marginTop: '1rem', float: 'left'}} src={logo} alt="Logo" />
          <h1 className="ml-2 uppercase font-bold" style={{fontSize: '25px', marginBottom: '1rem'}}>Journey Date: {bus.journeyDate}</h1>
        </div>
        <div className="mt-2 flex justify-start bg-white p-2"></div>
        <div className="mt-2 flex sm:flex-row mx-6 sm:justify-between flex-wrap ">
          <div className="flex flex-row place-items-center p-2">
            <div className="flex flex-col ml-2">
              <p className="text-base font-bold">{bus.name}</p>
            </div>
          </div>

          <div className="flex flex-col p-2">
            <p className="font-bold">Departure Time</p>
            <p className="font-base">
              {moment(bus.departure, "HH:mm").format("hh:mm A")}
            </p>

            <p className="font-bold">From </p>
            <p className="text-orange-500">{bus.from}</p>
          </div>
          <div className="flex flex-col flex-wrap p-2">
            <p className="font-bold">Arrival Time</p>
            <p className="font-base">
              {moment(bus.arrival, "HH:mm").format("hh:mm A")}
            </p>

            <p className="font-bold">To</p>

            <p className="text-orange-500">{bus.to}</p>
          </div>
        </div>
        <div className="mt-4 bg-orange-100 flex flex-row flex-wrap md:flex-nowrap justify-between items-baseline">
          <div className="flex mx-6 py-4 flex-row flex-wrap">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>

            <div className="text-sm mx-2 flex flex-col">
              <p className="font-bold text-base">Price</p>
              <p className="font-base">{bus.price} INR</p>
            </div>
          </div>
          <div className="md:border-l-2 mx-6 md:border-dotted flex flex-row py-4 mr-6 flex-wrap">
            <button
              className="relative inline-flex items-center justify-start
                px-10 py-3 overflow-hidden font-bold rounded-full
                group"
              onClick={() => {
                if (localStorage.getItem("user_id")) {
                  navigate(`/book-now/${bus._id}`);
                } else {
                  navigate(`/login`);
                }
                // clear local storage
                localStorage.removeItem("idTrip");
                // set id trip local storage
                localStorage.setItem("idTrip", bus._id);
              }}
            >
              <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
              <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-blue-600 opacity-100 group-hover:-translate-x-8"></span>
              <span className="relative w-full text-left text-black transition-colors duration-200 ease-in-out group-hover:text-white">
                Book Now
              </span>
              <span className="absolute inset-0 border-2 border-blue-600 rounded-full"></span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bus;
