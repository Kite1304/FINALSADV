'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { db, auth } from '../firebaseConfig'; 
import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore'; 
import { FaSearch, FaHeart, FaRegHeart, FaStar, FaRegStar, FaSignOutAlt } from 'react-icons/fa';

const ContentPage = () => {
  const router = useRouter();
  const [coffeeData, setCoffeeData] = useState([]);
  const [filteredCoffee, setFilteredCoffee] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState(''); 
  const [likedCoffees, setLikedCoffees] = useState([]); 
  const [lovedCoffees, setLovedCoffees] = useState([]); 
  const [user, setUser] = useState(null);

  
  const fetchCoffeeData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'collection')); 
      const coffees = [];
      querySnapshot.forEach((doc) => {
        coffees.push({ id: doc.id, ...doc.data() });
      });
      setCoffeeData(coffees);
      setFilteredCoffee(coffees);
    } catch (error) {
      console.error('Error fetching coffee data: ', error);
    }
  };

  
  const fetchUserCoffees = async (userId) => {
    try {
      const favoritesRef = collection(db, 'favorites');
      const querySnapshot = await getDocs(favoritesRef);
      const userFavorites = querySnapshot.docs
        .filter(doc => doc.data().userId === userId)
        .map(doc => doc.data().coffeeId);

      setLikedCoffees(userFavorites);

      
      const lovedRef = collection(db, 'loved');
      const lovedSnapshot = await getDocs(lovedRef);
      const userLoved = lovedSnapshot.docs
        .filter(doc => doc.data().userId === userId)
        .map(doc => doc.data().coffeeId);

      setLovedCoffees(userLoved);
    } catch (error) {
      console.error('Error fetching liked and loved coffees: ', error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchCoffeeData(); 
        fetchUserCoffees(currentUser.uid); 
      } else {
        router.push('/'); 
      }
    });

    return () => unsubscribe();
  }, [router]);

  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  
  const handleFilter = (e) => {
    const type = e.target.value;
    setSelectedType(type);

    if (type) {
      setFilteredCoffee(coffeeData.filter(coffee => coffee.type.toLowerCase().includes(type.toLowerCase())));
    } else {
      setFilteredCoffee(coffeeData);
    }
  };

  
  const handleFavorite = async (coffee) => {
    if (!user) {
      console.log('User not authenticated');
      return;
    }

    const favoriteRef = collection(db, 'favorites');

    
    const favoriteDoc = await getDocs(favoriteRef);
    const existingFavorite = favoriteDoc.docs.find((doc) => doc.data().coffeeId === coffee.id && doc.data().userId === user.uid);

    if (existingFavorite) {
     
      await deleteDoc(doc(favoriteRef, existingFavorite.id));
      setLikedCoffees(likedCoffees.filter((id) => id !== coffee.id));
    } else {
      
      await setDoc(doc(favoriteRef), {
        coffeeId: coffee.id,
        name: coffee.name,
        type: coffee.type,
        description: coffee.description,
        imageUrl: coffee.imageUrl,
        userId: user.uid, 
      });
      setLikedCoffees((prev) => [...prev, coffee.id]);
    }
  };

  
  const handleLove = async (coffee) => {
    if (!user) {
      console.log('User not authenticated');
      return;
    }

    const lovedRef = collection(db, 'loved');

    
    const lovedDoc = await getDocs(lovedRef);
    const existingLoved = lovedDoc.docs.find((doc) => doc.data().coffeeId === coffee.id && doc.data().userId === user.uid);

    if (existingLoved) {
      
      await deleteDoc(doc(lovedRef, existingLoved.id));
      setLovedCoffees(lovedCoffees.filter((id) => id !== coffee.id));
    } else {
      
      await setDoc(doc(lovedRef), {
        coffeeId: coffee.id,
        name: coffee.name,
        type: coffee.type,
        description: coffee.description,
        imageUrl: coffee.imageUrl,
        userId: user.uid, 
      });
      setLovedCoffees((prev) => [...prev, coffee.id]);
    }
  };

  
  const filteredAndSearchedData = filteredCoffee.filter(coffee =>
    coffee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const handleLogout = () => {
    router.push('/'); 
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-yellow-800 via-yellow-900 to-brown-900 text-white">
      
      <header className="bg-brown-900 shadow-md py-4">
        <div className="container mx-auto flex items-center justify-between px-6">
          <h1 className="text-3xl font-bold text-yellow-400">Brew Haven</h1>
          <button
            onClick={handleLogout}
            className="text-white hover:text-black text-lg flex items-center"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>

        
        <div className="py-4 px-6">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="relative w-full md:w-1/2">
              <FaSearch className="absolute top-3 left-3 text-gray-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search coffee..."
                className="w-full py-2 pl-10 pr-4 border rounded-md text-gray-700"
              />
            </div>

            <div className="w-full md:w-1/3 mt-4 md:mt-0">
              <select
                value={selectedType}
                onChange={handleFilter}
                className="w-full py-2 px-4 border rounded-md text-gray-700"
              >
                <option value="">All Types</option>
                <option value="Milk-based">Milk-based</option>
                <option value="Chocolate-based">Chocolate-based</option>
                <option value="Iced Coffee">Iced Coffee</option>
                <option value="Espresso">Espresso</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      
      <section className="container mx-auto p-6">
        <h2 className="text-3xl text-center mb-8 text-white">Coffees</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAndSearchedData.length === 0 ? (
            <p className="text-center col-span-full text-white">No coffees found.</p>
          ) : (
            filteredAndSearchedData.map((coffee) => (
              <div
                key={coffee.id}
                className="bg-gradient-to-r from-yellow-800 via-yellow-900 to-brown-900 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
              >
                <h3 className="text-xl font-semibold text-white">{coffee.name}</h3>
                <p className="text-sm text-gray-200">Type: {coffee.type}</p>

                {coffee.imageUrl && (
                  <img
                    src={coffee.imageUrl}
                    alt={coffee.name}
                    className="w-full h-48 object-contain my-4 rounded-md"
                  />
                )}

                <p className="text-gray-200 text-sm mb-4">{coffee.description}</p>

                <div className="flex justify-between items-center mt-auto">
                  <button
                    onClick={() => handleFavorite(coffee)}
                    className={`flex items-center space-x-2 py-2 px-4 rounded-md text-white ${
                      likedCoffees.includes(coffee.id)
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-gray-500 hover:bg-gray-600'
                    }`}
                  >
                    {likedCoffees.includes(coffee.id) ? <FaHeart /> : <FaRegHeart />}
                    {likedCoffees.includes(coffee.id) ? 'You already liked it!' : 'I like this coffee!'}
                  </button>

                  
                  <button
                    onClick={() => handleLove(coffee)}
                    className={`flex items-center space-x-2 py-2 px-4 rounded-md text-white ${
                      lovedCoffees.includes(coffee.id)
                        ? 'bg-yellow-500 hover:bg-yellow-600'
                        : 'bg-gray-500 hover:bg-gray-600'
                    }`}
                  >
                    {lovedCoffees.includes(coffee.id) ? <FaStar /> : <FaRegStar />}
                    {lovedCoffees.includes(coffee.id) ? 'You love this coffee!' : 'I love this coffee!'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default ContentPage;
