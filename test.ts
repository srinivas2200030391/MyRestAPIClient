import RestApiClient from "./dist/index";

const api = new RestApiClient("https://jsonplaceholder.typicode.com");

async function test() {
  try {
    console.log("Testing GET...");
    const posts = await api.get<any[]>("/posts");
    console.log(posts.slice(0, 2)); // Display the first 2 posts

    console.log("Testing POST...");
    const newPost = await api.post("/posts", {
      title: "foo",
      body: "bar",
      userId: 1,
    });
    console.log(newPost);

    console.log("Testing PUT...");
    const updatedPost = await api.put("/posts/1", {
      title: "updated title",
      body: "updated body",
      userId: 1,
    });
    console.log(updatedPost);

    console.log("Testing DELETE...");
    const deleted = await api.delete("/posts/1");
    console.log(deleted);
  } catch (error) {
    console.error(error);
  }
}

test();
