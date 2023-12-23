import { useLoaderData } from "react-router-dom";
const Blog = () => {
  const data = useLoaderData();
  console.log(data);

  const dataMap = data.map((img) => <img src={img.url} key={img.id} />);
  return (
    <div
      className="p-6 pt-10 dark:bg-gray-900 ease-in-out duration-300"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5 , auto)",
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
