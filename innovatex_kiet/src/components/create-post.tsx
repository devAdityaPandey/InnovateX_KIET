// /components/create-post.tsx
import { FeedItem } from '@/types';
import { useState } from 'react';

interface CreatePostProps {
  onCreate: (post: FeedItem) => void;
}

const CreatePost = ({ onCreate }: CreatePostProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPost: FeedItem = {
      id: new Date().toISOString(),
      author, // Mapping author to name
      content,
      title,
      time: new Date().toISOString(),
      image: '', // Handle image logic if needed
      upvotes: [],
      isUpvoted: false,
      isSaved: false,
    };

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (!res.ok) {
        throw new Error('Failed to create post');
      }

      onCreate(newPost);
      setTitle('');
      setContent('');
      setAuthor('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (

    <div className=''>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg   border border-gray-200">
  <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Create a New Post</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
    <div className="flex flex-col">
      <label className="block text-gray-700 text-sm font-medium mb-2">Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
       <label className="block text-gray-700 text-sm font-medium mb-2">Content</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
        required
      />
         <div className="flex flex-col md:col-span-2">
      <label className="block text-gray-700 text-sm font-medium mb-2">Author</label>
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
    </div>
  <button
  type="submit"
  className="relative w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 overflow-hidden"
>
  <span className="absolute inset-0 text-blue-500 opacity-0 hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none"></span>
  <span className="relative z-10">
  START NEW LEARNING
    
    </span>
</button>



  </div>
 
</form>

    </div>
  );
};

export default CreatePost;

    // <form onSubmit={handleSubmit} className="bg-white p-6 w-100% rounded-lg shadow-lg max-w-md mx-auto 
    // flex 
    //  border border-gray-200">
    //   <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Create a New Post</h2>
    //   <div className="mb-4">
    //     <label className="block text-gray-700 text-sm font-medium mb-2">Title</label>
    //     <input
    //       type="text"
    //       value={title}
    //       onChange={(e) => setTitle(e.target.value)}
    //       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //       required
    //     />
    //   </div>
    //   <div className="mb-4">
    //     <label className="block text-gray-700 text-sm font-medium mb-2">Content</label>
    //     <textarea
    //       value={content}
    //       onChange={(e) => setContent(e.target.value)}
    //       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //       rows={4}
    //       required
    //     />
    //   </div>
    //   <div className="mb-4">
    //     <label className="block text-gray-700 text-sm font-medium mb-2">Author</label>
    //     <input
    //       type="text"
    //       value={author}
    //       onChange={(e) => setAuthor(e.target.value)}
    //       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //       required
    //     />
    //   </div>
    //   <button
    //     type="submit"
    //     className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
    //   >
    //     Create Post
    //   </button>
    // </form>
  //    <button
  //   type="submit"
  //   className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
  // >
  //   Create Post
  // </button>