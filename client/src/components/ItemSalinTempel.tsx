import { SalinTempel } from '../types/types';
import { AiOutlineDelete } from 'react-icons/ai';
import { useRemoveSalinTempel } from '../query-hooks/useSalinTempel';
const ItemSalinTempel = ({ _id, content, title, author }: SalinTempel) => {
  const remove = useRemoveSalinTempel();
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
      <p>{author}</p>
    </article>
  );
};

export default ItemSalinTempel;
