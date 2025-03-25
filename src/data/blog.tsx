import type { Author, BlogPost } from '../type/blog';

const authors: Author[] = [
  {
    name: 'Alex Johnson',
    avatar: '/placeholder.svg?height=100&width=100',
    bio: 'Content creator and tech enthusiast with a passion for web development and design.',
  },
  {
    name: 'Sarah Williams',
    avatar: '/placeholder.svg?height=100&width=100',
    bio: 'UX designer and writer focused on creating beautiful, functional digital experiences.',
  },
  {
    name: 'Michael Chen',
    avatar: '/placeholder.svg?height=100&width=100',
    bio: 'Software engineer and blogger who loves sharing insights about modern web technologies.',
  },
];

const loremIpsum = `
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

<h2>Key Points</h2>
<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

<ul>
  <li>First important point about this topic</li>
  <li>Second key consideration to keep in mind</li>
  <li>Third essential element for success</li>
</ul>

<h2>Further Exploration</h2>
<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

<blockquote>
  <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
</blockquote>

<p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
`;

const categories = ['Technology', 'Design', 'Development', 'Business'];
const tags = ['React', 'JavaScript', 'TypeScript', 'CSS', 'UI/UX', 'Web Development', 'Frontend', 'Design Patterns'];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Getting Started with React and TypeScript',
    description: 'Learn how to set up a new project with React and TypeScript',
    image: '/placeholder.svg?height=400&width=600',
    date: '2023-03-15',
    content: loremIpsum,
    author: authors[0],
    readingTime: '5 min read',
    category: categories[0],
    tags: [tags[0], tags[1], tags[2]],
    relatedPosts: [2, 3, 5],
  },
  {
    id: 2,
    title: 'Modern CSS Techniques',
    description: 'Explore the latest CSS features and how to use them effectively',
    image: '/placeholder.svg?height=400&width=600',
    date: '2023-03-10',
    content: loremIpsum,
    author: authors[1],
    readingTime: '7 min read',
    category: categories[1],
    tags: [tags[3], tags[4], tags[6]],
    relatedPosts: [1, 4, 6],
  },
  {
    id: 3,
    title: 'State Management in React Applications',
    description: 'Compare different state management solutions for React',
    image: '/placeholder.svg?height=400&width=600',
    date: '2023-03-05',
    content: loremIpsum,
    author: authors[2],
    readingTime: '8 min read',
    category: categories[2],
    tags: [tags[0], tags[1], tags[7]],
    relatedPosts: [1, 5, 7],
  },
  {
    id: 4,
    title: 'Responsive Design Principles',
    description: 'Best practices for creating responsive web applications',
    image: '/placeholder.svg?height=400&width=600',
    date: '2023-02-28',
    content: loremIpsum,
    author: authors[1],
    readingTime: '6 min read',
    category: categories[1],
    tags: [tags[3], tags[4], tags[6]],
    relatedPosts: [2, 8, 10],
  },
  {
    id: 5,
    title: 'Building Accessible Web Applications',
    description: 'How to ensure your web apps are accessible to everyone',
    image: '/placeholder.svg?height=400&width=600',
    date: '2023-02-25',
    content: loremIpsum,
    author: authors[0],
    readingTime: '9 min read',
    category: categories[2],
    tags: [tags[4], tags[5], tags[6]],
    relatedPosts: [3, 7, 9],
  },
  {
    id: 6,
    title: 'Performance Optimization Techniques',
    description: 'Ways to improve the performance of your web applications',
    image: '/placeholder.svg?height=400&width=600',
    date: '2023-02-20',
    content: loremIpsum,
    author: authors[2],
    readingTime: '10 min read',
    category: categories[0],
    tags: [tags[0], tags[5], tags[7]],
    relatedPosts: [2, 8, 12],
  },
  {
    id: 7,
    title: 'Introduction to Web Animation',
    description: 'Learn the basics of creating engaging web animations',
    image: '/placeholder.svg?height=400&width=600',
    date: '2023-02-15',
    content: loremIpsum,
    author: authors[1],
    readingTime: '7 min read',
    category: categories[1],
    tags: [tags[3], tags[4], tags[6]],
    relatedPosts: [3, 5, 9],
  },
  {
    id: 8,
    title: 'Server-Side Rendering vs. Client-Side Rendering',
    description: 'Comparing different rendering approaches for web applications',
    image: '/placeholder.svg?height=400&width=600',
    date: '2023-02-10',
    content: loremIpsum,
    author: authors[0],
    readingTime: '8 min read',
    category: categories[2],
    tags: [tags[0], tags[5], tags[7]],
    relatedPosts: [4, 6, 10],
  },
  {
    id: 9,
    title: 'Design Systems for Developers',
    description: 'How to work effectively with design systems in your projects',
    image: '/placeholder.svg?height=400&width=600',
    date: '2023-02-05',
    content: loremIpsum,
    author: authors[1],
    readingTime: '6 min read',
    category: categories[1],
    tags: [tags[3], tags[4], tags[6]],
    relatedPosts: [5, 7, 11],
  },
  {
    id: 10,
    title: 'Testing React Applications',
    description: 'Best practices for testing your React components and applications',
    image: '/placeholder.svg?height=400&width=600',
    date: '2023-01-30',
    content: loremIpsum,
    author: authors[2],
    readingTime: '9 min read',
    category: categories[0],
    tags: [tags[0], tags[1], tags[2]],
    relatedPosts: [4, 8, 12],
  },
  {
    id: 11,
    title: 'CSS Architecture for Large Projects',
    description: 'Strategies for organizing CSS in large-scale applications',
    image: '/placeholder.svg?height=400&width=600',
    date: '2023-01-25',
    content: loremIpsum,
    author: authors[0],
    readingTime: '7 min read',
    category: categories[1],
    tags: [tags[3], tags[4], tags[6]],
    relatedPosts: [2, 9, 12],
  },
  {
    id: 12,
    title: 'Web Security Fundamentals',
    description: 'Essential security concepts every web developer should know',
    image: '/placeholder.svg?height=400&width=600',
    date: '2023-01-20',
    content: loremIpsum,
    author: authors[2],
    readingTime: '8 min read',
    category: categories[3],
    tags: [tags[5], tags[7]],
    relatedPosts: [6, 10, 11],
  },
];

export const findPostById = (id: number): BlogPost | undefined => {
  return blogPosts.find((post) => post.id === id);
};

export const getRelatedPosts = (postId: number): BlogPost[] => {
  const post = findPostById(postId);
  if (!post || !post.relatedPosts) return [];

  return post.relatedPosts.map((id) => findPostById(id)).filter((post): post is BlogPost => post !== undefined);
};
