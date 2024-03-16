// import React, { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import { useLocation } from "react-router-dom";

// interface Deck {
//   deck_name: string;
//   deck_id: string;
//   body: string;
//   user_id: string;
// }

// export const DeckPage: React.FC = () => {
//   const [decks, setDecks] = useState<Deck[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const location = useLocation();

//   useEffect(() => {
//     const { state } = location;
//     const { userId } = state || {};

//     const fetchDeckData = async () => {
//       try {
//         const token = Cookies.get("accessToken");

//         if (token && userId) {
//           const response = await fetch(`http://localhost:3000/deck/${userId}`, {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });

//           if (response.ok) {
//             const deckData: Deck[] = await response.json();
//             setDecks(deckData);
//           } else {
//             setError("Failed to fetch deck data");
//           }
//         } else {
//           setError("Invalid deck or token");
//         }
//       } catch (error) {
//         setError("Error fetching deck data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDeckData();
//   }, [location]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h2>Deck Information</h2>
//       {decks.length > 0 ? (
//         decks.map((deck, index) => (
//           <div key={index}>
//             <p>Deck Name: {deck.deck_name}</p>
//             <p>Deck ID: {deck.deck_id}</p>
//             <p>Body: {deck.body}</p>
//             <p>User ID: {deck.user_id}</p>
//             <br />
//             <hr />

//           </div>
//         ))
//       ) : (
//         <p>No decks found</p>
//       )}
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

interface Deck {
  deck_name: string;
  deck_id: string;
  body: string;
  user_id: string;
}

export const DeckPage: React.FC = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();

  useEffect(() => {
    const { state } = location;
    const { userId } = state || {};

    const fetchDeckData = async () => {
      try {
        const token = Cookies.get("accessToken");

        if (token && userId) {
          const response = await fetch(`http://localhost:3000/deck/${userId}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const deckData: Deck[] = await response.json();
            setDecks(deckData);
          } else {
            setError("Failed to fetch deck data");
          }
        } else {
          setError("Invalid deck or token");
        }
      } catch (error) {
        setError("Error fetching deck data");
      } finally {
        setLoading(false);
      }
    };

    fetchDeckData();
  }, [location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Deck Information</h2>
      {decks.length > 0 ? (
        decks.map((deck, index) => (
          <div key={index}>
            <p>Deck Name: {deck.deck_name}</p>
            <p>Deck ID: {deck.deck_id}</p>
            <p>Body: {deck.body}</p>
            <p>User ID: {deck.user_id}</p>
            <br />
            <hr />
          </div>
        ))
      ) : (
        <p>No decks found</p>
      )}
    </div>
  );
};

