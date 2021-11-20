import React, { useEffect, useState } from "react";
import {albumsRouter} from "../routes";

  const [createAlbum, getAllAlbums] = useState([]);
  const [getAlbumsById, getAlbumsByName] = useState("");
  async function getFunctions() {
    try {
      const Albums = await fetchAllAlbums();
      setAlbumsList(albums.reverse());
    } catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    getFunctions();
  });

  const DeleteButton = ({ userPosts, setUserPosts, highlightedPost }) => {
    const handleClick = () => {
        history.push('/profile/userposts');
    };

    return (
        <>
            <button
                className="delete-post-button"
                onClick={async () => {
                    try {
                        const userToken = getToken();
                        const post_ID = userPostId;
                        const emptyPostObj = await deletePost(userToken, post_ID);
                        const filteredPosts = userPosts.filter(post => {
                            if (post._id !== deletePostId) {
                                return post
                            }
                        });
                        setUserPosts(filteredPosts);
                        handleClick();
                    } catch (err) {
                        console.log(err);
                    }
                }}>
                <span className="material-icons">delete</span>  Delete Post
    </button>
        </>
    )
}

export default DeleteButton;


const FilterButton = ({createAlbum, getAllAlbums, getAlbumsById, getAlbumsByName}) => {

  const { getAlbumsById } = useParams();
  const handleClick = () => {
    albums.push('albums');
};

return (<div>

    <h2>List of Music Albums</h2>
  
    <div id="myBtnContainer">
      <button className="btn active" onClick="filterSelection('all')"> Show all</button>
      <button className="btn" onClick="filterSelection('name1')"> Name A to M</button>
      <button className="btn" onClick="filterSelection('name2')"> Name N to Z</button>
      <button className="btn" onClick="filterSelection('artist1')"> Artist A to M</button>
      <button className="btn" onClick="filterSelection('artist2')"> Artist N to Z</button>
      <button className="btn" onClick="filterSelection('genre1')"> Genre A to M</button>
      <button className="btn" onClick="filterSelection('genre2')"> Genre N to Z</button>
      <button className="btn" onClick="filterSelection('price1')"> Price 0 to 250</button>
      <button className="btn" onClick="filterSelection('price2')"> Price 275 to 500</button>
     
    </div>
    
    <div className="container">
      <div className="filterDiv name2">What's Going On</div>
      <div className="filterDiv name1 artist2">Marvin Gaye</div>
      <div className="filterDiv genre1">Motown</div>
      <div className="filterDiv price1">70</div>
      <div className="filterDiv name2">Pet Sounds</div>
      <div className="filterDiv name1 artist1">The Beach Boys</div>
      <div className="filterDiv genre2">Rock</div>
      <div className="filterDiv price1">100</div>
      <div className="filterDiv name1">Blue</div>
      <div className="filterDiv name1 artist1">Joni Mitchell</div>
      <div className="filterDiv genre1">Folk</div>
      <div className="filterDiv price1">95</div>
      <div className="filterDiv name2">Permanent Waves</div>
      <div className="filterDiv name2 artist2">Rush</div>
      <div className="filterDiv price1">200</div>
      <div className="filterDiv name1">Love Yourself: Tear</div>
      <div className="filterDiv name1 artist1">BTS</div>
      <div className="filterDiv genre1">K-Pop</div>
      <div className="filterDiv price1">50</div>
      <div className="filterDiv name2">Thriller</div>
      <div className="filterDiv name2 artist1">Michael Jackson</div>
      <div className="filterDiv genre1">Disco</div>
      <div className="filterDiv price2">500</div>
      <div className="filterDiv name1">Back in Black</div>
      <div className="filterDiv name1 artist1">AC/DC</div>
      <div className="filterDiv price2">400</div>
      <div className="filterDiv name2">The Dark Side of the Moon</div>
      <div className="filterDiv name2 artist2">Pink Floyd</div>
      <div className="filterDiv price2">450</div>
      <div className="filterDiv name2">The Bodyguard</div>
      <div className="filterDiv name2 artist2">Whitney Houston</div>
      <div className="filterDiv genre2">Pop</div>
      <div className="filterDiv price2">350</div>
      <div className="filterDiv name1">Bat Out of Hell</div>
      <div className="filterDiv name2 artist2">Meat Loaf</div>
      <div className="filterDiv price2">300</div>
    </div>
  </div>)
}



export default FilterButton;