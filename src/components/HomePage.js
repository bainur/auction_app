import React, { useState } from 'react';
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import Header from './Header';

const dummyData = [
  { id: 1, name: 'Uang Kuno', description: 'Uang kuno selalu menjadi barang antik yang bernilai jual tinggi dari tahun ke tahun', price: 1 },
  { id: 2, name: 'Dakon', description: 'Dakon merupakan permainan untuk anak-anak perempuan di masa lampau', price: 2 },
  { id: 3, name: 'Guci Antik', description: 'Barang yang satu ini kerap diidentikkan dengan barang antik yang bernilai jual tinggi.', price: 3 },
  { id: 4, name: 'Pemutar Piringan Hitam', description: 'Pemutar piringan hitam bisa dibilang sebagai benda yang mewah di masa lampau.', price: 4 },
  { id: 5, name: 'Replika Kendaraan', description: 'Salah satu barang antik yang juga kerap diminati kolektor adalah replika atau miniatur kendaraan.', price: 5 },
  { id: 6, name: 'Perabot Antik', description: 'Tak hanya dapat dikoleksi, perabot antik juga bisa digunakan pada hunianmu.', price: 6 },
  { id: 7, name: 'Cangkir Antik', description: 'Banyak orang yang kerap menggunakan cangkir atau cawan antik sebagai dekorasi untuk hunian,', price: 7 },
  { id: 8, name: 'Jam Dinding Kuno', description: 'Jam dinding kuno ini biasanya memiliki ukuran yang cukup besar dan diletakkan di area yang bisa dilihat banyak orang.', price: 8 },
  { id: 9, name: 'Barang Elektronik Tempo Dulu', description: 'Kini, banyak orang yang kembali tertarik dengan barang elektronik tempo dulu. Salah satunya adalah kembali populernya kamera analog hingga radio', price: 9 },
  { id: 10, name: 'Porselen Antik', description: 'Porselen kuno juga identik dengan barang antik yang mempunyai nilai jual yang fantastis.', price: 10 },
  { id: 11, name: 'Buku Antik', description: 'Buku yang ditulis dengan tangan itu memiliki nilai jual yang sangat tinggi', price: 11 },
  { id: 12, name: 'Lukisan Antik', description: 'Lukisan menjadi salah satu karya seni yang mempunyai nilai jual yang tinggi, terlebih lagi jika mempunyai nilai historis.', price: 12 },
  { id: 13, name: 'Perangko', description: 'Siapa yang sangka kalau perangko masuk ke dalam jajaran barang antik yang memiliki nilai jual tinggi.', price: 13 },
];

const HomePage = (props) => {
  const isLoggedIn = props.isLoggedIn
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems] = useState(dummyData.length);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dummyData.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleSort = (sortKey) => {
    if (sortKey === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(sortKey);
      setSortOrder("asc");
    }
  };

  const sortedData = currentItems.sort((a, b) => {
    const sortMultiplier = sortOrder === "asc" ? 1 : -1;
    if (sortBy === "name") {
      return sortMultiplier * a.name.localeCompare(b.name);
    } else if (sortBy === "price") {
      return sortMultiplier * (a.price - b.price);
    }
    return 0;
  });

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
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

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
        <Header />
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold">Items</h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          New
        </button>
      </div>
      <div className="flex-grow max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-500 px-4 py-2">No.</th>
                <th className="border border-gray-500 px-4 py-2">Name</th>
                <th className="border border-gray-500 px-4 py-2">Description</th>
                <th 
                  className="border border-gray-500 px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("price")}
                >
                  Price
                  {sortBy === "price" && sortOrder === "asc" && (
                    <span>&#x25B2;</span>
                  )}
                  {sortBy === "price" && sortOrder === "desc" && (
                    <span>&#x25BC;</span>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item) => (
                <tr key={item.id}>
                  <td className="border border-gray-500 px-4 py-2">{item.id}</td>
                  <td className="border border-gray-500 px-4 py-2">{item.name}</td>
                  <td className="border border-gray-500 px-4 py-2">{item.description}</td>
                  <td className="border border-gray-500 px-4 py-2">${item.price}</td>
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
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps, null)(HomePage);
