import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaMapMarkerAlt, FaTrash, FaGripLines, FaBars } from "react-icons/fa";

// Import images
import indiaGateImg from './assets/indiaGate.jpg';
import redFortImg from './assets/redFort.jpg';  
import qutubMinarImg from './assets/qutubMinar.jpg';
import lotusTempleImg from './assets/lotusTemple.jpg';

const initialLocations = [
  {
    id: "loc-1",
    name: "India Gate",
    location: "Rajpath, New Delhi",
    image: indiaGateImg,
    rating: 4.7,
    reviews: 9200,
    description:
      "A war memorial located in the heart of Delhi, known for its grandeur and historical significance.",
  },
  {
    id: "loc-2",
    name: "Red Fort",
    location: "Netaji Subhash Marg, Chandni Chowk, Delhi",
    image: redFortImg,
    rating: 4.6,
    reviews: 10500,
    description:
      "A historic fort that served as the main residence of the Mughal Emperors.",
  },
  {
    id: "loc-3",
    name: "Qutub Minar",
    location: "Mehrauli, New Delhi",
    image: qutubMinarImg,
    rating: 4.5,
    reviews: 8500,
    description:
      "A UNESCO World Heritage Site and one of the tallest minarets in the world.",
  },
  {
    id: "loc-4",
    name: "Lotus Temple",
    location: "Bahapur, New Delhi",
    image: lotusTempleImg,
    rating: 4.4,
    reviews: 7400,
    description:
      "A Baháʼí House of Worship notable for its flowerlike architecture and peaceful environment.",
  },
];

function App() {
  const [locations, setLocations] = useState(initialLocations);
  const [showMapMobile, setShowMapMobile] = useState(false);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const reordered = Array.from(locations);
    const [moved] = reordered.splice(source.index, 1);
    reordered.splice(destination.index, 0, moved);
    setLocations(reordered);
  };

  const getGoogleMapsUrl = (place) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      place
    )}`;

  return (
    <div className="min-h-screen bg-gray-100 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto mb-6 space-y-1 z-10">
        <div className="flex items-center justify-between lg:justify-start">
          <h1 className="text-2xl lg:text-4xl font-extrabold text-pink-500">
            Y2Z travel
          </h1>
          <button className="lg:hidden text-gray-700 text-2xl">
            <FaBars />
          </button>
        </div>
        <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 ml-2 lg:ml-4">
          Itinerary
        </h2>
        <h3 className="text-base lg:text-lg text-gray-600 ml-2 lg:ml-4">Day</h3>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 relative">
        <div className="w-full lg:w-1/2 itinerary-scrollbar lg:overflow-y-auto lg:h-[calc(100vh-130px)] lg:pt-0 pt-4">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="locations">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-col gap-6"
                >
                  {locations.map((location, index) => (
                    <Draggable
                      key={location.id}
                      draggableId={location.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-white rounded-lg shadow-md flex flex-col md:flex-row overflow-hidden border-2 transition-all duration-200 relative ${
                            snapshot.isDragging
                              ? "border-blue-400 shadow-lg"
                              : "border-transparent hover:border-blue-300"
                          }`}
                          style={provided.draggableProps.style}
                        >
                          <div className="flex items-center justify-center w-12 bg-gray-100 border-r select-none">
                            <FaGripLines className="text-gray-500" size={20} />
                          </div>

                          <div className="md:w-1/3 w-full h-40 md:h-40">
                            <img
                              src={location.image}
                              alt={location.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="md:w-2/3 w-full p-4 flex flex-col justify-between relative">
                            <div className="absolute top-3 right-3 flex space-x-3 text-lg z-10">
                              <a
                                href={getGoogleMapsUrl(location.location)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800"
                                title="View on Google Maps"
                              >
                                <FaMapMarkerAlt />
                              </a>
                              <span
                                className="text-gray-500 hover:text-red-500 cursor-not-allowed"
                                title="Delete (disabled)"
                              >
                                <FaTrash />
                              </span>
                            </div>
                            <div>
                              <h2 className="text-2xl font-semibold text-gray-800">
                                {location.name}
                              </h2>
                              <div className="text-sm text-yellow-500 mb-1 mt-1">
                                ⭐ {location.rating}{" "}
                                <span className="text-gray-500">
                                  ({location.reviews} ratings)
                                </span>
                              </div>
                              <div className="text-sm text-gray-600 mb-2">
                                📍 {location.location}
                              </div>
                              <p className="text-gray-700">{location.description}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <div
          className="hidden lg:block my-2 fixed top-0 right-0 w-1/2 h-full rounded-l-lg overflow-hidden shadow-lg z-0"
          style={{ maxHeight: "100vh" }}
        >
          <iframe
            title="Delhi Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83956542368!2d77.06889786413324!3d28.527280687428032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0198ef0b23a7%3A0x42a2c70a53a678d9!2sDelhi%2C%20India!5e0!3m2!1sen!2sin!4v1685987643217!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="hidden lg:block" style={{ width: "50%" }}></div>

        <div className="lg:hidden w-full">
          <button
            className="w-full py-2 mt-2 bg-blue-100 text-blue-700 font-medium rounded-md"
            onClick={() => setShowMapMobile(!showMapMobile)}
          >
            {showMapMobile ? "Hide Map" : "Show Map"}
          </button>

          {showMapMobile && (
            <div className="w-full h-[300px] mt-2 rounded-lg overflow-hidden shadow-lg">
              <iframe
                title="Delhi Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83956542368!2d77.06889786413324!3d28.527280687428032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0198ef0b23a7%3A0x42a2c70a53a678d9!2sDelhi%2C%20India!5e0!3m2!1sen!2sin!4v1685987643217!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
