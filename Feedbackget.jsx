import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Feedbackget.css'

function View() {
  const [taskData, setTaskData] = useState([]); // Fix variable name here

  useEffect(() => {
    const fetchTaskData = async () => {
      const token = localStorage.getItem('token');
      console.log(token);
      try {
        const response = await axios.get('http://localhost:9124/api/v1/feed/getfeed', {
          headers: {
            "cache-control": 'no-cache',
            "Authorization": `Bearer ${token}`, // Add the token to the request headers
          },
        });

        setTaskData(response.data);
        console.log("response.data",response)
      } catch (error) {
        console.log(error);
      }
    };

    fetchTaskData();
  }, []);

  useEffect(() => {
    console.log(taskData); // This will log the updated dataList whenever it changes.
  }, [taskData]);

  return (
    <div className="feedbackget">
      
      <table className="fgen">
      <div className="fcontainer12">
        <thead>
          <tr className="fform-title">
            <th className="fheader-cell">Feedback ID</th>
            <th className="fheader-cell">Comment</th>
            <th className="fheader-cell">Date</th>
            <th className="fheader-cell">Type</th>
            <th className="fheader-cell">Rating</th>
         
          
          </tr>
        </thead>
        <tbody>
          {taskData.map((feedback) => (
            <tr key={feedback.feedid}>
              <td>{feedback.feedid}</td>
              <td>{feedback.feedcomment}</td>
             
              <td>{feedback.date}</td>
              <td>{feedback.type}</td>
              <td>{feedback.rating}</td>
              
            
              
            </tr>
          ))}
        </tbody>
        </div>
      </table>
    </div>
  );
}

export default View;