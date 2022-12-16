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
  likesBy,
  createdAt,
  totalLikes,
}: SalinTempel) => {
  const { user } = UserAuth();
  const [isLiked, setIsLiked] = useState<boolean>(
    likesBy.includes(user?.email!),
  );
  const [howManyLikes, setHowManyLikes] = useState<number>(likesBy.length);
  const like = useLikeSalinTempel();

  useEffect(() => {
    if (!user) return setIsLiked(false);
    setIsLiked(likesBy.includes(user?.email!));
    setHowManyLikes(totalLikes);
  }, [user]);

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article key={_id} className="border border-[#f7f7f6] p-5 rounded-md">
      <div className="flex justify-between items-start gap-2 break-words">
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
      <div className="overflow-auto">
        <p>{content}</p>
      </div>
      <div className="flex justify-between items-center mt-3">
        <p className="text-xs ">{author}</p>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
              if (!user)
                return toast.error('You must be logged in to like a post');
              like.mutate(_id);
              setHowManyLikes(isLiked ? howManyLikes - 1 : howManyLikes + 1);
              setIsLiked(!isLiked);
            }}
          >
            {isLiked ? <BsHeartFill className="fill-white" /> : <BsHeart />}
          </button>
          <p className="mb-1">{howManyLikes}</p>
        </div>
      </div>
      <p className="text-xs text-zinc-400">{formattedDate}</p>
    </article>
  );
};

export default ItemSalinTempel;
