import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";
import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  if (!data || !data.events) {
    return error ? <div>An error occured</div> : "loading";
  }
  const eventsFilteredByType = !type
    ? data.events
    : data.events.filter((event) => event.type === type);

  const pageNumber = Math.max(
    1,
    Math.ceil(eventsFilteredByType.length / PER_PAGE)
  );
  const filteredEvents = eventsFilteredByType.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );
  const typeList = Array.from(new Set(data.events.map((event) => event.type)));
  
  return (
    <>
      <h3 className="SelectTitle">Catégories</h3>
      <Select
        selection={typeList}
        onChange={(value) => {
          setCurrentPage(1);
          setType(value || null);
        }}
      />
      <div id="events" className="ListContainer">
        {filteredEvents.map((event) => (
          <Modal key={event.id} Content={<ModalEvent event={event} />}>
            {({ setIsOpened }) => (
              <div key={event.id}> 
              <EventCard
                key={event.id}
                onClick={() => setIsOpened(true)}
                imageSrc={event.cover}
                title={event.title}
                date={new Date(event.date)}
                label={event.type}
              />
               </div>
            )}
          </Modal>
        ))}
      </div>

      <div className="Pagination">
        {Array.from({ length: pageNumber }, (_, n) => n).map((n) => (
          <button
            type="button"
            key={n}
            onClick={() => setCurrentPage(n + 1)}
            className={currentPage === n + 1 ? "active" : ""}
          >
            {n + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default EventList;
