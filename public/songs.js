const playlists = {

  ahirani: {
    title: "Ahirani Songs",
    description: "Ahirani Collection",
    cover: "img/ahirani.jpg",
    songs: [
      {
        name: "Ahirani Song 1",
        artist: "Ahirani",
        url: "https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/ahirani1.mp3"
      }
    ]
  },

  bollywood: {
    title: "Bollywood Songs",
    description: "Hindi Bollywood Hits",
    cover: "img/bollywood.jpg",
    songs: [
      {
        name: "Bollywood Song 1",
        artist: "Bollywood",
        url: "https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/bollywood1.mp3"
      }
    ]
  },

  marathi: {
    title: "Marathi Songs",
    description: "Marathi Collection",
    cover: "img/marathi.jpg",
    songs: [
      {
        name: "Marathi Song 1",
        artist: "Marathi",
        url: "https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/marathi1.mp3"
      }
    ]
  },

  motivational: {
    title: "Motivational Songs",
    description: "Energy & Motivation",
    cover: "img/motivation.jpg",
    songs: [
      {
        name: "Motivation Song 1",
        artist: "Motivational",
        url: "https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/motivation1.mp3"
      }
    ]
  },

  ncs: {
    title: "NCS",
    description: "No Copyright Songs",
    cover: "img/ncs.jpg",
    songs: [
      {
        name: "NCS Song 1",
        artist: "NCS",
        url: "https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/ncs1.mp3"
      }
    ]
  },

  old: {
    title: "Old Songs",
    description: "Old is Gold",
    cover: "img/old.jpg",
    songs: [
      {
        name: "Old Song 1",
        artist: "Old Hits",
        url: "https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/old1.mp3"
      }
    ]
  },

  punjabi: {
    title: "Punjabi Songs",
    description: "Punjabi Beats",
    cover: "img/punjabi.jpg",
    songs: [
      {
        name: "Punjabi Song 1",
        artist: "Punjabi",
        url: "https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/punjabi1.mp3"
      }
    ]
  },

  romantic: {
    title: "Romantic Songs",
    description: "Love & Romance",
    cover: "img/romantic.jpg",
    songs: [
      {
        name: "Romantic Song 1",
        artist: "Romantic",
        url: "https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/romantic1.mp3"
      }
    ]
  }

};

console.log("Playlists loaded:", Object.keys(playlists));
