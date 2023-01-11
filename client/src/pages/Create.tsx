import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { useCreateSalinTempel } from '../query-hooks/useSalinTempel';
import { useGetTags } from '../query-hooks/useTag';
import { UserAuth } from '../context/authContext';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import AlertError from '../components/AlertError';
import Select from 'react-select';
import { Tag } from '../types/types';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Create = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const { isLoading, data } = useGetTags();
  const [tagsOptions, setTagsOptions] = useState<Tag[]>([]);
  const { user } = UserAuth();
  const navigate = useNavigate();
  const add = useCreateSalinTempel();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: {
      title: string;
      content: string;
      author?: string;
      isNSFW?: boolean;
      tags?: string[];
    } = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      author: formData.get('author') as string,
      isNSFW: formData.get('isNSFW') === 'on' ? true : false,
      tags: selectedTags,
    };
    if (data.author === '') {
      delete data.author;
    }
    add.mutate(data, {
      onSuccess: (response) => {
        if (response.status === 'fail') {
          setErrors(response.errors);
        } else {
          navigate('/');
        }
      },
    });
  };
  const handleCreateOption = (inputValue: string) => {
    if (tagsOptions) setTagsOptions([...tagsOptions, { name: inputValue }]);
    setSelectedTags([...selectedTags, inputValue]);
  };
  useEffect(() => {
    if (data) {
      setTagsOptions(data.data);
    }
  }, [data]);

  return (
    <Layout title="Create">
      <Header />
      {isLoading && <p className="text-center">Loading...</p>}
      {!isLoading && tagsOptions && (
        <section className="mt-10">
          <AlertError errors={errors} />
          <form onSubmit={onSubmit} className="mt-5 pb-20">
            <div className="mb-5">
              <label htmlFor="author" className="mb-2 label">
                Author (Optional)
              </label>
              <input
                type="text"
                name="author"
                id="author"
                className="input"
                defaultValue={user ? user.email! : ''}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="title"
                className="mb-2 after:content-['*'] after:ml-0.5 after:text-red-500 label"
              >
                Title
              </label>
              <input
                // required
                type="text"
                name="title"
                id="title"
                className="input"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="content"
                className="mb-2 after:content-['*'] after:ml-0.5 after:text-red-500 label"
              >
                Content
              </label>
              <textarea
                // required
                name="content"
                id="content"
                rows={5}
                className="input"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="content"
                className="mb-2 after:content-['*'] after:ml-0.5 after:text-red-500 label"
              >
                Tags
              </label>
              {tagsOptions.length > 0 && (
                <Select
                  isMulti
                  name="tags"
                  options={tagsOptions.map((tag) => {
                    return { value: tag.name, label: tag.name };
                  })}
                  unstyled
                  classNames={{
                    control: (state) =>
                      state.isFocused ? 'input py-5' : 'input py-5',
                    menu: () =>
                      'bg-zinc-800 mt-1 rounded-md max-h-20 overflow-y-auto',
                    menuList: () => 'bg-zinc-800 rounded-md',
                    option: (state) =>
                      state.isSelected
                        ? 'bg-zinc-700 py-2 px-3 rounded-md hover:bg-zinc-700'
                        : 'bg-zinc-800 py-2 px-3 rounded-md hover:bg-zinc-700',
                    multiValue: () =>
                      'bg-zinc-700 py-2 px-3 rounded-md mr-2 mt-2',
                    multiValueLabel: () => 'text-white',
                    multiValueRemove: () => 'ml-2 text-white',
                    noOptionsMessage: () => 'input',
                    placeholder: () => 'text-gray-400',
                  }}
                  onChange={(e) => {
                    setSelectedTags(e.map((tag) => tag.value));
                  }}
                  onInputChange={(e) => {
                    setInputValue(e);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (inputValue.length > 0) {
                        handleCreateOption(inputValue);
                      }
                    }
                    setInputValue('');
                  }}
                  noOptionsMessage={() =>
                    `Press enter to create tag "${inputValue}"`
                  }
                  value={selectedTags.map((tag) => {
                    return { value: tag, label: tag };
                  })}
                  placeholder="Select tags"
                />
              )}
            </div>
            <div className="mb-5 flex items-center gap-2">
              <label htmlFor="isNSFW" className="label mb-0">
                Is NSFW?
              </label>
              <input type="checkbox" name="isNSFW" id="isNSFW" />
            </div>
            <button className="bg-black text-white px-5 py-2 rounded-md">
              {add.isLoading ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin text-2xl " />
                </>
              ) : (
                'Create'
              )}
            </button>
          </form>
        </section>
      )}
    </Layout>
  );
};

export default Create;
