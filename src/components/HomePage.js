import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import Header from './Header';
import axios from 'axios';

const HomePage = (props) => {
  const authToken = props.authToken
  const [currentItems, setCurrentItems] = useState([]);
  const [wordEntered, setWordEntered] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentItemsWithTimeLeft, setCurrentItemsWithTimeLeft] = useState([]);

  const getData = () => {
    const headers = {
      Authorization: authToken,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
    const params = {
      query: wordEntered,
      page: currentPage,
      sort_price: sortOrder
    }
    axios.get('http://192.168.0.11:3000/items', { headers, params })
      .then(response => {
        console.log(response.data)
        setCurrentItems(response.data.data);
        setCurrentPage(response.data.metadata.page)
        setItemsPerPage(response.data.metadata.per_page)
        setTotalItems(response.data.metadata.items_count)
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(response.data.metadata.items_count / response.data.metadata.per_page); i++) {
          pageNumbers.push(i);
        }
        setPageNumbers(pageNumbers)
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord)
    setCurrentPage(1)
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li
        key={number}
        id={number}
        onClick={handleClick}
        className={`${
          currentPage === number ? "bg-gray-500 text-white" : "bg-white"
        } border border-gray-300 px-3 py-1 cursor-pointer`}
      >
        {number}
      </li>
    );
  });

  const handleBidNow = (itemId) => {
    const config = {
      headers: {
        Authorization: authToken,
        'Content-Type': 'application/json'
      }
    }
    const body = {
      item_id: itemId
    }
    axios.post('http://192.168.0.11:3000/auctions', body, config)
      .then(response => {
        alert(response.data.message);
      })
      .catch(error => {
        alert(error.response.data.message);
      });
  }

  const isButtonDisabled = (days, hours, minutes, seconds) => {
    return days === 0 && hours === 0 && minutes === 0 && seconds === 0
  }

  useEffect(() => {
    getData()
  }, []);

  useEffect(() => {
    getData()
  }, [currentPage, wordEntered, sortOrder]);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = currentItems.map(item => {
        const diff = new Date(item.end_time).getTime() - new Date().getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        let timeLeft = null
        if(days < 1 && hours < 1 && minutes < 1 && seconds < 1)
          timeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
          }
        else
          timeLeft = {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
          }
        return { ...item, timeLeft: timeLeft };
      });
      setCurrentItemsWithTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [currentItems]);

  if (authToken === "") {
    return <Navigate to="/login" />;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold">Items</h1>
      </div>
      <div className="mx-auto max-w-lg">
        <div className="relative text-gray-600 focus-within:text-gray-400">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              className="w-4 h-4"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.827 12.093a6.5 6.5 0 111.414-1.414l3.536 3.536a1 1 0 11-1.414 1.414l-3.536-3.536zm-5.5-1.5a4.5 4.5 0 109 0 4.5 4.5 0 00-9 0z"
              />
            </svg>
          </span>
          <input
            type="search"
            name="search"
            id="search"
            value={wordEntered}
            onChange={handleFilter}
            placeholder={'Search'}
            className="py-2 pl-8 pr-5 w-full bg-white rounded-md focus:outline-none focus:bg-white focus:shadow-outline-blue sm:text-sm sm:leading-5"
          />
        </div>
      </div>
      <div className="flex-grow mx-auto py-6">
        <div className="sm:px-0">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-500 px-4 py-2">Title</th>
                <th className="border border-gray-500 px-4 py-2">Description</th>
                <th 
                  className="border border-gray-500 px-4 py-2 cursor-pointer"
                  onClick={() => handleSort()}
                >
                  Price
                  {sortOrder === "asc" && (
                    <span>&#x25B2;</span>
                  )}
                  {sortOrder === "desc" && (
                    <span>&#x25BC;</span>
                  )}
                </th>
                <th className="border border-gray-500 px-4 py-2">Bid Price</th>
                <th className="border border-gray-500 px-4 py-2">Countdown</th>
                <th className="border border-gray-500 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItemsWithTimeLeft.map((item) => (
                <tr key={item.id}>
                  <td className="border border-gray-500 px-4 py-2">{item.title}</td>
                  <td className="border border-gray-500 px-4 py-2">{item.description}</td>
                  <td className="border border-gray-500 px-4 py-2">${item.price}</td>
                  <td className="border border-gray-500 px-4 py-2">${item.bid}</td>
                  <td className="border border-gray-500 px-4 py-2">{item.timeLeft?.days} days, {item.timeLeft?.hours} hours, {item.timeLeft?.minutes} minutes, {item.timeLeft?.seconds} seconds</td>
                  <td className="border border-gray-500 px-4 py-2">
                    <button
                      onClick={() => handleBidNow(item.id)}
                      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 ${isButtonDisabled(item.timeLeft?.days, item.timeLeft?.hours, item.timeLeft?.minutes, item.timeLeft?.seconds) ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={isButtonDisabled(item.timeLeft?.days, item.timeLeft?.hours, item.timeLeft?.minutes, item.timeLeft?.seconds)}>
                      Bid Now
                    </button>
                    {/* <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Delete
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="flex justify-center mt-4">
            <li
              onClick={handlePrevClick}
              className={`${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              } border border-gray-300 px-3 py-1 cursor-pointer`}
            >
              Prev
            </li>
            {renderPageNumbers}
            <li
              onClick={handleNextClick}
              className={`${
                currentPage === Math.ceil(totalItems / itemsPerPage)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              } border border-gray-300 px-3 py-1 cursor-pointer`}
            >
              Next
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authToken: state.authToken,
  };
};

export default connect(mapStateToProps, null)(HomePage);
