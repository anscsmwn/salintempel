import { SalinTempel } from '../types/types';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

import { useLikeSalinTempel } from '../query-hooks/useSalinTempel';
import { useState } from 'react';
import { UserAuth } from '../context/authContext';
import { IoCopyOutline } from 'react-icons/io5';
const ItemSalinTempel = ({
  _id,
  content,
  title,
  author,
  likes,
}: SalinTempel) => {
  const { user } = UserAuth();
  const [isLiked, setIsLiked] = useState<boolean>(likes.includes(user?.email!));
  const [howManyLikes, setHowManyLikes] = useState<number>(likes.length);
  const like = useLikeSalinTempel();

  useEffect(() => {
    if (!user) return setIsLiked(false);
    setIsLiked(likes.includes(user?.email!));
    setHowManyLikes(likes.length);
  }, [user]);

  return (
    <article
      key={_id}
      className="border border-black p-5 rounded-md break-words mb-7"
    >
      <div className="flex justify-between items-start gap-2">
        <h2 className="text-2xl font-semibold mb-4 w-11/12">{title}</h2>
        <button
          onClick={() => {
            navigator.clipboard.writeText(content);
            toast.success('Copied to clipboard');
          }}
          className="mt-2 w-1/12"
        >
          <IoCopyOutline />
        </button>
      </div>

      <p className="text-base">{content}</p>
      <div className="flex justify-between items-center">
        <p className="text-xs">{author}</p>
        <div className="flex gap-2 items-center">
          <button
            className="flex items-center gap-2"
            onClick={() => {
              if (!user)
                return toast.error('You must be logged in to like a post');
              like.mutate(_id);
              setHowManyLikes(isLiked ? howManyLikes - 1 : howManyLikes + 1);
              setIsLiked(!isLiked);
            }}
          >
            {isLiked ? <BsHeartFill /> : <BsHeart />}
            <p className="mb-1">{howManyLikes}</p>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ItemSalinTempel;
