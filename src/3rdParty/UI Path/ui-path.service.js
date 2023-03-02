const base_url = `http://127.0.0.1:8081/`;

export function authenticate() {
    const url = base_url+"auth"
 
     const payload = {
       grant_type: "refresh_token",
       client_id: client_id,
       refresh_token: refresh_token
     }
   
     fetch(url, {
       method: 'post',
       body: JSON.stringify(payload),
       headers: {
      "Content-Type": "application/json",
      },
      }).then((response) => response.json())
       .then((data) => {
          return data.access_token;
       })
       .catch((err) => {
         console.log(err.message);
       });
   }

   export function folders() {
    const url = base_url+"/folders"

     fetch(url, {
       method: 'get',
      }).then((response) => response.json())
       .then((data) => {
        // console.log(data.va);
          return data.value;
       })
       .catch((err) => {
         console.log(err.message);
       });
   }