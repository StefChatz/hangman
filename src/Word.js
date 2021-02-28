import React, { useState, useEffect } from "react";


function Word() {
    const [data, setData] = useState([])

    useEffect(()=>{
        (async () => {
            const response = await fetch(
                `http://www.omdbapi.com/?i=tt${movie}&apikey=fae557f3&`
            );
            const data = await response.json();
            console.log(data.Title)
            // const chars = data.Title.split('');
            // const movieUnderscore = chars.map(item => item = "_");
            // console.log(movieUnderscore);
            setData( data );
        })(setData)

    }, [setData])
console.log(data)
    return (
      <h1>
          { data.Title }
      </h1>
    );
}

export default Word;