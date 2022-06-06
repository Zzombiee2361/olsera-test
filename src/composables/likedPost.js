import { ref } from 'vue'

export function useLikedPost () {
  let likedPosts = JSON.parse(window.localStorage.getItem('app.liked-posts') ?? '[]')
  likedPosts = ref(new Set(likedPosts))

  // ideally there should be an API endpoint to get all liked posts,
  // compromise need to be made since the alternative is fetching
  // post per id (too many requests) or requesting all posts then
  // filtering the data (too slow)
  const likedPostsData = ref(JSON.parse(window.localStorage.getItem('app.liked-posts-data') ?? '[]'))

  function updateStorage () {
    window.localStorage.setItem('app.liked-posts', JSON.stringify([...likedPosts.value]))
    window.localStorage.setItem('app.liked-posts-data', JSON.stringify([...likedPostsData.value]))
  }

  function likePost (post) {
    likedPosts.value.add(post.id)
    likedPostsData.value.push(post)
    updateStorage()
  }

  function unlikePost (post) {
    likedPosts.value.delete(post.id)
    const idx = likedPostsData.value.findIndex((p) => p.id === post.id)
    if (idx >= 0) {
      likedPostsData.value.splice(idx, 1)
    }
    updateStorage()
  }

  function togglePostLike (like, post) {
    return (like ? likePost(post) : unlikePost(post))
  }

  return {
    likedPosts,
    likedPostsData,
    likePost,
    unlikePost,
    togglePostLike
  }
}
