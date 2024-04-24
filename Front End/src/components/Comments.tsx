// Comments.tsx
import React, { useState } from 'react';

interface CommentsProps {
  onCommentAdd: (comment: string) => void;
}

const Comments: React.FC<CommentsProps> = ({ onCommentAdd }) => {
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setComments((prevComments) => [...prevComments, newComment]);
      onCommentAdd(newComment); // Pass the new comment to the parent component
      setNewComment('');
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <textarea
        placeholder="Add a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
  );
};

export default Comments;


