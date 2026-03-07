export const GET = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/albums");
  const albums = await data.json();

  return new Response(JSON.stringify(albums), {
    headers: { "Content-Type": "application/json" },
  });
};
