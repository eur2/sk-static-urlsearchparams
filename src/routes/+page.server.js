export const prerender = true;

export async function load() {
  const posts = await fetch(
    `https://api.giletti-dapra.com/wp-json/wp/v2/posts?_embed&per_page=100&_fields=id,title,class_list,acf,content,_links,_embedded,slug`,
  ).then((r) => r.json());
  return {
    posts: posts,
  };
}
