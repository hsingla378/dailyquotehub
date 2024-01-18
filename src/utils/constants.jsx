import axios from "axios";
import { enqueueSnackbar } from "notistack";

export const navLinks = [
  { path: "/", text: "Home" },
  { path: "/quotes", text: "Quotes" },
  { path: "/authors", text: "Authors" },
  { path: "/categories", text: "Categories" },
];

export const quotes = [
  {
    author: {
      name: "zenobia smith",
      designation: "Spiritual Guide",
      description: "Wisdom seeker and spiritual mentor",
      avatar:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
    },
    book: {
      name: "Eternal Quest",
      image:
        "https://m.media-amazon.com/images/I/41wVYuZMNTL._SY445_SX342_.jpg",
      amazonLink: "https://www.amazon.com/books/enlightenment-chronicles",
    },
    _id: "65a7c4c1c654b4d1d905a557",
    title: "Enlightenment Chronicles",
    description:
      "Discover the profound truths hidden in the tapestry of existence.",
    categories: ["enlightenment", "spirituality"],
    thumbnail:
      "https://i.pinimg.com/564x/a0/ef/35/a0ef352c96992ef65c5e8e65c3614807.jpg",
    __v: 0,
  },
  {
    author: {
      name: "harmony green",
      designation: "Explorer of Knowledge",
      description: "Passionate about unraveling the mysteries of the world",
      avatar:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
    },
    book: {
      name: "Quest for Wisdom",
      image:
        "https://m.media-amazon.com/images/I/41wVYuZMNTL._SY445_SX342_.jpg",
      amazonLink: "https://www.amazon.com/books/curiosity-unleashed",
    },
    _id: "65a7c4c8c654b4d1d905a559",
    title: "Curiosity Unleashed",
    description:
      "Embrace the unknown; wisdom is found in the journey of questioning.",
    categories: ["curiosity", "exploration"],
    thumbnail:
      "https://i.pinimg.com/564x/a0/ef/35/a0ef352c96992ef65c5e8e65c3614807.jpg",
    __v: 0,
  },
  {
    author: {
      name: "serena moon",
      designation: "Philosopher of Serenity",
      description: "Advocate for finding peace in the midst of storms",
      avatar:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
    },
    book: {
      name: "Serenity's Symphony",
      image:
        "https://m.media-amazon.com/images/I/41wVYuZMNTL._SY445_SX342_.jpg",
      amazonLink: "https://www.amazon.com/books/harmony-in-chaos",
    },
    _id: "65a7c4cdc654b4d1d905a55b",
    title: "Harmony in Chaos",
    description:
      "Find tranquility amidst life's chaos through the wisdom of acceptance.",
    categories: ["harmony", "acceptance"],
    thumbnail:
      "https://i.pinimg.com/564x/a0/ef/35/a0ef352c96992ef65c5e8e65c3614807.jpg",
    __v: 0,
  },
  {
    author: {
      name: "luna celestia",
      designation: "Ethereal Explorer",
      description: "Guiding seekers through the realms of the unknown",
      avatar:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
    },
    book: {
      name: "Eternal Odyssey",
      image:
        "https://m.media-amazon.com/images/I/41wVYuZMNTL._SY445_SX342_.jpg",
      amazonLink: "https://www.amazon.com/books/quest-for-eternity",
    },
    _id: "65a7c4ddc654b4d1d905a55d",
    title: "Quest for Eternity",
    description:
      "Embark on a timeless journey to unravel the secrets of existence.",
    categories: ["eternity", "adventure"],
    thumbnail:
      "https://i.pinimg.com/564x/a0/ef/35/a0ef352c96992ef65c5e8e65c3614807.jpg",
    __v: 0,
  },
  {
    author: {
      name: "aurelia mystica",
      designation: "Seer of the Unseen",
      description: "Channeling ancient wisdom from ethereal dimensions",
      avatar:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
    },
    book: {
      name: "Whispers of the Cosmos",
      image:
        "https://m.media-amazon.com/images/I/41wVYuZMNTL._SY445_SX342_.jpg",
      amazonLink: "https://www.amazon.com/books/mystic-insights",
    },
    _id: "65a7c4e5c654b4d1d905a55f",
    title: "Mystic Insights",
    description:
      "Uncover the mystical truths that weave the fabric of the universe.",
    categories: ["mysticism", "insights"],
    thumbnail:
      "https://i.pinimg.com/564x/a0/ef/35/a0ef352c96992ef65c5e8e65c3614807.jpg",
    __v: 0,
  },
  {
    author: {
      name: "viktor forge",
      designation: "Architect of Tomorrow",
      description: "Inspiring individuals to carve their paths with purpose",
      avatar:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
    },
    book: {
      name: "Forge Your Destiny",
      image:
        "https://m.media-amazon.com/images/I/41wVYuZMNTL._SY445_SX342_.jpg",
      amazonLink: "https://www.amazon.com/books/sculpting-tomorrow",
    },
    _id: "65a7c4ecc654b4d1d905a561",
    title: "Sculpting Tomorrow",
    description:
      "Craft your destiny with the wisdom to shape a brighter future.",
    categories: ["destiny", "self-improvement"],
    thumbnail:
      "https://i.pinimg.com/564x/a0/ef/35/a0ef352c96992ef65c5e8e65c3614807.jpg",
    __v: 0,
  },
  {
    author: {
      name: "elysia dreamweaver",
      designation: "Wisdom Alchemist",
      description: "Crafting elixirs of insight from the ethereal realms",
      avatar:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
    },
    book: {
      name: "The Silent Oracle",
      image:
        "https://m.media-amazon.com/images/I/41wVYuZMNTL._SY445_SX342_.jpg",
      amazonLink: "https://www.amazon.com/books/whispers-of-wisdom",
    },
    _id: "65a7c50fc654b4d1d905a569",
    title: "Whispers of Wisdom",
    description:
      "Listen closely to the subtle whispers that carry the essence of true wisdom.",
    categories: ["whispers", "intuition"],
    thumbnail:
      "https://i.pinimg.com/564x/a0/ef/35/a0ef352c96992ef65c5e8e65c3614807.jpg",
    __v: 0,
  },
  {
    author: {
      name: "quantum voyager",
      designation: "Explorer of Cosmic Enigmas",
      description:
        "Navigating the cosmic puzzle with a thirst for understanding",
      avatar:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
    },
    book: {
      name: "Celestial Enigma",
      image:
        "https://m.media-amazon.com/images/I/41wVYuZMNTL._SY445_SX342_.jpg",
      amazonLink: "https://www.amazon.com/books/riddles-of-the-cosmos",
    },
    _id: "65a7c51dc654b4d1d905a56b",
    title: "Riddles of the Cosmos",
    description:
      "Embark on a cosmic quest to solve the enigmatic riddles that govern the universe.",
    categories: ["cosmos", "puzzles"],
    thumbnail:
      "https://i.pinimg.com/564x/a0/ef/35/a0ef352c96992ef65c5e8e65c3614807.jpg",
    __v: 0,
  },
  {
    author: {
      name: "lyra melodica",
      designation: "Soulful Melody Weaver",
      description: "Harmonizing the symphony of inner peace and self-discovery",
      avatar:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
    },
    book: {
      name: "Melodies of the Heart",
      image:
        "https://m.media-amazon.com/images/I/41wVYuZMNTL._SY445_SX342_.jpg",
      amazonLink: "https://www.amazon.com/books/serenade-of-the-soul",
    },
    _id: "65a7c525c654b4d1d905a56d",
    title: "Serenade of the Soul",
    description:
      "Discover the harmonious melodies that resonate within the depths of your soul.",
    categories: ["soul", "harmony"],
    thumbnail:
      "https://i.pinimg.com/564x/a0/ef/35/a0ef352c96992ef65c5e8e65c3614807.jpg",
    __v: 0,
  },
  {
    author: {
      name: "orion starlight",
      designation: "Cosmic Harmonist",
      description: "Weaving cosmic harmonies into the fabric of existence",
      avatar:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
    },
    book: {
      name: "Infinite Reverberations",
      image:
        "https://m.media-amazon.com/images/I/41wVYuZMNTL._SY445_SX342_.jpg",
      amazonLink: "https://www.amazon.com/books/echoes-of-infinity",
    },
    _id: "65a7c546c654b4d1d905a575",
    title: "Echoes of Infinity",
    description:
      "Dive into the boundless echoes that resonate through the corridors of infinity.",
    categories: ["infinity", "echoes"],
    thumbnail:
      "https://i.pinimg.com/564x/a0/ef/35/a0ef352c96992ef65c5e8e65c3614807.jpg",
    __v: 0,
  },
  {
    author: {
      name: "athena weaver",
      designation: "Philosopher Artisan",
      description: "Crafting wisdom into the beautiful mosaic of life",
      avatar:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
    },
    book: {
      name: "Threads of Insight",
      image:
        "https://m.media-amazon.com/images/I/41wVYuZMNTL._SY445_SX342_.jpg",
      amazonLink: "https://www.amazon.com/books/wisdoms-tapestry",
    },
    _id: "65a7c54dc654b4d1d905a577",
    title: "Wisdom's Tapestry",
    description:
      "Explore the intricate threads of wisdom woven into the tapestry of existence.",
    categories: ["tapestry", "threads"],
    thumbnail:
      "https://i.pinimg.com/564x/a0/ef/35/a0ef352c96992ef65c5e8e65c3614807.jpg",
    __v: 0,
  },
  {
    author: {
      name: "zenith illuminare",
      designation: "Luminary Guide",
      description:
        "Guiding seekers through the labyrinth of inner enlightenment",
      avatar:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
    },
    book: {
      name: "Eclipsed Wisdom",
      image:
        "https://m.media-amazon.com/images/I/41wVYuZMNTL._SY445_SX342_.jpg",
      amazonLink: "https://www.amazon.com/books/labyrinth-of-enlightenment",
    },
    _id: "65a7c554c654b4d1d905a579",
    title: "Labyrinth of Enlightenment",
    description:
      "Navigate the intricate labyrinth that leads to the illumination of true enlightenment.",
    categories: ["labyrinth", "illumination"],
    thumbnail:
      "https://i.pinimg.com/564x/a0/ef/35/a0ef352c96992ef65c5e8e65c3614807.jpg",
    __v: 0,
  },
  {
    author: {
      name: "zenith illuminare",
      designation: "Luminary Guide",
      description:
        "Guiding seekers through the labyrinth of inner enlightenment",
      avatar:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
    },
    book: {
      name: "Eclipsed Wisdom",
      image:
        "https://m.media-amazon.com/images/I/41wVYuZMNTL._SY445_SX342_.jpg",
      amazonLink: "https://www.amazon.com/books/labyrinth-of-enlightenment",
    },
    _id: "65a8fec7f5513397c79dc6c1",
    title: "Labyrinth of Enlightenment",
    description:
      "Navigate the intricate labyrinth that leads to the illumination of true enlightenment.",
    categories: ["labyrinth", "illumination"],
    thumbnail:
      "https://i.pinimg.com/564x/a0/ef/35/a0ef352c96992ef65c5e8e65c3614807.jpg",
    __v: 0,
  },
];

export const authors = quotes.map((quote) => quote.author);

const allCategories = new Set();

quotes.forEach((quote) => {
  // Extract categories
  quote.categories.forEach((category) => allCategories.add(category));

  // Extract tags
});

// Converting sets to arrays if needed
export const uniqueCategories = Array.from(allCategories);

export const deleteQuote = (token, quoteId) => {
  let data = "";

  if (!token) {
    enqueueSnackbar("Kindly login!", {
      variant: "success",
      persist: false,
    });
    return;
  }

  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: import.meta.env.VITE_BACKEND_URL + "/quotes/" + quoteId,
    headers: {
      Authorization: token,
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      enqueueSnackbar(response.data.message, {
        variant: "success",
        persist: false,
      });
    })
    .catch((error) => {
      enqueueSnackbar(error, {
        variant: "error",
        persist: false,
      });
    });
};

export const capitalizeTitle = function (title) {
  return title
    .split(" ")
    .map((item) =>
      item.length <= 2
        ? item.toLowerCase()
        : `${item[0].toUpperCase()}${item.slice(1).toLowerCase()}`
    )
    .join(" ");
};
