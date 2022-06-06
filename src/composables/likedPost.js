import { ref } from 'vue'

export function useLikedPost () {
  let likedPosts = JSON.parse(window.localStorage.getItem('app.liked-posts') ?? '[]')
  likedPosts = ref(new Set(likedPosts))

  function updateStorage () {
    window.localStorage.setItem('app.liked-posts', JSON.stringify([...likedPosts.value]))
  }

  function likePost (postId) {
    likedPosts.value.add(postId)
    updateStorage()
  }

  function unlikePost (postId) {
    likedPosts.value.delete(postId)
    updateStorage()
  }

  function togglePostLike (like, postId) {
    return (like ? likePost(postId) : unlikePost(postId))
  }

  return {
    likedPosts,
    likePost,
    unlikePost,
    togglePostLike
  }
}
