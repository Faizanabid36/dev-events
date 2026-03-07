export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const data = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`);
  const album = await data.json();

  return new Response(JSON.stringify(album), {
    headers: { "Content-Type": "application/json" },
  });
};

export const DELETE = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
    method: "DELETE",
  });

  return new Response(null, {
    status: 204,
  });
};
