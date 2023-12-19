import { useLoaderData } from "react-router-dom";
const Blog = () => {
  const data = useLoaderData();
  console.log(data);

  const dataMap = data.map((img) => <img src={img.url} key={img.id} />);
  return (
    <div
      className="p-6 mt-10"
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto auto",
        gridGap: 30,
      }}>
      {dataMap}
    </div>
  );
};

export default Blog;

export const fetchImages = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/photos");

  return response.json();
};
