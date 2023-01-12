import { SalinTempel } from '../types/types';
import { BsHeart, BsHeartFill, BsTrash } from 'react-icons/bs';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

import {
  useLikeSalinTempel,
  useRemoveSalinTempel,
} from '../query-hooks/useSalinTempel';
import { useState } from 'react';
import { UserAuth } from '../context/authContext';
import { IoCopyOutline } from 'react-icons/io5';
import { AiFillTag } from 'react-icons/ai';
import { BsPencil } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const ItemSalinTempel = ({
  _id,
  content,
  title,
  author,
  likesBy,
  createdAt,
  totalLikes,
  isNSFW,
  tags,
}: SalinTempel) => {
  const { user } = UserAuth();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState<boolean>(
    likesBy.includes(user?.email!),
  );
  const [isNSFWContent, setIsNSFWContent] = useState<boolean>(isNSFW);
  const [howManyLikes, setHowManyLikes] = useState<number>(likesBy.length);
  const like = useLikeSalinTempel();
  const remove = useRemoveSalinTempel();
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
        <h2 className="text-2xl font-semibold mb-4 w-10/12">{title}</h2>
        <div className="flex items-center justify-end gap-2 mt-2 w-2/12">
          {(author === user?.email ||
            user?.email === import.meta.env.VITE_SUPER_ADMIN) && (
            <>
              <button
                onClick={() => {
                  remove.mutate(_id, {
                    onSuccess: () => {
                      toast.success('Deleted');
                    },
                  });
                }}
              >
                <BsTrash />
              </button>
              <button
                onClick={() => {
                  navigate(`/edit/${_id}`);
                }}
              >
                <BsPencil />
              </button>
            </>
          )}

          <button
            onClick={() => {
              navigator.clipboard.writeText(content);
              toast.success('Copied to clipboard');
            }}
          >
            <IoCopyOutline />
          </button>
        </div>
      </div>
      {isNSFWContent ? (
        <div className="min-h-[15rem] flex justify-center items-center">
          <button
            className="btn-primary text-xs"
            onClick={() => setIsNSFWContent(false)}
          >
            Show NSFW content
          </button>
        </div>
      ) : (
        <>
          <div className="overflow-auto">
            {/* check if content have new line if it has, then use pre tag if not use p tag */}
            {content.includes('\n') ? (
              <p className="whitespace-pre break-words">{content}</p>
            ) : (
              <p>{content}</p>
            )}
          </div>
          <div className="flex justify-between items-center mt-3">
            <p className="text-xs">{author}</p>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => {
                  if (!user)
                    return toast.error('You must be logged in to like a post');
                  like.mutate(_id);
                  setHowManyLikes(
                    isLiked ? howManyLikes - 1 : howManyLikes + 1,
                  );
                  setIsLiked(!isLiked);
                }}
              >
                {isLiked ? <BsHeartFill className="fill-white" /> : <BsHeart />}
              </button>
              <p className="mb-1">{howManyLikes}</p>
            </div>
          </div>
          <p className="text-xs text-zinc-400">{formattedDate}</p>
          {tags.length > 0 && (
            <div className="mt-2 flex items-center gap-2">
              <AiFillTag />
              <div className="flex gap-2 items-center text-xs">
                {tags.map((tag, index) => (
                  <div key={index}>
                    <p>
                      {tag}
                      {tags.length - 1 != index && <span>,</span>}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </article>
  );
};

export default ItemSalinTempel;
