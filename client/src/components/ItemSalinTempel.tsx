import { SalinTempel } from '../types/types';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

import {
  useRemoveSalinTempel,
  useLikeSalinTempel,
} from '../query-hooks/useSalinTempel';
import { useState } from 'react';
const ItemSalinTempel = ({
  _id,
  content,
  title,
  author,
  likes,
}: SalinTempel) => {
  const [isLiked, setIsLiked] = useState<boolean>(likes.includes(author));
  const remove = useRemoveSalinTempel();
  const like = useLikeSalinTempel();

  return (
    <article key={_id} className="border border-black p-5 rounded-md">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold mb-4">{title}</h2>

          <button
            onClick={() => {
              remove.mutate(_id);
            }}
          >
            <AiOutlineDelete />
          </button>
        </div>
      </div>

      <p>{content}</p>
      <div className="flex justify-between items-center">
        <p>{author}</p>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
              setIsLiked(!isLiked);
              like.mutate(_id);
            }}
          >
            {isLiked ? <BsHeartFill /> : <BsHeart />}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ItemSalinTempel;
