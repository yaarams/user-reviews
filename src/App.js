import React, { useState, useEffect} from "react";
import "./App.css";

import CommentList from './components/CommentList';
import CommentForm from './components/CommentForm';

import imgGen from '@dudadev/random-img';

Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}

Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key))
}

function App() {
  sessionStorage.id = sessionStorage.id || 0;
  sessionStorage.setObj('comments', sessionStorage.getObj('comments') || []);

  let [loading, setLoading] = useState(false);
  let [comments, setComments] = useState(sessionStorage.getObj('comments') || []);

  useEffect(() => {
    setLoading(true);
  }, []);

  /**
  * Add new comment
  * @param {Object} comment
  */
  function addComment(comment) {
    imgGen().then(avatarURL => {
      comment.avatarURL = avatarURL;
      comment.id = +sessionStorage.id;
      sessionStorage.id = comment.id+1;
      
      sessionStorage.setObj('comments', [comment, ...comments]);
      setLoading(false);
      setComments([comment, ...comments]);
    });
    
  }

  function deleteComment(comment, id) {
    const otherComments = comments.filter(c => c.id !== comment.id);
    sessionStorage.setObj('comments', otherComments);
    setComments(otherComments);
  }

  return (
    <div className="App container bg-light shadow">
      <header className="App-header">
        <h3 className="App-title">
          User Reviews
        </h3>
      </header>
      <div className="row">
        <div className="col-12 bg-white">
          <CommentList
            loading={loading}
            comments={comments}
            deleteComment={deleteComment}
          />
        </div>
        <div className="col-12 border-right">
          <h6>Add a Comment</h6>
          <CommentForm addComment={addComment} />
        </div>
      </div>
    </div>
  );
}

export default App;
