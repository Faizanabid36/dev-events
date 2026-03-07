const Albums = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/albums");
  const albums = await data.json();

  return <div>Albums: {albums.map((album: any) => album.title)}</div>;
};

export default Albums;
