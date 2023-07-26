import { useEffect, useState } from 'react';
import '../styles/global.css';

export default ({ posts }) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (!searchInput) {
      setSearchResult([]);
      return;
    }

    const filteredPosts = posts.filter(post =>
      post.frontmatter.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchResult(filteredPosts);
  }, [searchInput]);

  const onChange = e => {
    setSearchInput(e.target.value);
  };

  const onKeyDown = e => {
    if (e.key === 'Enter') {
      setSearchInput('');
    }
  };

  return (
    <div>
      <input
        autoFocus
        value={searchInput}
        placeholder='Search blogs here'
        onKeyDown={onKeyDown}
        onChange={onChange}></input>

      {searchResult?.length > 0 && (
        <div className='searchResults'>
          {searchResult.map(result => (
            <a className='searchResult' href={result.url}>
              {result.frontmatter.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
